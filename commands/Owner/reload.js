module.exports = {
	name: "reload",
	category: "owner",
	description: "Reloads a command",
	owner: true,
	execute(client, message, args) {

		const category = args[0].toLowerCase();
		const commandName = args[1].toLowerCase();
		const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.reply(`There is no command with name or alias \`${commandName}\``);
		}

		delete require.cache[require.resolve(`../${category}/${command.name}.js`)];

		try {
			const newCommand = require(`../${category}/${command.name}.js`);
			client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${command.name}\` was reloaded!`);
		} catch (error) {
			client.error(error)
			message.reply(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
}; 