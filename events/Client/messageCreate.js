const fetch = require("node-fetch");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldowns = new Discord.Collection();

module.exports = async (client, message) => {

	if (message.author.bot) return;
	if (message.channel.type === "DM") {

		// eslint-disable-next-line unicorn/explicit-length-check
		if (message.attachments && message.attachments.size >= 1 && !message.commandName) {
			const files = [];
			await message.attachments.forEach(async attachment => {
				const response = await fetch(attachment.url, {
					method: "GET",
				});
				const buffer = await response.buffer();
				const img = new MessageAttachment(buffer, `${attachment.id}.png`);
				files.push(img);
				if (files.length === message.attachments.size) {
					client.channels.cache.get(client.config.dmchannelID)
						.send({ content: `**${message.author}** > ${message.content}`, files: files })
						.catch(error => {client.logger.warn(error)});
				}
			});
		}
		return client.channels.cache.get(client.config.dmchannelID).send({ content: `**${message.author}** > ${message.content}` });
	}
	if (!message.content.startsWith(client.config.prefix)) return;
	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const member = client.guilds.cache.get(client.config.supportServerID).members.cache.get(message.author.id);
	const isDonator = member ? member.roles.cache.some(role => role.id === "773021050438287390") : false;

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (!command.msgcmd) {
		return message.reply("That is a slash command please try again with /commandname");
	}

	if (command.guildOnly && message.channel.type !== "GUILD_TEXt") {
		return message.reply("I can't execute that command inside DMs!");
	}
    
	if(command.Donor && !isDonator){
		return message.reply("You must donate to use that command");
	}

	if (command.args && args.length === 0) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${client.config.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client, message, args);
	} catch (error) {
		client.logger.error(`COMMAND EXECUTION ERROR: ${error}`);
		message.reply(client.lang("cmd-error", "en").replace("{ERROR", error).replace("{BOT OWNER}", client.users.cache.get(client.config.ownerID[0]).tag));
		client.config.supportServerID.channels.cache.get(client.config.errorChannelID).send(`${error} \n Command executed: ${command.name}`);
	}

};