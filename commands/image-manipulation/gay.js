const Discord = require("discord.js")
module.exports = {
	name: 'gay',
	cooldown: 5,
	category: "Image",
	description: 'Add a pride flag over your avatar!',
	execute(client, interaction, args) {
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('gay')
            .setLabel('Gayify urself')
            .setEmoji("742458322220875967")
            .setStyle('PRIMARY'))
        interaction.reply({content: 'click it for gay', components: [row] })
	},
};