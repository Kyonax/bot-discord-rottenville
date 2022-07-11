module.exports = {
    betaRiddle: async function (Api, bot, message) {
        try {
            let _Objguild = await Api.getGuild(message.guild.id), _Objmember = await Api.getMember(message.guild.id, message.author.id);

            if ((message.content.split(' ')[0]).toLowerCase() === "identity") {
                console.log(message.content)
            }

        } catch (error) {
            console.log(error)
        }
    },
};
