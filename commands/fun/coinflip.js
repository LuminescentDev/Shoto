module.exports = {
    name: 'coinflip',
    category: "fun",
    description: 'flips a coin',
    execute(client, interaction, args) {
      let random = (Math.floor(Math.random() * Math.floor(2)));
  
      if (random === 0) {
        interaction.reply({content: 'I flipped heads!'});
      }
      else {
        interaction.reply({content: 'I flipped tails!'});
      }
    },
  };
  
  