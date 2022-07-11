const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
const { getMember, putEmoji, numberWithCommas, } = require("../../utils/misc/functions");

module.exports = {
    betaRiddle: async function (Api, bot, message, MessageEmbed) {
        if (message) {
            let _Objguild = await Api.getGuild(message.guild.id), _Objmember = await Api.getMember(message.guild.id, message.author.id);
            const err = new Error(), perm = new Perms(), autor = getMember(message, message.author.id);

            if (_Objmember.id === undefined) return err.noFindMemberBank(bot, message);
            if (_Objmember.bank.coins === undefined) return err.dontHaveSynkoins(bot, message, autor.displayName);
            if (_Objmember.bank.coins < 300) return err.dontHaveSynkoins(bot, message, autor.displayName);

            const _current_coins = _Objmember.bank.coins;

            try {
                if (message.channel.name === '💀-r-u-dead') {
                    let updateMCoins = _current_coins - 300;
                    message.delete().catch((O_o) => { });

                    if ((message.content.split(' ')[0]).toLowerCase() === "identity") {
                        let embed = new MessageEmbed()
                            .setTitle(`**${autor.displayName}'s Congrats!!**`)
                            .setColor('#F7005B')
                            .setDescription("You `guessed the 1st {word} of the {key}` wait for the other riddles! Be the first to get the three words and unlock the 'Rotten Vault' \n\n _Just one winner - get more rp to keep participating. **(Current: "+ numberWithCommas(updateMCoins)+")**_ | **[Go to our Twitter](https://twitter.com/rotten_ville)**")
                            .setThumbnail('https://cdn.discordapp.com/attachments/898963695336583169/994724270276096030/Cofre_R_U_DEAD.png')
                            .setFooter("💀 r u dead?")
                            .setTimestamp();
                        message.channel.send(embed)
                    }

                    await Api.patchBankMember(message.author.id, message.guild.id, "coins", updateMCoins);
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
};
