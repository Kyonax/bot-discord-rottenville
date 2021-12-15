//Importación especifica de Metodos - RichEmbed - putEmoji - Errors - nonecolor Color - afirmado Emoji
const { MessageEmbed } = require("discord.js");
const { putEmoji, getMember, initObjectMember } = require("../../utils/misc/functions");
const { noneColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { updateGuildRolePlayWork } = require("../../utils/database/functions");
const { addMessageToBin } = require("../../utils/misc/bin");
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
module.exports = class WorkCommand extends BaseCommand {
  constructor() {
    super(
      "citizen",
      ["ciudadano", "cargo", "ocupation"],
      "Command to put your **Ocupation in RottenVille**.",
      "work <@user> <nameWork>`",
      "Todos",
      "roleplay"
    );
  }
  async run(bot, message, args) {        
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();    
    const perm = new Perms();
    if (!message.member.roles.cache.some(role => role.name === '🏰 RottenVille Citizen')) return perm.citizenPerms(bot,message);
    //Inicialización de Variables - Usuario  || Validación - Usuario no permitido
    let autor = message.author;
    const member = getMember(message, args.join(" "));

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

    //Inicialización de Variables
    const work = args.slice(1).join(" ");
    const updateMemberWork = await updateGuildRolePlayWork(
      message.guild.id,
      member.id,
      work
    );
    StateManager.emit(
      "updateMemberWork",
      message.guild.id,
      member.id,
      work
    );
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].afirmado);    
    //Embed de confirmación
    let embed = new MessageEmbed()
      .setAuthor(
        `${message.author.username}'s DNI`,
        message.author.displayAvatarURL()
      )
      .setDescription(`${emoji} Succes Change of **Citizen Rol**.`)
      .setColor(noneColor);
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

StateManager.on(
  "updateModeratorMember",
  (guildID, memberID, moderatorMember) => {
    let ObjectMember = null;
    ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
    ObjectMember.moderatorMember = moderatorMember;
  }
);