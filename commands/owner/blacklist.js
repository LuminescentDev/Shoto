

module.exports = {
	name: "blacklist",
	category: "owner",
	description: "Check if you are blacklisted and why",
    botPermissions: ["EMBED_LINKS"],
	msgcmd: true,
	async execute(client, message, args) {
        if(client.config.ownerID.includes(message.author.id)) {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) return message.channel.send("Please mention a user or provide a user ID.");
        let reason = args.slice(1).join(" ");
        if (!reason) return message.channel.send("Please provide a reason.");
        let punisher = message.author;
        client.query(`INSERT INTO blacklist (userID, reason, punisher) VALUES ("${user.id}", "${reason}", "${punisher.id}")`);
        let embed = new Discord.MessageEmbed()
        .setTitle(`Blacklisted User ${user.tag}`)
        .setDescription(`${user.tag} has been blacklisted for ${reason}`)
        .setColor("#ff0000")
        .setFooter({text: `Blacklisted by ${punisher.tag}`})
        client.channels.cache.get(client.config.logChannel).send({embeds: [embed]});
        } else {
        let results = await client.query(`SELECT * FROM blacklist WHERE userID = '${message.author.id}'`);
        if (!results[0]) return message.channel.send("You are not blacklisted.");
        let reason = results[0].reason;
        let punisher = client.users.cache.get(results[0].punisher);
        let embed = new Discord.MessageEmbed()
        .setTitle("Blacklisted")
        .setDescription(`You are blacklisted from using the bot for the following reason: ${reason}`)
        .setColor("#ff0000")
        .setFooter({text: `Blacklisted by ${punisher.tag}`})
        message.channel.send({embeds: [embed]});
        }
	},
}; 