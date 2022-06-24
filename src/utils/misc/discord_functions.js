module.exports = {
    limitToChannel: function (message, err, channel, owner) {
        if (message.author.id != owner) {
            if (message.channel.name !== channel)
                return err.noCorrectChannel(bot, message, `898994751305576488`);
        }
    }
}