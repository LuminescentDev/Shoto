import { Client, Collection } from "discord.js";
import { Command } from "src/types/commands";
import fs from 'fs';

export const commands = new Collection<string, Command>();

function getDirectories() {
    return fs.readdirSync("./src/commands").filter(function subFolder(file) {
        return fs.statSync("./src/commands/" + file).isDirectory();
    });
}

export default (client: Client) => {

    let commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));

    for (const folder of getDirectories()) {
        const folderFiles = fs.readdirSync("./src/commands/" + folder).filter(file => file.endsWith('.ts'));
        for (const file of folderFiles){
            commandFiles.push(`${folder}/${file}`);
        }
    }

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`).default as Command;
        commands.set(command.name, command);
    }
}