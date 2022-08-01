const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
const { getMember, putEmoji, numberWithCommas, } = require("../../utils/misc/functions");

module.exports = {
    betaRiddle: async function (Api, bot, message, MessageEmbed) {
        if (message) {
            let _Objmember = await Api.getMember(message.guild.id, message.author.id);
            const err = new Error(), perm = new Perms(), autor = getMember(message, message.author.id);

            const _array_riddles_words = ["identity", "web3", "testing", "platform"]

            if (message.author.id === "248204538941538308") {
                if (message.content.includes("k&0") && message.content.includes("f$tur3") && message.content.includes("pl4tf0rm$") &&
                message.content.includes(autor.id.split(0, 3)[0] + "")) {

                let embed2 = new MessageEmbed()
                    .setTitle(`**${autor.displayName}'s Congrats!!**`)
                    .setColor('#F7005B')
                    .setDescription("You Open de Vault!!! Send a message to <@248204538941538308> to claim the prize.\n\n `The First Utility for the Next phase is the Identity Web3 Platform - 💀`")
                    .setThumbnail('https://cdn.discordapp.com/attachments/898963695336583169/994724270276096030/Cofre_R_U_DEAD.png')
                    .setFooter("💀 u r a loyal rotten!!")
                    .attachFiles([
                        `./database/multimedia/images/CofreAbiertoRender.png`,
                    ])
                    .setImage(`attachment://CofreAbiertoRender.png`)
                    .setTimestamp();

                message.author.send(embed2);

            }
            }

            if (message.channel.name === '💀-r-u-dead') {
                if (message.author.id !== "248204538941538308") {
                    message.delete().catch((O_o) => { });
                }
            }

            try {
                

                if (message.content.includes("k&0") && message.content.includes("f$tur3") && message.content.includes("pl4tf0rm$") &&
                    message.content.includes(autor.id.split(0, 3)[0] + "")) {

                    let embed2 = new MessageEmbed()
                        .setTitle(`**${autor.displayName}'s Congrats!!**`)
                        .setColor('#F7005B')
                        .setDescription("You Open de Vault!!! Send a message to <@248204538941538308> to claim the prize.")
                        .setThumbnail('https://cdn.discordapp.com/attachments/898963695336583169/994724270276096030/Cofre_R_U_DEAD.png')
                        .setFooter("💀 u r a loyal rotten!!")
                        .attachFiles([
                            `./database/multimedia/images/CofreAbiertoRender.png`,
                        ])
                        .setImage(`attachment://CofreAbiertoRender.png`)
                        .setTimestamp();

                    message.channel.send(embed2);

                }

                _array_riddles_words.forEach(async word => {
                    if (message.channel.name === '💀-r-u-dead') {
                        if (_Objmember.id === undefined) return err.noFindMemberBank(bot, message);
                        if (_Objmember.bank.coins === undefined) return err.dontHaveSynkoins(bot, message, autor.displayName);
                        if (_Objmember.bank.coins < 300) return err.dontHaveSynkoins(bot, message, autor.displayName);

                        const _current_coins = _Objmember.bank.coins;

                        let updateMCoins = _current_coins - 300;




                        if ((message.content.split(' ')[0]).toLowerCase() === word) {

                            const encChannel = message.guild.channels.cache.find(
                                (ch) => ch.name === "💬・testing-team"
                            );

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
                                    message.channel.send(embed).then((msg) => {
                                        msg.delete({ timeout: 60000, reason: "It had to be done." });
                                    });
                                    break;
                                case "web3":
                                    embed.setDescription("You `guessed the 2nd {word} of the {key}` wait for the other riddles! Be the first to get the three words and unlock the 'Rotten Vault' \n\n _Just one winner - get more rp to keep participating. **(Current: " + numberWithCommas(updateMCoins) + ")**_ | **[Go to our Twitter](https://twitter.com/rotten_ville)**")
                                    message.author.send("`f$tur3_[ee_" + autor.id.split(0, 3)[0] + "]`")
                                    message.channel.send(embed).then((msg) => {
                                        msg.delete({ timeout: 60000, reason: "It had to be done." });
                                    });
                                    break;
                                case "testing":
                                    message.author.send("`f$tur3_[ee_" + autor.id.split(0, 3)[0] + "]`");
                                    _array_riddles_words.forEach(word => {
                                        message.author.send(word);
                                    });
                                    break;
                                case "platform":
                                    embed.setDescription("You `guessed the 3rd {word} of the {key}` you can now send all the encrypted key to Win! Be the first to unlock the 'Rotten Vault' \n\n _Just one winner - get more rp to keep participating. **(Current: " + numberWithCommas(updateMCoins) + ")**_ | **[Go to our Twitter](https://twitter.com/rotten_ville)**")
                                    message.author.send("`pl4tf0rm$_[oo_" + autor.id.split(0, 3)[0] + "]`");
                                    message.channel.send(embed).then((msg) => {
                                        msg.delete({ timeout: 60000, reason: "It had to be done." });
                                    });
                                    break;
                                default:
                                    break;
                            }

                            encChannel.message.send(`ID: ${message.author.id}`);
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
