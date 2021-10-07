module.exports = {
	name: "reload",
	description: "Reloads a command",
	args: true,
	options: [{
		name: "category",
		type: "STRING",
		description: "commands category",
		required: true,
	},
	{
		name: "command",
		type: "STRING",
		description: "command to reload",
		required: true,
	}],
	execute(client, interaction, args) {
		args = args._hoistedOptions;
		args.forEach(arg => args[args.indexOf(arg)] = arg.value);
		const category = args[0].toLowerCase();
		const commandName = args[1].toLowerCase();
		const command = interaction.client.commands.get(commandName)
            || interaction.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return interaction.reply(`There is no command with name or alias \`${commandName}\`, ${interaction.member.user}!`);
		}

		delete require.cache[require.resolve(`../${category}/${command.name}.js`)];

		try {
			const newCommand = require(`../${category}/${command.name}.js`);
			interaction.client.commands.set(newCommand.name, newCommand);
			interaction.reply(`Command \`${command.name}\` was reloaded!`);
		} catch (error) {
			client.logger.error(error);
			interaction.reply(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};