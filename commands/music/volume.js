const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "volume",
	aliases: ["v", "vol"],
	category: "Music",
	description: "Change volume of currently playing music",
	  args: false,
	usage: "",
	permission: [],
	owner: false,
  	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	options: [{
		name: "volume",
		type: "INTEGER",
		description: "number between 1-100",
		required: false,
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
		
		const volumeEmoji = interaction.client.emoji.volumehigh;

		if (args.length === 0) {
			let thing = new MessageEmbed()
			.setColor(interaction.client.embedColor)
			.setTimestamp()
			.setDescription(`${volumeEmoji} The current volume is: **${player.volume}%**`);
			return interaction.reply({embeds: [thing]});
		}

		const volume = args[0];
		
		if (!volume || volume < 0 || volume > 100) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`Usage: /volume <Number of volume between 0 - 100>`);
			return interaction.reply({embeds: [thing]});
		}

		player.setVolume(volume);

		if (volume > player.volume) {
			var emojivolume = interaction.client.emoji.volumehigh;
			let thing = new MessageEmbed()
				.setColor(interaction.client.embedColor)
				.setTimestamp()
				.setDescription(`${emojivolume} Volume set to: **${volume}%**`);
		  return interaction.reply({embeds: [thing]});
		} else if (volume < player.volume) {
			var emojivolume = interaction.client.emoji.volumelow;
			let thing = new MessageEmbed()
				.setColor(interaction.client.embedColor)
				.setTimestamp()
				.setDescription(`${emojivolume} Volume set to: **${volume}%**`);
		  return interaction.reply({embeds: [thing]});
		} else {
			let thing = new MessageEmbed()
				.setColor(interaction.client.embedColor)
				.setTimestamp()
				.setDescription(`${volumeEmoji} Volume set to: **${volume}%**`);
			return interaction.reply({embeds: [thing]});
		}
		
 	}
};