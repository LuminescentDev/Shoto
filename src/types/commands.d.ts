import { PermissionsBitField, SlashCommandBuilder, ApplicationCommandType, SlashCommandOptionsOnlyBuilder, ApplicationCommandData } from "discord.js";

export interface Command {
    name: string;
    description: string;
    category: string | "uncategorized";
    ephemeral?: boolean;
    ownerOnly?: boolean | false;
    guildOnly?: boolean | false;
    usage?: string;
    args?: boolean;
    type?: ApplicationCommandType;
    permissions?: (keyof typeof PermissionsBitField)[];
    channelPermissions?: (keyof typeof PermissionsBitField)[];
    botPermissions?: (keyof typeof PermissionsBitField)[];
    defaultMemberPermissions?: PermissionResolvable;
    cooldown?: number | 5;
    options?: ApplicationCommandOptionData[];
    execute: any;
}