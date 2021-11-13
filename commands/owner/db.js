function clean(text) {
	return typeof (text) === "string" ? text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)) : text;
}

const Discord = require("discord.js");

module.exports = {
	name: "db",
	category: "owner",
	description: "test command",
	owner: true,
	msgcmd: true,
	async execute(client, message, args) {
		try {
			const query = args.join(" ");
			let results = await client.query(query);

			let rstls = [];


			results.forEach(e => {
				let thing = [];
				rstls = [];
				for(var key in e){
					thing.push(key + " - " + e[key]);
				}
				rstls.push(thing.join(" | "));
			});

			rstls = rstls.join("\n");

			if(rstls.length >= 4000){
				rstls = Buffer.from(rstls, "utf-8");
				const attachment = new Discord.MessageAttachment(rstls, "results.txt");
				return message.reply({files: [attachment]});
			}

			message.reply({content: `\`\`\`${rstls}\`\`\``});
		} catch (err) {
			message.reply({content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``});
		}
	},
}; 