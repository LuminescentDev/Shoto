const {fetch} = require("../../handlers/utilities.js");

module.exports = {
	name: "why",
	category: "fun",
	description: "sends random why question",
	ephemeral: false,
	guildOnly: true,
	async execute(client, interaction, args) {

		//Query api and respond with result
		const whyy = await fetch(`https://nekos.life/api/v2/why`);
		interaction.editReply({content: whyy.why, allowedMentions: { parse: [] } });
	},
}; 