module.exports = {
	name: "steal",
	category: "utility",
	description: "Steal an emoji!",
	ephemeral: false,
	botPermissions: ["MANAGE_EMOJIS_AND_STICKERS"],
	permission: ["MANAGE_EMOJIS_AND_STICKERS"],
	options: [{
		type: "STRING",
		name: "type",
		description: "the emote type",
		required: true,
		choices: [{
			name: "animated",
			value: "animated",
		},
		{
			name: "static",
			value: "static",
		}
		]},
	{
		name: "emote",
		type: "STRING",
		description: "emote / emote ID",
		required: true,
	},
	{
		name: "name",
		type: "STRING",
		description: "emote name",
		required: true,
	}],
	execute(client, interaction, args) {

		try {
			//check if string is actually a valid emote
			const first = args[1].match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/);
			if (args[0] === "static") {
                interaction.guild.emojis.create(`https://cdn.discordapp.com/emojis/${first[3] ? first[3] : first[0]}.png`, args[2])
                interaction.reply({content: `Emojis created with name: ${args[2]}`});
			}
			else if (args[0] === "animated"){
                interaction.guild.emojis.create(`https://cdn.discordapp.com/emojis/${first[3] ? first[3] : first[0]}.gif`, args[2])
                interaction.reply({content: `Emojis created with name: ${args[2]}`});
            }
		} catch (error) {
			interaction.reply(error);
		}
	},
}; 