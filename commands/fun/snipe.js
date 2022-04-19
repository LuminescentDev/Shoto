

module.exports = {
	name: "snipe",
	description: "Get a snipe of your choice in the channel!",
	category: "fun",
	ephemeral: false,
	options: [{
		name: "snipe-number",
		type: "INTEGER",
		description: "number 1 - 10",
		required: false,
	}],
	async execute(client, interaction, args) {

		const settings = await client.getSettings(interaction);

		if(settings.snipes === 0) return interaction.editReply({content: client.lang("command-disabled", settings.language)});

		//Get snipes from channel if argument specified use number if not default to most recent
		const snipes = client.snipes.get(interaction.channel.id) || [];
		const msg = snipes[args[0] ? args[0]-1 : 0];
		if(!msg) return interaction.editReply("That is not a valid snipe...");
		
		const Embed = new Discord.MessageEmbed()
    .setAuthor({name: msg.author.tag})
    .setDescription(msg.content.replace(/\n/g, " "))
    .setFooter({text: `Date: ${msg.date} | ${args[0]||1}/${snipes.length}`});
		if(msg.image) Embed.setImage(msg.image);
		interaction.editReply({embeds: [Embed]});
	},
}; 