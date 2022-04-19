const start = Date.now();

module.exports = async client => {

	client.logger.info(`I am running`);
	client.logger.info(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers`);
	client.logger.info(`Registered ${client.commands.size} commands!`);
	const timer = (Date.now() - start) / 1000;
	client.logger.info(`Done (${timer}s)! I am running!`);

}; 