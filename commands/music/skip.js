const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "skip",
	category: "Music",
	description: "Skip the currently playing song",
	args: false,
	usage: "",
	permission: [],
	owner: false,
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	async execute(client, interaction, args) {
  
		const player = interaction.client.manager.get(interaction.guild.id);

		if (!player.queue.current) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
			return interaction.editReply({embeds: [thing]});
		}

		const autoplay = player.get("autoplay");
		const song = player.queue.current;

		if (autoplay === false) {
			player.stop();
		} else {
			player.stop();
			player.queue.clear();
			player.set("autoplay", false);
		}
		
		const emojiskip = interaction.client.emoji.skip;

		let thing = new MessageEmbed()
			.setDescription(`${emojiskip} **Skipped**\n[${song.title}](${song.uri})`)
			.setColor(interaction.client.embedColor)
			.setTimestamp();
		return interaction.editReply({embeds: [thing]});
	
	}
}; 