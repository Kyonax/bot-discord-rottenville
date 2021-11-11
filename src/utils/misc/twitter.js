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
var solana_sensei = process.env.TWITTER_SOLANASENSEI;
var big_brain = process.env.TWITTER_BIGBRAIN;
var sol_buckets = process.env.TWITTER_SOLBUCKETS;
var sol_legend = process.env.TWITTER_SOLLEGEND;
var monkey_bussines = process.env.TWITTER_SOLMB;
var sol_dbc = process.env.TWITTER_SOLBDC;
var doc_hollywood = process.env.TWITTER_DOCHOLLYWOOD;
var solanart = process.env.TWITTER_SOLANART;
var phantom = process.env.TWITTER_PHANTOM;
var solana = process.env.TWITTER_SOLANA;
var rick_bakas = process.env.TWITTER_RICKBAKAS;
var digital_eyes = process.env.TWITTER_DIGITALEYES;
var plug = process.env.TWITTER_PLUG;
var sol_nfts = process.env.TWITTER_SOLNTFs;
var crypto_gorilla = process.env.TWITTER_CRYPTOGORILLA;
var nft_verse = process.env.TWITTER_NFTVERSE;
var ravers = process.env.TWIITER_RAVERS;
var nft = process.env.TWITTER_NFT;
var sol_reaper = process.env.TWITTER_SOLREAPER;
var lilmayo = process.env.TWITTER_LILMAYO;
var boogle = process.env.TWITTER_BOOGLE;
var dizan = process.env.TWITTER_DIZAN;
//Crypto Twitter
module.exports.twitter = async (bot) => {
  const emoji_afirmado = synchronous.emojiID[0].afirmado;
  //Twitter API
  var stream_twitter_forex = T.stream("statuses/filter", {
    follow: [
      rotten_ville_twitter,
      solana_sensei,
      big_brain,
      sol_buckets,
      sol_legend,
      monkey_bussines,
      sol_dbc,
      doc_hollywood,
      solanart,
      phantom,
      solana,
      rick_bakas,
      digital_eyes,
      plug,
      sol_nfts,
      crypto_gorilla,
      nft_verse,
      ravers,
      nft,
      sol_reaper,
      lilmayo,
      boogle,
      dizan,
    ],
  });

  stream_twitter_forex.on("tweet", function (tweet) {
    let accountTwitter = [
      rotten_ville_twitter,
      solana_sensei,
      big_brain,
      sol_buckets,
      sol_legend,
      monkey_bussines,
      sol_dbc,
      doc_hollywood,
      solanart,
      phantom,
      solana,
      rick_bakas,
      digital_eyes,
      plug,
      sol_nfts,
      crypto_gorilla,
      nft_verse,
      ravers,
      nft,
      sol_reaper,
      lilmayo,
      boogle,
      dizan,
    ];
    accountTwitter.forEach((account) => {
      if (tweet.user.id == account) {
        var url_kyo_tweet =
          "https://twitter.com/" +
          tweet.user.screen_name +
          "/status/" +
          tweet.id_str;
        try {
          let channel = bot.channels
            .fetch(process.env.DISCORD_CHANNEL_ADM_ID)
            .then((channel) => {
              channel.send(
                `${putEmoji(
                  bot,
                  emoji_afirmado
                )} ADM Tweet to Watch <@248204538941538308>\n${url_kyo_tweet}`
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
