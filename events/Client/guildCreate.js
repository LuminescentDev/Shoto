const fetch = require("node-fetch");
const Discord = require("discord.js");
const moment = require("moment");
module.exports = async (client, guild) => {

	var serverCount = {
		server_count: client.guilds.cache.size
	};
	
	fetch(`https://top.gg/api/bots/${client.user.id}/stats`, {
		method: "POST",
		headers: {
			  Accept: "application/json",
			  Authorization: `Bearer ${client.config.dbotAuth}`,
			  "Content-Type": "application/json"
		},
		body: JSON.stringify(serverCount)
	});

	const owner = await guild.fetchOwner();
	const Embed = new Discord.MessageEmbed()
				.setColor(Math.floor(Math.random() * 16777215))
				.setTitle(`${client.user.username} has been added to ${guild.name}`)
				.setThumbnail(guild.iconURL())
				.setFooter(`Owner: ${owner.user.username}`, owner.user.avatarURL())
				.setDescription(`This guild has ${guild.memberCount} members`)
				.addField("Creation Date", `${moment(guild.createdAt)}`)
				.addField("Server Count", `${client.guilds.cache.size}`);

	client.channels.cache.get(client.config.AddRemoveLogs).send({embeds: [Embed]})
		.then(() => client.user.setActivity(`Over ${client.guilds.cache.size} servers!`, { type: "WATCHING" }))
		.catch(err => client.users.cache.get(client.config.ownerID[0]).send(`${err}`));
    
	try {
		client.con.query("INSERT INTO Settings (guildID) VALUES (?)", [guild.id]);
	} catch (error) {
		client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
	}
};