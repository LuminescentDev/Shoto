const Discord = require("discord.js");

module.exports = {
	name: "announce",
	category: "moderation",
	description: "sends an announcement",
	guildOnly: true,
	permissions: ["MANAGE_MESSAGES"],
	options: [
		{
			name: "message",
			type: "STRING",
			description: "Your announcement message",
			required: true,
		}],

	async execute(client, interaction, args) {

		//get all settings
		const settings = await client.getSettings(interaction);

		//if no channel reply with error
		if (!settings[0].AchannelID) {
			return interaction.reply({content: client.lang("no-config", settings[0].language), ephemeral: true});
		}

		//contstruct embed and send the announcement channel
		const announcmentEmbed = new Discord.MessageEmbed()
                    .setTitle("__**Announcement**__")
                    .setColor(client.embedColor)
                    .setDescription(`${args[0]}`)
                    .setFooter(`${interaction.member.user.username}`, `${interaction.member.user.displayAvatarURL({ dynamic: true, size: 2048 })}`);
		interaction.guild.channels.cache.get(settings[0].AchannelID).send({embeds: [announcmentEmbed]});
		interaction.reply({content: "Message Sent!", ephemeral: true});

	},
};