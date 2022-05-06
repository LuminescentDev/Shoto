function clean(text) {
	return typeof (text) === "string" ? text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)) : text;
}

module.exports = {
	name: "ec",
	category: "owner",
	description: "test command",
	owner: true,
	async execute(client, message, args) {
		try {
			const code = args.join(" ");
			let evaled = eval(code);

			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled);

			message.reply(`\`\`\`${clean(evaled)}\`\`\``);
		} catch (err) {
			message.reply(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	},
}; 