//Importación especifica de Metodos - RichEmbed - getMember findUserID putEmoji Function - Errors - caution cancelado Emojis - cautioncolor Color - Perms
const { MessageEmbed } = require("discord.js");
const { putEmoji, initObjectMember } = require("../../utils/misc/functions");
const { updateGuildMemberWarns } = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { cautionColor } = require("../../../database/utils/color/color.json");
//Importación de paquetes JS de Node.js
const fs = require("fs");
const ms = require("ms");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Warn
module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super(
      "warn",
      ["wr", "advertencia"],
      "Make a warn to a User.",
      "warn <user> <reason>`",
      "**Admin - Inmortales - Moderadores**",
      "mod"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Inicialización de Variables - Usuario - Tiempo - Rol Muted
    let autor = message.author;
    let member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    let reason = args.join(" ").slice(22);
    let warnChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "💬・mod"
    );


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
    
    if (ObjectMember === null)
      return err.noFindMember(bot, message, member.displayName);
    
    let { warnings } = ObjectMember;
    const { moderatorMember } = ObjectAutor;
    //Validación de Variables Permisos - Usuario - Razón - Auto Warn - Permisos Restringidos - Canal para enviar El Embed
    if (moderatorMember != 1) return perm.moderatorPerms(bot, message);
    if (!member) return err.noUserDigitWarn(bot, message);
    if (!reason) return err.noReasonDigitWarn(bot, message);
    if (member.id === message.author.id)
      return err.noValidTargetWarn(bot, message);
    if (member.roles.cache.get("623715872506118154"))
      return perm.cantCatchSynks(bor, message);
    warnings++;
    //await updateGuildMemberWarns(message.guild.id, member.id, warnings);
    //StateManager.emit("updateWarnings", message.guild.id, member.id, warnings);
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].caution);
    if (message.guild.id != synchronous.guildID) emoji = "⚠";
    //Mensaje Embed de este Comando
    let warnEmbed = new MessageEmbed()
      .setColor(cautionColor)
      .setTitle(`**Warns** ${emoji}`)
      .setThumbnail(member.user.displayAvatarURL())
      .addField("**Usuario con Warn**", `${member}`, true)
      .addField("**ID**", `***${member.id}***`, true)
      .addField("\u200b", "\u200b", true)
      .addField("**Canal**", message.channel, true)
      .addField("**Número de Warnings**", `**#${warnings}** ${emoji}`, true)
      .addField("\u200b", "\u200b", true)
      .addField("**Razón**", reason)
      .setTimestamp()
      .setFooter(
        `Warn resivido por ${message.author.tag}`,
        message.author.displayAvatarURL()
      );
    //Envio de Mensaje
    warnChannel.send(warnEmbed);
    //Amonestaciones y Castigos
    if (warnings === 3) {
      let mutetime = "60s";
      let muteEmbed = new MessageEmbed()
        .setTitle(`Castigo por Warnings ${emoji}`)
        .setColor(cautionColor)
        .addField(
          "**Usuario Muteado**",
          `<@${member.id}> ha sido **muteado!** por ${ms(ms(mutetime))}`
        )
        .setTimestamp();
      let desMuteEmbed = new MessageEmbed()
        .setTitle(`Castigo por Warnings ${emoji}`)
        .setColor(cautionColor)
        .addField(
          "**Usuario Desmuteado**",
          `<@${member.id}> ha sido **liberado!**`
        )
        .setTimestamp();
      let muterole = message.guild.roles.cache.find(
        (rol) => rol.name === "Muted"
      );
      if (!muterole) return;
      await member.roles.add(muterole.id);
      message.channel.send(muteEmbed).then((msg) => {
        msg.delete({ timeout: 10000, reason: "It had to be done." });
      });
      setTimeout(function () {
        member.roles.remove(muterole.id);
        message.channel.send(desMuteEmbed).then((msg) => {
          msg.delete({ timeout: 10000, reason: "It had to be done." });
        });
      }, ms(mutetime));
    }
    if (warnings == 5) {
    }
    if (warnings == 7) {
    }
  }
};
