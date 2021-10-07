const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "skipto",
	aliases: ["jump"],
	category: "Music",
	description: "Forward song",
	args: true,
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
  
		args = args._hoistedOptions;
		args.forEach(arg => args[args.indexOf(arg)] = arg.value);
  
		const player = interaction.client.manager.get(interaction.guild.id);

		if (!player.queue.current) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
			return interaction.reply({embeds: [thing]});
		}

		const position = args[0];
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`Usage: /skipto <Number of song in queue>`);
			return interaction.reply({embeds: [thing]});
		}

		player.queue.remove(0, position - 1);
		player.stop();
		
		const emojijump = interaction.client.emoji.jump;

		let thing = new MessageEmbed()
			.setDescription(`${emojijump} Forward **${position}** Songs`)
			.setColor(interaction.client.embedColor)
			.setTimestamp();
			
		return interaction.reply({embeds: [thing]});
	
	}
};