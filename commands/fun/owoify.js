const {fetch} = require("../../utilities/utilities.js");

module.exports = {
	name: "owoify",
	category: "fun",
	description: "OWO",
	ephemeral: false,
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
		const owomsg = await fetch(`https://nekos.life/api/v2/owoify?text=${msg}`);
		
		interaction.editReply({content: owomsg.owo, allowedMentions: { parse: [] } });
	},
}; 