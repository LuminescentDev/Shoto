/* eslint-disable no-mixed-spaces-and-tabs */
const Discord = require("discord.js");
module.exports = {
	name: "editVent",
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
        
        console.log(interaction)
        let ventMessageEmbed = interaction.message.embeds[0];

        const ventLog = new Discord.MessageEmbed()
        .setTitle("Vent Edited")
        .setColor("#00ff00")
        .addField("Author:", ventMessageEmbed.fields[0].value)
        .addField("Vent Content", ventMessageEmbed.fields[1].value)
        .addField("Edited By", interaction.user.tag)
        .addField("Edited At", `<t:${Math.floor(Date.now()/1000)}:R>`)
        
        const vent = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle("Deleted By staff")
        .setDescription("Vent deleted by staff");


        await interaction.guild.channels.cache.get(channelID).messages.fetch(ventMessageEmbed.fields[2].value).then(async message => {
            await message.edit({embeds: [vent]});
        });
		interaction.editReply({embeds: [ventLog], components: [row]});
	},
}; 