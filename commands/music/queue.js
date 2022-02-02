const { MessageEmbed } = require("discord.js");
const {convertTime} = require("../../handlers/utilities.js");

module.exports = {
	name: "queue",
	category: "Music",
	description: "Show the music queue and now playing.",
	player: true,
	inVoiceChannel: false,
	sameVoiceChannel: false,
	ephemeral: false,
	options: [{
		name: "page",
		type: "INTEGER",
		description: "Queue page",
		required: true,
	}],
	async execute(client, interaction, args) {

		const player = interaction.client.manager.get(interaction.guild.id);

		if (!player.queue.current) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
			return interaction.editReply({embeds: [thing]});
		}

		const queue = player.queue;

		const emojiQueue = interaction.client.emoji.queue;

		const embed = new MessageEmbed()
            .setColor(interaction.client.embedColor);

		const multiple = 10;
		const page = args[0];

		const end = page * multiple;
		const start = end - multiple;

		const tracks = queue.slice(start, end);

		if (queue.current) embed.addField("Now Playing", `[${queue.current.title}](${queue.current.uri}) \`[${convertTime(queue.current.duration)}]\``);

		if (tracks.length === 0) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
		else embed.setDescription(`${emojiQueue} Queue List\n` + tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri}) \`[${convertTime(track.duration)}]\``).join("\n"));

		const maxPages = Math.ceil(queue.length / multiple);

		embed.addField("\u200B", `Page ${page > maxPages ? maxPages : page} of ${maxPages}`);

		return interaction.editReply({embeds: [embed]});
	}
}; 