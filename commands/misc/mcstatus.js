const protocols = require("../../utilities/mcprotocol.json");
const olisfetch = require("../../utilities/fetch");
const Discord = require("discord.js");
const hastebin = require("hastebin");
module.exports = {
	name: "mcstatus",
	category: "misc",
	description: "minecraft status",
	cooldown: 5,
	guildOnly: false,
	Donor: false,
	options: [{
		name: "ip",
		type: "STRING",
		description: "Minecraft server ip",
		required: true,
	}],
	async execute(client, interaction, args) {
		let iconpng;
		
		const ip = args[0];
		const info = await olisfetch(`https://api.mcsrvstat.us/2/${ip}`);

		const Embed = new Discord.MessageEmbed().setColor(client.config.embedColor);

		if(!info.online) return interaction.editReply("Server offline / invalid ip");

		if (info.hostname) Embed.setTitle(info.hostname);
		else if (info.port === 25565) Embed.setTitle(info.ip);
		else Embed.setTitle(`${info.ip}:${info.port}`);
		if (info.version) Embed.addField("**Version:**", info.version, true);
		if (info.protocol !== -1 && info.protocol) Embed.addField("**Protocol:**", `${info.protocol} (${protocols[info.protocol]})`, true);
		if (info.software) Embed.addField("**Software:**", info.software, true);
		if (info.players) Embed.addField("**Players Online:**", `${info.players.online} / ${info.players.max}`, true);
		if (info.players && info.players.list && info.players.online > 50) {
			const link = await hastebin.createPaste(info.players.list.join("\n"), { server: "https://bin.birdflop.com" });
			Embed.addField("**Players:**", `[Click Here](${link})`, true);
		}else if (info.players && info.players.list) {
			Embed.addField("**Players:**", info.players.list.join("\n").replace(/_/g, "\\_"));
		}

		if (info.motd) Embed.addField("**MOTD:**", info.motd.clean.join("\n").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&le;/g, "≤").replace(/&ge;/g, "≥"));
		if (info.icon) {
			const base64string = Buffer.from(info.icon.replace(/^data:image\/png;base64,/, ""), "base64");
			iconpng = new Discord.MessageAttachment(base64string, "icon.png");
			Embed.setThumbnail("attachment://icon.png");
		}
		else {
			Embed.setThumbnail("https://bugs.mojang.com/secure/attachment/99116/unknown_pack.png");
		}
		if (info.plugins && info.plugins.raw[0]) {
			const link = await hastebin.createPaste(info.plugins.raw.join("\n"), { server: "https://bin.birdflop.com" });
			Embed.addField("**Plugins:**", `[Click Here](${link})`, true);
		}
		if (!info.debug.query) Embed.setFooter("ERROR: Query disabled! For more info please contact the server owner and ask them to enable query!");

		interaction.editReply({embeds: [Embed], files: [iconpng] });
	},
}; 