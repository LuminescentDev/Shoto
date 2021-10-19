module.exports = (client, message) => {
	try{
		//check if author is bot
		if (message.author.bot) return;
		//get channels sipes
		const snipes = message.client.snipes.get(message.channel.id) || [];
		//add message to the front of snipes
		snipes.unshift({
			content: message.content,
			author: message.author,
			image: message.attachments.first() ? message.attachments.first().proxyURL : null,
			date: new Date().toLocaleString("en-US", { dataStyle: "full", timeStyle: "short"})
		});
		//make sure length of the array is max 10
		snipes.splice(10);
		//push snipes
		message.client.snipes.set(message.channel.id, snipes);
	}catch (error) {
		client.logger.error(`MESSAGE DELETE ERROR: ${error}`);
	}
};