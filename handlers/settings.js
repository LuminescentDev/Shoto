const fs = require("fs");
module.exports = client => {
	const commandFiles = fs.readdirSync("./settings").filter(file => file.endsWith(".js"));

	for (const file of commandFiles) {
		const setting = require(`../settings/${file}`);

		// Set a new item in the Collection
		// With the key as the setting ID and the value as the exported module
		client.settings.set(setting.id, setting);
	}
}; 