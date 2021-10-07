const olisfetch = require("../../utilities/fetch");
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

		args = args._hoistedOptions;
		args.forEach(arg => args[args.indexOf(arg)] = arg.value);

		const msg = args.join("+");

		const spoilerReply = await olisfetch(`https://nekos.life/api/v2/spoiler?text=${msg}`);

		interaction.reply({content: spoilerReply.owo, allowedMentions: { parse: [] } });
	},
};