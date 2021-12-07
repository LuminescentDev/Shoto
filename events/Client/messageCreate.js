const fetch = require("node-fetch");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const e = require("express");
const cooldowns = new Discord.Collection();

module.exports = async (client, message) => {

	//check if author of message is bot
	if (message.author.bot) return;

	//check if channel type is direct messages
	if (message.channel.type === "DM") {
		// eslint-disable-next-line unicorn/explicit-length-check
		//check if message contains any attachments
		if (message.attachments && message.attachments.size > 0 && !message.commandName) {
			const files = [];

			//loop through attachments
			await message.attachments.forEach(async attachment => {
				//fetch file and push it to a buffer (i dont really know how this works tbh)
				const response = await fetch(attachment.url, {
					method: "GET",
				});
				const buffer = await response.buffer();

				//turn that buffer into an attachment with the file type taken from the attachments content type
				const img = new MessageAttachment(buffer, `${attachment.id}.${attachment.contentType.split("/")[1]}`);
				files.push(img);

				//send the actual files to the dm channel
				if (files.length === message.attachments.size) {
					client.channels.cache.get(client.config.dmchannelID)
						.send({ content: `**${message.author}** > ${message.content}`, files: files })
						.catch(error => {client.logger.warn(error)});
				}

			});
		}
		client.channels.cache.get(client.config.dmchannelID).send({ content: `**${message.author}** > ${message.content}` });
	}

	//check if cooldowns contains the command if not add it to cooldowns
	const now = Date.now();
	if (!cooldowns.has(message.author.id)) {
		cooldowns.set(message.author.id, new Discord.Collection());
	}

	//get the current time and get the commands cooldowns
	const userTimestamps = cooldowns.get(message.author.id);
	const UserCooldownAmount = 3 * 1000;

	//check if author is on cooldown
	if (userTimestamps.has(message.author.id)) {
		const UserExpirationTime = userTimestamps.get(message.author.id) + UserCooldownAmount;

		if (now < UserExpirationTime) {
			const timeLeft = (UserExpirationTime - now) / 1000;
		}
	}
	client.levelSystem(message);
	userTimestamps.set(message.author.id, now);
	setTimeout(() => userTimestamps.delete(message.author.id), UserCooldownAmount);

	//get all settings from database
	const settings = await client.getSettings(message);
	let prefix = settings.prefix;
	let language = settings.language;

	//check if message starts with prefix
	if (!message.content.startsWith(prefix)) return;

	//get arguments and check if first argument set command name to first argument
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
		
	//get support server and check if member is donator there;
	const supportGuild = client.guilds.cache.get(client.config.supportServerID);
	const member = supportGuild.members.cache.get(message.author.id);
	const isDonator = member ? member.roles.cache.some(role => role.id === "773021050438287390") : false;

	//get code corresponding to command or its alias
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


	//check if command exists
	if (!command) return;

	const blacklist = await client.query(`SELECT * FROM blacklist WHERE userID = '${message.author.id}'`);

	if(!message.guild.me.permissions.has("SEND_MESSAGES") || !message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")){
		return client.logger.error(`Missing Message permission in ${message.guild.id}`);
	} 

	const embed = new MessageEmbed()
	.setColor("RED");

	//check if command is a message or slash command
	if (!command.msgcmd) {
		embed.setDescription("That is a slash command please try again with /commandname");
		return message.reply({embeds: [embed]});
	}

	//check if user is blacklisted
	if (blacklist.length !== 0 && command.name !== "blacklist") {
		embed.setDescription("You are blacklisted from using this bot. If you think this is a mistake please contact the bot owner.");
		return message.reply({embeds: [embed]});
	}

	if(command.botPermissions && !message.guild.me.permissions.has(command.botPermissions) || !message.guild.me.permissionsIn(message.channel).has(command.botPermissions)){
		return client.logger.error(`Missing Message permission in ${message.guild.id}`);
	} 

	if (command.permission && !message.member.permissions.has(command.permission)) {
		embed.setDescription(`You do not have sufficient permissions to use this command. \n **REQUIRED PERMISSIONS:** ${command.permission.join(" ")}`);
		return message.reply({embeds: [embed]});
	}

	if (command.owner && !client.config.ownerID.includes(message.author.id)){
		embed.setDescription("You must own the bot use that command");
		return message.reply({embeds: [embed]});
	}

	//check if command can only be executed in a guild
	if (command.guildOnly && message.channel.type !== "GUILD_TEXT") {
		return message.reply("I can't execute that command inside DMs!");
	}
    
	//check if command is donor only
	if(command.Donor && !isDonator){
		return message.reply("You must donate to use that command");
	}

	//check if command requires arguments
	if (command.args && args.length === 0) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${client.config.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	//check if cooldowns contains the command if not add it to cooldowns
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	//get the current time and get the commands cooldowns
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	//check if author is on cooldown
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	//attempt to execute command
	try {
		command.execute(client, message, args);
	} catch (error) {
		client.logger.error(`COMMAND EXECUTION ERROR: ${error}`);
		message.reply(client.lang("cmd-error", language).replace("{ERROR", error).replace("{BOT OWNER}", client.users.cache.get(client.config.ownerID[0]).tag));
		supportGuild.channels.cache.get(client.config.errorChannelID).send(`${error} \n Command executed: ${command.name}`);
	}
}; 