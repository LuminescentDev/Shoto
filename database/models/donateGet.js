const { MessageEmbed } = require("discord.js");

function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}

module.exports = async (client, info) => {

	//initiate the embed
	let donoEmbed = new MessageEmbed()
    .setTitle("Donation Received")
    .setURL("https://donatebot.io/checkout/740705740221841450");
	const donorLogEmbed = new MessageEmbed()
		.setTitle("Donation Received")
		.setDescription(`Transaction ID: ${info.txn_id}\nPrice: ${info.price}\nCurrency: ${info.currency}\nBuyer Email: ${info.buyer_email}\nStatus: ${info.status}\nRole ID: ${info.role_id}\nBuyer ID: ${info.raw_buyer_id}\n\nUsername if one: ${info.raw_buyer_id ? client.users.cache.get(info.raw_buyer_id) : "Unknown"}`);

	client.channels.cache.get(client.config.donorLogChannel).send({embeds: [donorLogEmbed]});
	try {
		//select the user from the database
		const buyer = info.raw_buyer_id ? info.raw_buyer_id : "0";
		const user  = await client.users.get(buyer);
		//if user does not exist add them
		if(!user) {
			require("./user")(client, info.raw_buyer_id);
			sleep(100);
			client.con.query(`UPDATE Users Set donor = ${info.role_id} where userID = "${buyer}"`);
			//set embed description and send it to the vote channel
			donoEmbed.setDescription(`Thank you for Donating ${client.users.cache.get(info.raw_buyer_id).username}\n You now have access to donor only commands and lower cooldown times!`);
			client.channels.cache.get(client.config.donorChannel).send({ embeds: [donoEmbed]});
		}else{
			let username = client.users.cache.get(buyer) ? client.users.cache.get(buyer).username : "Unknown User";

			//get users vote total from the database and add 1 and update lastevote to current time
			client.con.query(`UPDATE Users Set donor = ${info.role_id} where userID = "${buyer}"`);

			//set embed description and send it to the vote channel
			donoEmbed.setDescription(`Thank you for Donating ${username}!\nYou now have access to donor only commands and lower cooldown times!`);
			client.channels.cache.get(client.config.donorChannel).send({ embeds: [donoEmbed]});
		}
	} catch (error) {
		client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
		client.channels.cache.get(client.config.errorChannelID).send(`Error with donation get: ${error}`);
	}
}; 