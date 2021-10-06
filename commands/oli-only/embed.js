const Discord = require("discord.js")
module.exports = {
	name: 'embed',
	cooldown: 5,
	category: "oli-only",
	description: 'Ping!',
	execute(client, message, args) {
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Shoto/ShotoDev info')
        .setDescription('**SHOTO**\nShoto is a multipurpose bot that i am always willing to expand it has multiple category\'s such as image manipulation, moderation, anime related, nsfw, and more!\n\n**SHOTODEV**\nShotoDev is like shoto but constantly being edited and isn\'t always guaranteed to work.\nAt some points it might have more or less than regular shoto at times but it will always have new features that im testing out and will be updated lots more than regular shoto.\n Feel free to invite ShotoDev and report and bugs that might come up to me so that i can fix them and push changes faster!');
        const buttons = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
            .setURL("https://discord.com/api/oauth2/authorize?client_id=796935151417688074&permissions=8&scope=bot")
            .setLabel('Website')
            .setEmoji("855426025601499136")
            .setStyle('LINK'))
        .addComponents(new Discord.MessageButton()
            .setURL("https://discord.com/api/oauth2/authorize?client_id=742495885048676383&permissions=8&scope=bot")
            .setLabel('Github')
            .setEmoji("855425263172452352")
            .setStyle('LINK'))
        .addComponents(new Discord.MessageButton()
            .setURL("https://donatebot.io/checkout/740705740221841450")
            .setLabel('Donate')
            .setEmoji("855425716819591208")
            .setStyle('LINK'))
        message.channel.send({ embeds: [embed], components: [buttons] })
	},
};