//Importación especifica de Metodos - RichEmbed - putEmoji - Errors - nonecolor Color - afirmado Emoji
const { MessageEmbed } = require("discord.js");
const {
  putEmoji,
  getMember,
  initObjectMember,
} = require("../../utils/misc/functions");
const { noneColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { updateGuildRotten } = require("../../utils/database/functions");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Age
module.exports = class AgeCommand extends BaseCommand {
  constructor() {
    super(
      "rotten",
      ["nft"],
      "Command to put your **Rotten Number**.",
      "rotten <number>`",
      "Everyone",
      "DNI"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    if (
      !message.member.roles.cache.some(
        (role) => role.name === "🏰 RottenVille Citizen"
      )
    )
      return perm.citizenPerms(bot, message);
    //Inicialización de Variables Autor - Usuario - Ingreso al Servidor - Role - Length Array - Id de Usuario
    let autor = message.author;
    const member = getMember(message, args.join(" "));
    if (!args[0]) return err.noRottenDigit(bot, message);

    let ObjectAutor = null;
    ObjectAutor = initObjectMember(
      guilds,
      ObjectAutor,
      message.guild.id,
      message.author.id
    );

    const { moderatorMember } = ObjectAutor;
    //Validación es un Número o no
    if (message.author.id != member.id) {
      if (moderatorMember !== 1) return perm.moderatorPerms(bot, message);
    }
    //Inicialización de variable Edad
    const rotten = args.slice(1).join(" ");
    const updateMemberAge = await updateGuildRotten(
      message.guild.id,
      member.id,
      "**<@&918875434639323136> #** " + rotten
    );
    StateManager.emit(
      "updateGuildRotten",
      message.guild.id,
      member.id,
      "**<@&918875434639323136> #** " + rotten
    );
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].afirmado);
    //Embed de confirmación
    let embed = new MessageEmbed()
      .setAuthor(
        `${message.author.username}'s DNI`,
        message.author.displayAvatarURL()
      )
      .setDescription(`${emoji} succes change of **Rotten** <@${member.id}>.`)
      .setColor(noneColor);
    //Envio de mensaje Embed al canal para luego ser eliminado en 10seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 10000, reason: "It had to be done." });
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

