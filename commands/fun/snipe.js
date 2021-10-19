const Discord = require("discord.js");

module.exports = {
	name: "snipe",
	description: "Get a snipe of your choice in the channel!",
	category: "fun",
	options: [{
		name: "snipe-number",
		type: "INTEGER",
		description: "number 1 - 10",
		required: false,
	}],
	async execute(client, interaction, args) {

		//Get snipes from channel if argument specified use number if not default to most recent
		const snipes = client.snipes.get(interaction.channel.id) || [];
		const msg = snipes[args[0] ? args[0]-1 : 0];
		if(!msg) return interaction.reply("That is not a valid snipe...");
		
		const Embed = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag)
    .setDescription(msg.content.replace(/\n/g, " "))
    .setFooter(`Date: ${msg.date} | ${args[0]||1}/${snipes.length}`);
		if(msg.image) Embed.setImage(msg.image);
		interaction.reply({embeds: [Embed]});
	},
};