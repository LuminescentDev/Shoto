const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "remove",
	category: "Music",
	description: "Remove song from the queue",
	args: false,
	usage: "<Number of song in queue>",
	permission: [],
	owner: false,
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
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
			return interaction.reply({embeds: [thing]});
		}

		const position = (args[0] - 1);
		if (position > player.queue.size) {
			const number = (position + 1);
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`No songs at number ${number}.\nTotal Songs: ${player.queue.size}`);
			return interaction.reply({embeds: [thing]});
		}
        
		const song = player.queue[position];
		player.queue.remove(position);

		const emojieject = interaction.client.emoji.remove;

		let thing = new MessageEmbed()
			.setColor(interaction.client.embedColor)
			.setTimestamp()
			.setDescription(`${emojieject} Removed\n[${song.title}](${song.uri})`);
		  return interaction.reply({embeds: [thing]});
	
	}
}; 