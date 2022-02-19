const {fetch} = require("../../utilities/utilities.js");

module.exports = {
	name: "advice",
	category: "fun",
	description: "gives random life advice",
	cooldown: 3,
	ephemeral: false,
	async execute(client, interaction, args) {

		//Query advice api and reply with response
		const advice = await fetch("https://api.adviceslip.com/advice");
		interaction.editReply({content: advice.slip.advice});
	},
}; 