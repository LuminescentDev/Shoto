const Discord = require("discord.js")
module.exports = {
	name: 'ping',
	cooldown: 5,
	category: "testing",
	description: 'Ping!',
	execute(client, interaction, args) {
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Some title')
        .setURL('https://discord.js.org/')
        .setDescription('Some description here');
        const row = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
            .setCustomID('ping')
            .setLabel('test')
            .setEmoji("😍")
            .setStyle('PRIMARY'))
        interaction.reply({ embeds: [embed], components: [row] })
	},
};