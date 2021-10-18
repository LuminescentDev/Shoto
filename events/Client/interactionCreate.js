const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const errors = require("../../utilities/errors.json");
const cooldowns = new Discord.Collection();

module.exports = async (client, interaction) => {

	const supportGuild = client.guilds.cache.get("740705740221841450");
	const member = supportGuild.members.cache.get(interaction.user.id);
	const isDonator = member ? member.roles.cache.some(role => role.id === "773021050438287390") : false;

	if (interaction.isCommand()){

		const embed = new MessageEmbed()
        .setColor("RED");

		const command = client.commands.get(interaction.commandName.toLowerCase());
		const args = interaction.options;
		if (command.permission && !interaction.member.permissions.has(command.permission)) {
			embed.setDescription(`You do not have sufficient use this command. \n **REQUIRED PERMISSIONS:** ${command.permissions.join(" ")}`);
			return interaction.reply({embeds: [embed]});
		}

		const player = interaction.client.manager.get(interaction.guild.id);

		if (command.player && !player) {
			embed.setDescription("There is no music player for this guild.");
			return interaction.reply({embeds: [embed]});
		}

		if (command.inVoiceChannel && !interaction.member.voice.channel) {
			embed.setDescription("You must be in a voice channel to use this!");
			return interaction.reply({embeds: [embed]});
		}

		if (command.sameVoiceChannel && interaction.member.voice.channel !== interaction.guild.me.voice.channel) {
			embed.setDescription(`You must be in the same channel as ${interaction.client.user} to use this!`);
			return interaction.reply({embeds: [embed]});
		}

		if (command.nsfw && !interaction.channel.nsfw){
			interaction.reply({content: errors[(Math.floor(Math.random() * Math.floor(errors.length)))]});
		}

		if (command.guildOnly && interaction.channel.type !== "GUILD_TEXT") {
			return interaction.reply({content: "I can't execute that command inside DMs!"});
		}
		
		if(command.Donor && !isDonator){
			return interaction.reply({content: "You must donate to use that command"});
		}
	
		if(command.owner && !client.config.ownerID.includes(interaction.user.id)){
			return interaction.reply({content: "You must own the bot use that command"});
		}

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return interaction.reply({content: `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`, ephemeral: true});
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

	    try {
		    command.execute(client, interaction, args);
	    } catch (error) {
		    console.error(error);
		    interaction.reply(`There was an error executing that command\nError:${error} Please contact ${client.users.cache.get(client.config.ownerID[0]).tag} if this error continues`);
		    supportGuild.channels.cache.get("844390085448564746").send(`${error} \n Command executed: ${command.name}`);
	    }
	}
	if(interaction.isMessageComponent() && interaction.componentType === "BUTTON"){
		const button = client.buttons.get(interaction.customId);
	    try {
		    button.execute(client, interaction);
	    } catch (error) {
		    console.error(error);
		    interaction.reply(client.lang("cmd-error", "en").replace("{ERROR", error).replace("{BOT OWNER}", client.users.cache.get(client.config.ownerID[0]).tag));
		    // supportGuild.channels.cache.get("844390085448564746").send(`${error} \n Command executed: ${command.name}`)
	    }
	}
};