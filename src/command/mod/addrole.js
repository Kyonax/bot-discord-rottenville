//Importación especifica de Metodos - RichEmbed - getMember putEmoji replaceRolItems findUserID Functions - Errors - Perms - firehomecolor Colors - rol Emoji
const { MessageEmbed } = require("discord.js");
const {
  putEmoji,
  replaceRoleItems,
  initObjectMember,
} = require("../../utils/misc/functions");
const {
  updateGuildInmortalMember,
  updateGuildModeratorMember,
} = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { addMessageToBin } = require("../../utils/misc/bin");
//Importación Clase de Objetos - Conector Error - Perms
const Api = require("../../utils/misc/api_discord_functions");
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const fs = require("fs");
//Exportación de Comando Addrole
module.exports = class AddRoleCommand extends BaseCommand {
  constructor() {
    super(
      "addrole",
      ["ar", "roleadd", "agregarrol", "ascender"],
      "Add a new Role to a member from the Server.",
      "addrole <user> <@rol>`",
      "***Admin - Inmortales - Moderadores***",
      "mod"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error(), perm = new Perms(), autor = getMember(message, message.author.id);
    const ObjAuthorMember = await Api.getMember(autor.guild.id, message.author.id), { perms } = ObjAuthorMember;
    if (perms.moderator !== 1) return perm.moderatorPerms(bot, message);
    //Inicialización de Variables
    let member = args[0];
    if (!member) return err.noUserDigitARole(bot, message);    
    let role = args[1];
    let _jsonString, ObjectMember = null, ObjectAutor = null        
    //Inicialización Guild Prefix
    _jsonString = await fs.readFileSync('./database/misc/GuildMembers.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }
    })        

    JSON.parse(_jsonString).forEach(_member => {   
      if (_member.guildID == member.guild.id) {    
      if (member.id == _member.memberID) {
        ObjectMember = _member           
      }
      
      if(message.author.id == _member.memberID){
        ObjectAutor = _member
      }}
    });         
    
    const { moderatorMember, adminMember, inmortalMember } = ObjectAutor;
    if (moderatorMember !== 1) return perm.moderatorPerms(bot, message);
    if (member == "allmembers") {
      let members_array = message.guild.members.cache;
      members_array.forEach((member) => {
        if (!role) return err.noARoleDigit(bot, message);
        role = replaceRoleItems(role);
        let gRole = message.guild.roles.cache.find((rol) => rol.id === role);
        if (!gRole) return err.noRoleFound(bot, message, role);
        //Validaciones Permisos
        if (role === "898939960915275816")
          return err.roleUnavaible(bot, message);
        if (role === "898934755519770654")
          return perm.roleUnavaible(bot, message);
        if (role === "898942896298930207")
          return perm.inmortalPerms(bot, message);
        //Ejecución de AddRole
        if (member.roles.cache.has(gRole.id));
        member.roles.add(gRole.id);
        //Inicialización de Emojis y su Uso respectivo
        let emojiAfirmado = putEmoji(bot, synchronous.emojiID[0].afirmado);
        //allmembers
        message.channel.send(
          `${emojiAfirmado} **Se ha agregado el Rol ${role} al usuario ${member}**`
        );
      });
      return;
    } else {
      member = message.guild.member(
        message.mentions.users.first() ||
          message.guild.members.cache.get(args[0])
      );
    }

    if (ObjectMember === null)
      return err.noFindMember(bot, message, member.displayName);
    //Validaciones - Permisos de Uso - Usuario - Rol - Rol Encontrado
    if (!role) return err.noARoleDigit(bot, message);
    role = replaceRoleItems(role);
    let gRole = message.guild.roles.cache.find((rol) => rol.id === role);
    if (!gRole) return err.noRoleFound(bot, message, role);
    //Validaciones Permisos
    if (role === "867484139506237441") return err.roleUnavaible(bot, message);
    if (role === "826150701713195059")
      if (adminMember !== 1) return perm.synksPerms(bot, message);
    if (role === "867482378817110016")
      if (inmortalMember !== 1) return perm.inmortalPerms(bot, message);
    //Ejecución de AddRole
    if (member.roles.cache.has(gRole.id));
    await member.roles.add(gRole.id);
    //Agregando permisos a usuario en el Archivo Json
    if (role == "826150701713195059") {
      try {
        await updateGuildInmortalMember(message.guild.id, member.id, 1);
      } catch (err) {
        console.log(err);
      }
      try {
        await updateGuildModeratorMember(message.guild.id, member.id, 1);
      } catch (err) {
        console.log(err);
      }
      ObjectMember.inmortalMember = 1;
      ObjectMember.moderatorMember = 1;     
    }
    if (role == "867484139506237441") {
      try {
        await updateGuildModeratorMember(message.guild.id, member.id, 1);
      } catch (err) {
        console.log(err);
      }
      ObjectMember.moderatorMember = 1;     
    }
    //Inicialización de Emojis y su Uso respectivo
    let emojiRol = putEmoji(bot, synchronous.emojiID[0].rol);
    let emojiAfirmado = putEmoji(bot, synchronous.emojiID[0].afirmado);
    //Mensaje Embed para el Comando
    let embed = new MessageEmbed()
      .setTitle(`Sert Alliance Roles ${emojiAfirmado}`)
      .setDescription(`Se le ha otorgado un nuevo Rol a <@${member.id}>.`)
      .setColor(gRole.color)
      .addField("**Usuario**", `**[${member.displayName}]**`, true)
      .addField("**Rol**", `${emojiRol} <@&${gRole.id}> `, true)
      .addField("**Usuarios con el Rol**", `**${gRole.members.size}** ⚡`, true)

      .setTimestamp();
    let permsArray = [];
    let amountLines = 34;
    let draw = "";
    gRole.permissions.toArray().forEach((perms) => {
      let add = "";
      if (perms.length % 2 !== 0) add = "-";
      draw = "-".repeat(Math.floor((amountLines - perms.length) / 2));
      permsArray.push("|[" + draw + "]|" + perms + "|[" + draw + add + "]|");
    });
    embed.addField(
      `**Permisos de Rol [${permsArray.length}] - Otorgados**`,
      "```css\n" + permsArray.join("\n") + "```"
    );
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 30000, reason: "It had to be done." });
    });
  }
};