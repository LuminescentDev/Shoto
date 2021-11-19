const olisfetch = require("../../utilities/fetch");
module.exports = {
	name: "fact",
	category: "fun",
	description: "sends random fact",
	cooldown: 5,
	guildOnly: true,
	Donor: false,
	async execute(client, interaction, args) {

		//query fact api and reply with response
		const facts = await olisfetch(`https://nekos.life/api/v2/fact`);
		interaction.editReply({content: facts.fact, allowedMentions: { parse: [] } });
	},
}; 