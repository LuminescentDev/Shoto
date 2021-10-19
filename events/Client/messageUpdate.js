module.exports = (client, oldMsg, newMsg) => {
	try{
		//check if author is bot
		if (newMsg.author.bot) return;
		//get snipes from channel
		const editSnipes = oldMsg.client.editSnipes.get(oldMsg.channel.id) || [];
		//push to front of array
		editSnipes.unshift({
			content: oldMsg.content,
			author: newMsg.author,
			date: new Date().toLocaleString("en-US", { dataStyle: "full", timeStyle: "short"})
		});
		//make sure array is length of 10 max
		editSnipes.splice(10);
		//push snipes
		oldMsg.client.editSnipes.set(oldMsg.channel.id, editSnipes);
	}catch (error) {
		client.logger.error(`MESSAGE UPDATE ERROR: ${error}`);
	}
};