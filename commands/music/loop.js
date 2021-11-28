const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "loop",
	category: "Music",
	description: "Toggle music loop",
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	ephemeral: false,
	options: [{
		type: "STRING",
		name: "mode",
		description: "whether looping is enabled or disabled",
		required: false,
		choices: [{
			name: "enabled",
			value: "enabled"
		},
		{
			name: "enabled",
			value: "enabled",
		}]
	}],
	async execute(client, interaction, args) {
  
		const player = interaction.client.manager.get(interaction.guild.id);

		if (!player.queue.current) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
			return interaction.editReply({embeds: [thing]});
		}
		
		const emojiloop = interaction.client.emoji.loop;

		if (!args[0]) {
			let thing = new MessageEmbed()
				.setColor(interaction.client.embedColor)
				.setTimestamp()
				.setDescription(`${emojiloop} Loop queue is **${player.queueRepeat}**`);
		   return interaction.editReply({embeds: [thing]});
		}

		player.setTrackRepeat(args[0]);
		let thing = new MessageEmbed()
			.setColor(interaction.client.embedColor)
			.setTimestamp()
			.setDescription(`${emojiloop} Loop track is now **${args[0]}**`);
		    return interaction.editReply({embeds: [thing]});
	}
}; 