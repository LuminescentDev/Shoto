module.exports = {
	name: "ping",
	execute(client, interaction) {
		interaction.update("Pong", { components: [] });
	},
};