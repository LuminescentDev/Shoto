const { MessageEmbed } = require("discord.js");

function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}

module.exports = (client, info) => {

	//initiate the embed
	let voteEmbed = new MessageEmbed()
    .setTitle("Vote Received")
    .setURL(`https://top.gg/bot/${client.user.id}/vote`);
	try {
		//select the user from the database
		client.con.query(`SELECT * FROM Users WHERE userID = "${info.user}"`, (err, rows) => {
			if(err) return client.logger.error(err);
			let value = rows[0];
			//if user does not exist add them
			if(!rows[0]) {
				require("./user")(client, info.user);
				sleep(100);
				client.con.query(`UPDATE Users Set voteTotal = 1, lastVote = ${Date.now()} where userID = "${info.user}"`);
				//set embed description and send it to the vote channel
				voteEmbed.setDescription(`Thank you for voting ${client.users.cache.get(info.user).username}\n You now have 1 Vote!\n You can vote again in <t:${Math.floor(Date.now()/1000 + 43200)}:R>`);
				client.channels.cache.get(client.config.votechannel).send({ embeds: [voteEmbed]});
			}else{
				//get users vote total from the database and add 1 and update lastevote to current time
				client.con.query(`UPDATE Users Set voteTotal = ${value.voteTotal += 1}, lastVote = ${Date.now()} where userID = "${info.user}"`);

				//set embed description and send it to the vote channel
				voteEmbed.setDescription(`Thank you for voting ${client.users.cache.get(info.user).username}\n You now have ${value.voteTotal} Votes!\nYou can vote again in <t:${Math.floor(Date.now()/1000 + 43200)}:R>`);
				client.channels.cache.get(client.config.votechannel).send({ embeds: [voteEmbed]});
			}
		});
	} catch (error) {
		client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
		client.channels.cache.get(client.config.errorChannelID).send(`Error with receiving vote: ${error}`);
	}
}; 