import { AutocompleteInteraction, Client, Collection, CommandInteraction, CommandInteractionOptionResolver, Interaction } from "discord.js";
import { commands } from "../../handlers/Commands";
import { Command } from "../../types/commands";

export default {
    name: "reload",
    category: "Owner",
    description: "Reload Commands!",
    cooldown: 0,
    ownerOnly: true,

    execute: async (client: Client, interaction: CommandInteraction, args: CommandInteractionOptionResolver) => {
		const category = args.getString("category")?.toLowerCase();
		const commandName = args.getString("command")?.toLowerCase();
		const command = commands.get(commandName!)

		if (!command) {
			return interaction.editReply(`There is no command with name \`${commandName}\`, ${interaction!.member!.user}!`);
		}

		delete require.cache[require.resolve(`../${category}/${command.name}.ts`)];

		try {
			const newCommand = require(`../${category}/${command.name}.ts`);
			commands.set(newCommand.name, newCommand);
			interaction.followUp(`Command \`${command.name}\` was reloaded!`);
		} catch (error) {
			logger.error(error);
			interaction.followUp(`There was an error while reloading a command \`${command.name}\`:\n\`${error}\``);
		}
    }
};
