const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const { convertTime } = require("../../utilities/convert");
const { addsong, playlist, resume, warn } = require("../../utilities/emoji.json");
module.exports = {
	name: "play",
	description: "Play music from YouTube, Spotify, or Apple Music",
	guildOnly: true,
	inVoiceChannel: true,
	ephemeral: false,
	usage: "<Song URL/Name/Playlist URL>",
	options: [
		{
			type: "STRING",
			name: "song",
			description: "Song URL/Name or Playlist URL",
			required: true
		}
	],
	async execute(client, interaction, args, ) {
		const { channel } = interaction.member.voice;
		let player = client.manager.get(interaction.guild.id);
		if (player && channel !== interaction.guild.me.voice.channel) {
			const thing = new MessageEmbed()
				.setColor("RED")
				.setDescription(`You must be in the same channel as ${client.user}`);
			return interaction.editReply({ embeds: [thing] });
		}
		else if (!player) {
			player = client.manager.create({
				guild: interaction.guild.id,
				voiceChannel: channel.id,
				textChannel: interaction.channel.id,
				volume: 50,
				selfDeafen: true,
			});
		}
		if (player.state !== "CONNECTED") player.connect();
		if (interaction.guild.me.voice.serverMute) return interaction.editReply({ content: "I'm server muted!" });
		player.set("autoplay", false);
		const search = args.join(" "); 
		const songs = [];
		await interaction.editReply(`🔎 Searching for \`${search}\`...`);
		try {
			const embed = new MessageEmbed().setTimestamp();
			if (client.Lavasfy.spotifyPattern.test(search)) {
				await client.Lavasfy.requestToken();
				const node = await client.Lavasfy.getNode("lavamusic");
				const Searched = await node.load(search);
				const track = Searched.tracks[0];
				if (Searched.loadType === "PLAYLIST_LOADED") {
					embed.setDescription(`${playlist} **Added Playlist to queue**\n[${Searched.playlistInfo.name}](${search}) \`[${Searched.tracks.length} songs]\` [${interaction.member.user}]`);
					for (let i = 0; i < Searched.tracks.length; i++) songs.push(TrackUtils.build(Searched.tracks[i]));
				}
				else if (Searched.loadType.startsWith("TRACK")) {
					embed.setDescription(`${playlist} **Added Song to queue**\n[${track.info.title}](${track.info.uri}) [${interaction.member.user}]`);
					songs.push(Searched.tracks[0]);
				}
				else {
					embed.setColor("RED").setDescription("No results found.");
					return interaction.editReply({ content: `${warn} **Failed to search**`, embeds: [embed] });
				}
				track.img = "https://i.imgur.com/cK7XIkw.png";
			}
			else {
				const Searched = await player.search(search);
				const track = Searched.tracks[0];
				if (Searched.loadType === "NO_MATCHES") {
					embed.setColor("RED").setDescription("No results found.");
					return  interaction.editReply({ content: `${warn} **Failed to search**`, embeds: [embed] });
				}
				else if (Searched.loadType === "PLAYLIST_LOADED") {
					embed.setDescription(`${playlist} **Added Playlist to queue**\n[${Searched.playlist.name}](${search}) \`[${Searched.tracks.length} songs]\` \`[${convertTime(Searched.playlist.duration)}]\` [${interaction.member.user}]`);
					for (let i = 0; i < Searched.tracks.length; i++) {
						if (Searched.tracks[i].displayThumbnail) Searched.tracks[i].img = Searched.tracks[i].displayThumbnail("hqdefault");
						songs.push(Searched.tracks[i]);
					}
				}
				else {
					if (track.displayThumbnail) track.img = track.displayThumbnail("hqdefault");
					embed.setDescription(`${addsong} **Added Song to queue**\n[${track.title}](${track.uri}) \`[${convertTime(track.duration).replace("07:12:56", "LIVE")}]\` [${interaction.member.user}]`)
						.setThumbnail(track.img);
					songs.push(Searched.tracks[0]);
				}
			}
			songs.forEach(async song => {
				song.requester = interaction.member.user;
				if (song.author) song.title = `${song.title} - ${song.author}`;
			});
			player.queue.add(songs);
			if (!player.playing) player.play();
			interaction.editReply({ content: `${resume} **Found result for \`${search}\`**`, embeds: [embed] });
		}
		catch (e) {
			client.logger.error(e);
		}
	},
};