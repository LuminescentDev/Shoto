const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const errors = require("../../utilities/errors.json");
const cooldowns = new Discord.Collection();

module.exports = async (client, interaction) => {
	if(!interaction.guild.me.permissions.has("SEND_MESSAGES") || !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")) return client.logger.error(`Missing Message permission in ${interaction.guild.id}`);

	//get support server and check if interaction user is a donator
	const supportGuild = client.guilds.cache.get("740705740221841450");
	const member = supportGuild.members.cache.get(interaction.user.id);
	const isDonator = member ? member.roles.cache.some(role => role.id === "773021050438287390") : false;

	interaction.deferReply({
		ephemeral: false
	});

	//check if interaction is a command
	if (interaction.isCommand()){

		const embed = new MessageEmbed()
        .setColor("RED");

		//get command and arguments
		const command = client.commands.get(interaction.commandName.toLowerCase());
		const args = interaction.options._hoistedOptions;
		args.forEach(arg => args[args.indexOf(arg)] = arg.value);
		if (interaction.options._subcommand) args.unshift(interaction.options._subcommand);

		//update command stats
		client.stats.postCommand(interaction.commandName.toLowerCase(), interaction.user.id);

		//check if command requires a certain permission and if user has permission
		if (command.permission && !interaction.member.permissions.has(command.permission)) {
			embed.setDescription(`You do not have sufficient permissions to use this command. \n **REQUIRED PERMISSIONS:** ${command.permission.join(" ")}`);
			return interaction.editReply({embeds: [embed]});
		}

		//get music player
		const player = interaction.client.manager.get(interaction.guild.id);

		//check if command requires player and if it doesn't exist
		if (command.player && !player) {
			embed.setDescription("There is no music player for this guild.");
			return interaction.editReply({embeds: [embed]});
		}

		//check if command requires user to be in voice channel and user is in a voice channel
		if (command.inVoiceChannel && !interaction.member.voice.channel) {
			embed.setDescription("You must be in a voice channel to use this!");
			return interaction.editReply({embeds: [embed]});
		}

		//check if command requires user to be in the same voice channel as the bot and if user is in same voice channel
		if (command.sameVoiceChannel && interaction.member.voice.channel !== interaction.guild.me.voice.channel) {
			embed.setDescription(`You must be in the same channel as ${interaction.client.user} to use this!`);
			return interaction.editReply({embeds: [embed]});
		}

		//check if command is marked as nsfw and if channel command was executed in is marked as nsfw
		if (command.nsfw && !interaction.channel.nsfw){
			interaction.editReply({content: errors[(Math.floor(Math.random() * Math.floor(errors.length)))]});
		}

		//check if command is guild only and if command was executed in guild
		if (command.guildOnly && interaction.channel.type !== "GUILD_TEXT") {
			return interaction.editReply({content: "I can't execute that command inside DMs!"});
		}
		
		//check if command is donor only and if user is a donator
		if(command.Donor && !isDonator){
			return interaction.editReply({content: "You must donate to use that command"});
		}
	
		//check if command is owner only and if config includes the users id
		if(command.owner && !client.config.ownerID.includes(interaction.user.id)){
			return interaction.editReply({content: "You must own the bot use that command"});
		}

		//check if cooldowns collection doesnt have command
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		//get current time and cooldowns for the command
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		//check if user is on cooldown
		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

			//check how long the cooldown is and tell that to user
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return interaction.editReply({content: `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`, ephemeral: true});
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		//try to execute command and catch any errors
	    try {
		    command.execute(client, interaction, args);
	    } catch (error) {
		    client.logger.error(error);
		    interaction.editReply(`There was an error executing that command\nError:${error} Please contact ${client.users.cache.get(client.config.ownerID[0]).tag} if this error continues`);
		    supportGuild.channels.cache.get("844390085448564746").send(`${error} \n Command executed: ${command.name}`);
	    }
	}
	//check if interaction is a button press
	if(interaction.isMessageComponent() && interaction.componentType === "BUTTON"){

		//get button code and try to execute it
		const button = client.buttons.get(interaction.customId);
	    try {
		    button.execute(client, interaction);
	    } catch (error) {
		    client.logger.error(error);
		    interaction.editReply(client.lang("cmd-error", "en").replace("{ERROR}", error).replace("{BOT OWNER}", client.users.cache.get(client.config.ownerID[0]).tag));
		    supportGuild.channels.cache.get("844390085448564746").send(`${error} \n button pressed: ${button.name}`)
	    }
	}
}; 