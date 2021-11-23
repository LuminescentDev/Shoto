module.exports = {
	name: "cat",
	category: "fun",
	description: "sends random cat emoticon",
	cooldown: 5,
	guildOnly: true,
	async execute(client, interaction, args) {

		//Query api and respond with result
		const kitty = await client.fetch(`https://nekos.life/api/v2/cat`);
		interaction.editReply({content: kitty.cat});
	},
}; 