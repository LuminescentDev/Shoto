import { Client } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client) => {
    client.on("ready", async () => {
        if(!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(Commands);

        Commands.forEach(async command => {
            console.log(`Registered command: ${command.name}`);
        })

        console.log(`Logged in as ${client.user.tag}!`)
    })
}