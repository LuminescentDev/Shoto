const Discord = require("discord.js");
const {fetch} = require("../../utilities/utilities.js");

module.exports = {
	name: "baka",
	category: "nekoapi",
	description: "sends random bakas",
	async execute(client, message, args) {
		const response = await fetch("https://nekos.life/api/v2/img/baka");
		if (message.mentions.users.size > 0) {
			let pingp = message.mentions.users.first();
			const bakaspemb = new Discord.MessageEmbed()
            .setTitle(`${message.author.username} bakas ${pingp.username}`)
            .setImage(response.url)
            .setColor(`#000000`)
            .setURL(response.url);
			message.channel.send(bakaspemb);
		} else {
			const bakasemb = new Discord.MessageEmbed()
            .setTitle("baka")
            .setImage(response.url)
            .setColor(`#000000`)
            .setURL(response.url);
			message.channel.send(bakasemb);
		}
	},
};