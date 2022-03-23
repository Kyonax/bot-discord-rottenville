//Importación especifica de Metodos - RichEmbed - getMember findUserId putEmoji Functions - Errors - Perms - danger Color - danger Emoji
const { MessageEmbed } = require("discord.js");
const {
  putEmoji,
  initObjectMember,
  deleteObjectMember,
  formatDate,
} = require("../../utils/misc/functions");
const {
  insertMemberBans,
  deleteMember,
  deleteMemberBank,
  deleteMemberRolePlay,
} = require("../../utils/database/functions");
const { dangerColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Ban
module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super(
      "ban",
      ["bann", "banned", "baneado", "baneadito", "bancito"],
      "Ban a User from the Discord Server.",
      "ban <user> <reason>`",
      "***Admins***",
      "mod"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Inicialización de Variables - Canal - Usuario - Razón - Longitud - ID de Usuario
    let banChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "💬・text-mod"
    );
    let autor = message.author;
    let member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    let reason = args.join(" ").slice(22);
    let _jsonString, ObjectAutor = null        
    //Inicialización Guild Prefix
    _jsonString = await fs.readFileSync('./database/misc/GuildMembers.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }
    })        

    JSON.parse(_jsonString).forEach(_member => {                   
      if(message.author.id == _member.memberID){
        ObjectAutor = _member
      }
    });         
    
    const { adminMember } = ObjectAutor;
    //Validación de Variables - Permisos de Comandos - Falta de Usuario - Falta de Razón - Auto Baneo
    // - Usuarios Restringidos - Canal Existente
    if (adminMember !== 1) return perm.synksPerms(bot, message);
    if (!member) return err.noUserDigitBan(bot, message);
    if (member.id === message.author.id)
      return err.noValidTargetBan(bot, message);
    if (!reason) return err.noReasonDigit(bot, message);
    if (member.roles.cache.get("766816088024940584"))
      return perm.cantCatchSynks(bot, message);
    await insertMemberBans(
      message.guild.id,
      member.id,
      member.username,
      formatDate(member.joinedAt),
      autor.tag
    ).then(() => {
      console.log("Usuario Baneado Agregado a la Tabla de Bans");
    });
    await deleteMember(message.guild.id, member.id);
    await deleteMemberBank(message.guild.id, member.id);
    await deleteMemberRolePlay(message.guild.id, member.id);
    deleteObjectMember(guilds, message.guild.id, member.id);
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].danger);
    //Mensaje Embed para el Comando
    let embed = new MessageEmbed()
      .setColor(dangerColor)
      .setTitle(`**Bans** ${emoji}`)
      .setThumbnail(member.user.displayAvatarURL())
      .addField("**Usuario Baneado**", `**[${member.displayName}]**`, true)
      .addField("**ID**", `***${member.id}***`, true)
      .addField("**Canal**", message.channel, true)
      .addField("**Razón**", reason)
      .setTimestamp()
      .setFooter(
        `Baneado por ${message.author.tag}`,
        message.author.displayAvatarURL()
      );
    //Lectura del Mensaje - Envío al canal Destinado - Mensaje que usa el Comando Eliminado
    message.guild.member(member).ban({ days: 1, reason: `${reason}` });
    banChannel.send(embed);
  }
};
