//Importación especifica de Metodos - MessageEmbed - getMember putEmoji initObjectMember Function - kyocolor
const { MessageEmbed } = require("discord.js");
const {
  getMember,
  putEmoji,
  initObjectMember,
  numberWithCommas,
} = require("../../utils/misc/functions");
const { goldColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapa de Miembros
const guildMembersBank = new Map();
const bankGuilds = new Map();
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Bank
module.exports = class BankCommand extends BaseCommand {
  constructor() {
    super(
      "exposure",
      ["coins", "banco", "monedas", "synkoins"],
      "Deploy a panel with the exposure information.",
      "bank`\n**Admin Options:** `<user>`",
      "_***Everyone***_",
      "member"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Inicialización para el Usuario escrito
    let autor = message.author;
    let member = getMember(message, args[0]);
    //Creación de Objeto Bank Member
    let ObjectMember = null;
    let ObjectBankMember = null;
    ObjectBankMember = initObjectMember(
      bankGuilds,
      ObjectBankMember,
      message.guild.id,
      member.id
    );
    ObjectMember = initObjectMember(
      guilds,
      ObjectMember,
      message.guild.id,
      message.author.id
    );
    if (ObjectMember === null)
      return err.noFindMember(bot, message, member.displayName);
    const { inmortalMember } = ObjectMember;
    const { memberCoins } = ObjectBankMember;
    if (!memberCoins) {
      return err.noFindMember(bot, message, member.displayName);
    }
    //Validación de Permisos Synks
    if (parseInt(inmortalMember) === 0) {
      if (member.id != autor.id) return perm.inmortalPerms(bot, message);
    }
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].synkoin);
    //Creación del Mensaje Embed del Comando
    let embed = new MessageEmbed()
      .setTitle(`**${member.displayName}'s Level Radiation**`)
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(
        `${putEmoji(bot, synchronous.emojiID[0].afirmado)} Checking <@${
          member.id
        }> Alpha Radiation.`
      )
      .setColor("#b4e634")
      .addField("**User**", `**[${member.displayName}]**`, true)
      .addField(
        " **Alpha Radiation**",
        `**${numberWithCommas(memberCoins)} ${emoji} Becquerel.**`,
        true
      )
      .addFields({ name: "\u200B", value: "\u200B", inline: true })
      .addField("**Beta Radiation**", `**0 ${emoji} Becquerel.**`, true)
      .addField("**Gamma Radiation**", `**0 ${emoji} Becquerel.**`, true)
      .addFields({ name: "\u200B", value: "\u200B", inline: true })
      .setFooter("RottenBot radiation scanner")
      .setTimestamp();
    //Lectura del Mensaje - Envío al canal Destinado - Mensaje que usa el Comando Eliminado
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 60000, reason: "It had to be done." });
    });
  }
};

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

StateManager.on("updateMemberCoins", (guildID, memberID, memberCoins) => {
  let ObjectBankMember = null;
  ObjectBankMember = initObjectMember(
    bankGuilds,
    ObjectBankMember,
    guildID,
    memberID
  );
  ObjectBankMember.memberCoins = memberCoins;
});

StateManager.on("updateAuthorCoins", (guildID, memberID, memberCoins) => {
  let ObjectBankMember = null;
  ObjectBankMember = initObjectMember(
    bankGuilds,
    ObjectBankMember,
    guildID,
    memberID
  );
  ObjectBankMember.memberCoins = memberCoins;
});

StateManager.on("updateInmortalMember", (guildID, memberID, inmortalMember) => {
  let ObjectMember = null;
  ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
  ObjectMember.inmortalMember = inmortalMember;
});
