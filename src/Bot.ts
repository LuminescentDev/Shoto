import { Client, Partials, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import { token } from "./config.json";

console.log("Bot is starting...");

const client = new Client({
  partials: [
    Partials.Message, 
    Partials.Channel, 
    Partials.Reaction
],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
  ],
  allowedMentions: { parse: ["users", "roles", "everyone"], repliedUser: true },
});

for (const listener of readdirSync("./src/listeners").filter(file => file.endsWith(".ts"))) import(`./listeners/${listener}`).then(listener => listener.default(client));

client.login(token);