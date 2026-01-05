const path = require("path");

// Use .dev files for both 'production' and 'development' environments (as per Render deployment)
const useDevFiles = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development';
const dirConfig = path.join(`${__dirname}/../${useDevFiles ? 'config.dev.json' : 'config.json'}`);
const dirConfigCommands = path.join(`${__dirname}/../${useDevFiles ? 'configCommands.dev.json' : 'configCommands.json'}`);

global.GoatBot = {
	config: require(dirConfig),
	configCommands: require(dirConfigCommands)
};
global.utils = require("../utils.js");
global.client = {
	database: {
		creatingThreadData: [],
		creatingUserData: [],
		creatingDashBoardData: []
	}
};
global.db = {
	allThreadData: [],
	allUserData: [],
	globalData: []
};

module.exports = async function () {
	const controller = await require(path.join(__dirname, "..", "database/controller/index.js"))(null); // data is loaded here
	const { threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData } = controller;
	return {
		threadModel,
		userModel,
		dashBoardModel,
		globalModel,
		threadsData,
		usersData,
		dashBoardData,
		globalData
	};
};