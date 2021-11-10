const olisfetch = require("../../utilities/fetch");
module.exports = {
	name: "owoify",
	category: "fun",
	description: "OWO",
	usage: "<Sentence to owoify>",
	options: [{
		name: "message",
		type: "STRING",
		description: "message to owoify",
		required: true,
	}],
	async execute(client, interaction, args) {

		//Turn arguments into url usable value
		const msg = args.join("+");

		//Query api and respond with result
		const owomsg = await olisfetch(`https://nekos.life/api/v2/owoify?text=${msg}`);
		
		interaction.reply({content: owomsg.owo, allowedMentions: { parse: [] } });
	},
}; 