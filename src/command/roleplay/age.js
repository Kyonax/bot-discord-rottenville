//Importación especifica de Metodos - RichEmbed - putEmoji - Errors - nonecolor Color - afirmado Emoji
const { MessageEmbed } = require("discord.js");
const {
  putEmoji,
  getMember,
  initObjectMember,
} = require("../../utils/misc/functions");
const { noneColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { updateGuildRolePlayAge } = require("../../utils/database/functions");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Age
module.exports = class AgeCommand extends BaseCommand {
  constructor() {
    super(
      "age",
      ["edad"],
      "Change the age from the DNI.",
      "age <number> <@user>`",
      "Everyone",
      "DNI"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
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
    if (!args[0]) return err.noAgeDigit(bot, message);
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

    //Validación es un Número o no
    if (isNaN(args[0]) === true) return err.noCorrectArgumentsAge(bot, message);
    //Inicialización de variable Edad
    const age = parseInt(args[0]);
    const updateMemberAge = await updateGuildRolePlayAge(
      message.guild.id,
      member.id,
      age
    );    
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].afirmado);
    //Embed de confirmación
    let embed = new MessageEmbed()
      .setAuthor(
        `${message.author.username}'s DNI`,
        message.author.displayAvatarURL()
      )
      .setDescription(`${emoji} succes Change of Age.`)
      .setColor(noneColor);
    //Envio de mensaje Embed al canal para luego ser eliminado en 10seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 10000, reason: "It had to be done." });
    });
  }
};
