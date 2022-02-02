const Discord = require("discord.js");
const { json } = require("express/lib/response");
module.exports = {
	name: "simplymc",
	category: "test",
	description: "Ping!",
	ephemeral: false,
    options: [
		{
			type: "STRING",
			name: "preset",
			description: "Simplymc Preset",
			required: true,
        },
	],
	async execute(client, interaction, args) {
        try{
        var request = require('request');
        var options = {
        'method': 'POST',
        'url': 'http://localhost:8080/api/render/gradient',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "preset": args[0]
        })

        };
        request(options, function (error, response) {
        if (error) throw new Error(error);
        response = JSON.parse(response.body);
        const sfbuff = new Buffer.from(response.Image.split(",")[1], "base64");
        const text = response.Output
        const sfattach = new Discord.MessageAttachment(sfbuff, "output.png");

        interaction.editReply({content: text, files: [sfattach]});
        });
        }catch(e){
            interaction.editReply("Error: " + e);
        }
	},
}; 