const moment = require("moment");
require("moment-duration-format");
const start = Date.now();
function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}

module.exports = async client => {

	// try {
	// 	require('../../capeserver/api')(client);
	// } catch (err) {
	// 	client.logger.error(`CAPESERVER ERROR: ${err}`)
	// }

	setInterval(async () => {
		const activities = [
			["PLAYING", "{UPTIME}"],
			["PLAYING", "with you >;)"],
			["COMPETING", `In ${client.guilds.cache.size} Servers`],
			["PLAYING", "{GUILD}"],
			["WATCHING", `Over ${client.guilds.cache.size} servers`],
			["WATCHING", `You through the cracks in your walls ;-;`],
		];
		const activitynumber = Math.round(Math.random() * (activities.length - 1));
		const activity = activities[activitynumber];
		if (activity[1] === "{GUILD}") activity[1] = `in ${client.guilds.cache.get([...client.guilds.cache.keys()][Math.floor(Math.random() * client.guilds.cache.size)]).name}`;
		if (activity[1] === "{UPTIME}") activity[1] = `for ${moment.duration(client.uptime).format("D [days], H [hrs], m [mins], s [secs]")}`;
		client.user.setPresence({ activities: [{ name: activity[1], type: activity[0] }] });
	}, 5000);

	client.guilds.cache.get("740705740221841450").members.fetch();
	client.logger.info(`I am running`);
	client.logger.info(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers`);
	client.logger.info(`Registered ${client.commands.size} regular commands!`);

	client.logger.info(`Registered ${client.buttons.size} buttons!`);
	if (!client.application?.owner) await client.application?.fetch();
	const commands = await client.application?.commands.fetch();
	client.commands.forEach(async command => {
		await client.guilds.cache.get("740705740221841450").commands.create({
			name: command.name,
			description: command.description,
			options: command.options,
		});
		if (commands.find(c => c.name === command.name) && commands.find(c => c.description === command.description)) return;
		client.logger.info(`Detected ${command.name} has some changes! Updating command...`);
		await client.application?.commands.create({
			name: command.name,
			description: command.description,
			options: command.options,
		});
		await sleep(2000);
	});
	client.logger.info(`Registered ${commands.size} commands!`);
	client.manager.init(client.user.id);
	await sleep(2000);
	const timer = (Date.now() - start) / 1000;
	client.logger.info(`Done (${timer}s)! I am running!`);
};