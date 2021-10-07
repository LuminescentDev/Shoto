const Discord = require("discord.js");
const olisfetch = require("../../utilities/fetch");
module.exports = {
	name: "phcomment",
	category: "NSFW",
	description: "hehefunnie fake ph",
	cooldown: 15,
	guildOnly: true,
	nsfw: true,
	options: [{
		name: "comment",
		type: "STRING",
		description: "text to be in the comment",
		required: true,
	},
	{
		name: "user",
		type: "USER",
		description: "Person who commented",
		required: false,
	},
	],
	async execute(client, interaction, args) {
		args = args._hoistedOptions;
		args.forEach(arg => args[args.indexOf(arg)] = arg.value);
		console.log(interaction);

		const person = args[1] ? interaction.guild.members.cache.get(args[1]) : interaction;
		let text = args[0];
		text = text.replace(/<@.?\d*?>/g, "");

		// make sure the text isn't longer than 70 characters
		if (text.length >= 71) return interaction.reply({content: "IMAGE/TEXT_OVERLOAD"}).then(m => m.delete({ timeout: 5000 }));
        
		const mgk = await interaction.reply("Generating PH Comment...");
		const res = await olisfetch(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${person.user.displayAvatarURL({ format: "png", size: 512 })}&text=${text}&username=${person.user.username}`);
		const phcomment = new Discord.MessageAttachment(res.message, "fakeph.png");
		interaction.editReply({content: null, files: [phcomment]});
	},
};  