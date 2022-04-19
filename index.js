const client = new Client({ token: "TOKEN_HERE" });
const Collection = require("@discordjs/collection")
const { Client } = require("guilded.js");
const { readdirSync } = require("fs");
const fs = require("fs");

client.config = require("./config/config.json");

//create collections
client.commands = new Collection.Collection();
client.categories = readdirSync("./commands/");

//load all handlers
for (const handler of fs.readdirSync("./handlers").filter(file => file.endsWith(".js"))) require(`./handlers/${handler}`)(client);

client.login();