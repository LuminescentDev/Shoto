const olisfetch = require("../../utilities/fetch");
module.exports = {
	name: "cat",
	category: "fun",
	description: "sends random cat emoticon",
	cooldown: 5,
	guildOnly: true,
	async execute(client, interaction, args) {
		const kitty = await olisfetch(`https://nekos.life/api/v2/cat`);
		interaction.reply({content: kitty.cat});
	},
};