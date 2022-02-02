const Discord = require("discord.js");
const {fetch} = require("../../handlers/utilities.js");

module.exports = {
	name: "stickbug",
	category: "image-manipulation",
	description: "GET STICKBUGGED",
	cooldown: 30,
	guildOnly: true,
	ephemeral: false,
	botPermissions: ["ATTACH_FILES"],
	options: [{
		name: "user",
		type: "USER",
		description: "Persons profile pic to stickbug",
		required: false,
	}],
	async execute(client, interaction, args) {

		//Get executors avatar if user is not specified and query api
		const file = args[0] ? interaction.guild.members.cache.get(args[0]).user.displayAvatarURL({ format: "png", size: 2048 }) : interaction.user.displayAvatarURL({ format: "png", size: 2048 });
		await interaction.editReply("Generating Stickbug...");
		const res = await fetch(`https://nekobot.xyz/api/imagegen?type=stickbug&url=${file}`);

		const stickbugd = new Discord.MessageAttachment(res.message, "STICKBUGGED.mp4");
		interaction.editReply({files: [stickbugd]});
	},
}; 