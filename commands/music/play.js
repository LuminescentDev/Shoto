const { MessageEmbed } = require("discord.js");
const { convertTime } = require("../../utilities/convert.js");

module.exports = {
	name: "play",
	category: "Music",
	description: "Plays audio from YouTube or Soundcloud",
	usage: "<YouTube URL | Video Name | Spotify URL>",
	permission: [],
	owner: false,
	player: false,
	inVoiceChannel: true,
	sameVoiceChannel: false,
	options: [{
		name: "song",
		type: "STRING",
		description: "The song to play",
		required: true,
	}],
	async execute(client, interaction, args) {
  


		const { channel } = interaction.member.voice;
		var player = interaction.client.manager.get(interaction.guild.id);

		if (player && interaction.member.voice.channel !== interaction.guild.me.voice.channel) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`You must be in the same channel as ${interaction.client.user}`);
			interaction.editReply({embeds: [thing]});
		} else if (!player) {
			var player = interaction.client.manager.create({
				guild: interaction.guild.id,
				voiceChannel: channel.id,
				textChannel: interaction.channel.id,
				volume: 50,
				selfDeafen: true,
			});
		}

		if (player.state !== "CONNECTED") player.connect();

		player.set("autoplay", false);
        
		const emojiaddsong = interaction.client.emoji.addsong;
		const emojiplaylist = interaction.client.emoji.playlist;

		const search = args.join(" ");
		let res;

		try {
			res = await player.search(search, interaction.member.user);
			if (res.loadType === "LOAD_FAILED") {
				if (!player.queue.current) player.destroy();
				throw res.exception;
			}
		} catch (err) {
			return interaction.editReply(`there was an error while searching: ${err.message}`);
		}

		switch (res.loadType) {
			case "NO_MATCHES":
				if (!player.queue.current) player.destroy();
				return interaction.editReply("there were no results found.");
			case "TRACK_LOADED":
				var track = res.tracks[0];
				player.queue.add(track);
				if (!player.playing && !player.paused && player.queue.size === 0) { 
					return player.play();
				} else {
					var thing = new MessageEmbed()
                        .setColor(client.embedColor)
                        .setTimestamp()
                        .setThumbnail(track.displayThumbnail("hqdefault"))
                        .setDescription(`${emojiaddsong} **Added Song to queue**\n[${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\``);
					return interaction.editReply({embeds: [thing]});
				}
			case "PLAYLIST_LOADED":
				player.queue.add(res.tracks);
				if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
				var thing = new MessageEmbed()
                    .setColor(client.embedColor)
                    .setTimestamp()
                    .setDescription(`${emojiplaylist} **Added Playlist to queue**\n${res.tracks.length} Songs **${res.playlist.name}** - \`[${convertTime(res.playlist.duration)}]\``);
				return interaction.editReply({embeds: [thing]});
			case "SEARCH_RESULT":
				var track = res.tracks[0];
				player.queue.add(track);
				if (!player.playing && !player.paused && player.queue.size === 0) {
					return player.play();
				} else {
					var thing = new MessageEmbed()
                        .setColor(client.embedColor)
                        .setTimestamp()
                        .setThumbnail(track.displayThumbnail("hqdefault"))
                        .setDescription(`${emojiaddsong} **Added Song to queue**\n[${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\`[<@${track.requester.id}>]`);
					return interaction.editReply({embeds: [thing]});
				}
		}
	}
}; 