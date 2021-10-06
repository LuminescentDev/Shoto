const olisfetch = require("../../utilities/fetch")
module.exports = {
    name: 'owoify',
    category: "fun",
    description: 'OWO',
    usage: "<Sentence to owoify>",
    options: [{
        name: 'message',
        type: 'STRING',
        description: 'message to owoify',
        required: true,
        }],
      async execute(client, interaction, args) {
        args = args._hoistedOptions;
        args.forEach(arg => args[args.indexOf(arg)] = arg.value);
        msg = args.join("+")
        const owomsg = await olisfetch(`https://nekos.life/api/v2/owoify?text=${msg}`)
        interaction.reply({content: owomsg.owo, allowedMentions: { parse: [] } })
    },
};
