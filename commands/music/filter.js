const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "filter",
	category: "Music",
	description: "Set EqualizerBand",
	usage: "<Party || Bass || Radio || Pop || Trablebass || Soft || Custom || Off>",
	player: true,
	inVoiceChannel: true,
	sameVoiceChannel: true,
	ephemeral: false,
	options: [{
		type: "STRING",
		name: "type",
		description: "The type of filter you want to apply.",
		required: true,
		choices: [{
			name: "party",
			value: "Party",
		},
		{
			name: "bassboost",
			value: "Bassboost",
		},
		{
			name: "radio",
			value: "Radio",
		},
		{
			name: "pop",
			value: "Pop",
		},
		{
			name: "trablebass",
			value: "Trablebass",
		},
		{
			name: "soft",
			value: "Soft",
		},
		{
			name: "custom",
			value: "Custom",
		},
		{
			name: "off",
			value: "Off",
		},
		],
	}],
	async execute(client, interaction, args) {



		const player = interaction.client.manager.get(interaction.guild.id);

		if (!player.queue.current) {
			let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
			return interaction.editReply({embeds: [thing]});
		}

		const emojiequalizer = interaction.client.emoji.filter;

		let thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp();
            
		switch (args[0]) {
			case "Party": {
				var bands = [
					{ band: 0, gain: -1.16 },
					{ band: 1, gain: 0.28 },
					{ band: 2, gain: 0.42 },
					{ band: 3, gain: 0.5 },
					{ band: 4, gain: 0.36 },
					{ band: 5, gain: 0 },
					{ band: 6, gain: -0.3 },
					{ band: 7, gain: -0.21 },
					{ band: 8, gain: -0.21 } 
				];
				thing.setDescription(`${emojiequalizer} Party mode enabled!`);
				player.setEQ(...bands);
		
				break;
			}
			case "Pass": {
				var bands = [
					{ band: 0, gain: 0.6 },
					{ band: 1, gain: 0.7 },
					{ band: 2, gain: 0.8 },
					{ band: 3, gain: 0.55 },
					{ band: 4, gain: 0.25 },
					{ band: 5, gain: 0 },
					{ band: 6, gain: -0.25 },
					{ band: 7, gain: -0.45 },
					{ band: 8, gain: -0.55 },
					{ band: 9, gain: -0.7 },    
					{ band: 10, gain: -0.3 },    
					{ band: 11, gain: -0.25 },
					{ band: 12, gain: 0 },   
					{ band: 13, gain: 0 },
					{ band: 14, gain: 0 }    
				];
				thing.setDescription(`${emojiequalizer} Bass mode enabled!`);
				player.setEQ(...bands);
		
				break;
			}
			case "Radio": {
				var bands = [
					{ band: 0, gain: 0.65 },
					{ band: 1, gain: 0.45 },
					{ band: 2, gain: -0.45 },
					{ band: 3, gain: -0.65 },
					{ band: 4, gain: -0.35 },
					{ band: 5, gain: 0.45 },
					{ band: 6, gain: 0.55 },
					{ band: 7, gain: 0.6 },
					{ band: 8, gain: 0.6 },
					{ band: 9, gain: 0.6 },    
					{ band: 10, gain: 0 },    
					{ band: 11, gain: 0 },
					{ band: 12, gain: 0 },   
					{ band: 13, gain: 0 },
					{ band: 14, gain: 0 }  
				];
				thing.setDescription(`${emojiequalizer} Radio mode enabled!`);
				player.setEQ(...bands);
		
				break;
			}
			case "Pop": {
				var bands = [
					{ band: 0, gain: -0.25 },
					{ band: 1, gain: 0.48 },
					{ band: 2, gain: 0.59 },
					{ band: 3, gain: 0.72 },
					{ band: 4, gain: 0.56 },
					{ band: 5, gain: 0.15 },
					{ band: 6, gain: -0.24 },
					{ band: 7, gain: -0.24 },
					{ band: 8, gain: -0.16 },
					{ band: 9, gain: -0.16 },    
					{ band: 10, gain: 0 },    
					{ band: 11, gain: 0 },
					{ band: 12, gain: 0 },   
					{ band: 13, gain: 0 },
					{ band: 14, gain: 0 }
				];
				thing.setDescription(`${emojiequalizer} Pop mode enabled!`);
				player.setEQ(...bands);
		
				break;
			}
			case "Trablebass": {
				var bands = [
					{ band: 0, gain: 0.6 },
					{ band: 1, gain: 0.67 },
					{ band: 2, gain: 0.67 },
					{ band: 3, gain: 0 },
					{ band: 4, gain: -0.5 },
					{ band: 5, gain: 0.15 },
					{ band: 6, gain: -0.45 },
					{ band: 7, gain: 0.23 },
					{ band: 8, gain: 0.35 },
					{ band: 9, gain: 0.45 },
					{ band: 10, gain: 0.55 },
					{ band: 11, gain: 0.6 },
					{ band: 12, gain: 0.55 },
					{ band: 13, gain: 0 },
					{ band: 14, gain: 0 }
				];
				thing.setDescription(`${emojiequalizer} Trablebass mode enabled!`);
				player.setEQ(...bands);
		
				break;
			}
			default: if (args[0] === "Bassboost") {
				var bands = Array.from({length: 7}).fill(null).map((_, i) => (
					{ band: i, gain: 0.25 }
				));
				thing.setDescription(`${emojiequalizer} Bassboost mode enabled!`);
				player.setEQ(...bands);
			} else switch (args[0]) {
				case "Soft": {
					var bands =  [
						{ band: 0, gain: 0 },
						{ band: 1, gain: 0 },
						{ band: 2, gain: 0 },
						{ band: 3, gain: 0 },
						{ band: 4, gain: 0 },
						{ band: 5, gain: 0 },
						{ band: 6, gain: 0 },
						{ band: 7, gain: 0 },
						{ band: 8, gain: -0.25 },
						{ band: 9, gain: -0.25 },    
						{ band: 10, gain: -0.25 },    
						{ band: 11, gain: -0.25 },
						{ band: 12, gain: -0.25 },   
						{ band: 13, gain: -0.25 },   
						{ band: 14, gain: -0.25 } 
					];
					thing.setDescription(`${emojiequalizer} Soft mode enabled!`);
					player.setEQ(...bands);
		
					break;
				}
				case "Custom": {
					var bands = [
						{ band: 0, gain: args[1] },
						{ band: 1, gain: args[2] },
						{ band: 2, gain: args[3] },
						{ band: 3, gain: args[4] },
						{ band: 4, gain: args[5] },
						{ band: 5, gain: args[6] },
						{ band: 6, gain: args[7] },
						{ band: 7, gain: args[8] },
						{ band: 8, gain: args[9] },
						{ band: 9, gain: args[10] },    
						{ band: 10, gain: args[11] },    
						{ band: 11, gain: args[12] },
						{ band: 12, gain: args[13] },   
						{ band: 13, gain: args[14] }    
					];
					thing.setDescription(`${emojiequalizer} Custom Equalizer mode enabled!`);
					player.setEQ(...bands);
		
					break;
				}
				case "Off": {
					thing.setDescription(`${emojiequalizer} Equalizer mode disabled`);
					player.clearEQ();
		
					break;
				}
 // No default
			}
		}
		return interaction.editReply({embeds: [thing]});
	}
}; 