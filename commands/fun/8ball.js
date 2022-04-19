
module.exports = {
	name: "8ball",
	category: "fun",
	description: "ask it questions",
	ephemeral: false,
	usage: "<question>",
	options: [{
		name: "question",
		type: "STRING",
		description: "The question you want to ask",
		required: true,
	}],
	async execute(client, interaction, args) {


		//Select setting
		const settings = await client.getSettings(interaction);

		//Get value of language settings and select corresponding responses
		let language = settings.language; 
		let eightball = client.lang("8ball-responses", language);

		//Select random response
		let index = (Math.floor(Math.random() * Math.floor(eightball.length)));
			
		//Create embed and reply
		const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("THE MAGIC 8BALL")
        .setDescription(client.lang("8ball-message", language).replace("{USERNAME}", interaction.user.username).replace("{QUESTION}", args[0]).replace("{RESPONSE}", eightball[index]));
		interaction.editReply({ embeds: [embed]});

	},
}; 