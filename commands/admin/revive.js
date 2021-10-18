const Discord = require("discord.js");
module.exports = {
	name: "revive",
	category: "admin",
	description: "sends the specified chat revive message",
	execute(client, interaction, args) {
		args = args._hoistedOptions;
		args.forEach(arg => args[args.indexOf(arg)] = arg.value);
		client.con.query(`SELECT * FROM Settings WHERE guildID = ${interaction.guild.id}`, async (err, rows) => {
			if (err) throw err;
			if(!rows[0]){
				interaction.reply({content: client.lang("missing-config", "en"), ephemeral: true});
				return require("../../database/models/SettingsCreate")(client, interaction.guild.id);
			} 
			let reviveMessage = rows[0].reviveMessage;
			let reviveRole = rows[0].ReviveRoleID;
			let language = rows[0].language;
			if (reviveRole === null || !interaction.guild.roles.cache.get(reviveRole)) return interaction.reply({content: client.lang("no-config", language) , ephemeral: true});
			if (reviveMessage === null || !reviveMessage) return interaction.reply({content: client.lang("no-config", language), ephemeral: true});
			interaction.channel.send({content: reviveMessage.replace("{REVIVE ROLE}", `<@&${reviveRole}>`)});
			interaction.reply({content: "Message sent!", ephemeral: true});
		});

	},
};