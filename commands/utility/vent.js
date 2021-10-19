const Discord = require("discord.js");
module.exports = {
	name: "vent",
	category: "utility",
	description: "Sends anonymous message to vent channel",
	options: [
		{
			name: "message",
			type: "STRING",
			description: "Your vent message",
			required: true,
		}],
	execute(client, interaction, args) {

		//Get the vent channel from settings
		client.con.query(`SELECT * FROM Settings WHERE guildID = ${interaction.guild.id}`, async (err, rows) => {
			if (err) throw err;

			//If settings dont exist generate them
			if(!rows[0]){
				interaction.reply({content: client.lang("missing-config", "en"), ephemeral: true});
				return require("../../database/models/SettingsCreate")(client, interaction.guild.id);
			} 

			let channelID = rows[0].ventChannelID;
			let language = rows[0].language;
			//If ventchannel is undefined or invalid send error message
			if (channelID === null || !interaction.guild.channels.cache.get(channelID)) {
				interaction.reply({content: client.lang("no-config", language), ephemeral: true});
			}
			const vent = new Discord.MessageEmbed()
				.setColor("#00ffff")
				.setTitle("**Anonymous Said**")
				.setDescription(`${args[0]}`);
			interaction.guild.channels.cache.get(channelID).send({embeds: [vent]});
			interaction.reply({content: "Message sent!", ephemeral: true});
		});
	},
};