const { MessageEmbed } = require("discord.js");
//Inicialización de js de Node.js
PNG = require("pngjs").PNG;
var fs = require("fs"),
  gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });
const {
  delay,
  putEmoji,
  getMember,
  initObjectMember,
} = require("../../src/utils/misc/functions");

const { circleImage, resizeImage, downloadUser } = require("../../src/utils/magik/functions")

const { stripIndents } = require("common-tags");

const Error = require("../conectors/error");

//NewUserGif
const backgroundNewUser = "database/multimedia/images/DiscordWelcome.png";
//Funciones
async function edit(firstImage, secondImage, name, username, size) {
  circleImage(firstImage, username);
  delay(2000).then(function () {
    resizeImage(username);
  });
  delay(4000).then(function () {
    secondStep(secondImage, name, username, size);
  });
}
async function secondStep(inImage, name, username, size) {
  gm(backgroundNewUser)
    .gravity("East")
    .fill("#34e637")
    .font("Helvetica-Bold", 40)
    .drawText(6, 212, `${name}`, "North")
    .draw([`image Over 47,55 0,0 ${inImage}`])
    .fill("#F5FBF3")
    .font("Helvetica", 20)
    .drawText(136, 254, `${"#" + size + 1}`, "North")
    .draw([`image Over 47,55 0,0 ${inImage}`])
    .write(`database/multimedia/images/magik/exports/${username}.png`, function (err) {
      console.log("Done! SecondStep");
      if (err) console.log("Error!: " + err);
    });
}

module.exports.welcomeMessage = async (member, bot) => {

  const memberImage = member.user.displayAvatarURL({
    format: "png",
    dynamic: false,
    size: 128,
  });


  var memberCount = bot.users.cache.size
  const _GUILD_ID = member.guild.id;
  const _MEMBER_ID = member.user.id;
  const _MEMBER = member;
  const _SALUTE = [
    `**Hey!! ${_MEMBER} welcome to RottenVille Gang**, make sure to read all the Server Rules <#928319200139812864>, and start to get **Rotten Points ${putEmoji(
      bot,
      "901151325117636618"
    )}**`,
    `What? A new Survivor? **Welcome ${_MEMBER} to the RottenVille Gang, enjoy your stay!!!**`,
    `**Gang gang, We have a new member in our Gang, congrats ${_MEMBER}** and Welcome to RottenVille!`,
    `**The RottenVerse welcomes you ${_MEMBER}** with open arms, be the best version of you, be a Rotten.`,
    `Yo!!! ${_MEMBER} I thought you were not coming, I'm very happy to have you right here, ready to become a Rotten?`,
    `**Are you ${_MEMBER} right? Welcome to RottenVille!!** The Rottens DAO was waiting for your arrive!!`,
    `**The Metaverse is very huge ${_MEMBER},** We are very happy that you made the decision to be part of the RottenVerse.`
  ];
  const _RANDOM_SALUTE = _SALUTE[Math.floor(Math.random() * _SALUTE.length)];
  const _HELLO_CHANNEL = member.guild.channels.cache.find((ch) =>
    ch.name.includes("💬・general-chat")
  );
  const _SERVER_CHANNEL_ = member.guild.channels.cache.find((ch) =>
    ch.name.includes("📑・new-member")
  );


  downloadUser(memberImage, member.user.id).then(() => {
    delay(300).then(async function () {
      edit(
        `/../../../database/multimedia/images/users/avatar/${member.user.id}.png`,
        `database/multimedia/images/users/circleAvatar/${member.user.id}CircleImageR.png`,
        member.user.tag,
        member.user.id,
        memberCount
      );
    });
    return delay(28000).then(async function () {


      let _embed = new MessageEmbed()
        .setColor("#13ea83")
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter(
          "📣 RottenVille Project・check out our twitter.com/rotten_ville"
        )
        .setDescription(
          `**╭・———— » ` +
          "`👽`" +
          ` — Be part of RottenVille —-**
┊ **Follow the Server rules and start your**
┊ journey as a Rotten member on this channel
┊ <#928319200139812864> ・` +
          "`🏁`" +
          `
┊
┊ **Verify as a Holder** to get full acces
┊ _"<#958311149659631637>"_・` +
          "`👹`" +
          `
┊
┊ **Member Verify <#960905065906991144> **
┊ you will get ** <@&895850023311540225> **
┊
┊ _If you have any question <#898983573607030834> or_
┊ **__ask for help on <#899003268473180230>__**
╰
    `
        ).attachFiles([
          `database/multimedia/images/magik/exports/${member.user.id}.png`,
        ])
        .setImage(`attachment://${member.user.id}.png`);


      try {
        _HELLO_CHANNEL.send(_RANDOM_SALUTE);
        _SERVER_CHANNEL_.send(
          `**Welcome ${_MEMBER} to RottenVille Lab!! Check this out.**`,
          _embed
        );
      } catch (error) {
        console.log("No se pudo enviar el welcome. " + error);
      }
    });
  });
};
