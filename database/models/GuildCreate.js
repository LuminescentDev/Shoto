module.exports = (client, guild) => {
	try {
		client.con.query("INSERT INTO Settings (guildID) VALUES (?)", [guild.id]);
	} catch (error) {
		client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
		guild.channels.cache.get(client.config.errorChannelID).send(`Error creating guild settings: ${error}`);
	}
};