function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

module.exports = {
    name: 'ec',
    category: 'misc',
    description: 'test command',
    owner: true,
    options: [{
        name: 'code',
        type: 'STRING',
        description: 'Code to eval',
        required: true,
    }],
      async execute(client, interaction, args) {
        args = args._hoistedOptions;
        args.forEach(arg => args[args.indexOf(arg)] = arg.value);
        try {
            const code = args[0]
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

                interaction.reply({content: `\`\`\`${clean(evaled)}\`\`\``});
        } catch (err) {
            interaction.reply({content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``});
        }
    },
};