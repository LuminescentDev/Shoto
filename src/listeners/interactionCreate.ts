import { CommandInteraction, Client, Interaction, EmbedBuilder, Colors, Collection, ChannelType } from "discord.js";
import { ownerIDs } from '../config.json'
import { Command } from "src/types/commands";
import { commands } from "../handlers/Commands";

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

    const command = commands.find(c => c.name === interaction.commandName);
    const args = interaction.options;
    await interaction.deferReply();

    if(!command) {
        return interaction.followUp({ content: "An error occured while executing this command." });
    }

    if(command.ownerOnly && !ownerIDs.includes(interaction.user.id)) {
        return interaction.followUp({ content: "This command can only be used by the bot owners." });
    }

    if (command.guildOnly && (interaction.channel?.type !== ChannelType.GuildText) ) {
        return interaction.followUp({ content: "This command can only be used in a server." });
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

    try{
        await command.execute(client, interaction, args);
    }catch(err){
        logger.error(err);
        embed.setTitle("An error occured while executing this command.")
        .setDescription(`\`\`\`${err}\`\`\``)
        .setTimestamp()
        interaction.followUp({ embeds: [embed] });
    }
}