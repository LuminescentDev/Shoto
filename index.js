const Discord = require("discord.js");
const Statcord = require("statcord.js");
const { readdirSync } = require("fs");
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"], allowedMentions: { parse: ["users", "roles", "everyone"], repliedUser: true } });
client.config = require("./config/config.json");
const fs = require("fs");
//create collections
client.commands = new Discord.Collection();
client.settings = new Discord.Collection();
client.buttons = new Discord.Collection();
client.snipes = new Discord.Collection();	
client.editSnipes = new Discord.Collection();	
client.debug = false;
client.embedColor = client.config.embedColor;
client.emoji = require("./utilities/emoji.json");
client.categories = readdirSync("./commands/");
//create statcord client
client.stats = new Statcord.Client({
	client,
	key: client.config.statcord_key,
	postCpuStatistics: true, 
	postMemStatistics: true, 
	postNetworkStatistics: true,
});

//register custom field for statcord
client.stats.registerCustomFieldHandler(1, async client => {
	return client.manager.nodes.map(node => node.stats.players).reduce((a, b) => a + b, 0).toString();
});
//load all handlers
for (const handler of fs.readdirSync("./handlers").filter(file => file.endsWith(".js"))) require(`./handlers/${handler}`)(client);
//login to client
client.login(client.config.token);