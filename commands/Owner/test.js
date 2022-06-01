const { Embed } = require("guilded.js");

module.exports = {
	name: "ping",
	category: "test",
	description: "Ping!",
	async execute(client, message, args) {
		try {
			const uwu = new Embed()
            .setTitle("uwu")
		}catch(error){
			client.error(error)
		}
	},
}; 