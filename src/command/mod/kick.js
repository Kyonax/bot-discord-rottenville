//Importación especifica de Metodos - RichEmbed - getMember findUserID putEmojiID Functions - Errors - Perms - warningcolor Color - warning Emoji
const { MessageEmbed } = require("discord.js");
const {
  getMember,
  putEmoji,
  initObjectMember,
} = require("../../utils/misc/functions");
const { warningColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const fs = require("fs");
//Exportación de Comando Bondage
module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super(
      "kick",
      ["kc", "patear", "vetealv", "kickeado"],
      "Kick an User from the Discord Server.",
      "kick <user> <reason>`",
      "Admin - Inmortales",
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
    //Inicialización de Variables  - Usuario - Razón - Canal al que se mandará el Mensaje Embed
    let autor = message.author;
    let member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    let reason = args.join(" ").slice(22);
    let kickChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "💬・text-mod"
    );
    if (!kickChannel) {
      return message.guild.channels
        .create("💬・text-mod", {
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

    let _jsonString, ObjectAutor = null        
    //Inicialización Guild Prefix
    _jsonString = await fs.readFileSync('./database/misc/GuildMembers.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }
    })        

    JSON.parse(_jsonString).forEach(_member => {      
      if (_member.guildID == member.guild.id) {             
      if(message.author.id == _member.memberID){
        ObjectAutor = _member
      }}
    });     
    
    const { inmortalMember } = ObjectAutor;
    //Validación de Variables - Permisos - Usuario - Razón - AutoBanneo - Usuarios Restringidos - Canal Existente
    if (inmortalMember != 1) return perm.inmortalPerms(bot, message);
    if (!member) return err.noUserDigitKick(bot, message);
    if (!reason) return err.noReasonDigitKick(bot, message);
    if (member.id === autor.id) return err.noValidTargetKick(bot, message);
    if (member.roles.cache.get("766816088024940584"))
      return perm.cantCatchSynks(bot, message);
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].warning);    
    //Mensaje Embed del Comando
    let embed = new MessageEmbed()
      .setColor(warningColor)
      .setTitle(`**Kicks** ${emoji}`)
      .setThumbnail(member.user.displayAvatarURL())
      .addField("**Usuario Kickeado**", `**[${member.displayName}]**`, true)
      .addField(`**ID**`, `***${member.id}***`, true)
      .addField("**Canal**", message.channel, true)
      .addField("**Razón**", reason)
      .setTimestamp()
      .setFooter(`Kickeado por ${autor.tag}`, autor.displayAvatarURL());
    //Eliminación del mensaje que usó el Comando - Usuario Kickeado - Envio del Mensaje al Canal Correspondiente
    message.guild.member(member).kick(reason);
    kickChannel.send(embed);
  }
};
