/* eslint-disable no-mixed-spaces-and-tabs */
const { createCanvas, loadImage } = require("canvas");
const Discord = require("discord.js");
module.exports = {
	name: "gay",
	async execute(client, interaction) {
		const row = new Discord.MessageActionRow()
                        .addComponents(
                        	new Discord.MessageButton()
                        .setCustomId("gay")
                        .setLabel("Gayify urself")
                        .setEmoji("742458322220875967")
                        .setStyle("PRIMARY")
                        .setDisabled(true));

		//Get avatar, load canvas, draw avatar on canvas
		const avatarURL = interaction.user.displayAvatarURL({ format: "png", size: 2048 });
		const canvas = createCanvas(200, 200);
		const ctx = canvas.getContext("2d");
		const avatar = await loadImage(avatarURL);
		ctx.drawImage(avatar, 0, 0, 200, 200);
		ctx.save();

		//Make opacity 0.5, load rainbow flag, draw rainbow flag
		ctx.globalAlpha = 0.5;
		const gay = await loadImage("https://elmersflag.com/wp-content/uploads/2016/11/Rainbow.png");
		ctx.drawImage(gay, 0, 0, 200, 200);
		ctx.restore();

		//turn canvas into a message attachment and send it the the channel
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "gay.png");
		interaction.update({files: [attachment], components: [row]});
	},
}; 