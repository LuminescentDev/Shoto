const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "pause",
	category: "Music",
	description: "Pause the currently playing music",
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	ephemeral: false,
	async execute(client, interaction, args) {
    
		const player = interaction.client.manager.get(interaction.guild.id);

		if (!player.queue.current) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
			return interaction.editReply({embeds: [thing]});
		}

		const emojipause = interaction.client.emoji.pause;

		if (player.paused) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojipause} The music player is already paused.`)
                .setTimestamp();
			return interaction.editReply({embeds: [thing]});
		}

		player.pause(true);

		const song = player.queue.current;

		let thing = new MessageEmbed()
            .setColor(interaction.client.embedColor)
            .setTimestamp()
            .setDescription(`${emojipause} **Paused**\n[${song.title}](${song.uri})`);
		return interaction.editReply({embeds: [thing]});
	
	}
}; 