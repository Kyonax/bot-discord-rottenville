//Importación especifica de Metodos - findUserID putEmoji Functions
const { MessageEmbed } = require("discord.js");
const {
  initObjectMember,
  getMember,
  putEmoji,
  replaceRoleItems,
} = require("../misc/functions.js");
const {
  goldColor,
  noneColor,
} = require("../../../database/utils/color/color.json");
const RTSolBattlesVotes = require("../../../database/utils/adds/votes.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error.js");
const Perms = require("../../../database/conectors/perm.js");
//Importación de Usuario
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de la Clase Padre y Conexión con la Base de Datos
const BaseCommand = require("../structure/BaseCommand.js");
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Inicialización de js de Node.js
var fs = require("fs"),
  gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });
//Exportación de Comando Poll
module.exports = class BattlesCommand extends BaseCommand {
  constructor() {
    super(
      "brewards",
      ["battlesrewards", "battlewinner", "bwinner"],
      "Send the data about the RottenVille Battle Selection running.",
      "brewards`",
      "_***Admin - Inmortales - Moderadores***_",
      "mod"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    const autor = getMember(message, message.author.id);
    const _objVotes = Object.keys(RTSolBattlesVotes.member);
    const _sizeVotes = Object.keys(RTSolBattlesVotes.member).length;
    const _player1 = args[0];
    const _player2 = args[1];
    let _p1Votes = 0;
    let _p2Votes = 0;
    let _arrayIDs = [];
    let _arrayP1 = [];
    let _arrayP2 = [];
    let _arrayWinner = [];

    let winner = "none";
    let loser = "none";

    let ObjectAuthor = null,
      _jsonString;
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

    JSON.parse(_jsonString).forEach((_member) => {
      if (_member.guildID == autor.guild.id) {
        if (message.author.id == _member.memberID) {
          ObjectAuthor = _member;
        }
      }
    });
    //Permisos de Autor
    const { moderatorMember } = ObjectAuthor;
    //Validaciones - Permisos de Uso - Usuario - Rol - Rol Encontrado
    if (moderatorMember !== 1) return perm.moderatorPerms(bot, message);

    _objVotes.forEach((member) => {
      _arrayIDs.push(member);
    });

    for (let index = 0; index < _sizeVotes; index++) {
      let _voteMember = RTSolBattlesVotes.member[_arrayIDs[index]];
      if (_voteMember.p1 != 0) {
        _arrayP1.push(_arrayIDs[index]);
        _p1Votes += 1;
      } else if (_voteMember.p2 != 0) {
        _arrayP2.push(_arrayIDs[index]);
        _p2Votes += 1;
      }
    }

    if (_p1Votes > _p2Votes) {
      winner = _player1;
      loser = _player2;
      _arrayP1.forEach((memberID) => {
        _arrayWinner.push(getMember(message, memberID));
      });
    } else if (_p2Votes > _p1Votes) {
      winner = _player2;
      loser = _player1;
      _arrayP2.forEach((memberID) => {
        _arrayWinner.push(getMember(message, memberID));
      });
    } else if (_p1Votes === _p2Votes) {
      winner = "DRAW";
    }

    let embed = new MessageEmbed()
      .setTitle(
        putEmoji(bot, "910558106008817764") +
          " RTSolBattles Results Tournament Selection"
      )
      .setColor("#15E08C")
      .setFooter("RottenVille Automate Rewards System");

    if (winner != "DRAW") {
      embed.setDescription(
        `**${putEmoji(
          bot,
          "918868797367148604"
        )} ${_player1} Votes: ${_p1Votes} VS ${putEmoji(
          bot,
          "918869733783269436"
        )} ${_player2} Votes: ${_p2Votes} | Winner of this Tournament Selection is ${winner} | ${
          _sizeVotes * 100
        } AR ${putEmoji(bot, "905441646362120232")} Reward**`
      );
      embed.addField(
        "Voters Winners |" +
          `** + 220 AR ${putEmoji(bot, "905441646362120232")} Reward**`,
        _arrayWinner
      );
    } else {
      embed.setDescription(`**The Tournament Selection finish in DRAW VOTES**`);
    }

    message.channel.send(
      `${putEmoji(
        bot,
        "910545619238678538"
      )} **<@&895850023311540225> Check the Results of the Tournament Battles.**`,
      embed
    );
  }
};
