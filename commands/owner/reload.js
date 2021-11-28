module.exports = {
	name: "reload",
	category: "owner",
	description: "Reloads a command",
	owner: true,
	ephemeral: false,
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

		const category = args[0].toLowerCase();
		const commandName = args[1].toLowerCase();
		const command = interaction.client.commands.get(commandName)
            || interaction.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return interaction.editReply(`There is no command with name or alias \`${commandName}\`, ${interaction.member.user}!`);
		}

		delete require.cache[require.resolve(`../${category}/${command.name}.js`)];

		try {
			const newCommand = require(`../${category}/${command.name}.js`);
			interaction.client.commands.set(newCommand.name, newCommand);
			interaction.editReply(`Command \`${command.name}\` was reloaded!`);
		} catch (error) {
			client.logger.error(error);
			interaction.editReply(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
}; 


// module.exports = {
// 	name: "reload",
// 	category: "owner",
// 	description: "Reloads a command",
// 	owner: true,
// 	options: [{
// 		type: "SUBCOMMAND",
// 		name: "commands",
// 		description: "reload command",
// 		options:[{
// 			type: "STRING",
// 			name: "category",
// 			description: "command category",
// 			required: true,
// 		},
// 		{
// 			type: "STRING",
// 			name: "command",
// 			description: "command to reload",
// 			required: true,
// 		}]
// 	},
// 	{
// 		type: "SUBCOMMAND",
// 		name: "settings",
// 		description: "reload setting",
// 		options:[{
// 			type: "STRING",
// 			name: "setting",
// 			description: "setting to reload",
// 			required: true,
// 		}]
// 	}],
// 	execute(client, interaction, args) {

// 		const subcommand = args[0];

// 		if(subcommand === "commands"){

// 			const category = args[1].toLowerCase();
// 			const commandName = args[2].toLowerCase();
// 			const command = client.commands.get(commandName)
// 				|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
// 			if (!command) {
// 				return interaction.reply(`There is no command with name or alias \`${commandName}\`, ${interaction.member.user}!`);
// 			}
	
// 			delete require.cache[require.resolve(`../${category}/${command.name}.js`)];
	
// 			try {
// 				const newCommand = require(`../${category}/${command.name}.js`);
// 				client.commands.set(newCommand.name, newCommand);
// 				interaction.reply(`Command \`${command.name}\` was reloaded!`);
// 			} catch (error) {
// 				client.logger.error(error);
// 				interaction.reply(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
// 			}

// 		}else if (subcommand === "settings"){
// 			const settingName = args[1].toLowerCase();
// 			const setting = client.settings.get(settingName);
	
// 			if (!setting) {
// 				return interaction.reply(`There is no command with name or alias \`${settingName}\`, ${interaction.member.user}!`);
// 			}
	
// 			delete require.cache[require.resolve(`../../settings/${settingName}.js`)];
	
// 			try {
// 				const newSetting = require(`../../settings/${settingName}.js`);
// 				client.commands.set(newSetting.id, newSetting);
// 				interaction.reply(`Setting \`${newSetting.id}\` was reloaded!`);
// 			} catch (error) {
// 				client.logger.error(error);
// 				interaction.reply(`There was an error while reloading a Setting \`${setting.id}\`:\n\`${error.message}\``);
// 			}
// 		}
// 	},
// }; 