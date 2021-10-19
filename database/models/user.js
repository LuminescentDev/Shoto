module.exports = (client, user) => {

	//insert the user into the users table in the database
	try {
		client.con.query("INSERT INTO Users (userID) VALUES (?)", [user]);
	} catch (error) {
		client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
		client.channels.cache.get(client.config.errorChannelID).send(`Error deleting guild settings: ${error}`);
	}
};