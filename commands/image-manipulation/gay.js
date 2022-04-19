/* eslint-disable no-mixed-spaces-and-tabs */

module.exports = {
	name: "gay",
	category: "image-manipulation",
	description: "Add a pride flag over your avatar!",
	ephemeral: false,
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