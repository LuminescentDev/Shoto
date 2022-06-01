const { Embed } = require("guilded.js");

module.exports = {
	name: "test",
	category: "test",
	description: "test!",
	async execute(client, message, args) {
		try {
			const uwu = new Embed()
            .setTitle("uwu")
            message.reply(uwu)
		}catch(error){
			client.error(error)
		}
	},
}; 