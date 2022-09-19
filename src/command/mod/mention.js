const guildBankJSON = require("../../../database/misc/GuildBank.json");

const { MessageEmbed } = require("discord.js");
const BaseCommand = require("../../utils/structure/BaseCommand");
const {
  getMember,
  putEmoji,
  initObjectMember,
  numberWithCommas,
} = require("../../utils/misc/functions");
const {
  goldColor,
  cleverColor,
} = require("../../../database/utils/color/color.json");
const {
  updateGuildBankCoins,
  updateGuildMemberBoost,
  updateGuildLevel,
  updateGuildBankCoinsJSON,
} = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Mapa de pregijos guildCommandPrefix
const guildMembersBank = new Map();
const bankGuilds = new Map();
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
const fs = require("fs");

module.exports = class MentionCommand extends BaseCommand {
  constructor() {
    super(
      "mention",
      ["ment"],
      "Mention amount of times a role.",
      "mention`",
      "_***Everyone***_",
      "mention"
    );
  }
  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    message.delete().catch((O_o) => {});

    const ERR = new Error();
    const PERM = new Perms();
    const _MEMBER = getMember(message, message.author.id);

    let _jsonString,
      object_Guild_Member = null,
      _times = args[1];
    let [cmd, role] = message.content.split(" ");
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
      if (_member.guildID == _MEMBER.guild.id) {
        if (_MEMBER.id == _member.memberID) {
          object_Guild_Member = _member;
        }
      }
    });

    if (object_Guild_Member.moderatorMember !== 1)
      return PERM.moderatorPerms(bot, message);

    for (let index = 0; index < _times; index++) {
      message.channel.send(role).then((msg) => {
        msg.delete({ timeout: 5000, reason: "It had to be done." });
      });
    }
  }
};
