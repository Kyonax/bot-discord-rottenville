const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
const { getMember, putEmoji, numberWithCommas, } = require("../../utils/misc/functions");

module.exports = {
    betaRiddle: async function (Api, bot, message, MessageEmbed) {
        if (message) {
            let _Objguild = await Api.getGuild(message.guild.id), _Objmember = await Api.getMember(message.guild.id, message.author.id);
            const err = new Error(), perm = new Perms(), autor = getMember(message, message.author.id);

            const _array_riddles_words = ["identity", "web", "testing"]

            if (message.channel.name === '💀-r-u-dead') {
                if (message.author.id !== "248204538941538308") {
                    message.delete().catch((O_o) => { });
                }
            }

            try {

                _array_riddles_words.forEach(async word => {
                    console.log(`Init array: ${word}`);
                    if (message.channel.name === '💀-r-u-dead') {
                        if (_Objmember.id === undefined) return err.noFindMemberBank(bot, message);
                        if (_Objmember.bank.coins === undefined) return err.dontHaveSynkoins(bot, message, autor.displayName);
                        if (_Objmember.bank.coins < 300) return err.dontHaveSynkoins(bot, message, autor.displayName);

                        const _current_coins = _Objmember.bank.coins;

                        let updateMCoins = _current_coins - 300;


                        if ((message.content.split(' ')[0]).toLowerCase() === word) {
                            console.log(`Init desition: ${word}`);

                            let embed = new MessageEmbed()
                                .setTitle(`**${autor.displayName}'s Congrats!!**`)
                                .setColor('#F7005B')

                                .setThumbnail('https://cdn.discordapp.com/attachments/898963695336583169/994724270276096030/Cofre_R_U_DEAD.png')
                                .setFooter("💀 r u dead?")
                                .setTimestamp();

                            switch (word) {
                                case "identity":
                                    embed.setDescription("You `guessed the 1st {word} of the {key}` wait for the other riddles! Be the first to get the three words and unlock the 'Rotten Vault' \n\n _Just one winner - get more rp to keep participating. **(Current: " + numberWithCommas(updateMCoins) + ")**_ | **[Go to our Twitter](https://twitter.com/rotten_ville)**")
                                    message.author.send("`k&0_[ii_" + autor.id.split(0, 3)[0] + "]`")
                                    message.channel.send(embed)
                                    console.log(`Init identity: ${word}`);
                                    break;
                                case "web":
                                    embed.setDescription("You `guessed the 2nd {word} of the {key}` wait for the other riddles! Be the first to get the three words and unlock the 'Rotten Vault' \n\n _Just one winner - get more rp to keep participating. **(Current: " + numberWithCommas(updateMCoins) + ")**_ | **[Go to our Twitter](https://twitter.com/rotten_ville)**")
                                    message.author.send("`f$tur3_[ee_" + autor.id.split(0, 3)[0] + "]`")
                                    message.channel.send(embed)
                                    console.log(`Init web: ${word}`);
                                    break;
                                case "testing":
                                    message.author.send("`f$tur3_[ee_" + autor.id.split(0, 3)[0] + "]`");
                                    _array_riddles_words.forEach(word => {
                                        message.author.send(word);
                                    });
                                    console.log(`Init testing: ${word}`);
                                    break;
                                default:
                                    break;
                            }

                        }

                        await Api.patchBankMember(message.author.id, message.guild.id, "coins", updateMCoins);
                    }
                });


            } catch (error) {
                console.log(error)
            }
        }
    },
};
