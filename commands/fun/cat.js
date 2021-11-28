module.exports = {
	name: "cat",
	category: "fun",
	description: "sends random cat emoticon",
	guildOnly: true,
	ephemeral: false,
	async execute(client, interaction, args) {

		//Query api and respond with result
		const kitty = await client.fetch(`https://nekos.life/api/v2/cat`);
		interaction.editReply({content: kitty.cat});
	},
}; 