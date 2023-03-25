import { Command } from "./Command";
import fs from "fs";
import path from "path";

export const Commands: Command[] = [];

function getDirectories() {
    return fs.readdirSync("./src/commands").filter(function subFolder(file) {
        return fs.statSync("./src/commands/" + file).isDirectory();
    });
}

let commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

for (const folder of getDirectories()) {
    const folderFiles = fs.readdirSync("./src/commands/" + folder).filter(file => file.endsWith(".js"));
    for (const file of folderFiles) {
        commandFiles.push(`${folder}/${file}`);
    }
}

// Gets all files ending in .js in all the subfolders of the commands folder
for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    Commands.push(command);
}
