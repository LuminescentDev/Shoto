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
	],
	async execute(client, interaction, args) {
		const subCommand = args._subcommand;
		args = args._hoistedOptions;
		args.forEach(arg => args[args.indexOf(arg)] = arg.value);
		if(subCommand === "get"){
	
			const settingEmbed = new Discord.MessageEmbed()
			.setTitle("Settings");
			// console.log(client.settings);

			await client.settings.forEach(async setting => {
				let value = null;
				client.con.query(`SELECT ${setting.sqlvalue} FROM Settings WHERE guildID = ${interaction.guild.id}`, async (err, rows) => {
					if (err) client.logger.error(err);
					//console.log(rows);
					if(rows[0][setting.sqlvalue] === null) value = "UNSET";
					value = rows[0][setting.sqlvalue];
					console.log(value);
				});
				settingEmbed.addField(setting.name, `${setting.description} \nValue: ${value}`);
			});

			interaction.reply({embeds: [settingEmbed]});
		}else{
			const setting = client.settings.get(subCommand);
			console.log(setting);
			try {
				setting.execute(client, interaction, args);
				interaction.reply(`Setting: ${setting.name} Updated to ${args[0]}`);
			} catch (error) {
				client.logger.error(error);
				interaction.reply(`There was an error changing that setting\nError:${error} Please contact ${client.users.cache.get(client.config.ownerID[0]).tag} if this error continues`);
			}
		}
	},
};