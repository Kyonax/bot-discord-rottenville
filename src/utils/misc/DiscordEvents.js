const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
const { getMember, putEmoji, } = require("../../utils/misc/functions");

module.exports = {
    betaRiddle: async function (Api, bot, message, MessageEmbed) {
        if (message) {
            let _Objguild = await Api.getGuild(message.guild.id), _Objmember = await Api.getMember(message.guild.id, message.author.id);
            const err = new Error(), perm = new Perms(), autor = getMember(message, message.author.id);

            if (_Objmember.id === undefined) return err.noFindMemberBank(bot, message);
            if (_current_coins < 300) return err.dontHaveSynkoins(bot, message, autor.displayName);

            const _current_coins = _Objmember.bank.coins;

            try {
                if (message.channel.name === '💀-r-u-dead') {
                    let updateMCoins = _current_coins - 300;
                    message.delete().catch((O_o) => { });

                    if ((message.content.split(' ')[0]).toLowerCase() === "identity") {

                    }

                    await Api.patchBankMember(message.author.id, message.guild.id, "coins", updateMCoins);
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
};
