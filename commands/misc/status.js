const { MessageEmbed, version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const si = require("systeminformation");

module.exports = {
	name: "status",
	category: "misc",
	description: "Show bots status",
	args: false,
	usage: "",
	permission: [],
	owner: false,
	async execute(client, interaction, args) {
		const duration1 = moment.duration(interaction.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
		const cpu = await si.cpu();
		const about = interaction.client.emoji.about;
		let ccount = client.channels.cache.size;
		let scount = client.guilds.cache.size;
		let mcount = 0; 
		client.guilds.cache.forEach(guild => {
			mcount += guild.memberCount; 

		});
		let nodes = client.manager.nodes.map(node => 
			`**• Node** : ${(node.options.identifier)} Connected` +
            `\n> **• Player** : ${node.stats.players}` +
            `\n> **• Playing Players** : ${node.stats.playingPlayers}` +
            `\n> **•Uptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}**` +
            "\n**• MEMORY** :" +
            `\n> **• Reservable Memory** : ${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb` +
            `\n> **• Used Memory** : ${Math.round(node.stats.memory.used / 1024 / 1024)}mb` +
            `\n> **• Free Memory** : ${Math.round(node.stats.memory.free / 1024 / 1024)}mb` +
            `\n> **• Allocated Memory** : ${Math.round(node.stats.memory.allocated / 1024 / 1024)}mb` +
            "\n**• CPU** :" +
            `\n> **• Cores** :  ${node.stats.cpu.cores}` +
            `\n> **• System Load** : ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` +
            `\n> **• Lavalink Load** : ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`
		).join("\n\n----------------------------\n");
		const embed = new MessageEmbed()
            .setColor(interaction.client.embedColor)
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setDescription(`${about} **Status**
**= STATISTICS =**
**• Servers** : ${scount}
**• Channels** : ${ccount}
**• Users** : ${mcount}
**• Discord.js** : v${version}
**• Node** : ${process.version}
**= SYSTEM =**
**• Platfrom** : ${os.type}
**• Uptime** : ${duration1}
**• CPU** :
> **• Cores** : ${cpu.cores}
> **• Model** : ${os.cpus()[0].model} 
> **• Speed** : ${os.cpus()[0].speed} MHz
**• MEMORY** :
> **• Total Memory** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
> **• Free Memory** : ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Total** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Usage** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps
**= NODES =** :
${nodes}
`);
		interaction.reply({embeds: [embed]});
	}
}; 