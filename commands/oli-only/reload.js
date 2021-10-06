const fs = require('fs')
module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    args: true,
    options: [{
        name: 'type',
        type: 'STRING',
        description: 'Reload buttons or commands',
        required: true,
    }],
    execute(client, interaction, args) {
        args = args._hoistedOptions;
        args.forEach(arg => args[args.indexOf(arg)] = arg.value);
        if(args[0] == "commands"){
            function getDirectories() {
                return fs.readdirSync('./commands').filter(function subFolder(file) {
                    return fs.statSync('./commands/' + file).isDirectory();
                })
            }
            //Gets all directory's in the command folder
            let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
            //Gets all files ending in .js in the main commands folder
            for (const folder of getDirectories()) {
                const folderFiles = fs.readdirSync('./commands/' + folder).filter(file => file.endsWith('.js'));
                for (const file of folderFiles) {
                    commandFiles.push([folder, file]);
                }
            }
            //Gets all files ending in .js in all the subFolder's of the commands folder
            for (const file of commandFiles) {
                if (Array.isArray(file)) {
                    console.log(require.resolve(`../${file[0]}/${file[1]}`))
                    delete require.cache[require.resolve(`../${file[0]}/${file[1]}`)];
                } else {
                    console.log(require.resolve(`../${file}`))
                    delete require.cache[require.resolve(`../${file}`)];
                }
                
            }
        interaction.reply({content: "Commands Reloaded"})
        }
    },
};