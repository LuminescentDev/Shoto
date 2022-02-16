const Discord = require("discord.js");
module.exports = {
	name: "vent",
	category: "utility",
	description: "Sends anonymous message to vent channel",
	ephemeral: true,
	botPermissions: ["ATTACH_FILES"],
	options: [
		{
			name: "message",
			type: "STRING",
			description: "Your vent message",
			required: true,
		}],
	async execute(client, interaction, args) {

		//Get the vent channel from settings
		const settings = await client.getSettings(interaction);

		let channelID = settings.ventChannelID;
		let logChannelID = settings.vLogChannelID;
		let language = settings.language;

		//If settings dont exist generate them
		if(!channelID || !interaction.guild.channels.cache.get(channelID)){
			return interaction.editReply({content: client.lang("missing-config", language)});
		} 

		if(!interaction.guild.me.permissionsIn(channelID).has("SEND_MESSAGES")) return interaction.editReply({content: "I am unable to send messages in the vent channel"});

		const vent = new Discord.MessageEmbed()
				.setColor("#00ffff")
				.setTitle("**Anonymous Said**")
				.setDescription(`${args[0]}`);

		if(logChannelID && interaction.guild.channels.cache.get(logChannelID)){
			vent.setFooter({text: "This message was logged to staff", iconURL: client.user.displayAvatarURL()});
			const ventSent = await interaction.guild.channels.cache.get(channelID).send({embeds: [vent]});
			console.log(ventSent)
			interaction.editReply({content: "Message sent!"});
			const loggedVent = new Discord.MessageEmbed()
			.setTitle("New Vent")
			.addField("Author:", interaction.user.tag)
			.addField("Message:", args[0])
			.addField("messageID:", ventSent.id)
			.setColor("#00FF0F")
			const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
				.setLabel("Delete")
				.setCustomId("deleteVent")
				.setStyle("DANGER"),
				new Discord.MessageButton()
				.setLabel("Edit")
				.setCustomId("editVent")
				.setStyle("DANGER")
			)
			return interaction.guild.channels.cache.get(logChannelID).send({embeds: [loggedVent], components: [row]});
		}
		interaction.editReply({content: "Message sent!"});
		interaction.guild.channels.cache.get(channelID).send({embeds: [vent]});
	}
}; 