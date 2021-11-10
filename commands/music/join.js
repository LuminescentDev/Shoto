const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "join",
	category: "Music",
	description: "Join voice channel",
	args: false,
	usage: "",
	permission: [],
	owner: false,
	player: false,
	inVoiceChannel: true,
	sameVoiceChannel: false,
	async execute(client, interaction, args) {
  
		const { channel } = interaction.member.voice;

		const emojiJoin = interaction.client.emoji.join;

		if(!interaction.guild.me.voice.channel) {
            
			const player = interaction.client.manager.create({
				guild: interaction.guild.id,
				voiceChannel: channel.id,
				textChannel: interaction.channel.id,
				volume: 50,
				selfDeafen: true,
			});

			player.connect();

			let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`${emojiJoin} **Joined the voice channel**\nJoined <#${channel.id}> and bound to <#${interaction.channel.id}>`);
			return interaction.reply({embeds: [thing]});

		} else if (interaction.guild.me.voice.channel !== channel) {

			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`You must be in the same channel as ${interaction.client.user}`);
			return interaction.reply({embeds: [thing]});
		}
        
	}
}; 