const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const {convertTime} = require("../../handlers/utilities.js");

module.exports = {
	name: "seek",
	aliases: [],
	category: "Music",
	description: "Seek the currently playing song",
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	ephemeral: false,
	usage: "<10s || 10m || 10h>",
	options: [{
		name: "time",
		type: "STRING",
		description: "time to seek to <10s || 10m || 10h>,",
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

		const time = ms(args[0]);
		const position = player.position;
		const duration = player.queue.current.duration;

		const emojiforward = interaction.client.emoji.forward;
		const emojirewind = interaction.client.emoji.rewind;

		const song = player.queue.current;
        
		if (time <= duration) {
			if (time > position) {
				player.seek(time);
				let thing = new MessageEmbed()
                    .setDescription(`${emojiforward} **Forward**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(interaction.client.embedColor)
                    .setTimestamp();
				return interaction.editReply({embeds: [thing]});
			} else {
				player.seek(time);
				let thing = new MessageEmbed()
                    .setDescription(`${emojirewind} **Rewind**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(interaction.client.embedColor)
                    .setTimestamp();
				return interaction.editReply({embeds: [thing]});
			}
		} else {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Seek duration exceeds Song duration.\nSong duration: \`${convertTime(duration)}\``);
			return interaction.editReply({embeds: [thing]});
		}
	
	}
}; 