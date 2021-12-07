module.exports = client => {

	client.users.get = async function get(args) {
		const users = await client.query(`SELECT * FROM Users WHERE userID = ${args}`);
		if(users.length === 0) {
			require('../models/user.js')(client, args);
			users[0] = await client.query(`SELECT * FROM Users WHERE userID = ${args}`);
		}
		return users[0];
	}; 


}; 