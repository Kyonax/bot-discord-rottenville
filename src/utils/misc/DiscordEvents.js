module.exports = {
    betaRiddle: function (Api, bot, message) {
        let _guild = Api.getGuild(message.author.id);
        console.log(_guild);
    },
};
