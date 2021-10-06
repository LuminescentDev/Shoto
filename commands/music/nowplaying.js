const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utilities/convert.js');
const { progressbar } = require('../../utilities/progressbar.js')

module.exports = {
	name: "nowplaying",
    category: "Music",
    description: "Show now playing song",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    async execute(client, interaction, args) {
  
        const player = interaction.client.manager.get(interaction.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
            return interaction.reply(thing);
        }

        const song = player.queue.current

        const emojimusic = interaction.client.emoji.music;

        // Progress Bar
        var total = song.duration;
        var current = player.position;
        var size = 20;
        var line = '▬';
        var slider = '🔘';

        let embed = new MessageEmbed()
            .setDescription(`${emojimusic} **Now Playing**\n[${song.title}](${song.uri}) - \`[${convertTime(song.duration)}]\` [<@${song.requester.id}>]`)
            .setThumbnail(song.displayThumbnail("3"))
            .setColor(interaction.client.embedColor)
            .addField("\u200b", progressbar(total, current, size, line, slider))
            .addField("\u200b", `\`${convertTime(current)} / ${convertTime(total)}\``)
         return interaction.reply({embeds: [embed]})
            
    }
};