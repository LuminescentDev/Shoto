module.exports = {
	name: "spoiler",
	category: "fun",
	description: "makes any text into a spoiler",
	cooldown: 5,
	options: [{
		name: "message",
		type: "STRING",
		description: "message to turn into spoilers",
		required: true,
	}],
	async execute(client, interaction, args) {


		//Turn arguments into url usable value
		const msg = args.join("+");

		//Query api and respond with result
		const spoilerReply = await client.fetch(`https://nekos.life/api/v2/spoiler?text=${msg}`);

		interaction.reply({content: spoilerReply.owo, allowedMentions: { parse: [] } });
	},
}; 