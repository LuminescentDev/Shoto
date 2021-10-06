const fs = require('fs');
module.exports = client => {
    function getDirectories() {
        return fs.readdirSync('./cmdbuttons').filter(function subFolder(file) {
            return fs.statSync('./cmdbuttons/' + file).isDirectory();
        })
    }
    //Gets all directorys in the command folder
    let commandFiles = fs.readdirSync('./cmdbuttons').filter(file => file.endsWith('.js'));
    //Gets all files ending in .js in the main commands folder
    for (const folder of getDirectories()) {
        const folderFiles = fs.readdirSync('./cmdbuttons/' + folder).filter(file => file.endsWith('.js'));
        for (const file of folderFiles) {
            commandFiles.push([folder, file]);
        }
    }
    //Gets all files ending in .js in all the subfolders of the commmands folder
    for (const file of commandFiles) {
        let button;
        if (Array.isArray(file)) {
            button = require(`../cmdbuttons/${file[0]}/${file[1]}`);
        } else {
            button = require(`../cmdbuttons/${file}`);
        }
            client.buttons.set(button.name, button)
    }
    //Creates the actual commands and saves them to the client for later use
    client.logger.info("Buttons Loaded")
}