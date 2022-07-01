const guildMembersJSON = require("../../../database/misc/GuildMembers.json");
const guildBankJSON = require("../../../database/misc/GuildBank.json");
const fs = require("fs");
//Importación especifica de Metodos - RichEmbed - getMember putEmoji Functions - Errors - kyocolor Colors - synkoin Emoji
const { MessageEmbed } = require("discord.js");
const { roleRewards } = require("../../../database/conectors/roleRewards");
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
  updateGuildMemberXPJSON,
} = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { limit } = require("../../utils/logic/logicMember");
//Importación Clase de Objetos - Conector Error
const Api = require("../../utils/misc/api_discord_functions");
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapa de pregijos guildCommandPrefix
const guildMembersBank = new Map();
const bankGuilds = new Map();
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Pay
module.exports = class PayCommand extends BaseCommand {
  constructor() {
    super(
      "pay",
      ["sendAR", "payAR", "transfer"],
      "**Pay Levels, Boost, Merch, and trade with members** (Some of this are only avaible with RP).",
      "pay <type>`\n**Type:** `user`, `level`, `boost`\n**User:** `<user>` `<amount>`\n**Boost:** `<boost>`",
      "_***Everyone***_",
      "store"
    );
  }
  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => { });
    //Creación de Objetos
    const err = new Error(), perm = new Perms(), autor = getMember(message, message.author.id), member = getMember(message, args[1]), type = args[0];
    const ObjAuthorMember = await Api.getMember(autor.guild.id, message.author.id), ObjMember = await Api.getMember(member.guild.id, member.id), { perms } = ObjAuthorMember;
    if (perms.moderator !== 1) return perm.moderatorPerms(bot, message);
    console.log(ObjAuthorMember);
    console.log(ObjMember);
    //Creación de Mensajes Embed para el Comando
    let embed = new MessageEmbed()
      .setTitle(`**${member.displayName}'s Level Radiation**`)
      .setColor(goldColor)
      .setThumbnail(bot.user.displayAvatarURL())
      .setFooter("RottenBot radiation scanner")
      .setTimestamp();
    //Creación de Objeto Bank Member
    let _jsonString,
      _jsonString_bank,
      ObjectAuthor = null,
      ObjectBankMember = null,
      ObjectBankAuthor = null;
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

    _jsonString_bank = await fs.readFileSync(
      "./database/misc/GuildBank.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );

    JSON.parse(_jsonString_bank).forEach((_member) => {
      if (_member.guildID == member.guild.id) {


        if (member.id == _member.memberID) {
          ObjectBankMember = _member;
        }

        if (autor.id == _member.memberID) {
          ObjectBankAuthor = _member;
        }
      }
    });

    JSON.parse(_jsonString).forEach((_member) => {
      if (_member.guildID == member.guild.id) {
        if (autor.id == _member.memberID) {
          ObjectAuthor = _member;
        }
      }
    });

    if (!ObjectBankMember.memberCoins)
      return err.noFindMemberBank(bot, message);
    if (!isNaN(type)) return err.noTypeFoundPay(bot, message, type);
    //Types
    if (type.toLowerCase() === "user") {
      //Validación de variables - Monedas - Usuario
      if (autor.id === member.id) return err.noValidTargetPay(bot, message);
      if (!parseInt(args[2])) return err.noAmountDigit(bot, message);
      //Inicialización de Variables - Monedas de Usuario - Monedas de Autor
      let actualMemberCoins = parseInt(ObjectBankMember.memberCoins);
      let actualAuthorCoins = parseInt(ObjectBankAuthor.memberCoins);
      const updateMCoins = actualMemberCoins + parseInt(args[2]);
      const updateACoins = actualAuthorCoins - parseInt(args[2]);
      //Validación de Variables - No suficientes Monedas
      if (actualAuthorCoins < args[2])
        return err.dontHaveSynkoins(bot, message, autor.displayName);
      //Transferencia de Monedas - Autor - Usuario

      const updateBankJSON = await updateGuildBankCoinsJSON(
        guildBankJSON,
        message.guild.id,
        member.id,
        updateMCoins
      );

      const updateAuthorBankJSON = await updateGuildBankCoinsJSON(
        guildBankJSON,
        message.guild.id,
        autor.id,
        updateACoins
      );

      //Inicialización de Emojis y su Uso respectivo
      let emoji = putEmoji(bot, "905441645980422214");
      //Inicialización de Variable Razón de Transferencia
      let reason = "";
      if (args[3]) reason = `, ${args.slice(3).join(" ")}`;
      //Agregación al Embed
      embed.setDescription(
        `<@${autor.id}> has transferred **Rotten Points to** <@${member.id}>${reason}.`
      );
      embed.addField(
        "**Amount of Rotten Points**",
        `**${numberWithCommas(args[2])} ${emoji} Rotten Points.**`,
        true
      );
      embed.addField(
        `**Rotten Points remaining from ${message.author.username}**`,
        `**${numberWithCommas(updateACoins)} ${emoji} Rotten Points.**`,
        true
      );
    } else if (type.toLowerCase() === "boostd") {
      if (
        !message.member.roles.cache.some(
          (role) => role.name === "🏰 RottenVille Citizen"
        )
      )
        return perm.citizenPerms(bot, message);
      let boostB = 1800;
      let boostA = 3200;
      let boostPremium = 6000;

      let boostBv = 10;
      let boostAv = 50;
      let boostPremiumv = 100;

      let boostTimeBase = 1000;
      let boostTimeAvanzado = 3000;
      let boostPremiumTime = 9000;

      if (!args[1].toLowerCase()) return err.noBoostDigit(bot, message);
      switch (args[1]) {
        case "base":
          break;
        case "advanced":
          break;
        case "premium":
          break;
        default:
          err.noBoostFound(bot, member);
      }

      if (args[1] === "base") {
        let actualAuthorCoins = parseInt(ObjectBankAuthor.memberCoins);
        //Validación de Variables - No suficientes Monedas
        if (actualAuthorCoins < boostB)
          return err.dontHaveSynkoins(bot, message, autor.displayName);




        const updateMemberBoost = updateGuildMemberBoost(
          message.guild.id,
          autor.id,
          boostBv,
          boostTimeBase
        );
        StateManager.emit(
          "updateMemberBoost",
          message.guild.id,
          autor.id,
          boostBv,
          boostTimeBase
        );
        ObjectAuthor.boostMemberTime = boostTimeBase;
        ObjectAuthor.memberBoost = boostBv;
        //Coins
        const updateACoins = actualAuthorCoins - boostB;
        const updateAuthorCoins = await updateGuildBankCoins(
          message.guild.id,
          autor.id,
          updateACoins
        );
        //Update Map
        ObjectBankAuthor.memberCoins = updateACoins;
        //Emit Update
        StateManager.emit(
          "updateAuthorCoins",
          message.guild.id,
          autor.id,
          updateACoins
        );
        //Emojis
        //Inicialización de Emojis y su Uso respectivo
        const emojiBoostB = putEmoji(bot, synchronous.emojiID[0].boostb);
        //Inicialización de Emojis y su Uso respectivo
        const emojiSynkoins = putEmoji(bot, synchronous.emojiID[0].synkoin);
        //Mensaje Embed
        embed.addField(
          "**Exchanged Boost**",
          `<@${autor.id}> has redeemed the **Experience Base** boost ${emojiBoostB}`
        );
        embed.addField(
          "**Amount of Alpha Radiation**",
          `**${numberWithCommas(boostB)}** ${emoji} **Alpha Radiation.**`
        );
        embed.addField(
          `**Alpha Radiation remaining from ${autor.displayName}**`,
          `**${numberWithCommas(updateACoins)} ${emoji} Alpha Radiation.**`,
          true
        );
      } else if (args[1] === "advanced") {
        let actualAuthorCoins = parseInt(ObjectBankAuthor.memberCoins);
        //Validación de Variables - No suficientes Monedas
        if (actualAuthorCoins < boostA)
          return err.dontHaveSynkoins(bot, message, autor.displayName);
        const updateMemberBoost = updateGuildMemberBoost(
          message.guild.id,
          autor.id,
          boostAv,
          boostTimeAvanzado
        );
        StateManager.emit(
          "updateMemberBoost",
          message.guild.id,
          autor.id,
          boostAv,
          boostTimeAvanzado
        );
        ObjectAuthor.boostMemberTime = boostTimeAvanzado;
        ObjectAuthor.memberBoost = boostAv;
        //Coins
        const updateACoins = actualAuthorCoins - boostA;
        const updateAuthorCoins = await updateGuildBankCoins(
          message.guild.id,
          autor.id,
          updateACoins
        );
        //Update Map
        ObjectBankAuthor.memberCoins = updateACoins;
        //Emit Update
        StateManager.emit(
          "updateAuthorCoins",
          message.guild.id,
          autor.id,
          updateACoins
        );
        //Emojis
        //Inicialización de Emojis y su Uso respectivo
        const emojiBoostA = putEmoji(bot, synchronous.emojiID[0].boosta);
        //Inicialización de Emojis y su Uso respectivo
        const emojiSynkoins = putEmoji(bot, synchronous.emojiID[0].synkoin);
        //Mensaje Embed
        embed.addField(
          "**Exchanged Boost**",
          `<@${autor.id}> has redeemed the **Experience Advanced** boost ${emojiBoostA}`
        );
        embed.addField(
          "**Amount of Alpha Radiation**",
          `**${numberWithCommas(boostA)}** ${emoji} **Alpha Radiation**`
        );
        embed.addField(
          `**Alpha Radiation remaining from ${autor.displayName}**`,
          `**${numberWithCommas(updateACoins)} ${emoji} Alpha Radiation.**`,
          true
        );
      } else if (args[1] === "premium") {
        let actualAuthorCoins = parseInt(ObjectBankAuthor.memberCoins);
        //Validación de Variables - No suficientes Monedas
        if (actualAuthorCoins < boostPremium)
          return err.dontHaveSynkoins(bot, message, autor.displayName);
        const updateMemberBoost = updateGuildMemberBoost(
          message.guild.id,
          autor.id,
          boostPremiumv,
          boostPremiumTime
        );
        StateManager.emit(
          "updateMemberBoost",
          message.guild.id,
          autor.id,
          boostPremiumv,
          boostPremiumTime
        );
        ObjectAuthor.boostMemberTime = boostPremiumTime;
        ObjectAuthor.memberBoost = boostPremiumv;
        //Coins
        const updateACoins = actualAuthorCoins - boostPremium;
        const updateAuthorCoins = await updateGuildBankCoins(
          message.guild.id,
          autor.id,
          updateACoins
        );
        //Update Map
        ObjectBankAuthor.memberCoins = updateACoins;
        //Emit Update
        StateManager.emit(
          "updateAuthorCoins",
          message.guild.id,
          autor.id,
          updateACoins
        );
        //Emojis
        //Inicialización de Emojis y su Uso respectivo
        const emojiBoostPremium = putEmoji(bot, synchronous.emojiID[0].boostp);
        //Inicialización de Emojis y su Uso respectivo
        const emojiSynkoins = putEmoji(bot, synchronous.emojiID[0].synkoin);
        //Mensaje Embed
        embed.addField(
          "**Exchanged Boost**",
          `<@${autor.id}> has redeemed the **Experience Premium** boost ${emojiBoostPremium}`
        );
        embed.addField(
          "**Amount of Alpha Radiation**",
          `**${numberWithCommas(boostPremium)}** ${emoji} **Alpha Radiation.**`,
          true
        );
        embed.addField(
          `**Alpha Radiation remaining from ${autor.displayName}**`,
          `**${numberWithCommas(updateACoins)} ${emoji} Alpha Radiation.**`,
          true
        );
      }
    } else if (args[0] === "leveld") {
      if (
        !message.member.roles.cache.some(
          (role) => role.name === "🏰 RottenVille Citizen"
        )
      )
        return perm.citizenPerms(bot, message);
      let actualAuthorCoins = parseInt(ObjectBankAuthor.memberCoins);
      let actualAuthorLevel = parseInt(ObjectAuthor.memberLevel);
      let actualAuthorXP = parseInt(ObjectAuthor.memberXP);
      const basePrice = Math.floor(
        actualAuthorLevel * 9000 + actualAuthorXP / 9
      );
      //Validación de Variables - No suficientes Monedas
      if (actualAuthorCoins < basePrice)
        return err.dontHaveSynkoins(bot, message, autor.displayName);
      const limitAuthorXP = limit(actualAuthorXP, actualAuthorLevel);
      const boughtXP = limitAuthorXP - actualAuthorXP;
      actualAuthorLevel++;
      const updateMemberLevel = updateGuildLevel(
        message.guild.id,
        autor.id,
        actualAuthorLevel,
        boughtXP
      );
      StateManager.emit(
        "updateMemberLevel",
        message.guild.id,
        autor.id,
        actualAuthorLevel,
        boughtXP
      );
      ObjectAuthor.memberLevel = actualAuthorLevel;
      ObjectAuthor.memberXP = boughtXP;
      //Coins
      const updateACoins = actualAuthorCoins - basePrice;
      const updateAuthorCoins = await updateGuildBankCoins(
        message.guild.id,
        autor.id,
        updateACoins
      );
      //Update Map
      ObjectBankAuthor.memberCoins = updateACoins;
      //Emit Update
      StateManager.emit(
        "updateAuthorCoins",
        message.guild.id,
        autor.id,
        updateACoins
      );
      //Emojis
      const levelChannel = message.guild.channels.cache.find(
        (ch) => ch.name === "🎄・level-up"
      );
      //Inicialización de Emojis y su Uso respectivo
      const emojiLevelUp = putEmoji(bot, synchronous.emojiID[0].levelup);
      //Inicialización de Emojis y su Uso respectivo
      const emojiSynkoins = putEmoji(bot, synchronous.emojiID[0].synkoin);
      //Mensaje Embed Level
      const levelUpEmbed = new MessageEmbed()
        .setTitle(`**Level Reached** ${emojiLevelUp}`)
        .setAuthor(message.author.username, bot.user.displayAvatarURL())
        .setColor(cleverColor)
        .setThumbnail(message.author.displayAvatarURL())
        .addField(
          "**Survivor RottenVille**",
          `<@${message.author.id}> reached a new **Level**.`
        )
        .addField("**Level Reached**", `New Level **${actualAuthorLevel}**`)
        .setFooter(
          "RottenVille population stats - XP & Level ・Interact to gain more XP"
        )
        .setTimestamp();
      //Mensaje Embed
      embed.addField(
        "**Exchanged Level**",
        `<@${autor.id}> has redeemed a **NEW Level** ${emojiLevelUp}.`
      );
      embed.addField(
        "**Amount of Alpha Radiation**",
        `**${numberWithCommas(basePrice)}** ${emoji} **Alpha Radition.**`,
        true
      );
      embed.addField(
        `**Alpha Radiation remaining from ${autor.displayName}**`,
        `**${numberWithCommas(updateACoins)} ${emoji} Alpha Radiation.**`,
        true
      );
      roleRewards(message, bot, actualAuthorLevel);
      levelChannel.send(levelUpEmbed);
    }
    //Envio de Mensaje Embed al canal en el que se uso el Comando
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 30000, reason: "It had to be done." });
    });
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
