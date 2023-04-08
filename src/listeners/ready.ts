import { ApplicationCommandDataResolvable, Client } from "discord.js";
import { build } from "../utils";
import { commands } from "../handlers/Commands";

export default (client: Client) => {
    client.on("ready", async () => {
        if(!client.user || !client.application) {
            return;
        }

        if (!client.application?.owner) await client.application?.fetch();
        const cmds: ApplicationCommandDataResolvable[] = [];
        commands.forEach(async command => {
            cmds.push(build(command))
            logger.info(`Registered command ${command.name}`)
        })
        logger.info(`Registered ${cmds.length} commands`)
        await client.application?.commands.set(cmds)
        logger.info(`Set ${cmds.length} commands`)
        logger.info(`Logged in as ${client.user.tag}!`)
    })
}