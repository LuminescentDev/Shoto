const Discord = require("discord.js");
module.exports = {
	name: "help",
	category: "utility",
	description: "List all of my commands or info about a specific command.",
	aliases: ["commands"],
	botPermissions: [],
	usage: "[command name]",
	cooldown: 5,
	msgcmd: true,
	async execute(client, message, args) {
		const categories = new Discord.Collection();
		const commands = client.commands;

		const settings = await client.getSettings(message);

		if (args.length === 0) {
			commands.forEach(command => {
				const category = categories.get(command.category);
				if(category){
					if(command.category === "NSFW") return;
					category.set(command.name, command);
				}else{
					if(command.category === "NSFW") return;
					categories.set(command.category, new Discord.Collection().set(command.name, command));
				}
			});

			const lines = categories.map((category, name) => `**${name}**: ${category.map(command => command.name).join(", ")}`);

			const cmds = new Discord.MessageEmbed()
			.setTitle("All of my commands")
			.setDescription(`**NSFW**\n For a list of my nsfw commands please run ***${settings.prefix}nsfwcmds***\n${lines.join("\n")}\n**Support**\n[**Click Here To Join The Support Server**](https://discord.com/invite/CNrvu6A)`)
			.setFooter({text: `For help with a specific command run ${settings.prefix}help [command]`});

			return message.reply({embeds: [cmds]});
		}
		const info = new Discord.MessageEmbed();
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply("that's not a valid command!");
		}

		info.setTitle(`**Name:** ${command.name}`);

		if (command.aliases) info.addField("**Aliases:**", `${command.aliases.join(", ")}`);
		if (command.description) info.addField("**Description:**", `${command.description}`);
		if (command.usage) info.addField("**Usage:**", `${client.config.prefix}${command.name} ${command.usage}`);

		info.addField("**Cooldown:**", `${command.cooldown || 3} second(s)`);

		message.reply({embeds: [info]});
	},
}; 