const fetch = require("node-fetch");
const Discord = require("discord.js");
module.exports = async (client, guild) => {

	var serverCount = {
		server_count: client.guilds.cache.size
	}; 

	//Send a post request to the top.gg api top update stats
	fetch(`https://top.gg/api/bots/${client.user.id}/stats`, {
		method: "POST",
		headers: {
			  Accept: "application/json",
			  Authorization: `Bearer ${client.config.dbotAuth}`,
			  "Content-Type": "application/json"
		},
		body: JSON.stringify(serverCount)
	});

	//Generate the embed sent to the guild add/remove log channel
	const timestamp = Math.round(guild.createdTimestamp / 1000);
	const owner = await guild.fetchOwner();
	const Embed = new Discord.MessageEmbed()
				.setColor(Math.floor(Math.random() * 16777215))
				.setTitle(`${client.user.username} has been added to ${guild.name}`)
				.setThumbnail(guild.iconURL())
				.setFooter(`Owner: ${owner.user.username}`, owner.user.avatarURL())
				.setDescription(`This guild has ${guild.memberCount} members`)
				.addField("Creation Date", `<t:${timestamp}>\n<t:${timestamp}:R>`)
				.addField("Server Count", `${client.guilds.cache.size}`);

	client.channels.cache.get(client.config.AddRemoveLogs).send({embeds: [Embed]})
		.then(() => client.user.setActivity(`Over ${client.guilds.cache.size} servers!`, { type: "WATCHING" }))
		.catch(err => client.users.cache.get(client.config.ownerID[0]).send(`${err}`));
    
	//Add the new guild to the database
	require("../database/models/SettingsCreate")(client, guild.id);
}; 