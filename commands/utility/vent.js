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
		args = args._hoistedOptions;
		args.forEach(arg => args[args.indexOf(arg)] = arg.value);
		client.con.query(`SELECT ventChannelID FROM Settings WHERE guildID = ${interaction.guild.id}`, async (err, rows) => {
			if (err) throw err;
			var channelID = rows[0].ventChannelID;
			if (channelID === null || !interaction.guild.channels.cache.get(channelID)) {
				interaction.reply({content: "Please contact a staff member and ask them to setup this command!", ephemeral: true});
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