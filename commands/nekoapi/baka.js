const {fetch} = require("../../utilities/utilities.js");
const Discord = require("discord.js")
module.exports = {
  name: 'baka',
  category: "nekoapi",
  description: 'sends random bakas idk',
  options: [
	{
		name: "user",
		type: "USER",
		description: "Person to call a baka",
		required: false,
	},
	],
  async execute(client, interaction, args) {
    const response = await fetch('https://nekos.life/api/v2/img/baka')
    const title = args[0] ? `${interaction.user.username} calls ${args[0].username} a baka` : "baka"
    const bakaembed = new Discord.MessageEmbed()
    .setTitle(title)
    .setImage(response.url)
    .setColor(`#000000`)
    .setURL(response.url);

    interaction.reply({ embeds: [bakaspemb] });
  },
};