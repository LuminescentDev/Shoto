const mysql = require("mysql");
const { readdirSync } = require("fs");
module.exports = client => {

	/**
	 * Database Functions
	 */
	 readdirSync("./database/functions/").forEach(file => {
		require(`../database/functions/${file}`)(client);
		let eventName = file.split(".")[0];
		client.logger.info(`Loading Database function ${eventName}`);
	});

	//create a connection to the database
	client.con = mysql.createConnection({
		host: client.config.mysqlhost,
		user: client.config.mysqluser,
		password: client.config.mysqlpass,
		database: client.config.mysqlDB
	});
    
	client.con.connect(err => {
		if (err) throw err;
		client.logger.info("Connected to databse succesfully");
	}); 
}; 