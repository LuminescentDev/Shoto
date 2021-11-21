function nth(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}
module.exports = async (client, member) => {
	const settings = await client.getSettings(member.guild.id);

	//if join channel isnt defined or if leave message is set to false dont send message
	if(!settings.joinMessage || settings.joinMessage.toLowerCase() === "false" || !settings.joinChannelID || !member.guild.channels.cache.get(settings.joinChannelID)) return;
	const joinMessage = settings.joinMessage
        .replace("{USER MENTION}", `<@${member.user.id}>`)
        .replace("{USER TAG}", member.user.tag)
        .replace("{SERVER NAME}", member.guild.name)
        .replace("{MEMBER COUNT}", nth(member.guild.members.cache.size));
	return member.guild.channels.cache.get(settings.joinChannelID).send({content: joinMessage});
}; 