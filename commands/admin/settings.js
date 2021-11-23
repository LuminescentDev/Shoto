const Discord = require("discord.js");
module.exports = {
	name: "settings",
	cooldown: 5,
	category: "testing",
	description: "Get all bots settings!",
	permissions: ["ADMINISTRATOR"],
	guildOnly: true,
	options: [
		{
			type: "SUB_COMMAND",
			name: "get",
			description: "Show all settings",
		},
		{
			type: "SUB_COMMAND",
			name: "clear",
			description: "clear a setting",
			options: [
				{
					type: "STRING",
					name: "setting",
					description: "The setting to clear",
					choices: [{
						name: "joinchannel",
						value: "joinChannelID",
					},
					{
						name: "joinmessage",
						value: "leaveMessage",
					},
					{
						name: "leavemessage",
						value: "leavemessage",
					},
					{
						name: "reviverole",
						value: "ReviveRoleID",
					},
					{
						name: "staffrole",
						value: "StaffRoleID",
					},
					{
						name: "ventchannel",
						value: "ventChannelID",
					}
					],
					required: true,
				},
			],
		},
		{
			type: "SUB_COMMAND",
			name: "prefix",
			description: "The bot's prefix",
			options: [
				{
					type: "STRING",
					name: "prefix",
					description: "The bot's prefix",
					required: true,
				},
			],
		},
		{
			type: "SUB_COMMAND",
			name: "snipes",
			description: "whether or not the snipe/editsnipe commands work",
			options: [
				{
					type: "BOOLEAN",
					name: "value",
					description: "true to enable snipes false to disable snipes",
					required: true,
				},
			],
		},
		{
			type: "SUB_COMMAND",
			name: "nsfw",
			description: "whether or not the nsfw commands work",
			options: [
				{
					type: "BOOLEAN",
					name: "value",
					description: "true to enable nsfw false to disable nsfw",
					required: true,
				},
			],
		},
		{
			type: "SUB_COMMAND",
			name: "joinmessage",
			description: "The message when someone joins the guild",
			options: [
				{
					type: "STRING",
					name: "value",
					description: "Must be false or the join message. /settings get for all variables",
					required: true,
				},
			],
		},
		{
			type: "SUB_COMMAND",
			name: "leavemessage",
			description: "The message when someone leaves the guild",
			options: [
				{
					type: "STRING",
					name: "value",
					description: "Must be false or the leave message. /settings get for all variables",
					required: true,
				},
			],
		},
		{
			type: "SUB_COMMAND",
			name: "joinchannel",
			description: "The channel where the bot puts join/leave messages",
			options: [
				{
					type: "CHANNEL",
					name: "channel",
					description: "The join channel (Hashtag icon)",
					required: true,
				},
			],
		},
		{
			type: "SUB_COMMAND",
			name: "announcechannel",
			description: "The channel where the bot puts /announce commmand messages",
			options: [
				{
					type: "CHANNEL",
					name: "channel",
					description: "The channel (Hashtag icon)",
					required: true,
				},
			],
		},
		{
			type: "SUB_COMMAND",
			name: "ventchannel",
			description: "The channel where the bot puts vent command messages",
			options: [
				{
					type: "CHANNEL",
					name: "channel",
					description: "The vent channel (Hashtag icon)",
					required: true,
				},
			],
		},
		{
			type: "SUB_COMMAND",
			name: "reviverole",
			description: "The chat revive role",
			options: [
				{
					type: "ROLE",
					name: "role",
					description: "The chat revive role",
					required: true,
				},
			],
		},
		{
			type: "SUB_COMMAND",
			name: "staffrole",
			description: "The staff role",
			options: [
				{
					type: "ROLE",
					name: "role",
					description: "The role thats able to edit settings",
					required: true,
				},
			],
		},
		{
			type: "SUB_COMMAND",
			name: "language",
			description: "language most bots messages are in",
			options: [
				{
					type: "STRING",
					name: "language",
					description: "language for bots messages",
					choices: [{
						name: "english",
						value: "en",
					}
					],
					required: true,
				},
			],
		},
	],
	async execute(client, interaction, args) {

		//Get subcommands
		const subCommand = args[0];

		//Check if subcommand is get
		if(subCommand === "get"){
	
			//Initiate embed
			const settingEmbed = new Discord.MessageEmbed()
			.setTitle("Settings");

			//Select all settings for the guild
			const settings = await client.getSettings(interaction);

			//If settings dont exist generate them
			if(!settings){
				return interaction.editReply({content: client.lang("missing-config", "en"), ephemeral: true});
			} 

			//If settings exist iterate through them all and add to our embed
			client.settings.forEach(async setting => {
				settingEmbed.addField(setting.name, `${setting.description} \nValue: ${settings[setting.sqlvalue]}`);
			});

			//reply with finished embed
			return interaction.editReply({embeds: [settingEmbed]});
			//If subcommand is clear
		}else if(subCommand === "clear"){
			//Clear specified setting and reply to message
			client.con.query(`UPDATE Settings SET ${args[1]} = NULL WHERE guildID = ${interaction.guild.id}`);
			interaction.editReply({ content: `Setting ${args[1]} cleared` });
		}else{

			//Get setting file and execute the code inside
			const setting = client.settings.get(subCommand);
			try {
				setting.execute(client, interaction, args);
			} catch (error) {
				client.logger.error(error);
				interaction.editReply(`There was an error changing that setting\nError:${error} Please contact ${client.users.cache.get(client.config.ownerID[0]).tag} if this error continues`);
			}
		}
	},
}; 