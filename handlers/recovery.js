const { MessageEmbed } = require('discord.js');
const fs = require('fs');
module.exports = client => {
	process.on('unhandledRejection', async (reason) => {
		const Embed = new MessageEmbed()
			.setColor('#ff0000')
			.setTitle('Crash Detected')
			.setURL(`https://panel.birdflop.com/server/b6be9559/files#/logs/${client.logDate}.log`)
			.addField('Error', `\`\`\`${reason}\`\`\``.replace(/: /g, '\n'));
		client.guilds.cache.get('740705740221841450')
        .channels.cache.get('916801992121266216')
        .send({ content: '<@&740778122768547842>', embeds: [Embed] });
	});
};