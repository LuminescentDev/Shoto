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

		//Get user and text
		const person = args[1] ? interaction.guild.members.cache.get(args[1]) : interaction;
		let text = args[0];
		text = text.replace(/<@.?\d*?>/g, "");

		//Select language setting
		client.con.query(`SELECT language FROM Settings WHERE guildID = ${interaction.guild.id}`, async (err, rows) => {
			if (err) client.logger.error(err);

			//If settings dont exist create them
			if(!rows[0]){
				interaction.reply({content: client.lang("missing-config", "en"), ephemeral: true});
				return require("../../database/models/SettingsCreate")(client, interaction.guild.id);
			} 

			//Get value of language settings and select corresponding responses
			let language = rows[0].language; 

			// make sure the text isn't longer than 70 characters
			if (text.length >= 71) return interaction.reply({content: client.lang("TEXT_OVERLOAD", language).replace("{LENGTH}, 71")}).then(m => m.delete({ timeout: 5000 }));
        
			await interaction.reply("Generating PH Comment...");
			const res = await olisfetch(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${person.user.displayAvatarURL({ format: "png", size: 512 })}&text=${text}&username=${person.user.username}`);
			const phcomment = new Discord.MessageAttachment(res.message, "fakeph.png");
			interaction.editReply({content: null, files: [phcomment]});
		});

	},
};   