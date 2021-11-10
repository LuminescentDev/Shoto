const fs = require("fs");
module.exports = client => {
	function getDirectories() {
		return fs.readdirSync("./commands").filter(function subFolder(file) {
			return fs.statSync("./commands/" + file).isDirectory();
		});
	}
	//Gets all directorys in the command folder
	let commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
	//Gets all files ending in .js in the main commands folder
	for (const folder of getDirectories()) {
		const folderFiles = fs.readdirSync("./commands/" + folder).filter(file => file.endsWith(".js"));
		for (const file of folderFiles) {
			commandFiles.push([folder, file]);
		}
	}
	//Gets all files ending in .js in all the subfolders of the commmands folder
	for (const file of commandFiles) {
		let command;
		command = Array.isArray(file) ? require(`../commands/${file[0]}/${file[1]}`) : require(`../commands/${file}`);
		client.commands.set(command.name, command);
	}
	//Creates the actual commands and saves them to the client for later use
	client.logger.info("Commands Loaded");
}; 