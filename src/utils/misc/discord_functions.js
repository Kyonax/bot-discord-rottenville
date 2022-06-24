module.exports = {
    limitToChannel: function (message, channel, guild) {
        if (message.author.id != "248204538941538308") {
            if (message.channel.name !== channel)
                return err.noCorrectChannel(bot, message, `898994751305576488`);
        }
    }
}