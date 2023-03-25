import { ChatInputApplicationCommandData, Client, CommandInteraction } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void;
    guildOnly?: boolean;
    Donor?: boolean;
    cooldown?: number;
}