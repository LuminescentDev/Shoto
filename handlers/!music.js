const { Manager, Structure } = require("erela.js");
const { LavasfyClient } = require("lavasfy");
const apple = require("erela.js-apple");
const deezer = require("erela.js-deezer");

// This system from discord music bot https://github.com/SudhanPlayz
Structure.extend(
	"Player",
	Player =>
		class extends Player {
			setNowplayingMessage(message) {
				if (this.nowPlayingMessage && !this.nowPlayingMessage.deleted) {this.nowPlayingMessage.delete()}
				return (this.nowPlayingMessage = message);
			}
		},
);

module.exports = client => {
	client.config.nodes.forEach(node => node.id = node.identifier);
	client.Lavasfy = new LavasfyClient(
		{
			clientID: client.config.SpotifyID,
			clientSecret: client.config.SpotifySecret,
			playlistPageLoadLimit: 4,
			filterAudioOnlyResult: true,
			autoResolve: true,
			useSpotifyMetadata: true,
		},
		client.config.nodes,
	);
	client.manager = new Manager({
		nodes: client.config.nodes,
		send: (id, payload) => {
			const guild = client.guilds.cache.get(id);
			if (guild) guild.shard.send(payload);
		},
		autoPlay: true,
		plugins: [
			new deezer(),
			new apple(),
		],
	});
	client.on("raw", d => client.manager.updateVoiceState(d));
};