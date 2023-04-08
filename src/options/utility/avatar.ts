import { ApplicationCommandOptionData, ApplicationCommandOptionType } from "discord.js";

const avatarCommandOptions: ApplicationCommandOptionData[] = [
  {
    name: "type",
    description: "type of avatar to get",
    type: ApplicationCommandOptionType.String,
    required: true,
    choices: [
      {
        name: "User",
        value: "user",
      },
      {
        name: "Server",
        value: "server",
      },
    ],
  },
  {
    name: "user",
    description: "The user whose avatar you want to get",
    type: ApplicationCommandOptionType.User,
    required: false,
  },
];

export default avatarCommandOptions;
