const {fetch} = require("../../handlers/utilities.js");

module.exports = {
	name: "cat",
	category: "fun",
	description: "sends random cat emoticon",
	guildOnly: true,
	ephemeral: false,
	async execute(client, interaction, args) {

		//Query api and respond with result
		const kitty = await fetch(`https://nekos.life/api/v2/cat`);
		interaction.editReply({content: kitty.cat});
	},
}; 