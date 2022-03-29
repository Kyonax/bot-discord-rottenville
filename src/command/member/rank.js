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
    if (message.guild.id != "894634118267146272") return;
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
      ranking = [],
      ranking_week = [];
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
      if (message.author.id == _member.memberID) {
        ObjectAutor = _member;
      }

      if (_member.guildID === message.guild.id) {
        JSON.parse(_jsonStringWeek).forEach((_member_week) => {
          if (_member_week.memberID == _member.memberID) {
            if (_member_week.guildID == message.guild.id) {
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
    });

    const moderatorMember = ObjectAutor.moderatorMember;

    //Inicialización de Variables - Experiencia - Nivel - Boost

    //Emoji
    //Inicialización de Emojis y su Uso respectivo
    let emojiLevelUp = putEmoji(bot, synchronous.emojiID[0].levelup);

    //Mensaje para el Embed de Usuario para este Comando
    let embed = new MessageEmbed()
      .setTitle(`**${message.guild.name} Weekly Ranking**`)
      .setThumbnail("https://i.imgur.com/mylTtoH.png")

      .setColor("#00ED90")
      .setFooter("RottenVille Level System")
      .setTimestamp();
    let iterator = 1;

    ranking.forEach((_member_rank) => {
      if (iterator <= 11) {
        embed.addField(
          "**User**",
          `<@${_member_rank.memberID}> ` +
            " **Normal Rank:** " +
            _member_rank.serverRank +
            " **Weekly Rank:** " +
            parseInt(iterator),
          false
        );
      }
      iterator++;
    });

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
