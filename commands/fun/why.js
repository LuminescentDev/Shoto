const olisfetch = require("../../utilities/fetch");

module.exports = {
	name: "why",
	category: "fun",
	description: "sends random why question",
	cooldown: 5,
	guildOnly: true,
	async execute(client, interaction, args) {
		const whyy = await olisfetch(`https://nekos.life/api/v2/why`);
		interaction.reply({content: whyy.why, allowedMentions: { parse: [] } });
	},
};