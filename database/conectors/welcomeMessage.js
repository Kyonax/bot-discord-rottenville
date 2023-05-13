const { MessageEmbed } = require("discord.js");
//Inicialización de js de Node.js
var jimp = require('jimp');
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
  try{
  circleImage(firstImage, username);
  delay(4000).then(function () {
    resizeImage(username);
  });
  delay(7000).then(function () {
    secondStep(secondImage, name, username, size);
  });
  delay(9000).then(function () {
    thirdStep(secondImage,username);
  });
  } catch (err) {
    console.log(err);
  }
}

async function thirdStep(inImage, username) {
  var images = [`database/multimedia/images/magik/exports/${username}.png`, inImage], jimps = [];

  for(var i = 0; i < images.length; i++){
    jimps.push(jimp.read(images[i]));
  }

  Promise.all(jimps).then(function (data){
    return Promise.all(jimps);
  }).then(function(data){
    data[0].composite(data[1],47,55);

    data[0].write(`database/multimedia/images/magik/exports/${username}.png`, function(){
      console.log("Jimp add Image");
    })
  })
}

async function secondStep(inImage, name, username, size) {
  try{
  gm(backgroundNewUser)
    .gravity("East")
    .fill("#fb163b")
    .font("Helvetica-Bold", 40)
    .drawText(6, 212, `${name}`, "North")
    .fill("#fb163b")
    .font("Helvetica", 20)
    .drawText(136, 254, `${"#" + size + 1}`, "North")
    .write(`database/multimedia/images/magik/exports/${username}.png`, function (err) {
      console.log("Done! SecondStep");
      if (err) console.log("Error Second Step!: " + err);
    });
  } catch (err) {
    console.log(err);
  }
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
    `**Hola! ${_MEMBER} Bienvenido a Isacademi**,  <#928319200139812864>, and start to get **Rotten Points ${putEmoji(
      bot,
      "1102305790477484142"
    )}**`,
    `What? A new Survivor? **Welcome ${_MEMBER} to the RottenVille Gang, enjoy your stay!!!**`,
    `**Gang gang, We have a new member in our Gang, congrats ${_MEMBER}** and Welcome to RottenVille!`,
    `**The RottenVerse welcomes you ${_MEMBER}** with open arms, be the best version of you, be a Rotten`,
    `Yo!!! ${_MEMBER} I thought you were not coming, I'm very happy to have you right here, ready to become a Rotten?`,
    `**Are you ${_MEMBER} right? Welcome to RottenVille!!** The Rottens DAO was waiting for your arrive!!`,
    `**The Metaverse is very huge ${_MEMBER},** We are very happy that you made the decision to be part of the RottenVerse`,
    `Let's build the RottenVerse together ${_MEMBER}, enjoy the Community`,
    `Diamond hand entry the chat ${_MEMBER}`,
    ``
  ];
  const _RANDOM_SALUTE = _SALUTE[Math.floor(Math.random() * _SALUTE.length)] + ` | **Verify as a Member on <#960905065906991144> & if you are a Holder go to <#958311149659631637> - Stay up-to-date on <#898963695336583169>**`;
  const _HELLO_CHANNEL = member.guild.channels.cache.find((ch) =>
    ch.name.includes("✨・new-member")
  );
  const _SERVER_CHANNEL_ = member.guild.channels.cache.find((ch) =>
    ch.name.includes("✨・new-member")
  );


  downloadUser(memberImage, member.user.id).then(() => {
    delay(1000).then(async function () {
      edit(
        `/../../../database/multimedia/images/users/avatar/${member.user.id}.png`,
        `/home/ubuntu/bot-discord-rottenville/database/multimedia/images/users/circleAvatar/${member.user.id}CircleImageR.png`,
        member.user.tag,
        member.user.id,
        memberCount
      );
    });
    return delay(15000).then(async function () {


      let _embed = new MessageEmbed()
        .setColor("#fb163b")
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter(
          "📣 Página Web Isacademi ・check out our https://isacademi.com"
        )
        .setDescription(
          `**╭・—— » ` +
          "`🍎`" +
          ` — Isacademi tu Academía —-**
┊ **Sigue las reglas del Servidor para**
┊ comenzar a explorar en la Academía
┊ <#1098500908180058182> ・` +
          "`🏁`" +
          `
┊
┊ **Información Importante de Isacademi**
┊ _"<#1098491956516102254>"_・` +
          "`📑`" +
          `
┊
┊ **FAQ Server <#1098491672704319518> **
┊ abre un ticket sólo si lo necesitas.
┊
┊ _Anuncios <#1098491285427474474>_
┊ **__Planes <#1098491956516102254>__**
╰
    `
        ).attachFiles([
          `database/multimedia/images/magik/exports/${member.user.id}.png`,
        ])
        .setImage(`attachment://${member.user.id}.png`);


      try {
        _SERVER_CHANNEL_.send(
          `**Bienvenido ${_MEMBER} a Isacademi! Observa esto antes de seguir.**`,
          _embed
        );
      } catch (error) {
        console.log("No se pudo enviar el welcome. " + error);
      }
    });
  });
};
