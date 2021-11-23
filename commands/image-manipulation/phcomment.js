const Discord = require("discord.js");
module.exports = {
	name: "phcomment",
	category: "NSFW",
	description: "hehefunnie fake ph",
	botPermissions: ["ATTACH_FILES"],
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

		//Get user and text
		const person = args[1] ? interaction.guild.members.cache.get(args[1]) : interaction;
		let text = args[0];
		text = text.replace(/<@.?\d*?>/g, "");

		//Select language setting
		const settings = await client.getSettings(interaction);

		//Get value of language settings and select corresponding responses
		let language = settings.language; 

		// make sure the text isn't longer than 70 characters
		if (text.length >= 71) return interaction.reply({content: client.lang("TEXT_OVERLOAD", language).replace("{LENGTH}, 71")}).then(m => m.delete({ timeout: 5000 }));
	
		await interaction.reply("Generating PH Comment...");
		const res = await client.fetch(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${person.user.displayAvatarURL({ format: "png", size: 512 })}&text=${text}&username=${person.user.username}`);
		const phcomment = new Discord.MessageAttachment(res.message, "fakeph.png");
		interaction.reply({content: null, files: [phcomment]});

	},
};   