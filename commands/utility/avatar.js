const Discord = require("discord.js");

module.exports = {
	name: "avatar",
	category: "utility",
	description: "shows avatar",
	ephemeral: false,
	botPermissions: ["ATTACH_FILES"],
	options: [
		{
			type: 3,
			name: "type",
			description: "the avatar type",
			required: true,
			choices: [{
				name: "user",
				value: "user",
			},
			{
				name: "guild",
				value: "guild",
			}
			]},
		{
			name: "user",
			type: "USER",
			description: "user whos profile picture you want",
			required: false,
		},
	],
	execute(client, interaction, args) {
		

		//get the user if one is supplied if not use command executor
		const user = args[1] ? interaction.guild.members.cache.get(args[1]) : interaction.member; 

		 //create embed
		const emb = new Discord.MessageEmbed()
            .setTitle(user.displayName);

		//if user is chosen as the avatar type get users avatar if not get users guild specific avatar probs an easier way but idc
		if (args[0] === "user") emb.setImage(user.user.displayAvatarURL({ dynamic: true, size: 2048}));
		else emb.setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }));

        
		interaction.editReply({embeds: [emb]});
	},
}; 