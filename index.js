const { Client } = require("guilded.js");

const client = new Client({ token: "TOKEN_HERE" });

const { readdirSync } = require("fs");
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"], allowedMentions: { parse: ["users", "roles", "everyone"], repliedUser: true } });
client.config = require("./config/config.json");
const fs = require("fs");
//create collections
client.commands = new Discord.Collection();
client.categories = readdirSync("./commands/");

//load all handlers
for (const handler of fs.readdirSync("./handlers").filter(file => file.endsWith(".js"))) require(`./handlers/${handler}`)(client);

client.login();