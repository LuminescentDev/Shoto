import { Client, CommandInteraction } from "discord.js";
import { Command } from "src/Command";

export const Yippie: Command = {
    name: "uwu",
    description: "Pong!",
    cooldown: 5,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "Pong!";

        await interaction.followUp({
            content,
        })
    }
}