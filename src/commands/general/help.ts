import { Client, Collection, Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import { commands } from "../../handlers/Commands";
import { Command } from "../../types/commands";

const help: Command = {
    name: "help",
    category: "General",
    description: "Help!",
    cooldown: 5,
    execute: async (client: Client, interaction: CommandInteraction) => {
        const categories = new Collection<string, string[]>();

        commands.forEach(command => {
            if (!categories.has(command.category)) {
                categories.set(command.category, []);
            }
            categories.get(command.category)?.push(command.name);
        })
        
        const embed = new EmbedBuilder()
        .setTitle("Commands")
        .setDescription("Here is a list of all my commands:")
        .setThumbnail(client.user?.avatarURL() || "")
        .addFields(
            categories.map((commands, category) => {
                return {
                    name: category,
                    value: commands.map(command => `\`${command}\``).join(", ")
                }
            })
        )
        .setColor(Colors.LuminousVividPink)
        .setTimestamp()

        await interaction.followUp({ embeds: [embed] });
    }
}

export default help;