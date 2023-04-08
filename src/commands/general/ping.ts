import { Client, CommandInteraction } from "discord.js";
import { Command } from "src/types/commands";

const ping: Command = {
    name: "ping",
    category: "General",
    description: "Pong!",
    cooldown: 5,
    execute: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({ content: "Pong!" });
    }
}

export default ping;