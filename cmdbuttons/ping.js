module.exports = {
	name: "ping",
	execute(client, interaction) {
		//pong.
		interaction.update("Pong", { components: [] });
	},
}; 