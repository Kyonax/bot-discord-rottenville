const { MessageEmbed } = require("discord.js");
const { putEmoji, getMember } = require("../../src/utils/misc/functions");
const { synchronous } = require("../utils/emojis/emojis.json");
const { noneColor, cleverColor } = require("../utils/color/color.json");
//StateManager
const StateManager = require("../../src/utils/database/StateManager");

module.exports.roleRewards = async (message, bot, level) => {
  //Inicialización de Variables
  let _role_id = "none";
  const _GUILD_ID = message.guild.id;
  const _MEMBER = getMember(message, message.author.id);
  const _USER_ID = message.guild.members.cache.get(message.author.id);
  const _NEW_LEVEL = parseInt(level);
  const _ROLE_MAP = [
    "900155894522871848", //GREAT 07
    "900156621538344970", //BADASS 09
    "900156934437629952", //SUPREME 11
    "900157377179951114", //INSANE 13
    "900157638636109845", //EPIC 15
    "900157638636109845", //LEGEND 17
    "900157638636109845", //GOD 21
    "900157638636109845", //SAITAMA 90
  ];

  //EMBED INIT
  const _EMBED = new MessageEmbed()
    .setThumbnail(message.author.displayAvatarURL())
    .setTitle(`**New Level** ${putEmoji(bot, synchronous.emojiID[0].levelup)}`)
    .setColor(noneColor)
    .addField("**Unlocked Server Level **", `Server Level: **${_NEW_LEVEL}**`);

  switch (_NEW_LEVEL) {
    case 7:
      _USER_ID.roles.add(_ROLE_MAP[0]);
      _USER_ID.roles.add("900155894522871848");
      _role_id = `<@&${_ROLE_MAP[0]}>`;
      break;
    case 9:
      _USER_ID.roles.add(_ROLE_MAP[1]);
      _USER_ID.roles.add("900156621538344970");
      _role_id = `<@&${_ROLE_MAP[1]}>`;
      break;
    case 11:
      _USER_ID.roles.add(_ROLE_MAP[2]);
      _USER_ID.roles.add("900156934437629952");
      _role_id = `<@&${_ROLE_MAP[2]}>`;
      break;
    case 13:
      _USER_ID.roles.add(_ROLE_MAP[3]);
      _USER_ID.roles.add("900157377179951114");
      _role_id = `<@&${_ROLE_MAP[3]}>`;
      break;
    case 15:
      _USER_ID.roles.add(_ROLE_MAP[4]);
      _USER_ID.roles.add("900157638636109845");
      _role_id = `<@&${_ROLE_MAP[4]}>`;
      break;
    case 17:
      _USER_ID.roles.add(_ROLE_MAP[5]);
      _USER_ID.roles.add("900157638636109845");
      _role_id = `<@&${_ROLE_MAP[5]}>`;
      break;
    case 21:
      _USER_ID.roles.add(_ROLE_MAP[6]);
      _USER_ID.roles.add("900157638636109845");
      _role_id = `<@&${_ROLE_MAP[6]}>`;
      break;
    case 90:
      _USER_ID.roles.add(_ROLE_MAP[7]);
      _USER_ID.roles.add("900157638636109845");
      _role_id = `<@&${_ROLE_MAP[7]}>`;
      break;
    default:
      return;
  }
  _EMBED.addField(
    `Leverl Reward ${putEmoji(bot, synchronous.emojiID[0].rewardbag)}`,
    `**New unlocked Role ${_role_id}**`
  );
  message.channel.send(`Congrats you have now a reward! ${_MEMBER}`, _EMBED);
};
