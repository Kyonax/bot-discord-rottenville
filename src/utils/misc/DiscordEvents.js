module.exports = {
    betaRiddle: async function (Api, bot, message) {
        try {
            let _Objguild = await Api.getGuild(message.guild.id), _Objmember = await Api.getMember(message.guild.id, message.author.id);

            console.log(message.content.slice(0, 8))
            console.log(message.content)
        } catch (error) {
            console.log(error)
        }
    },
};
