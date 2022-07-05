module.exports = {
    betaRiddle: async function (Api, bot, message) {
        let _guild = await Api.getGuild(message.author.id);
        console.log(_guild);
    },
};
