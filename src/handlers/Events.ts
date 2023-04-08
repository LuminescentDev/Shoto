import { Client } from "discord.js";
import { readdirSync } from "fs";

export default (client: Client) => {
    for (const handler of readdirSync("./src/listeners").filter(file => file.endsWith(".ts"))) import(`../listeners/${handler}`).then(handler => handler.default(client));
}