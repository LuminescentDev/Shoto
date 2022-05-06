module.exports = async (client, message) => {

	const prefix = client.config.prefix;

	const now = Date.now();

	if(!message.content.startsWith(prefix)) return;

	//get arguments and check if first argument set command name to first argument
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	//get code corresponding to command or its alias
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	//check if command exists
	if (!command) return;

	try {
		command.execute(client, message, args);
	} catch (error) {
		client.logger.error(`COMMAND EXECUTION ERROR: ${error}`);
	}
}; 