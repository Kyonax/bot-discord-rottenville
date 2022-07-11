const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
const { getMember, putEmoji, } = require("../../utils/misc/functions");

module.exports = {
    betaRiddle: async function (Api, bot, message, MessageEmbed) {
        const err = new Error(), perm = new Perms(), autor = getMember(message, message.author.id), _current_coins = _Objmember.bank.coins;
        let _Objguild = await Api.getGuild(message.guild.id), _Objmember = await Api.getMember(message.guild.id, message.author.id);

        if (_Objmember.id === undefined) return err.noFindMemberBank(bot, message);
        if (_current_coins < 300) return err.dontHaveSynkoins(bot, message, autor.displayName);

        try {
            if (message.channel.name === '💀-r-u-dead') {
                let updateMCoins = _current_coins - 300;
                message.delete().catch((O_o) => { });

                if ((message.content.split(' ')[0]).toLowerCase() === "identity") {

                }

                await Api.patchBankMember(member.id, member.guild.id, "coins", updateMCoins);
            }
        } catch (error) {
            console.log(error)
        }
    },
};
