const axios = require('axios');

// ============================================
// AI API CONFIGURATION
// ============================================
// Choose your preferred AI provider:
// 1. Groq (FREE, Fast) - Recommended: https://console.groq.com/keys
// 2. OpenAI (Paid, GPT models): https://platform.openai.com/api-keys
// 3. Google Gemini (FREE tier): https://aistudio.google.com/app/apikey

const aiProvider = "groq"; // Options: "groq", "openai", "gemini"

// Groq API Key (FREE - Get from https://console.groq.com/keys)
// Set via environment variable: GROQ_API_KEY
const groqApiKey = process.env.GROQ_API_KEY || "";

// OpenAI API Key (Paid - Get from https://platform.openai.com/api-keys)
// Set via environment variable: OPENAI_API_KEY
const openaiApiKey = process.env.OPENAI_API_KEY || "";

// Google Gemini API Key (FREE - Get from https://aistudio.google.com/app/apikey)
// Set via environment variable: GEMINI_API_KEY
const geminiApiKey = process.env.GEMINI_API_KEY || "";

// Settings
const maxTokens = 2000;
const maxStorageMessage = 20;

// Initialize global storage for chat history and usage tracking
if (!global.temp.aiUsing)
	global.temp.aiUsing = {};
if (!global.temp.aiHistory)
	global.temp.aiHistory = {};

const { aiUsing, aiHistory } = global.temp;

module.exports = {
	config: {
		name: "AI",
		version: "1.0.0",
		author: "Custom",
		countDown: 5,
		role: 0,
		description: {
			vi: "Chat với AI (OpenAI GPT)",
			en: "Chat with AI (OpenAI GPT)"
		},
		category: "ai",
		guide: {
			vi: "   {pn} <message>: Chat với AI\n   {pn} clear: Xóa lịch sử chat",
			en: "   {pn} <message>: Chat with AI\n   {pn} clear: Clear chat history"
		}
	},

	langs: {
		vi: {
			apiKeyEmpty: "⚠️ Vui lòng cung cấp API key tại file scripts/cmds/AI.js\n\n📌 Tùy chọn miễn phí:\n• Groq (Khuyến nghị): https://console.groq.com/keys\n• Gemini: https://aistudio.google.com/app/apikey\n\n💳 Trả phí:\n• OpenAI: https://platform.openai.com/api-keys",
			invalidContent: "Vui lòng nhập nội dung bạn muốn chat với AI",
			yourAreUsing: "Bạn đang sử dụng AI chat, vui lòng chờ quay lại sau khi yêu cầu trước kết thúc",
			processingRequest: "🤖 AI đang xử lý, vui lòng chờ...",
			error: "Đã có lỗi xảy ra\n%1",
			clearHistory: "✅ Đã xóa lịch sử chat với AI",
			response: "🤖 AI: %1"
		},
		en: {
			apiKeyEmpty: "⚠️ Please provide an API key in scripts/cmds/AI.js\n\n📌 FREE Options:\n• Groq (Recommended): https://console.groq.com/keys\n• Gemini: https://aistudio.google.com/app/apikey\n\n💳 Paid:\n• OpenAI: https://platform.openai.com/api-keys",
			invalidContent: "Please enter the content you want to chat with AI",
			yourAreUsing: "You are using AI chat, please wait until the previous request ends",
			processingRequest: "🤖 AI is processing, please wait...",
			error: "An error has occurred\n%1",
			clearHistory: "✅ Chat history with AI has been cleared",
			response: "🤖 AI: %1"
		}
	},

	// Works with prefix in groups (e.g., -AI <message>)
	onStart: async function ({ message, event, args, getLang }) {
		const apiKey = getApiKey();
		if (!apiKey)
			return message.reply(getLang('apiKeyEmpty'));

		// Handle clear command
		if (args[0] && args[0].toLowerCase() === 'clear') {
			aiHistory[event.senderID] = [];
			return message.reply(getLang('clearHistory'));
		}

		if (!args[0])
			return message.reply(getLang('invalidContent'));

		await handleAI(event, message, args.join(" "), getLang);
	},

	// Works without prefix in 1:1 chats (just "AI <message>" or "AI")
	onChat: async function ({ message, event, getLang }) {
		if (!event.body)
			return;
		
		const { body, isGroup, threadID, senderID } = event;
		const apiKey = getApiKey();
		if (!apiKey)
			return;

		// Only work without prefix in 1:1 chats (not in groups)
		// In groups, isGroup will be true, so skip
		// In 1:1 chats, isGroup can be false, undefined, or null
		if (isGroup === true)
			return;

		const trimmedBody = body.trim();
		if (!trimmedBody)
			return;
		
		// Check if message starts with "AI" (case insensitive) - allow with or without space
		// Match: "AI message", "AImessage", "ai message", "AI", etc.
		const aiPattern = /^ai(\s+|)(.+)?$/i;
		const aiMatch = trimmedBody.match(aiPattern);
		
		if (aiMatch) {
			const messageText = aiMatch[2] ? aiMatch[2].trim() : "";
			
			// Handle clear command
			if (messageText.toLowerCase() === 'clear') {
				aiHistory[senderID] = [];
				return () => {
					return message.reply(getLang('clearHistory'));
				};
			}
			
			// If just "AI" without message, ask for input
			if (!messageText) {
				return () => {
					return message.reply(getLang('invalidContent'));
				};
			}
			
			return () => {
				return handleAI(event, message, messageText, getLang);
			};
		}
	}
};

function getApiKey() {
	switch (aiProvider.toLowerCase()) {
		case "groq":
			return groqApiKey;
		case "openai":
			return openaiApiKey;
		case "gemini":
			return geminiApiKey;
		default:
			// Try to use any available key
			if (groqApiKey) return groqApiKey;
			if (openaiApiKey) return openaiApiKey;
			if (geminiApiKey) return geminiApiKey;
			return "";
	}
}

async function askAI(event) {
	const provider = aiProvider.toLowerCase();
	const messages = aiHistory[event.senderID] || [
		{
			role: "system",
			content: "You are a helpful AI assistant. Always respond in the same language as the user's message. If the user writes in Bangla (Bengali), respond in Bangla. If they write in English, respond in English. Be friendly, concise, and helpful in your responses."
		}
	];

	// Determine which provider to use (prioritize configured provider, fallback to available keys)
	let useProvider = provider;
	let useApiKey = "";
	
	if (provider === "groq" && groqApiKey) {
		useProvider = "groq";
		useApiKey = groqApiKey;
	} else if (provider === "gemini" && geminiApiKey) {
		useProvider = "gemini";
		useApiKey = geminiApiKey;
	} else if (provider === "openai" && openaiApiKey) {
		useProvider = "openai";
		useApiKey = openaiApiKey;
	} else {
		// Fallback to first available key
		if (groqApiKey) {
			useProvider = "groq";
			useApiKey = groqApiKey;
		} else if (geminiApiKey) {
			useProvider = "gemini";
			useApiKey = geminiApiKey;
		} else if (openaiApiKey) {
			useProvider = "openai";
			useApiKey = openaiApiKey;
		} else {
			throw new Error("No API key configured. Please add an API key to scripts/cmds/AI.js");
		}
	}

	if (useProvider === "groq") {
		// Use Groq API (FREE and Fast)
		const response = await axios({
			url: "https://api.groq.com/openai/v1/chat/completions",
			method: "POST",
			headers: {
				"Authorization": `Bearer ${useApiKey}`,
				"Content-Type": "application/json"
			},
			data: {
				// Updated model - try these in order if one doesn't work:
				// llama-3.3-70b-versatile (newest, recommended)
				// llama-3.1-8b-instant (faster, smaller)
				// mixtral-8x7b-32768 (alternative)
				model: "llama-3.3-70b-versatile",
				messages: messages,
				max_tokens: maxTokens,
				temperature: 0.7
			}
		});
		return response;
	}
	else if (useProvider === "gemini") {
		// Use Google Gemini API (FREE tier available)
		const response = await axios({
			url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${useApiKey}`,
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				contents: [{
					parts: messages.filter(m => m.role !== "system").map(m => ({
						text: m.content
					}))
				}],
				generationConfig: {
					maxOutputTokens: maxTokens,
					temperature: 0.7
				}
			}
		});
		// Transform Gemini response to match OpenAI format
		return {
			data: {
				choices: [{
					message: {
						content: response.data.candidates[0].content.parts[0].text
					}
				}]
			}
		};
	}
	else {
		// Use OpenAI API (Default)
		const response = await axios({
			url: "https://api.openai.com/v1/chat/completions",
			method: "POST",
			headers: {
				"Authorization": `Bearer ${useApiKey}`,
				"Content-Type": "application/json"
			},
			data: {
				model: "gpt-3.5-turbo",
				messages: messages,
				max_tokens: maxTokens,
				temperature: 0.7
			}
		});
		return response;
	}
}

async function handleAI(event, message, userMessage, getLang) {
	try {
		if (aiUsing[event.senderID])
			return message.reply(getLang("yourAreUsing"));

		aiUsing[event.senderID] = true;

		// Initialize chat history if it doesn't exist
		if (!aiHistory[event.senderID] || !Array.isArray(aiHistory[event.senderID])) {
			aiHistory[event.senderID] = [
				{
					role: "system",
					content: "You are a helpful AI assistant. Always respond in the same language as the user's message. If the user writes in Bangla (Bengali), respond in Bangla. If they write in English, respond in English. Support all languages and respond naturally in the user's language. Be friendly, concise, and helpful in your responses."
				}
			];
		}

		// Manage chat history (keep last maxStorageMessage messages)
		if (aiHistory[event.senderID].length >= maxStorageMessage * 2) {
			// Keep system message and last maxStorageMessage conversations
			const systemMsg = aiHistory[event.senderID].find(m => m.role === "system");
			const recentMessages = aiHistory[event.senderID]
				.filter(m => m.role !== "system")
				.slice(-maxStorageMessage * 2);
			aiHistory[event.senderID] = systemMsg ? [systemMsg, ...recentMessages] : recentMessages;
		}

		// Add user message to history
		aiHistory[event.senderID].push({
			role: 'user',
			content: userMessage
		});

		let sending;
		let sendingMessageID = null;
		try {
			sending = await message.reply(getLang('processingRequest'));
			sendingMessageID = sending?.messageID || (typeof sending === 'object' && sending.messageID ? sending.messageID : null);
			
			const response = await askAI(event);
			// Handle different response formats
			let aiResponse;
			if (response.data?.choices?.[0]?.message?.content) {
				aiResponse = response.data.choices[0].message.content;
			} else if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
				aiResponse = response.data.candidates[0].content.parts[0].text;
			} else {
				throw new Error("Invalid response format from AI service");
			}

			// Add AI response to history
			aiHistory[event.senderID].push({
				role: 'assistant',
				content: aiResponse
			});

			// Try to unsend the processing message (fail silently if it doesn't work)
			if (sendingMessageID) {
				try {
					await message.unsend(sendingMessageID);
				} catch (unsendErr) {
					// Ignore unsend errors - it's not critical
				}
			}
			
			return await message.reply(getLang("response", aiResponse));
		}
		catch (err) {
			// Try to unsend the processing message (fail silently if it doesn't work)
			if (sendingMessageID) {
				try {
					await message.unsend(sendingMessageID);
				} catch (unsendErr) {
					// Ignore unsend errors - it's not critical
				}
			}
			
			const errorMessage = err.response?.data?.error?.message || err.message || "Unknown error";
			return message.reply(getLang('error', errorMessage));
		}
		finally {
			delete aiUsing[event.senderID];
		}
	} catch (err) {
		delete aiUsing[event.senderID];
		console.error("Error in AI command:", err);
		const errorMessage = err.response?.data?.error?.message || err.message || "Unknown error";
		return await message.reply(getLang('error', errorMessage));
	}
}

