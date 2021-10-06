const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	category: "utility",
	description: 'shows avatar',
    options: [{
        name: 'user',
        type: 'USER',
        description: 'user whos profile picture you want',
        required: false,
    }],
	execute(client, interaction, args) {
		
        args = args._hoistedOptions;
        args.forEach(arg => args[args.indexOf(arg)] = arg.value);

        const user = args[0] ? interaction.guild.members.cache.get(args[0]) : interaction.member

        console.log(user)

        const emb = new Discord.MessageEmbed().setImage(user.displayAvatarURL({ dynamic: true, size: 2048 })).setTitle(user.displayName)
        interaction.reply({embeds: [emb]})
	},
};
