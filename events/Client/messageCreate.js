const fetch = require("node-fetch");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldowns = new Discord.Collection();

module.exports = async (client, message) => {

	if (message.author.bot) return;
	if (message.channel.type === "dm") {

		if (message.attachments.size == 1) {
			const picture = message.attachments.first();
			const attachmenturl = picture.attachment;
			const response = await fetch(attachmenturl, {
				method: "GET",
			});
			const buffer = await response.buffer();
			return client.channels.cache.get(client.config.dmattachmentID).send({ content: `**<@!${message.author.id}>** > ${message.content}`, attachments: [new MessageAttachment(buffer, picture.name)] });
		}
		return client.channels.cache.get(client.config.dmchannelID).send(`${message.author.id}, ${message.author.username}: ${message.content}`);
	}
	if (message.content === "not funny") {
		const laugh = new MessageEmbed().setImage("https://cdn.discordapp.com/attachments/674290848980008980/732748324045848576/tenor.gif");
		message.channel.send(laugh);
	}
	if (message.content.toLowerCase().includes("simp")) {
		try {
			if(message.guild.id != "674290848548257803"){
				message.react("891233107347374111");
			}
		}catch{
			client.logger.error("There was an error calling someone a simp");
		}
	}
	if (!message.content.startsWith(client.config.prefix)) return;
	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== "text") {
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
		message.reply(`There was an error executing that command\nError:${error} Please contact Oliii#3182 if this error continues`);
		supportGuild.channels.cache.get("844390085448564746").send(`${error} \n Command executed: ${command.name}`);
	}

};