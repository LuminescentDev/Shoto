module.exports = (client, args) => {

	client.delSettings = function delSettings(args) {
		require("../models/SettingsDelete")(client,args);
	}; 
}; 