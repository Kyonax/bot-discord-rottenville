//Node Imports
require("dotenv").config();
const Twit = require("twit");
//Import Utils
const { putEmoji } = require("../misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Objects Initialization
//Object
var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCES_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});
//Forex Twitter
var rotten_ville_twitter = process.env.TWITTER_ROTTEN;
//Crypto Twitter
module.exports.twitter = async (bot) => {
  const emoji_afirmado = synchronous.emojiID[0].afirmado;
  //Twitter API
  var stream_twitter_forex = T.stream("statuses/filter", {
    follow: [rotten_ville_twitter],
  });

  stream_twitter_forex.on("tweet", function (tweet) {
    console.log("all looks fine");
    if (tweet.user.id == process.env.TWITTER_ROTTEN) {
      var url_kyo_tweet =
        "https://twitter.com/" +
        tweet.user.screen_name +
        "/status/" +
        tweet.id_str;
      try {
        let channel = bot.channels
          .fetch(process.env.DISCORD_CHANNEL_FOREX_ID)
          .then((channel) => {
            channel.send(
              `${putEmoji(
                bot,
                emoji_afirmado
              )} New Tweet! What do you think <@&900354883708936202>?\n${url_kyo_tweet}`
            );
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  });
};
