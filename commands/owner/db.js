module.exports = {
	name: "db",
	category: "owner",
	description: "test command",
	owner: true,
	msgcmd: true,
	async execute(client, message, args) {
		try {
			const query = args.join(" ");
			const results = await client.query(query);

			message.reply({content: `\`\`\`${results.join("\n")}\`\`\``});
		} catch (err) {
			message.reply({content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``});
		}
	},
}; 