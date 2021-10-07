const { MessageEmbed } = require("discord.js");

module.exports = {

	name: "247",
	category: "Music",
	description: "24/7 in voice channel",
	args: false,
	usage: "",
	permission: [],
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	async execute(client, interaction, args) {


		const player = interaction.client.manager.players.get(interaction.guild.id);
		if (player.twentyFourSeven) {
			player.twentyFourSeven = false;
			const embed = new MessageEmbed()
       .setColor(client.embedColor)
       .setDescription(`24/7 mode is now off.`);
			return interaction.reply({embeds: [embed]});
		}
		else {
			player.twentyFourSeven = true;
			const embed = new MessageEmbed()
       .setColor(client.embedColor)
       .setDescription(`24/7 mode is now on.`);
      
			return interaction.reply({embeds: [embed]});
		}
	}
};