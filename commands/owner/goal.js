module.exports = {
	name: "goal",
	category: "misc",
	description: "Update website goals",
	cooldown: 5,
	guildOnly: false,
	Donor: false,
	args: true,
	owner: true,
	usage: "<Goal name> <New Number>",
	options: [{
		type: 3,
		name: "category",
		description: "The Goal to update.",
		required: true,
		choices: [{
			name: "server",
			value: "server",
		},
		{
			name: "member",
			value: "member",
		},
		{
			name: "donor",
			value: "donor",
		}
		]},
	{
		name: "goal",
		type: "STRING",
		description: "new goal value",
		required: true,
	}],
	execute(client, message, args) {

		args = args._hoistedOptions;
		args.forEach(arg => args[args.indexOf(arg)] = arg.value);

		const condition = args[0];
		if (condition === "server") {
			client.con.query(`UPDATE APIGoals SET ServerGoal = ${args[1]}`);
			message.reply(`Updated Servers goal to ${args[1]}`);
		}
		if (condition === "member") {
			client.con.query(`UPDATE APIGoals SET SSMemberGoal = ${args[1]}`);
			message.reply(`Updated Support server members goal to ${args[1]}`);
		}
		if (condition === "donorgoal") {
			client.con.query(`UPDATE APIGoals SET DonatorGoal = ${args[1]}`);
			message.reply(`Updated Donator goal to ${args[1]}`);
		}
	},
};