module.exports = {
	name: "advice",
	category: "fun",
	description: "gives random life advice",
	cooldown: 3,
	async execute(client, interaction, args) {

		//Query advice api and reply with response
		const advice = await client.fetch("https://api.adviceslip.com/advice");
		interaction.editReply({content: advice.slip.advice});
	},
}; 