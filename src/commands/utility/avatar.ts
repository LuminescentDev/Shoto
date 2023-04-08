import { Client, CommandInteraction, CommandInteractionOption, CommandInteractionOptionResolver, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "src/types/commands";

const avatar: Command = {
    name: "avatar",
    category: "utility",
    description: "shows avatar of selected user",
    cooldown: 5,
    guildOnly: true,
    execute: async (client: Client, interaction: CommandInteraction, args: CommandInteractionOptionResolver) => {
        const type = args.getString('type');
        const user = interaction.guild?.members.cache.get(args.getUser('user')?.id || interaction.user.id);

        const embed = new EmbedBuilder()
        .setTitle(user!.displayName)

        if (type === "user") {
            embed.setImage(user!.user.displayAvatarURL() || "")
        }else{
            embed.setImage(user?.displayAvatarURL() || "")
        }

        await interaction.followUp({ embeds: [embed] });
    }
}

export default avatar;