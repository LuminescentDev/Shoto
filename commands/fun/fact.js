module.exports = {
	name: "fact",
	category: "fun",
	description: "sends random fact",
	guildOnly: true,
	ephemeral: false,
	async execute(client, interaction, args) {

		//query fact api and reply with response
		const facts = await client.fetch(`https://nekos.life/api/v2/fact`);
		interaction.editReply({content: facts.fact, allowedMentions: { parse: [] } });
	},
}; 