//Importación especifica de Metodos - getMember delay downloadUser circleImage findUserID putEmoji - RichEmbed - synksPerms - nonecolor Colors - levelup Emojis
const {
  getMember,
  delay,
  putEmoji,
  numberWithCommas
} = require("../../utils/misc/functions");
const {
  isVariableOnWeekJSON  
} = require("../../utils/database/functions");
const { circleImage, downloadUser } = require("../../utils/magik/functions");
const { MessageEmbed } = require("discord.js");
const { limit } = require("../../utils/logic/logicMember");
const { noneColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const guildMembersWeekJSON = require("../../../database/misc/GuildMembersWeek.json");
//Inicialización de js de Node.js
PNG = require("pngjs").PNG;
var fs = require("fs"),
  gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });

module.exports = class InventaryCommand extends BaseCommand {
  constructor() {
    super(
      "rank",
      ["ranking", "board", "puestos"],
      "Deploy a panel with the Rank information.",
      "rank`\n**Options:** `<user>`",
      "***Everyone***",
      "member"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    const member = getMember(message, args.join(" "));
    //Inicialización de Variable de Usuario
    let _jsonString,
      _jsonStringWeek,
      ObjectAutor = null,
      ObjectMemberWeek = null,
      ranking = [],
      ranking_week;
    //Inicialización Guild Prefix
    _jsonString = await fs.readFileSync(
      "./database/misc/GuildMembers.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );

    _jsonStringWeek = await fs.readFileSync(
      "./database/misc/GuildMembersWeek.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );

    JSON.parse(_jsonString).forEach((_member) => {
      if (_member.guildID === member.guild.id) {
        JSON.parse(_jsonStringWeek).forEach( async (_member_week) => {          
          if (_member_week.memberID === _member.memberID) {

            const isMemberIntoJSON = await isVariableOnWeekJSON(
              guildMembersWeekJSON,
              _member.memberID,
              "memberID",
              member.guild.id
            );           

            console.log(isMemberIntoJSON+` = ${_member.memberID}`)
              
            if (isMemberIntoJSON === "registered") {
              ObjectMemberWeek = _member_week;              
            }else {

              ObjectMemberWeek = {
                memberID: _member.id,
                guildID: message.guild.id,
                memberLanguage: "es",
                adminMember: 0,
                inmortalMember: 0,
                moderatorMember: 0,
                serverRank: 0,
                memberXP: 0,
                memberLevel: 1,
                memberBoost: 1,
                boostMemberTime: 0,
                warnings: 0,
              };                       
            }      
            
            console.log(`XP: ${ObjectMemberWeek.memberXP} ID: ${_member.guildID}`)            
            JSON.parse(_jsonStringWeek).push(ObjectMemberWeek);
          } 
        });        
      }
    });

    JSON.parse(_jsonString).forEach((_member) => {
      if (_member.guildID === member.guild.id) {
        if (message.author.id === _member.memberID) {
          ObjectAutor = _member;
        }

        if (_member.guildID === message.guild.id) {
          JSON.parse(_jsonStringWeek).forEach((_member_week) => {
            if (_member_week.guildID === message.guild.id) {
              if (_member_week.memberID === _member.memberID) {
                _member.memberXP = _member.memberXP - _member_week.memberXP;
                ranking.push(_member);

                ranking.sort(function (a, b) {
                  if (parseInt(a.memberXP) < parseInt(b.memberXP)) {
                    return 1;
                  }
                  if (parseInt(a.memberXP) > parseInt(b.memberXP)) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
                });
              }
            }
          });
        }
      }
    });

    const moderatorMember = ObjectAutor.moderatorMember;

    //Inicialización de Variables - Experiencia - Nivel - Boost

    //Emoji
    //Inicialización de Emojis y su Uso respectivo
    let emojiLevelUp = putEmoji(bot, synchronous.emojiID[0].levelup);

    //Mensaje para el Embed de Usuario para este Comando
    let embed = new MessageEmbed()
      .setThumbnail("https://i.imgur.com/mylTtoH.png")

      .setColor("#00ED90")
      .setFooter("RottenVille Level System")
      .setTimestamp();
    let iterator = 1,
      text_phrase = "none";

    ranking_week = ranking.filter((c, index) => {
      return ranking.indexOf(c) === index;
    });

    console.table(ranking);

    ranking_week.forEach((_member_rank) => {
      if (_member_rank.guildID === message.guild.id) {
        if (iterator <= 10) {
          text_phrase =
            text_phrase +
            `\n ` +
            "`" +
            parseInt(iterator) +
            ".` " +
            `<@${_member_rank.memberID}> ` +
            " **Weekly XP:** " +
            _member_rank.memberXP +
            putEmoji(bot, "899083263816122458");
        }
        iterator++;
      }
    });

    text_phrase = text_phrase.replace("none", "\n ");

    embed.addField(
      putEmoji(bot, "905441646362120232") +
        ` **${message.guild.name} Top 10 active members of the Week:**`,
      text_phrase,
      false
    );
    message.channel.send(
      `**<@${member.id}> look at the Server Ranking of the Week!! **${putEmoji(
        bot,
        "910545619238678538"
      )}`,
      embed
    );
    //Método de Descarga de Imágen
  }
};
