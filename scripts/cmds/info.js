const { getStreamFromURL } = global.utils;

module.exports = {
	config: {
		name: "info",
		version: "1.0.0",
		author: "Custom",
		countDown: 5,
		role: 0,
		description: {
			vi: "Xem thông tin của bot developer",
			en: "View bot developer information"
		},
		category: "info",
		guide: {
			vi: "   {pn}: Xem thông tin của bot developer",
			en: "   {pn}: View bot developer information"
		}
	},

	langs: {
		vi: {
			info: "╭─────── INFO ───────⭓"
				+ "\n│ 👤 Developer: %1"
				+ "\n│ 📧 Email: %2"
				+ "\n│ 🌐 Facebook: SAIFVAIYA BY"
				+ "\n│ 🔗 Website: %4"
				+ "\n│ 📱 Contact: %5"
				+ "\n╰─────────────────────⭓"
		},
		en: {
			info: "╭─────── INFO ───────⭓"
				+ "\n│ 👤 Developer: %1"
				+ "\n│ 📧 Email: %2"
				+ "\n│ 🌐 Facebook: %3"
				+ "\n│ 🔗 Website: %4"
				+ "\n│ 📱 Contact: %5"
				+ "\n╰─────────────────────⭓"
		}
	},

	// Works with prefix (e.g., -info)
	onStart: async function ({ message, getLang }) {
		await sendInfo(message, getLang);
	},

	// Works without prefix (just "info")
	onChat: async function ({ message, event, getLang }) {
		const { body } = event;
		// Check if message is exactly "info" (case insensitive)
		if (body && body.trim().toLowerCase() === "info") {
			return () => {
				return sendInfo(message, getLang);
			};
		}
	}
};

async function sendInfo(message, getLang) {
	// Customize these values with your information
	const developerInfo = {
		name: "Your Name", // Change this to your name
		email: "your.email@example.com", // Change this to your email
		facebook: "https://www.facebook.com/yourprofile", // Change this to your Facebook profile
		website: "https://yourwebsite.com", // Change this to your website
		contact: "your.contact@example.com", // Change this to your contact email
		imageUrl: "https://example.com/your-image.jpg" // Change this to your image URL
	};

	try {
		const form = {
			body: getLang("info", 
				developerInfo.name,
				developerInfo.email,
				developerInfo.facebook,
				developerInfo.website,
				developerInfo.contact
			)
		};

		// Add image if URL is provided
		if (developerInfo.imageUrl) {
			try {
				const imageStream = await getStreamFromURL(developerInfo.imageUrl);
				form.attachment = imageStream;
			} catch (err) {
				console.error("Error loading image:", err);
				// Continue without image if URL fails
			}
		}

		return await message.reply(form);
	} catch (err) {
		console.error("Error in info command:", err);
		return await message.reply("An error occurred while sending info.");
	}
}

