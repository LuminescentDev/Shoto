const Discord = require("discord.js");
module.exports = {
	name: "profile",
	category: "utility",
	description: "Show your profile",
	ephemeral: false,
	async execute(client, interaction, args) {
		const profile = await client.userProfile(interaction.user)
        const profileImage = new Discord.MessageAttachment(profile.profileImage, "profile.png")
        const embed = new Discord.MessageEmbed()
            .setColor(0x00AE86)
            .setTitle(`${profile.user.username}'s Profile`)
            .setDescription(`To customize your profile, visit [Click here!](https://shoto.akiradev.xyz/user)`)
            .setImage("attachment://profile.png")
            .setTimestamp()
            .setFooter(`${client.user.username}`, client.user.avatarURL())
        interaction.editReply({embeds: [embed], files: [profileImage]})
	},
}; 