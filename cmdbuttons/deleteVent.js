/* eslint-disable no-mixed-spaces-and-tabs */
const Discord = require("discord.js");
module.exports = {
	name: "deleteVent",
	ephemeral: false,
	async execute(client, interaction) {

        const settings = await client.getSettings(interaction);

        let channelID = settings.ventChannelID;

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel("Delete")
            .setCustomId("deleteVent")
            .setStyle("DANGER")
            .setDisabled(true),
            new Discord.MessageButton()
            .setLabel("Edit")
            .setCustomId("editVent")
            .setStyle("DANGER")
            .setDisabled(true)
        );
        
        let ventMessageEmbed = interaction.message.embeds[0];

        const ventLog = new Discord.MessageEmbed()
        .setTitle("Vent Deleted")
        .setColor("#ff0000")
        .addField("Author:", ventMessageEmbed.fields[0].value)
        .addField("Vent Content", ventMessageEmbed.fields[1].value)
        .addField("Deleted By", interaction.user.tag)
        .addField("Deleted At", `<t:${Math.floor(Date.now()/1000)}:R>`)
        

        await interaction.guild.channels.cache.get(channelID).messages.fetch(ventMessageEmbed.fields[2].value).then(async message => {
            await message.delete();
        });
		interaction.editReply({embeds: [ventLog], components: [row]});
	},
}; 