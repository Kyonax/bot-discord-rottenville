module.exports = {
    betaRiddle: async function (Api, bot, message, MessageEmbed) {
        try {
            let _Objguild = await Api.getGuild(message.guild.id), _Objmember = await Api.getMember(message.guild.id, message.author.id);
            message.delete().catch((O_o) => { });

            console.log(_Objmember);
            if ((message.content.split(' ')[0]).toLowerCase() === "identity") {

            }

        } catch (error) {
            console.log(error)
        }
    },
};
