module.exports = {
	name: "coinflip",
	category: "fun",
	description: "flips a coin",
	execute(client, interaction, args) {

		//Select number between 0 and 1
		let random = (Math.floor(Math.random() * 2));
  
		if (random === 0) {
			interaction.reply({content: "I flipped heads!"});
		}
		else {
			interaction.reply({content: "I flipped tails!"});
		}
	},
}; 
  
  