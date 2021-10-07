const olisfetch = require("../../utilities/fetch");
const Discord = require("discord.js");
module.exports = {
	name: "stickbug",
	category: "image",
	description: "GET STICKBUGGED",
	cooldown: 30,
	guildOnly: true,
	Donor: false,
	options: [{
		name: "user",
		type: "USER",
		description: "Persons profile pic to stickbug",
		required: false,
	}],
	async execute(client, interaction, args) {
		args = args._hoistedOptions;
		args.forEach(arg => args[args.indexOf(arg)] = arg.value);

		const file = args[0] ? interaction.guild.members.cache.get(args[0]).user.displayAvatarURL({ format: "png", size: 2048 }) : interaction.user.displayAvatarURL({ format: "png", size: 2048 });
		await interaction.reply("Generating Stickbug...");
		const res = await olisfetch(`https://nekobot.xyz/api/imagegen?type=stickbug&url=${file}`);

		const stickbugd = new Discord.MessageAttachment(res.message, "STICKBUGGED.mp4");
		interaction.editReply({files: [stickbugd]});
	},
};