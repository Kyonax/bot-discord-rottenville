module.exports = {
    betaRiddle: async function (Api, bot, message) {
        let _Objguild = await Api.getGuild(message.guild.id), _Objmember = await Api.getMember(message.author.id);
        console.log(_Objguild)
        console.log(_Objmember)
    },
};
