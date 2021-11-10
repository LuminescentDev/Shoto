module.exports = (client, args) => {

	client.users.get = async function get(args) {
		const users = await client.query(`SELECT * FROM Users WHERE userID = ${args}`);
		return users[0];
	};


};