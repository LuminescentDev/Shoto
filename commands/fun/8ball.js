const Discord = require("discord.js")
module.exports = {
    name: '8ball',
    category: "fun",
    description: 'ask it questions',
    usage: "<question>",
    options: [{
      name: 'question',
      type: 'STRING',
      description: 'The question you want to ask',
      required: true,
  }],
    async execute(client, interaction, args) {
      args = args._hoistedOptions;
      args.forEach(arg => args[args.indexOf(arg)] = arg.value);
      if (!args[0]) {
        interaction.reply('Please ask me a question.');
      }
      else {
        let eightball = [
          'It is certain.',
          'It is decidedly so.',
          'Without a doubt.',
          'Yes definitely.',
          'You may rely on it.',
          'As I see it, yes.',
          'Most likely.',
          'Outlook good.',
          'Yes.',
          'Signs point to yes.',
          'Reply hazy try again.',
          'Ask again later.',
          'Better not tell you now.',
          'Cannot predict now.',
          'Concentrate and ask again.',
          'Don\'t count on it.',
          'My reply is no.',
          'My sources say no.',
          'Outlook not so good.',
          'Very doubtful.',
          'No way.',
          'Maybe',
          'The answer is hiding inside you',
          'No.',
          'Depends on the mood of the CS god',
          'Hang on',
          'It\'s over',
          'It\'s just the beginning',
          'Good Luck',
        ];
        let index = (Math.floor(Math.random() * Math.floor(eightball.length)));
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('THE MAGIC 8BALL')
        .setDescription(`${interaction.user.username} asks ${args[0]}\nI say: ${eightball[index]}`);
        interaction.reply({ embeds: [embed]});
      }
    },
  };
  