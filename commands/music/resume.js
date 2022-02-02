const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "resume",
	category: "Music",
	description: "Resume currently playing music",
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	ephemeral: false,
	async execute(client, interaction, args) {

		const player = interaction.client.manager.get(interaction.guild.id);
		const song = player.queue.current;

		if (!player.queue.current) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
			return interaction.editReply({embeds: [thing]});
		}

		const emojiresume = interaction.client.emoji.resume;

		if (!player.paused) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojiresume} The player is already **resumed**.`)
                .setTimestamp();
			return interaction.editReply({embeds: [thing]});
		}

		player.pause(false);

		let thing = new MessageEmbed()
            .setDescription(`${emojiresume} **Resumed**\n[${song.title}](${song.uri})`)
            .setColor(interaction.client.embedColor)
            .setTimestamp();
		return interaction.editReply({embeds: [thing]});
	
	}
}; 