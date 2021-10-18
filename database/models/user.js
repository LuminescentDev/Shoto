module.exports = (client, user) => {
	try {
		client.con.query("INSERT INTO Users (userID) VALUES (?)", [user]);
	} catch (error) {
		client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
		client.channels.cache.get(client.config.errorChannelID).send(`Error deleting guild settings: ${error}`);
	}
};