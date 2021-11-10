module.exports = (client, args) => {

	client.setSettings = function setSettings(args) {
		require("../models/SettingsCreate")(client,args);
	};
};