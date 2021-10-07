const Discord = require("discord.js");
const { readdirSync } = require("fs");
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_PRESENCES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"], allowedMentions: { parse: ["users", "roles", "everyone"], repliedUser: true } });
client.config = require("./config/config.json");
const fs = require("fs");
client.commands = new Discord.Collection();
client.buttons = new Discord.Collection();
client.snipes = new Discord.Collection();	
client.editSnipes = new Discord.Collection();	
client.embedColor = client.config.embedColor;
client.emoji = require("./utilities/emoji.json");
client.categories = readdirSync("./commands/");
client.manager = new Manager({
	nodes: [
		{
			host: client.config.LAVA_HOST,
			port: client.config.LAVA_PORT,
			password: client.config.LAVA_PASS,
		},
	],
	send: (id, payload) => {
		const guild = client.guilds.cache.get(id);
		if (guild) guild.shard.send(payload);
	},
	autoPlay: true,
	plugins: [new Spotify({
		clientID: client.config.SpotifyID,
		clientSecret: client.config.SpotifySecret,
	}),
	],
})
   .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`));

client.on("raw", d => client.manager.updateVoiceState(d));
for (const handler of fs.readdirSync("./handlers").filter(file => file.endsWith(".js"))) require(`./handlers/${handler}`)(client);

client.login(client.config.token);