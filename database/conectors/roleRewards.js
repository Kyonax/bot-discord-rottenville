const { MessageEmbed } = require("discord.js");
const { putEmoji, getMember } = require("../../src/utils/misc/functions");
const { synchronous } = require("../utils/emojis/emojis.json");
const { noneColor, cleverColor } = require("../utils/color/color.json");
//StateManager
const StateManager = require("../../src/utils/database/StateManager");

module.exports.roleRewards = async (message, bot, level) => {
  //Inicialización de Variables
  let _role_id = "none"
  const _GUILD_ID = message.guild.id;
  const _MEMBER = getMember(message,message.author.id);
  const _USER_ID = message.guild.members.cache.get(message.author.id);
  const _NEW_LEVEL = parseInt(level);  
  const _ROLE_MAP = [
    "767979647547211796", //GREAT 07
    "767980124716531713", //BADASS 09
    "767980541256925184", //SUPREME 11
    "767980761537445909", //INSANE 13
    "767981086101209088", //EPIC 15
    "767981559037820990", //LEGEND 17
    "767981783777804308", //GOD 21
    "767982547098533889" //SAITAMA 90    
  ];

  //EMBED INIT
  const _EMBED = new MessageEmbed()
  .setThumbnail(message.author.displayAvatarURL())
  .setTitle(`**Nivel Alcanzado** ${putEmoji(bot, synchronous.emojiID[0].levelup)}`)
  .setColor(noneColor)
  .addField(
    "**Nuevo nivel desbloqueado**",
    `Nivel del Servidor **${_NEW_LEVEL}**`
  );

  switch (_NEW_LEVEL) {        
    case 7:
      _USER_ID.roles.add(_ROLE_MAP[0]);   
      _USER_ID.roles.add("849326419376472095")   
      _role_id = `<@&${_ROLE_MAP[0]}>`;
      break;
    case 9:
      _USER_ID.roles.add(_ROLE_MAP[1]);
      _USER_ID.roles.add("849326419376472095")
      _role_id = `<@&${_ROLE_MAP[1]}>`;
      break;
    case 11:
      _USER_ID.roles.add(_ROLE_MAP[2]);
      _USER_ID.roles.add("849326419376472095")
      _role_id = `<@&${_ROLE_MAP[2]}>`;
      break;
    case 13:
      _USER_ID.roles.add(_ROLE_MAP[3]);
      _USER_ID.roles.add("849326419376472095")
      _role_id = `<@&${_ROLE_MAP[3]}>`;
      break;
    case 15:
      _USER_ID.roles.add(_ROLE_MAP[4]);
      _USER_ID.roles.add("849326419376472095")
      _role_id = `<@&${_ROLE_MAP[4]}>`;
      break;
    case 17:
      _USER_ID.roles.add(_ROLE_MAP[5]);
      _USER_ID.roles.add("849326419376472095")
      _role_id = `<@&${_ROLE_MAP[5]}>`;
      break;
    case 21:
      _USER_ID.roles.add(_ROLE_MAP[6]);
      _USER_ID.roles.add("849326419376472095")
      _role_id = `<@&${_ROLE_MAP[6]}>`;
      break;
    case 90:
      _USER_ID.roles.add(_ROLE_MAP[7]);
      _USER_ID.roles.add("849326419376472095")
      _role_id = `<@&${_ROLE_MAP[7]}>`;
      break;
    default:
      return;      
  }
  _EMBED.addField(
    `Recompensa de Nivel ${putEmoji(bot, synchronous.emojiID[0].rewardbag)}`,
    `**Nuevo Rol Desbloqueado ${_role_id}**`
  );  
  message.channel.send(`¡Enhorabuena tienes una nueva recompensa! ${_MEMBER}`,_EMBED);
};
