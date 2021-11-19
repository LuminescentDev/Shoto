/* eslint-disable no-mixed-spaces-and-tabs */
const Discord = require("discord.js");
module.exports = {
	name: "gay",
	cooldown: 5,
	category: "image-manipulation",
	description: "Add a pride flag over your avatar!",
	botPermissions: ["ATTACH_FILES"],
	execute(client, interaction, args) {
		//Send button
		const row = new Discord.MessageActionRow()
        .addComponents(
        	new Discord.MessageButton()
            .setCustomId("gay")
            .setLabel("Gayify urself")
            .setEmoji("742458322220875967")
            .setStyle("PRIMARY"));
		interaction.editReply({content: "click it for gay", components: [row] });
	},
}; 