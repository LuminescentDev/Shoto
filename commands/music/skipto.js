const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "skipto",
	category: "Music",
	description: "Forward song",
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	ephemeral: false,
	usage: "<Number of song in queue>",
	options: [{
		name: "song",
		type: "INTEGER",
		description: "Song",
		required: true,
	}],
	async execute(client, interaction, args) {
  

  
		const player = interaction.client.manager.get(interaction.guild.id);

		if (!player.queue.current) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
			return interaction.editReply({embeds: [thing]});
		}

		const position = args[0];
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`Usage: /skipto <Number of song in queue>`);
			return interaction.editReply({embeds: [thing]});
		}

		player.queue.remove(0, position - 1);
		player.stop();
		
		const emojijump = interaction.client.emoji.jump;

		let thing = new MessageEmbed()
			.setDescription(`${emojijump} Forward **${position}** Songs`)
			.setColor(interaction.client.embedColor)
			.setTimestamp();
			
		return interaction.editReply({embeds: [thing]});
	
	}
}; 