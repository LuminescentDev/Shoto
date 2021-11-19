function GetImage(interaction, args) {
	const fileTypes = ["png", "jpeg", "tiff", "jpg", "webp"];
	const regex = new RegExp("^(ht|f)tp(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?$");
	// Get user
	const user = (interaction.mentions.users.first()) ? interaction.mentions.users.first() : interaction.member.user;
	// get image if there is one
	const file = [];
	// Check attachments
	if (interaction.attachments.size > 0) {
		const url = interaction.attachments.first().url;
		for (const fileType of fileTypes) {
			if (url.includes(fileType)) {
				file.push(url);
			}
		}
		// no file with the correct format was found
		if (file.length === 0) return interaction.editReply("IMAGE/INVALID_FILE").then(m => m.delete({ timeout: 10000 }));
	} else {
		// check user
		if (user !== interaction.member.user) {
			file.push(user.displayAvatarURL({ format: "png", size: 2048 }));
		}
		// Checks if a link to image was entered
		if (args[0] && !(args[0].startsWith("<") && args[0].endsWith(">")) && regex.test(args[0])) {
			file.push(args[0]);
		}
		// add user
		file.push(interaction.member.user.displayAvatarURL({ format: "png", size: 2048 }));
		// send file;
	}
	return file;
}


module.exports = GetImage;