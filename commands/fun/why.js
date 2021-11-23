module.exports = {
	name: "why",
	category: "fun",
	description: "sends random why question",
	cooldown: 5,
	guildOnly: true,
	async execute(client, interaction, args) {

		//Query api and respond with result
		const whyy = await client.fetch(`https://nekos.life/api/v2/why`);
		interaction.reply({content: whyy.why, allowedMentions: { parse: [] } });
	},
}; 