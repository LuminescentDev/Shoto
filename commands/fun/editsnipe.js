const Discord = require("discord.js");

module.exports = {
	name: "editsnipe",
	description: "Get a edit snipe of your choice in the channel!",
	usage: "[snipe number]",
	category: "fun",
	options: [{
		name: "snipe-number",
		type: "STRING",
		description: "number 1 - 10",
		required: false,
	}],
	async execute(client, interaction, args) {

		const settings = await client.getSettings(interaction);

		if(settings.snipes === 0) return interaction.editReply({content: client.lang("command-disabled", settings.language), ephemeral: true});

		//Get editSnipes from channel if argument specified use number if not default to most recent
		const snipes = client.editSnipes.get(interaction.channel.id) || [];
		const msg = snipes[args[0] ? args[0]-1 : 0];
		if(!msg) return interaction.editReply("That is not a valid snipe...");


		const Embed = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag)
    .setDescription(msg.content)
    .setFooter(`Date: ${msg.date} | ${args[0]||1}/${snipes.length}`);
		interaction.editReply({embeds: [Embed]});
	},
}; 