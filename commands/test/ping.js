const Discord = require("discord.js");
module.exports = {
	name: "ping",
	cooldown: 5,
	category: "test",
	description: "Ping!",
	async execute(client, interaction, args) {
		await interaction.reply({ content: "Pinging..." }).then(async () => {
			const ping = Date.now() - interaction.createdAt;
			const api_ping = client.ws.ping;

			const embed = new Discord.MessageEmbed()
            .setAuthor(`Pong`, client.user.displayAvatarURL({ dynamic: true }))
            .setColor(client.embedColor)
            .setFooter(`Ping requested by ${interaction.member.user.username}`, interaction.member.user.displayAvatarURL({ dynamic: true }))
            .addFields([{ name: "Bot Ping", value: `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, inline: true }, { name: "API Ping", value: `\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``, inline: true }])
            .setTimestamp();

			await interaction.editReply({
				content: "`🏓`",
				embeds: [embed]
			});
		});
	},
};