import { Client, Partials, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import { Logger } from "winston";
import { token } from "./config.json";

console.log("Bot is starting...");

const client = new Client({
  shards: 'auto',
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

for (const handler of readdirSync("./src/handlers").filter(file => file.endsWith(".ts"))) import(`./handlers/${handler}`).then(handler => handler.default(client));

client.login(token);

declare global {
  var logger: Logger;
}