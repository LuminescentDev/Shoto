module.exports = (client, message) => {
	try{
		if (message.author.bot) return;
		const snipes = message.client.snipes.get(message.channel.id) || [];
		snipes.unshift({
			content: message.content,
			author: message.author,
			image: message.attachments.first() ? message.attachments.first().proxyURL : null,
			date: new Date().toLocaleString("en-US", { dataStyle: "full", timeStyle: "short"})
		});
		snipes.splice(10);
		message.client.snipes.set(message.channel.id, snipes);
	}catch (error) {
		client.logger.error(`MESSAGE DELETE ERROR: ${error}`);
	}
};