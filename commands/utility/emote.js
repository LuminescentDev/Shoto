module.exports = {
	name: "emote",
	cooldown: 5,
	category: "utility",
	description: "sends emote as link/file!",
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
	}],
	execute(client, interaction, args) {


		try {
			//check if string is actually a valid emote
			const first = args[1].match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/);
			if (args[0] === "static") {
				interaction.editReply(`https://cdn.discordapp.com/emojis/${first[3] ? first[3] : first[0]}.png`);
			}
			else if (args[0] === "animated")
				interaction.editReply(`https://cdn.discordapp.com/emojis/${first ? first[3] : args[1]}.gif`);
		} catch (error) {
			interaction.editReply(error);
		}
	},
}; 