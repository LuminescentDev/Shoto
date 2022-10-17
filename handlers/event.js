const fs = require("fs");
const { readdirSync } = require("fs");

module.exports = client => {

	/**
	 * Client Events
	 */
	readdirSync("./events/Client/").forEach(file => {
		const event = require(`../events/Client/${file}`);
		let eventName = file.split(".")[0];
		client.logger.info(`Loading Events Client ${eventName}`);
		client.on(eventName, event.bind(null, client));
	});

	/**
	 * StatCord Events
	 */
		 readdirSync("./events/StatCord/").forEach(file => {
		const event = require(`../events/StatCord/${file}`);
		let eventName = file.split(".")[0];
		client.logger.info(`Loading Events StatCord ${eventName}`);
		client.stats.on(eventName, event.bind(null, client));
	});
}; 