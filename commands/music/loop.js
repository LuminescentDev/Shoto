const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "loop",
	category: "Music",
	description: "Toggle music loop",
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
			return interaction.reply({embeds: [thing]});
		}
		
		const emojiloop = interaction.client.emoji.loop;

		if (args.length > 0 && /queue/i.test(args[0])) {
			player.setQueueRepeat(!player.queueRepeat);
			const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
			let thing = new MessageEmbed()
				.setColor(interaction.client.embedColor)
				.setTimestamp()
				.setDescription(`${emojiloop} Loop queue is now **${queueRepeat}**`);
		   return interaction.reply({embeds: [thing]});
		}

		player.setTrackRepeat(!player.trackRepeat);
		const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
		let thing = new MessageEmbed()
			.setColor(interaction.client.embedColor)
			.setTimestamp()
			.setDescription(`${emojiloop} Loop track is now **${trackRepeat}**`);
		    return interaction.reply({embeds: [thing]});
	}
};