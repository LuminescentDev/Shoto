const fetch = require("node-fetch");
const Discord = require("discord.js");
module.exports = async (client, guild) => {
	var servercount = {
		server_count: client.guilds.cache.size
	};
	
	fetch(`https://top.gg/api/bots/${client.user.id}/stats`, {
		method: "POST",
		headers: {
			  Accept: "application/json",
			  Authorization: `Bearer ${client.config.dbotAuth}`,
			  "Content-Type": "application/json"
		},
		body: JSON.stringify(servercount)
	});

	const timestamp = Math.round(guild.createdTimestamp / 1000);
	const owner = await guild.fetchOwner();
	const Embed = new Discord.MessageEmbed()
				.setColor(Math.floor(Math.random() * 16777215))
				.setTitle(`${client.user.username} has been removed from ${guild.name}`)
				.setThumbnail(guild.iconURL())
				.setFooter(`Owner: ${owner.user.username}`, owner.user.avatarURL())
				.addField("Creation Date", `<t:${timestamp}>\n<t:${timestamp}:R>`)
				.addField("Server Count", `${client.guilds.cache.size}`);

	client.channels.cache.get(client.config.AddRemoveLogs).send({embeds: [Embed]})
		.then(() => client.user.setActivity(`Over ${client.guilds.cache.size} servers!`, { type: "WATCHING" }))
		.catch(err => client.users.cache.get(client.config.ownerID[0]).send(`${err}`));

	require("../../database/models/SettingsDelete")(client, guild.id);
};