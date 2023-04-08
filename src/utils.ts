import { ApplicationCommandData, ApplicationCommandOptionData } from "discord.js";
import { Command } from "./types/commands";
import fs from 'fs';

export function build(data: Command): ApplicationCommandData {
    const file = `./options/${data.category.toLowerCase()}/${data.name.toLowerCase()}.ts`;

    if (fs.existsSync(`src/options/${data.category.toLowerCase()}/${data.name.toLowerCase()}.ts`)) {
        const options = import(file).then((module) => module.default) as unknown as ApplicationCommandOptionData[];
        return {
            name: data.name,
            description: data.description ?? "No description provided.",
            defaultMemberPermissions: data.defaultMemberPermissions ?? [],
            options: options ?? [],
            type: data.type,
        }
    }
    return {
        name: data.name,
        description: data.description ?? "No description provided.",
        defaultMemberPermissions: data.defaultMemberPermissions ?? [],
        options: data.options ?? [],
        type: data.type,
    }
}
