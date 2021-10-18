const Discord = require("discord.js");
module.exports = {
	name: "8ball",
	category: "fun",
	description: "ask it questions",
	usage: "<question>",
	options: [{
		name: "question",
		type: "STRING",
		description: "The question you want to ask",
		required: true,
	}],
	async execute(client, interaction, args) {
		args = args._hoistedOptions;
		args.forEach(arg => args[args.indexOf(arg)] = arg.value);

		client.con.query(`SELECT language FROM Settings WHERE guildID = ${interaction.guild.id}`, async (err, rows) => {
			if (err) client.logger.error(err);
			if(!rows[0]){
				interaction.reply({content: client.lang("missing-config", "en"), ephemeral: true});
				return require("../../database/models/SettingsCreate")(client, interaction.guild.id);
			} 

			let language = rows[0].language; 
			let eightball = client.lang("8ball-responses", language);
			let index = (Math.floor(Math.random() * Math.floor(eightball.length)));
			const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("THE MAGIC 8BALL")
        .setDescription(client.lang("8ball-message", language).replace("{USERNAME}", interaction.user.username).replace("{QUESTION}", args[0]).replace("{RESPONSE}", eightball[index]));
			interaction.reply({ embeds: [embed]});
		});
	},
};
  