
module.exports = {
	name: "revive",
	category: "admin",
	description: "sends the specified chat revive message",
	guildOnly: true,
	ephemeral: true,
	permissions: ["MANAGE_MESSAGES"],
	async execute(client, interaction, args) {

		//Select all settings values
		const settings = await client.getSettings(interaction);

		//Get revive message, revive role, and language
		let reviveMessage = settings.reviveMessage;
		let reviveRole = settings.ReviveRoleID;
		let language = settings.language;

		//If settings dont exist reply with error and generate the settings
		if (!reviveMessage) {
			return interaction.editReply({content: client.lang("no-config", settings.language)});
		}


		//Check if values are null or dont exist if so reply with error
		if (reviveRole === null || !interaction.guild.roles.cache.get(reviveRole)) return interaction.editReply({content: client.lang("no-config", language)});
		if (reviveMessage === null || !reviveMessage) return interaction.editReply({content: client.lang("no-config", language)});

		//If values exist send it to the channel the command was executed in
		interaction.channel.send({content: reviveMessage.replace("{REVIVE ROLE}", `<@&${reviveRole}>`)});
		interaction.editReply({content: "Message sent!"})

	},
}; 