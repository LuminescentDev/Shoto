function clean(text) {
	return typeof (text) === "string" ? text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)) : text;
}

module.exports = {
	name: "ec",
	category: "misc",
	description: "test command",
	owner: true,
	msgcmd: true,
	async execute(client, message, args) {
		try {
			const code = args.join(" ");
			let evaled = eval(code);

			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled);

			message.reply({content: `\`\`\`${clean(evaled)}\`\`\``});
		} catch (err) {
			message.reply({content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``});
		}
	},
};