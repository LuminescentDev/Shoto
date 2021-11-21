const { Manager, Structure } = require("erela.js");
const { LavasfyClient } = require("lavasfy");
const apple = require("erela.js-apple");
const deezer = require("erela.js-deezer");
const fs = require("fs");

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
		nodes,
	);
	client.manager = new Manager({
		nodes: nodes,
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
	fs.readdir("./events/music/", (err, files) => {
		if (err) return client.logger.error(err);
		files.forEach(file => {
			if (!file.endsWith(".js")) return;
			const event = require(`../events/music/${file}`);
			const eventName = file.split(".")[0];
			client.manager.on(eventName, event.bind(null, client));
		});
		// goes through all the files in the events folder and registers them
	});
};