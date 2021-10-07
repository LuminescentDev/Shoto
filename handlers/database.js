const mysql = require("mysql");
const config = require("../config/config.json");
module.exports = client => {
	client.con = mysql.createConnection({
		host: config.mysqlhost,
		user: config.mysqluser,
		password: config.mysqlpass,
		database: config.mysqlDB
	});
    
	client.con.connect(err => {
		if (err) throw err;
		client.logger.info("Connected to databse succesfully");
	}); 
};