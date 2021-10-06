function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}
module.exports = {
    name: 'hack',
    category: 'fun',
    description: 'sends elite haxor message',
    async execute(client, interaction, args) {
        interaction.reply("Hack initiated")
        const prompt = await interaction.channel.send('Initiating Hack [----------] 0% Complete');
        await sleep(1000);
        await prompt.edit('Initiating Hack [▉---------] 10% Complete');
        await sleep(1000);
        await prompt.edit('Initiating Hack [▉▉--------] 20% Complete');
        await sleep(1000);
        await prompt.edit('Initiating Hack [▉▉▉-------] 30% Complete');
        await sleep(1000);
        await prompt.edit('Initiating Hack [▉▉▉▉------] 40% Complete');
        await sleep(1000);
        await prompt.edit('Initiating Hack [▉▉▉▉▉-----] 50% Complete');
        await sleep(1000);
        await prompt.edit('Initiating Hack [▉▉▉▉▉▉----] 60% Complete');
        await sleep(1000);
        await prompt.edit('Initiating Hack [▉▉▉▉▉▉▉---] 70% Complete');
        await sleep(1000);
        await prompt.edit('Initiating Hack [▉▉▉▉▉▉▉▉--] 80% Complete');
        await sleep(1000);
        await prompt.edit('Initiating Hack [▉▉▉▉▉▉▉▉-] 90% Complete');
        await sleep(1000);
        await prompt.edit('Initiating Hack [▉▉▉▉▉▉▉▉▉] 100% Complete');
        await sleep(1000);
        await prompt.edit('[▗]Entering government Database');
        await sleep(1000);
        await prompt.edit('[▖]nuclear launch codes found');
        await sleep(1000);
        await prompt.edit('[▘]nuclear launch codes: Hotel, Echo, November, Tango, Alpha, India');
        await sleep(2000);
        await prompt.edit(`⚠️WARNING⚠️ GOVERNMENT IS AWARE OF HACK AND IS SENDING TASK FORCE 1 TO ${interaction.member.displayName}'s PLACE OF RESIDENCE GET OUT OF THERE NOW`);
        await sleep(1000);
        return prompt.edit('bye bye');

    },
};