//Importación especifica de Metodos - findUserID putEmoji Functions
const { MessageEmbed } = require("discord.js");
const {
  initObjectMember,
  getMember,
  putEmoji,
  replaceRoleItems,
} = require("../../utils/misc/functions.js");
const { goldColor } = require("../../../database/utils/color/color.json");

//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de Usuario
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de la Clase Padre y Conexión con la Base de Datos
const BaseCommand = require("../../../src/utils/structure/BaseCommand.js");
const StateManager = require("../../utils/database/StateManager");
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Poll
module.exports = class BattlesCommand extends BaseCommand {
  constructor() {
    super(
      "battles",
      ["batalla", "btl", "battle"],
      "Command to create **RottenVille-Battles**.",
      "battle`\n**Rol Announcement:** `<rol>`\n**Members:** `@competitor_1` `@competitor_2`",
      "_***Pilares - Inmortales - Moderadores***_",
      "mod"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    const autor = getMember(message, message.author.id);
    let number = args[3];
    if (!number) number = 1;
    let [cmd, role] = message.content.split(" ");
    let _competitor_1 = args[1];
    let _competitor_2 = args[2];
    let ObjectAuthor = null;
    ObjectAuthor = initObjectMember(
      guilds,
      ObjectAuthor,
      message.guild.id,
      autor.id
    );
    //Permisos de Autor
    const { moderatorMember } = ObjectAuthor;
    //Validaciones - Permisos de Uso - Usuario - Rol - Rol Encontrado
    if (moderatorMember !== 1) return perm.moderatorPerms(bot, message);
    if (!role.includes("@")) {
      role = "@everyone";
    }
    role = replaceRoleItems(role);
    let gRole = message.guild.roles.cache.find((rol) => rol.id == role);
    //Creación del Mensaje Embed
    let embed = new MessageEmbed()
      .setTitle(`**Solana RottenVille-Battles | Tournament 🏁**`)
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(
        `**🥊 The competitor with more reactions wins!! (Every Reaction cost 100 AR ${putEmoji(
          bot,
          "905441646362120232"
        )})**

${putEmoji(
  bot,
  "918868797367148604"
)} **<@&918875434639323136> #55 VS ${putEmoji(
          bot,
          "918869733783269436"
        )} <@&918875434639323136> #219 **

**You have only 24Hrs,** if you vote for the winner Rotten you can win AR ${putEmoji(
          bot,
          "905441646362120232"
        )}, **all the radiation voted for the Winner Rotten goes directly to their exposure.**

${putEmoji(bot, "910558104838615090")} Happy Tournament! - RottenVille Team

`
      )
      .setColor("#8942C0")
      .addField("**User**", `${autor}`, true)
      .addField(
        `**Vote for your favorite - [${gRole.name}]**`,
        `**Send it from ${message.channel}**`,
        true
      )
      .attachFiles([
        `database/multimedia/images/demo/server/RTSolBattlesTournament${number}.png`,
      ])
      .setImage(`attachment://RTSolBattlesTournament${number}.png`)
      .setFooter("Solana RottenVille-Battles Tournament Selection")
      .setTimestamp();

    const encChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "🎁・rottenville-battles"
    );
    if (!encChannel) {
      return message.guild.channels
        .create("encuestas", {
          type: "text",
          permissionOverwrites: [
            {
              id: message.guild.roles.everyone,
              deny: ["SEND_MESSAGES", "ATTACH_FILES"],
              allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
            },
          ],
        })
        .catch((err) => console.log(err));
    }

    message.channel.send(
      `**RTSolBattles Tournament ${gRole}!! | ${_competitor_1} VS ${_competitor_2}** ${putEmoji(
        bot,
        "910558105031544842"
      )}`
    );
    message.channel.send(embed);
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
  "updateModeratorMember",
  (guildID, memberID, moderatorMember) => {
    let ObjectMember = null;
    ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
    ObjectMember.moderatorMember = moderatorMember;
  }
);
