function nth(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}
module.exports = (client, member) => {
	client.con.query(`SELECT * FROM Settings WHERE guildID = ${member.guild.id}`, async (err, rows) => {
		if (err) client.logger.error(err);
		const value = rows[0];


		//if settings dont exist generate them
		if(!value) return require("../database/models/SettingsCreate")(client, member.guild.id);

		//if join channel isnt defined or if leave message is set to false dont send message
		if(value.joinChannelID === null || value.leaveMessage.toLowercase() === "false") return;
		const leaveMessage = value.leaveMessage
        .replace("{USER MENTION}", `<@${member.user.id}>`)
        .replace("{USER TAG}", member.user.tag)
        .replace("{SERVER NAME}", member.guild.name)
        .replace("{MEMBER COUNT}", nth(member.guild.members.cache.size));
		return member.guild.channels.cache.get(value.joinChannelID).send({content: leaveMessage});
	});
}; 