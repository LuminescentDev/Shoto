module.exports = {
	name: "ping",
	category: "test",
	description: "Ping!",
	async execute(client, message, args) {
		try {
			message.reply("pong");
		}catch(error){
			client.error(error)
		}
	},
}; 