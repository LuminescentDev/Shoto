function clean(text) {
	return typeof (text) === "string" ? text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)) : text;
}

const Discord = require("discord.js");

module.exports = {
	name: "db",
	category: "owner",
	description: "test command",
	botPermissions: [],
	owner: true,
	msgcmd: true,
	async execute(client, message, args) {
		try {
			const query = args.join(" ");
			let results = await client.query(query);

			let rstls = [];

			if(results.length > 0) {
			results.forEach(e => {
				for(var key in e){
					rstls.push(key + " - " + e[key]);
				}
			});

			rstls = rstls.join("\n");

			if(rstls.length >= 4000){
				rstls = Buffer.from(rstls, "utf-8");
				const attachment = new Discord.MessageAttachment(rstls, "results.txt");
				return message.reply({files: [attachment]});
			}

			message.reply({content: `\`\`\`${rstls}\`\`\``});
		}else{
			message.reply("No results found or no results to display.");
		}
		} catch (err) {
			message.reply({content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``});
		}
	},
}; 