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
async function edit(firstImage, secondImage, name, username,size) {
  circleImage(firstImage, username);
  delay(2000).then(function () {
    resizeImage(username);
  });
  delay(4000).then(function () {
    secondStep(secondImage, name, username,size);
  });
}
async function secondStep(inImage, name, username,size) {
  gm(backgroundNewUser)
    .fill("#34e637")    
    .font("Helvetica-Bold", 40)
    .drawText(6, 212, `${name}`, "North")
    .draw([`image Over 47,55 0,0 ${inImage}`])
    .fill("#34e637")    
    .font("Helvetica", 20)
    .drawText(46, 254, `${name}`, "North")
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

  const guild = bot.guilds.cache.size("894634118267146272");
  var memberCount = guild.members.filter(member => !member.user.bot).size;
  const _GUILD_ID = member.guild.id;
  const _MEMBER_ID = member.user.id;
  const _MEMBER = member;
  const _SALUTE = [
    `**Hey!! ${_MEMBER} welcome to RottenVille Gang**, make sure to read all the Server Rules <#898963212433764373>, and start to get **Alpha Radiation ${putEmoji(
      bot,
      "901151325117636618"
    )}**`,
    `What? A new Survivor? **Welcome ${_MEMBER} to the RottenVille Gang, enjoy your stay!!!**`,
    `**Gang gang, We have a new member in our Gang, congrats ${_MEMBER}** and Welcome to RottenVille!`,
  ];
  const _RANDOM_SALUTE = _SALUTE[Math.floor(Math.random() * _SALUTE.length)];
  const _HELLO_CHANNEL = member.guild.channels.cache.find((ch) =>
    ch.name.includes("💬・general-chat")
  );
  const _SERVER_CHANNEL_ = member.guild.channels.cache.find((ch) =>
    ch.name.includes("📯・new-member")
  );


  downloadUser(memberImage, member.user.username).then(() => {
    delay(300).then(async function () {
      edit(
        `/../../../database/multimedia/images/users/avatar/${member.user.username}.png`,
        `database/multimedia/images/users/circleAvatar/${member.user.username}CircleImageR.png`,
        member.user.tag,
        member.user.username,
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
┊ _"protocol under develop"_・` +
          "`👹`" +
          `
┊
┊ **Member Verify <#950907434988367933> **
┊ you will get ** <@&895850023311540225> **
┊
┊ _If you have any question <#898983573607030834> or_
┊ **__ask for help on <#899003268473180230>__**
╰
    `
        ).attachFiles([
          `database/multimedia/images/magik/exports/${member.user.username}.png`,
        ])
        .setImage(`attachment://${member.user.username}.png`);


      try {
        _HELLO_CHANNEL.send(_RANDOM_SALUTE);
        _SERVER_CHANNEL_.send(
          `**Welcome ${_MEMBER} to RottenVille Lab!! Check this out before Verify.**`,
          _embed
        );
      } catch (error) {
        console.log("No se pudo enviar el welcome. " + error);
      }
    });
  });
};
