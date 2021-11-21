const Discord = require("discord.js");
module.exports = {
	name: "vent",
	category: "utility",
	description: "Sends anonymous message to vent channel",
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
		let language = settings.language;

		//If settings dont exist generate them
		if(!channelID || !interaction.guild.channels.cache.get(channelID)){
			return interaction.editReply({content: client.lang("missing-config", language), ephemeral: true});
		} 

		if(!interaction.guild.me.permissionsIn(channelID).has("SEND_MESSAGES")) return interaction.editReply({content: "I am unable to send messages in the vent channel", ephemeral: true});

		const vent = new Discord.MessageEmbed()
				.setColor("#00ffff")
				.setTitle("**Anonymous Said**")
				.setDescription(`${args[0]}`);
		interaction.guild.channels.cache.get(channelID).send({embeds: [vent]});
		interaction.editReply({content: "Message sent!", ephemeral: true});
	}
}; 