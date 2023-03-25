import { CommandInteraction, Client, Interaction, EmbedBuilder, Colors, Collection } from "discord.js";
import { Command } from "src/Command";
import { Commands } from "../Commands";

const cooldowns = new Collection<Command, Collection<string, number> >();

export default (client: Client) => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction) => {
    const embed = new EmbedBuilder().setColor(Colors.Red)

    const command = Commands.find(c => c.name === interaction.commandName);

    await interaction.deferReply();

    if(!command) {
        return interaction.followUp({ content: "An error occured while executing this command." });
    }

    if (!cooldowns.has(command)) {
        cooldowns.set(command, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps && timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id)! + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return interaction.followUp({ content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.` });
        }
    }

    timestamps!.set(interaction.user.id, now);
    setTimeout(() => timestamps!.delete(interaction.user.id), cooldownAmount);

    command?.run(client, interaction)
}