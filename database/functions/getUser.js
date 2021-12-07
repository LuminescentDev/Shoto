function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = client => {

	client.users.get = async function get(args) {
		let users = await client.query(`SELECT * FROM Users WHERE userID = ${args}`);
		if(users.length === 0) {
			require('../models/user.js')(client, args);
			await sleep(500);
			users = await client.query(`SELECT * FROM Users WHERE userID = ${args}`);
		}
		return users[0];
	}; 


}; 