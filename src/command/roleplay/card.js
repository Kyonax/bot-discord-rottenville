//Importación especifica de Metodos - RichEmbed - getMember formatDate findUserID putEmoji Functions - Errors - levelup Emoji - nonecolor Color
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const {
  numberWithCommas,
  getMember,
  formatDate,
  putEmoji,
  initObjectMember,
} = require("../../utils/misc/functions");
let { levelRoleRewards } = require("../../../database/conectors/rewards");
const { limit } = require("../../utils/logic/logicMember");
//Importación de Archivos JS creados por Kyonax
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { noneColor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapas
const rolePlayMembers = new Map();
const guildsRoleplay = new Map();
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando DNI
module.exports = class DniCommands extends BaseCommand {
  constructor() {
    super(
      "card",
      ["vip", "pass"],
      "Command to show the **VIP CARD ROTTENVILLE**.",
      "dni`\n**Options** `<user>`",
      "Todos",
      "Citizen"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    if (!message.member.roles.cache.some(role => role.name === '🏰 RottenVille Citizen')) return perm.citizenPerms(bot,message);
    //Inicialización de Variables Autor - Usuario - Ingreso al Servidor - Role - Length Array - Id de Usuario
    let autor = message.author;
    const member = getMember(message, args.join(" "));

    let ObjectAuthor = null;
    let ObjectMember = null;
    ObjectMember = initObjectMember(
      guildsRoleplay,
      ObjectMember,
      message.guild.id,
      member.id
    );
    ObjectAuthor = initObjectMember(
      guilds,
      ObjectAuthor,
      message.guild.id,
      autor.id
    );
    if (ObjectMember === null)
      return err.noFindMember(bot, message, member.displayName);
    const { moderatorMember } = ObjectAuthor;
    
    let embedCard = new MessageEmbed()
    .setTitle(`${putEmoji(bot,"910558106008817764")} RT◎ VIP PASS CARD - ${member.displayName}`)
    .setColor("#41F389")
    .attachFiles([
      `./database/multimedia/images/demo/server/${member.id}-min.png`,
    ])
    .setImage(`attachment://${message.author.id}-min.png`);

    // - Usuarios Restringidos - Canal Existente
    if (moderatorMember === 0) {
        if (member.id !== autor.id) return perm.moderatorPerms(bot, message);          
        return message.channel.send(embedCard).then((msg) => {
          msg.delete({ timeout: 60000, reason: "It had to be done." });
        });
      } else {      
        message.channel.send(embedCard).then((msg) => {
          msg.delete({ timeout: 60000, reason: "It had to be done." });
        });
      }

}};


StateManager.on(
    "membersRolePlayFetched",
    (
      membersGuild,
      guildID,
      memberID,
      gameRolePlay,
      rolePlayRank,
      memberXP,
      memberLevel,
      memberAge,
      memberRespect,
      memberWork,
      memberRelation,
      memberBiography
    ) => {
      rolePlayMembers.set(memberID, {
        memberID: memberID,
        guildID: guildID,
        gameRolePlay: gameRolePlay,
        rolePlayRank: rolePlayRank,
        memberXP: memberXP,
        memberLevel: memberLevel,
        memberAge: memberAge,
        memberRespect: memberRespect,
        memberWork: memberWork,
        memberRelation: memberRelation,
        memberBiography: memberBiography,
      });
      guildsRoleplay.set(guildID, {
        Member: membersGuild,
      });
    }
  );
  
  StateManager.on(
    "membersRolePlayUpdate",
    (
      membersGuild,
      guildID,
      memberID,
      gameRolePlay,
      rolePlayRank,
      memberXP,
      memberLevel,
      memberAge,
      memberRespect,
      memberWork,
      memberRelation,
      memberBiography
    ) => {
      rolePlayMembers.set(memberID, {
        memberID: memberID,
        guildID: guildID,
        gameRolePlay: gameRolePlay,
        rolePlayRank: rolePlayRank,
        memberXP: memberXP,
        memberLevel: memberLevel,
        memberAge: memberAge,
        memberRespect: memberRespect,
        memberWork: memberWork,
        memberRelation: memberRelation,
        memberBiography: memberBiography,
      });
      guildsRoleplay.set(guildID, {
        Member: membersGuild,
      });
    }
  );

  
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