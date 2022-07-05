module.exports = {
    betaRiddle: async function (Api, bot, message) {
        let _guild = await Api.getGuild(message.guild.id);
        console.log(`Enter: ${message.guild.id}`)
        console.log(_guild);
    },
};
