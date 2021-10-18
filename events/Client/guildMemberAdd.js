const moment = require("moment");
module.exports = (client, member) => {
	client.con.query(`SELECT * FROM Settings WHERE guildID = ${member.guild.id}`, async (err, rows) => {
		if (err) client.logger.error(err);
		const value = rows[0];
		if(!value) return require("../../database/models/SettingsCreate")(client, member.guild.id);
		if(value.joinChannelID === null || value.joinChannelID === "FALSE") return;
		const joinMessage = value.joinMessage
        .replace("{USER MENTION}", `<@${member.user.id}>`)
        .replace("{USER TAG}", member.user.tag)
        .replace("{SERVER NAME}", member.guild.name)
        .replace("{MEMBER COUNT}", moment.localeData().ordinal(member.guild.members.cache.size));
		return member.guild.channels.cache.get(value.joinChannelID).send({content: joinMessage});
	});
};