//Importación especifica de Metodos - RichEmbed - putEmoji - Errors - nonecolor Color - afirmado Emoji
const { MessageEmbed } = require("discord.js");
const { putEmoji, initObjectMember } = require("../../utils/misc/functions");
const { noneColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { updateGuildRolePlayRep } = require("../../utils/database/functions");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Mapas
const rolePlayMembers = new Map();
const guildsRoleplay = new Map();
//Exportación de Comando Rep
module.exports = class RepCommand extends BaseCommand {
  constructor() {
    super(
      "rep",
      ["respeto", "respect"],
      "Give respect to a RottenVille Discord Server Member.",
      "rep <user>`",
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
    //Inicialización de Variables - Usuario  || Validación - Usuario no permitido
    let member = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (!member) return err.noUserDigitRep(bot, message);
    if (member.id === message.author.id)
      return err.noValidTargetRep(bot, message);
    //Objeto Member
    let ObjectMember = null;
    ObjectMember = initObjectMember(
      guildsRoleplay,
      ObjectMember,
      message.guild.id,
      member.id
    );
    let { memberRespect } = ObjectMember;
    memberRespect = parseInt(memberRespect) + 1;
    //Cambio en Base de Datos
    const updateMemberRep = await updateGuildRolePlayRep(
      message.guild.id,
      message.author.id,
      memberRespect
    );   
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].afirmado);
    let embed = new MessageEmbed()
      .setAuthor(`${member.displayName}'s DNI`, member.user.displayAvatarURL())
      .setDescription(
        `${emoji} **<@${message.author.id}>** gives Respect to **${member.displayName}** .`
      )
      .setColor(noneColor);
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 10000, reason: "It had to be done." });
    });
  }
};
