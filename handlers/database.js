const mysql = require("mysql");
module.exports = client => {
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