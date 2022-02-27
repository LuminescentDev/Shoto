const Discord = require("discord.js");
module.exports = {
	name: "simplymc",
	category: "utility",
	description: "Preview simplymc presets!",
	ephemeral: false,
    options: [
		{
			type: "SUB_COMMAND",
			name: "gradient",
			description: "Preview gradient",
            options: [
                {
                    type: "STRING",
                    name: "preset",
                    description: "Simplymc Preset",
                    required: true,
                }
            ]
		},
		{
			type: "SUB_COMMAND",
			name: "animation",
			description: "preview animation",
            options: [
                {
                    type: "STRING",
                    name: "preset",
                    description: "Simplymc Preset",
                    required: true,
                }
            ]
		},
	],
	async execute(client, interaction, args) {
        if(args[0] === "gradient") {
            try{
            var request = require('request');
            var options = {
            'method': 'POST',
            'url': 'https://www.simplymc.art/api/render/gradient',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "preset": args[1]
            })

            };
            request(options, function (error, response) {
            if (error) return client.logger.error(error);
            if (response.statusCode != 200) return interaction.editReply(`${response.statusCode} ${response.statusMessage}`);
            response = JSON.parse(response.body);
            const sfbuff = new Buffer.from(response.Image.split(",")[1], "base64");
            const text = response.Output
            const sfattach = new Discord.MessageAttachment(sfbuff, "output.png");

            interaction.editReply({content: text, files: [sfattach]});
            });
            }catch(e){
                interaction.editReply("Error: " + e);
            }
        }else if(args[0] === "animation"){
            try{
                var request = require('request');
                var options = {
                'method': 'POST',
                'url': 'https://www.simplymc.art/api/render/AnimTAB',
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "preset": args[1]
                })
    
                };
                request(options, function (error, response) {
                if (error) return client.logger.error(error);
                if (response.statusCode != 200) return interaction.editReply(`${response.statusCode} ${response.statusMessage}`);
                response = JSON.parse(response.body);
                const text = response.Output
                const buffer = Buffer.from(response.Image.data);
                const sfattach = new Discord.MessageAttachment(buffer, "output.gif");
    
                interaction.editReply({content: text, files: [sfattach]});
                //interaction.editReply({content: text});
                });
                }catch(e){
                    interaction.editReply("Error: " + e);
                }
            }
	},
}; 