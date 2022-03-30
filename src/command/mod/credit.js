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
  updateGuildLevel, updateGuildBankCoinsJSON
} = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
const StateManager = require("../../utils/database/StateManager");
//Mapa de pregijos guildCommandPrefix
const guildMembersBank = new Map();
const bankGuilds = new Map();
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
const fs = require("fs");

module.exports = class CreditCommand extends BaseCommand {
  constructor() {
    super(
      "credit",
      ["prestamo", "moneditas", "donation", "donacion"],
      "Add liquidity to an Account.",
      "credit`",
      "_***Everyone***_",
      "credit"
    );
  }
  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    message.delete().catch((O_o) => {});

    const ERR = new Error();
    const PERM = new Perms();
    const _MEMBER = getMember(message, message.author.id);
    const _MEMBER_ID = message.author.id;
    const _GUILD_ID = message.guild.id;

    let EMBED = new MessageEmbed()
      .setTitle(`**${_MEMBER.displayName}'s Bank**`)
      .setColor(goldColor)
      .setThumbnail("https://i.imgur.com/OXIkW3Q.png")
      .setFooter("Banco Internacional Mundo Kyonax !")
      .setTimestamp();

    let _jsonString, _jsonString_bank, object_Guild_Member = null, object_Bank_Member = null        
    //Inicialización Guild Prefix
    _jsonString = await fs.readFileSync('./database/misc/GuildMembers.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }
    })

    _jsonString_bank = await fs.readFileSync('./database/misc/GuildBank.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }
    })

    JSON.parse(_jsonString_bank).forEach(_member => {  
      if (_member.guildID == member.guild.id) {     
      if(_MEMBER.id == _member.memberID) {
        object_Bank_Member = _member           
      }      }
    });

    JSON.parse(_jsonString).forEach(_member => {       
      if (_member.guildID == member.guild.id) {
      if (_MEMBER.id == _member.memberID) {
        object_Guild_Member = _member           
      }      }
    });        
    

    let emoji = putEmoji(bot, synchronous.emojiID[0].synkoin);
    const _actual_Member_Coins = parseInt(object_Bank_Member.memberCoins);

    if (!object_Bank_Member.memberCoins)
      return ERR.noFindMember(bot, message, _MEMBER);

    if (object_Guild_Member.moderatorMember !== 1)
      return PERM.moderatorPerms(bot, message);

    if (object_Guild_Member.moderatorMember === 1) {
      const _MOD_CREDIT_BANK = _actual_Member_Coins + 100000;
      
      const updateBankJSON = await updateGuildBankCoinsJSON(guildBankJSON, _GUILD_ID, _MEMBER_ID,_MOD_CREDIT_BANK);            

      EMBED.setDescription(
        `<@${_MEMBER_ID}> ha pedido una **Inyección de Capital a** <@248204538941538308> la deuda externa aumentó.`
      );
      EMBED.addField(
        "**Monto del Crédito**",
        `**${numberWithCommas("100000")} ${emoji} Kyo Shinys**`,
        true
      );
      EMBED.addField(
        `**Fondos Restantes de Kyonax.**`,
        `**Infinito ${emoji} Kyo Shinys.**`,
        true
      );
    }
    if (object_Guild_Member.inmortalMember === 1) {

      const _INMORTAL_CREDIT_BANK = _actual_Member_Coins + 200000;

      const updateBankJSON = await updateGuildBankCoinsJSON(guildBankJSON, _GUILD_ID, _MEMBER_ID,_INMORTAL_CREDIT_BANK);            
    
      EMBED.setDescription(
        `<@${_MEMBER_ID}> ha pedido una **Inyección de Capital a** <@248204538941538308> la deuda externa aumentó.`
      );
      EMBED.addField(
        "**Monto del Crédito**",
        `**${numberWithCommas("200000")} ${emoji} Kyo Shinys**`,
        true
      );
      EMBED.addField(
        `**Fondos Restantes de Kyonax**`,
        `**Infinito ${emoji} Kyo Shinys.**`,
        true
      );
    }
    if (object_Guild_Member.adminMember === 1) {
      const _ADMIN_CREDIT_BANK = _actual_Member_Coins + 3000000;

      const updateBankJSON = await updateGuildBankCoinsJSON(guildBankJSON, _GUILD_ID, _MEMBER_ID,_ADMIN_CREDIT_BANK);                  

      EMBED.setDescription(
        `<@${_MEMBER_ID}> ha pedido una **Inyección de Capital a** <@248204538941538308> la deuda externa aumentó.`
      );
      EMBED.addField(
        "**Monto del Crédito**",
        `**${numberWithCommas("3000000")} ${emoji} Kyo Shinys**`,
        true
      );
      EMBED.addField(
        `**Fondos Restantes de Kyonax**`,
        `**Infinito ${emoji} Kyo Shinys.**`,
        true
      );
    }
    message.channel.send(
      `${_MEMBER} enhorabuena **Has pedido un Crédito por parte del Banco Mundo Kyonax !**`,
      EMBED
    );
  }
};