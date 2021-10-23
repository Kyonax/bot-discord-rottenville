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

module.exports = class CreditCommand extends (
  BaseCommand
) {
  constructor() {
    super(
      "credit",
      ["prestamo", "moneditas", "donation", "donacion"],
      "Comando para **Pedirle un Préstamo a Kyonax** de Kyo Shinys",
      "credit`",
      "_***Todos***_",
      "credit"
    );
  }
  async run(bot, message, args) {
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

    let object_Bank_Member = null;
    let object_Guild_Member = null;
    object_Guild_Member = initObjectMember(
      guilds,
      object_Guild_Member,
      _GUILD_ID,
      _MEMBER_ID
    );
    object_Bank_Member = initObjectMember(
      bankGuilds,
      object_Bank_Member,
      _GUILD_ID,
      _MEMBER_ID
    );
    
    let emoji = putEmoji(bot, synchronous.emojiID[0].synkoin);
    const _actual_Member_Coins = parseInt(object_Bank_Member.memberCoins);

    if (!object_Bank_Member.memberCoins)
      return ERR.noFindMember(bot, message, _MEMBER);

    if (object_Guild_Member.moderatorMember !== 1)
      return PERM.moderatorPerms(bot, message);

    if (object_Guild_Member.moderatorMember === 1) {
      const _MOD_CREDIT_BANK = _actual_Member_Coins + 100000;
      const UPDATE_MOD_CREDIT = updateGuildBankCoins(
        _GUILD_ID,
        _MEMBER_ID,
        _MOD_CREDIT_BANK
      );
      object_Bank_Member.memberCoins = _MOD_CREDIT_BANK;

      StateManager.emit(
        "updateMemberCoins",
        _GUILD_ID,
        _MEMBER_ID,
        _MOD_CREDIT_BANK
      );

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
      const UPDATE_INMORTAL_CREDIT = updateGuildBankCoins(
        _GUILD_ID,
        _MEMBER_ID,
        _INMORTAL_CREDIT_BANK
      );
      object_Bank_Member.memberCoins = _INMORTAL_CREDIT_BANK;

      StateManager.emit(
        "updateMemberCoins",
        _GUILD_ID,
        _MEMBER_ID,
        _INMORTAL_CREDIT_BANK
      );

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
      const UPDATE_ADMIN_CREDIT = updateGuildBankCoins(
        _GUILD_ID,
        _MEMBER_ID,
        _ADMIN_CREDIT_BANK
      );
      object_Bank_Member.memberCoins = _ADMIN_CREDIT_BANK;

      StateManager.emit(
        "updateMemberCoins",
        _GUILD_ID,
        _MEMBER_ID,
        _ADMIN_CREDIT_BANK
      );

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
    message.channel.send(`${_MEMBER} enhorabuena **Has pedido un Crédito por parte del Banco Mundo Kyonax !**`,EMBED);
  }
};

StateManager.on(
  "bankMembersFetched",
  (membersBank, guildID, memberID, memberCoins) => {
    guildMembersBank.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      memberCoins: memberCoins,
    });
    bankGuilds.set(guildID, {
      Member: membersBank,
    });
  }
);

StateManager.on(
  "bankMembersUpdate",
  (membersBank, guildID, memberID, memberCoins) => {
    guildMembersBank.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      memberCoins: memberCoins,
    });
    bankGuilds.set(guildID, {
      Member: membersBank,
    });
  }
);

StateManager.on("updateCoins", (guildID, memberID, newCoins) => {
  let objectBankMember = null;
  objectBankMember = initObjectMember(
    bankGuilds,
    objectBankMember,
    guildID,
    memberID
  );
  objectBankMember.memberCoins = newCoins;
});

StateManager.on(
  "membersFetched",
  (
    membersGuild,
    guildID,
    memberID,
    memberLanguage,
    adminMember,
    inmortalMember,
    moderatorMember,
    serverRank,
    memberXP,
    memberLevel,
    memberBoost,
    boostMemberTime,
    warnings
  ) => {
    guildMembers.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      memberLanguage: memberLanguage,
      adminMember: adminMember,
      inmortalMember: inmortalMember,
      moderatorMember: moderatorMember,
      serverRank: serverRank,
      memberXP: memberXP,
      memberLevel: memberLevel,
      memberBoost: memberBoost,
      boostMemberTime: boostMemberTime,
      warnings: warnings,
    });
    guilds.set(guildID, {
      Member: membersGuild,
    });
  }
);

StateManager.on(
  "membersUpdate",
  (
    membersGuild,
    guildID,
    memberID,
    memberLanguage,
    adminMember,
    inmortalMember,
    moderatorMember,
    serverRank,
    memberXP,
    memberLevel,
    memberBoost,
    boostMemberTime,
    warnings
  ) => {
    guildMembers.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      memberLanguage: memberLanguage,
      adminMember: adminMember,
      inmortalMember: inmortalMember,
      moderatorMember: moderatorMember,
      serverRank: serverRank,
      memberXP: memberXP,
      memberLevel: memberLevel,
      memberBoost: memberBoost,
      boostMemberTime: boostMemberTime,
      warnings: warnings,
    });
    guilds.set(guildID, {
      Member: membersGuild,
    });
  }
);

StateManager.on("updateAdminMember", (guildID, memberID, adminMember) => {
  let ObjectMember = null;
  ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
  ObjectMember.adminMember = adminMember;
});
