//Importación especifica de Metodos - getMember formateDate findUserID - RichEmbed - stripIndents - Perms
const { getMember, formatDate } = require("../../utils/misc/functions");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
//Importación Clase de Objetos - Conector Perms
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const fs = require("fs");
//Exportación del Comando Whois
module.exports = class WhoisCommand extends BaseCommand {
  constructor() {
    super(
      "whois",
      ["w", "is"],
      "Get the important data from a User.",
      "whois`.\n**Options:** `<@user>`",
      "_***Everyone***_",
      "guild"
    );
  }
  async run(bot, message, args) {
    if (message.guild.id != "10927508462080041030") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const perm = new Perms();
    const member = getMember(message, args.join(" "));
    let _jsonString, ObjectAuthor     
     //Inicialización de Member
     
    
    //Miembro existente
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

    JSON.parse(_jsonString).forEach((_member) => {
      if (_member.guildID == member.guild.id) {
        if (message.author.id == _member.memberID) {
          ObjectAuthor = _member;
        }
      }
    });
    //Inicialización de Párametros Member
    const { moderatorMember } = ObjectAuthor;
   
    //Insuficientes Permisos para usar el Comando
    if (moderatorMember === 0) {
      if (member.roles.cache.get("623715872506118154")) {
        return perm.cantCatchSynks(bot, message);
      }
      return perm.moderatorPerms(bot, message);
    }
    //Inicialización de Variables
    const joined = formatDate(member.joinedAt);
    const role =
      member.roles.cache
        .filter((r) => r.id !== message.guild.id)
        .map((r) => r)
        .join("\n ") || "none";

    const created = formatDate(member.user.createdAt);
    //Mensaje Embed
    const embed = new MessageEmbed()
      .setFooter(member.displayName, member.user.displayAvatarURL())
      .setThumbnail(member.user.displayAvatarURL())
      .setColor(
        member.displayHexColor === "#000000"
          ? "#ffffff"
          : member.displayHexColor
      )
      .addField(
        "Información de Miembro",
        stripIndents`**Nombre:** ${member.displayName}
  **Ingreso al servidor:** ${joined}
  **Roles:** ${role}`,
        false
      )
      .addField(
        "Información de Usuario",
        stripIndents`**ID:** ${member.user.id}
  **Nickname:** ${member.user.username}
  **Tag de Discord:** ${member.user.tag}
  **Usuario creado:** ${created}`,
        false
      )
      .setTimestamp();
    const statatus = member.user.presence.activities;
    let gameStatus = [];
    if (statatus.length > 0) {
      statatus.forEach((sts) => {
        gameStatus.push(sts.name);
        console.log(gameStatus);
      });
      embed.addField("Jugando", `**> Juego:** ${gameStatus.join(" , ")}`);
    }

    message.channel.send(embed);
  }
};
