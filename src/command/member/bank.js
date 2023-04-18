//Importación especifica de Metodos - MessageEmbed - getMember putEmoji initObjectMember Function - kyocolor
const { MessageEmbed } = require("discord.js");
const {
  getMember,
  putEmoji,
  numberWithCommas,
} = require("../../utils/misc/functions");
const {
  goldColor,
  cleverColor,
} = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
const Api = require("../../utils/misc/api_discord_functions");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación de Comando Bank
module.exports = class BankCommand extends BaseCommand {
  constructor() {
    super(
      "rp",
      ["coins", "bank", "monedas", "rottenpoints", "points", "monedas"],
      "Deploy a panel with the Rotten Points.",
      "rp`\n**Admin Options:** `<user>`",
      "_***Everyone***_",
      "member"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => { });
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Inicialización para el Usuario escrito
    let autor = message.author;
    let member = getMember(message, args[0]);
    const ObjMember = await Api.getMember(member.guild.id, member.user.id);
    const ObjAuthorMember = await Api.getMember(member.guild.id, message.author.id);
    const { id, bank } = ObjMember, { perms } = ObjAuthorMember;

    if (id === undefined) return err.noFindMember(bot, message, member.displayName);
    if (message.author.id != member.id) {
      if (perms.inmortal != 1) return perm.inmortalPerms(bot, message);
    }
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, "905441645980422214");
    //Creación del Mensaje Embed del Comando
    let embed = new MessageEmbed()
      .setTitle(`**${member.displayName}'s Rotten Points Bank**`)
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(
        `${putEmoji(bot, "905441645980422214")} Checking <@${member.id
        }> Rotten Points.`
      )
      .setColor(goldColor)
      .addField("**User**", `**[${member.displayName}]**`, true)
      .addField(
        " **Rotten Points**",
        `**${numberWithCommas(bank.coins)} ${emoji} $RP.**`,
        true
      )
      .setFooter("RottenBot Bank System")
      .setTimestamp();
    //Lectura del Mensaje - Envío al canal Destinado - Mensaje que usa el Comando Eliminado
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 60000, reason: "It had to be done." });
    });
  }
};
