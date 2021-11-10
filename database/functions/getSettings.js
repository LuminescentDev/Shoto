module.exports = (client, args) => {

	client.getSettings = async function get(args) {
		let guildID = args.guild ? args.guild.id : 0;
		let settings = await client.query(`SELECT * FROM Settings WHERE guildID = ${guildID}`);
		if(!settings[0]){ 
			client.setSettings(guildID);
			settings[0] = require("../models/defaultSettings.json");
		}
		return settings[0];
	};


};