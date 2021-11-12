const mysql = require("mysql");
const { readdirSync } = require("fs");
module.exports = async client => {

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
		let settings = client.query(`SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = ${client.config.mysqlDB} AND table_name = 'Settings'`);
		let users = client.query(`SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = ${client.config.mysqlDB} AND table_name = 'Users'`);
		if(settings.length === 0){
			client.query("CREATE TABLE Settings (guildID TEXT, prefix TINYTEXT DEFAULT '^', snipes TINYINT(1) DEFAULT 1, nsfw TINYINT(1) DEFAULT 1, joinMessage TEXT DEFAULT 'Welcome {username} to the server!', joinMessage TEXT DEFAULT 'Sorry to see you go {username}', joinChannelID TEXT DEFAULT null, ventChannelID TEXT DEFAULT null, AchannelID TEXT DEFAULT null, EchannelID TEXT DEFAULT null, ReviveRoleID TEXT DEFAULT null, reviveMessage TEXT DEFAULT '{REVIVE ROLE} AWAKEN CHAT', StaffRoleID TEXT DEFAULT null, language TEXT DEFAULT 'en')");
		}
		if(users.length === 0){
			client.query("CREATE TABLE Users (userID TEXT, donor TEXT DEFAULT null, voteTotal INT(11) DEFAULT 0, lastVote INT(20) DEFAULT null, balance INT(11) DEFAULT 0)");
		}
	}); 
}; 