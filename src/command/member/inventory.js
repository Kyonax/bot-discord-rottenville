//Importación especifica de Metodos - getMember delay downloadUser circleImage findUserID putEmoji - RichEmbed - synksPerms - nonecolor Colors - levelup Emojis
const {
  getMember,
  delay,
  putEmoji,
  numberWithCommas,
} = require("../../utils/misc/functions");
const { circleImage, downloadUser } = require("../../utils/magik/functions");
const { MessageEmbed } = require("discord.js");
const { limit } = require("../../utils/logic/logicMember");
const { noneColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
const Api = require("../../utils/misc/api_discord_functions")
const Discord = require('../../utils/misc/discord_functions');
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Inicialización de js de Node.js
PNG = require("pngjs").PNG;
var fs = require("fs"),
  gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });
//Rutas de las imagenes
let barPercnt = "Bar0.png";
let background = `database/multimedia/images/barLevel/${barPercnt}`;
//Metodo de Edicion
async function edit(
  firstImage,
  secondImage,
  xp,
  level,
  lastxp,
  name,
  userColor,
  rank,
  nickname
) {
  const resultThird = await thirdStep(
    secondImage,
    name,
    background,
    xp,
    level,
    lastxp,
    userColor,
    rank,
    nickname,
    firstImage
  );
}
async function thirdStep(
  inImage,
  name,
  background,
  xp,
  level,
  lastxp,
  userColor,
  rank,
  nickname,
  firstImage
) {
  const resultSecond = await secondStep(
    background,
    xp,
    level,
    lastxp,
    name,
    userColor,
    rank,
    nickname,
    firstImage
  );
  delay(2500).then(async function () {
    imageMagick(
      `database/multimedia/images/magik/exports/background${name}Text.jpg`
    )
      .resize(1000, 300)
      .composite(inImage)
      .in("-compose", "Over")
      .in("-geometry", "200x200+43+50")
      .write(
        `database/multimedia/images/magik/exports/bar${name}Level.png`,
        function (err) {
          if (err) console.log("Error 3 Step!: " + err);
        }
      );
  });
}
async function secondStep(
  inImage,
  xp,
  level,
  lastxp,
  name,
  userColor,
  rank,
  nickname,
  firstImage
) {
  const resultCircle = await circleImage(firstImage, name);
  delay(1000).then(async function () {
    let sizeXP = 120;
    if (xp.length > 8) {
      sizeXP = 110;
    }
    gm(inImage)
      .gravity("Center")
      .fill(userColor)
      .fontSize(160)
      .drawText(
        -500 + nickname.length * 10 * 2,
        450,
        `${nickname + ""}`,
        "North"
      )
      .font("Helvetica-Bold", 140)
      .drawText(1400, 450, `Nivel: ${level}`, "North")
      .fontSize(sizeXP)
      .drawText(800, 1010, `${xp}xp / `, "North")
      .fill("#18191C")
      .fontSize(sizeXP)
      .drawText(1100 + lastxp.length * 12 * 4, 1010, `${lastxp}xp`, "North")
      .fill(userColor)
      .fontSize(120)
      .drawText(-500, 1010, `Rank: #${rank}`, "North")
      .write(
        `database/multimedia/images/magik/exports/background${name}Text.jpg`,
        function (err) {
          if (err) console.log(err);
        }
      );
  });
}
module.exports = class InventaryCommand extends BaseCommand {
  constructor() {
    super(
      "inventory",
      ["lvl", "nivel", "level", "inventario", "xp"],
      "Deploy a panel with the Level information.",
      "inventary`\n**Options:** `<user>`",
      "***Everyone***",
      "member"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => { });
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Inicialización de Variable de Usuario
    const member = getMember(message, args.join(" "));
    const ObjMember = await Api.getMember(member.guild.id, member.user.id);
    const ObjGuild = await Api.getGuild(message.guild.id);

    const { id, language, rank, warnings, status, perms } = ObjMember;
    let next_level = limit(status.xp, status.level);

    await Discord.limitToChannel(message, err, "👽・level-up", ObjGuild.owner);

    let img_member = member.user.displayAvatarURL({
      format: "png",
      dynamic: false,
      size: 128,
    });

    if (id === undefined) return err.noFindMember(bot, message, member.displayName);
    if (message.author.id != member.id) {
      if (perms.moderator != 1) return perm.moderatorPerms(bot, message);
    }

    //BarLevel
    let addBar = "none";
    switch (true) {
      case member.roles.cache.get("763467841181450251") != undefined:
        addBar = "MR";
        break;
      case member.roles.cache.get("763468272003186706") != undefined:
        addBar = "Synk";
        break;
      case member.roles.cache.get("766816088024940584") != undefined:
        addBar = "Admin";
        break;
      case member.roles.cache.get("849496528020307989") != undefined:
        addBar = "Twitch";
        break;
      case member.roles.cache.get("849674093242482708") != undefined:
        addBar = "Premium";
        break;
      case member.roles.cache.get("776064895795855391") != undefined:
        addBar = "GhostBooster";
        break;
      case member.roles.cache.get("849703338667802704") != undefined:
        addBar = "Twitch";
        break;
      case member.roles.cache.get("767982547098533889") != undefined:
        addBar = "Saitama";
        break;
      case member.roles.cache.get("767981783777804308") != undefined:
        addBar = "God";
        break;
      case member.roles.cache.get("767981559037820990") != undefined:
        addBar = "Legend";
        break;
      case member.roles.cache.get("767981086101209088") != undefined:
        addBar = "Epic";
        break;
      case member.roles.cache.get("767980761537445909") != undefined:
        addBar = "Insane";
        break;
      case member.roles.cache.get("767980541256925184") != undefined:
        addBar = "Supreme";
        break;
      case member.roles.cache.get("767979647547211796") != undefined:
        addBar = "Badass";
        break;
      case member.roles.cache.get("767979647547211796") != undefined:
        addBar = "Great";
        break;
      default:
        addBar = "Follower";
        break;
    }

    switch (true) {
      case status.xp <= next_level * 0.05:
        barPercnt = `Bar0${addBar}.png`;
        background = `database/multimedia/images/barLevel/${barPercnt}`;
        break;
      case status.xp <= next_level * 0.1 && status.xp > next_level * 0.05:
        barPercnt = `Bar10${addBar}.png`;
        background = `database/multimedia/images/barLevel/${barPercnt}`;
        break;
      case status.xp <= next_level * 0.2 && status.xp > next_level * 0.1:
        barPercnt = `Bar20${addBar}.png`;
        background = `database/multimedia/images/barLevel/${barPercnt}`;
        break;
      case status.xp <= next_level * 0.3 && status.xp > next_level * 0.2:
        barPercnt = `Bar30${addBar}.png`;
        background = `database/multimedia/images/barLevel/${barPercnt}`;
        break;
      case status.xp <= next_level * 0.4 && status.xp > next_level * 0.3:
        barPercnt = `Bar40${addBar}.png`;
        background = `database/multimedia/images/barLevel/${barPercnt}`;
        break;
      case status.xp <= next_level * 0.5 && status.xp > next_level * 0.4:
        barPercnt = `Bar50${addBar}.png`;
        background = `database/multimedia/images/barLevel/${barPercnt}`;
        break;
      case status.xp <= next_level * 0.6 && status.xp > next_level * 0.5:
        barPercnt = `Bar60${addBar}.png`;
        background = `database/multimedia/images/barLevel/${barPercnt}`;
        break;
      case status.xp <= next_level * 0.7 && status.xp > next_level * 0.6:
        barPercnt = `Bar70${addBar}.png`;
        background = `database/multimedia/images/barLevel/${barPercnt}`;
        break;
      case status.xp <= next_level * 0.8 && status.xp > next_level * 0.7:
        barPercnt = `Bar80${addBar}.png`;
        background = `database/multimedia/images/barLevel/${barPercnt}`;
        break;
      case status.xp <= next_level * 0.9 && status.xp > next_level * 0.8:
        barPercnt = `Bar90${addBar}.png`;
        background = `database/multimedia/images/barLevel/${barPercnt}`;
        break;
      case status.xp > next_level * 0.9:
        barPercnt = `Bar100${addBar}.png`;
        background = `database/multimedia/images/barLevel/${barPercnt}`;
        break;
    }

    //Emoji
    //Inicialización de Emojis y su Uso respectivo
    let emojiLevelUp = putEmoji(bot, synchronous.emojiID[0].levelup);
    let emojiWarning = putEmoji(bot, "899085106428411964");
    let emojiBoost = null;

    switch (status.boost) {
      case 1:
        emojiBoost = "";
        break;
      case 10:
        emojiBoost = putEmoji(bot, synchronous.emojiID[0].boostb);
        break;
      case 50:
        emojiBoost = putEmoji(bot, synchronous.emojiID[0].boosta);
        break;
      case 100:
        emojiBoost = putEmoji(bot, synchronous.emojiID[0].boostp);
        break;
    }

    //Mensaje para el Embed de Usuario para este Comando
    let embed = new MessageEmbed()
      .setTitle(`**${member.displayName} Experience Server**`)
      .setThumbnail("https://i.imgur.com/mylTtoH.png")
      .addField("**User**", `**[${member.displayName}]**`, true)
      .addField("**Level**", `**${status.level}** ${emojiLevelUp}`, true)
      .addField(
        "**XP**",
        `**${numberWithCommas(status.xp) + putEmoji(bot, "899083263816122458")}**`,
        true
      )
      .addField(
        "**Rank**",
        `**#${rank + " " + putEmoji(bot, "899084173455814676")}**`,
        true
      )
      .addField("**Warnings**", `**${warnings}** ${emojiWarning}`, true)
      .addField(
        "**Level Boosts**",
        `**${putEmoji(bot, "899083263816122458")} x ${status.boost}** ${emojiBoost}`,
        true
      )/*
      .addField(
        "**Weekly XP | 1 Week = 1 NFT EVENT**",
        `**${numberWithCommas(actual_week_xp) + putEmoji(bot, "899083263816122458")} in just 1 Week | ${message.guild.name} NFT**`,
        false
      )*/
      .attachFiles([
        `./database/multimedia/images/magik/exports/bar${message.author.id}Level.png`,
      ])
      .setImage(`attachment://bar${message.author.id}Level.png`)
      .setColor(noneColor)
      .setFooter("RottenVille Level System")
      .setTimestamp();
    //Método de Descarga de Imágen
    downloadUser(img_member, message.author.id).then(() => {
      delay(100).then(async function () {
        const resultImageMagik = await edit(
          `/../../../database/multimedia/images/users/avatar/${message.author.id}.png`,
          `database/multimedia/images/users/circleAvatar/${message.author.id}CircleImage.png`,
          numberWithCommas(status.xp) + "",
          status.level,
          numberWithCommas(next_level) + "",
          message.author.id,
          member.displayHexColor,
          rank + "",
          member.displayName
        ).then(() => {
          delay(3000).then(async function () {
            message.channel.send(
              `**<@${member.id}> Look your Inventory!! **${putEmoji(
                bot,
                "910545619238678538"
              )}`,
              embed
            );
          });
        });
      });
    });


  }
};
