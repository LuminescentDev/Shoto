import { ApplicationCommandOptionData, ApplicationCommandOptionType } from "discord.js";

const helpCommandOptions: ApplicationCommandOptionData[] = [
  {
    name: "command",
    description: "The command that you want info on",
    type: ApplicationCommandOptionType.String,
    required: false,
  },
];

export default helpCommandOptions;