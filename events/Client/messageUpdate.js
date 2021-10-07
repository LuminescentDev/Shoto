module.exports = (client, oldMsg, newMsg) => {
	try{
		if (newMsg.author.bot) return;
		const editSnipes = oldMsg.client.editSnipes.get(oldMsg.channel.id) || [];
		editSnipes.unshift({
			content: oldMsg.content,
			author: newMsg.author,
			date: new Date().toLocaleString("en-US", { dataStyle: "full", timeStyle: "short"})
		});
		editSnipes.splice(10);
		oldMsg.client.editSnipes.set(oldMsg.channel.id, editSnipes);
	}catch (error) {
		client.logger.error(`MESSAGE UPDATE ERROR: ${error}`);
	}
};