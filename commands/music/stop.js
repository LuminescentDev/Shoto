const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "stop",
    category: "Music",
    description: "Stops the music",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    async execute(client, interaction, args) {
  
        const player = interaction.client.manager.get(interaction.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
            return interaction.reply({embeds: [thing]});
        }

        const autoplay = player.get("autoplay")
        if (autoplay === true) {
            player.set("autoplay", false);
        }

        player.stop();
        player.queue.clear();

        const emojistop = interaction.client.emoji.stop;

		let thing = new MessageEmbed()
            .setColor(interaction.client.embedColor)
            .setTimestamp()
            .setDescription(`${emojistop} Stopped the music`)
            interaction.reply({embeds: [thing]});
	
  	}
};