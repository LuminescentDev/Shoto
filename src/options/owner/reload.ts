import { ApplicationCommandOptionData, ApplicationCommandOptionType } from "discord.js";

const avatarCommandOptions: ApplicationCommandOptionData[] = [
    {
		name: "category",
		type: ApplicationCommandOptionType.String,
		description: "commands category",
		required: true,
	},
	{
		name: "command",
		type: ApplicationCommandOptionType.String,
		description: "command to reload",
		required: true,
	}
];

export default avatarCommandOptions;