const olisfetch = require("../../utilities/fetch");
module.exports = {
	name: "advice",
	category: "fun",
	description: "gives random life advice",
	cooldown: 3,
	async execute(client, interaction, args) {

		//Query advice api and reply with response
		const advice = await olisfetch("https://api.adviceslip.com/advice");
		interaction.reply({content: advice.slip.advice});
	},
}; 