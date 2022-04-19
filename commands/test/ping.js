
module.exports = {
	name: "ping",
	category: "test",
	description: "Ping!",
	async execute(client, message, args) {
		message.reply("pong");
	},
}; 