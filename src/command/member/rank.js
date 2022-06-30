//Importación especifica de Metodos - getMember delay downloadUser circleImage findUserID putEmoji - RichEmbed - synksPerms - nonecolor Colors - levelup Emojis
const { getMember, putEmoji } = require("../../utils/misc/functions");
const { MessageEmbed } = require("discord.js");
//Importación Clase de Objetos - Conector Error - Perms
const Api = require("../../utils/misc/api_discord_functions");
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Inicialización de js de Node.js
PNG = require("pngjs").PNG;
var fs = require("fs"),
  gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });

module.exports = class InventaryCommand extends BaseCommand {
  constructor() {
    super(
      "rank",
      ["ranking", "board", "puestos"],
      "Deploy a panel with the Rank information.",
      "rank`\n**Options:** `<user>`",
      "***Everyone***",
      "member"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => { });
    //Creación de Objetos
    const err = new Error(), perm = new Perms();
    const member = getMember(message, args.join(" "));
    let data_member = await Api.getMember(message.guild.id, member.user.id);

    //Mensaje para el Embed de Usuario para este Comando
    let embed = new MessageEmbed()
      .setThumbnail(member.user.displayAvatarURL())
      .setColor(
        member.displayHexColor === "#000000"
          ? "#ffffff"
          : member.displayHexColor)
      .setFooter(`Last Update ${data_member.rank.updated}`)
      .addField("`🔱` `⚜️` Experience Ranking", `Your XP Data & Rankings of the Server, if you want to get the **Top #10** keep being active in the Server.`, false)
      .addField("Rank General", `${putEmoji(bot, "910559141611860070")} ` + "`#" + data_member.rank.general + "`" + ` **XP:** ` + "`" + data_member.status.xp + "` **Level:** `" + data_member.status.level + "`", true)
      .addField("Rank Month", `${putEmoji(bot, "910559141611860070")} ` + "`#" + data_member.rank.special.month.data + "`" + ` **XP:** ` + "`" + data_member.rank.special.month.xp, true)
      .addField("Rank Week", `${putEmoji(bot, "910559141611860070")} ` + "`#" + data_member.rank.special.week.data + "`" + ` **XP:** ` + "`" + data_member.rank.special.week.xp, true)
      .setTimestamp();

    message.channel.send(
      `**<@${member.id}> look at your Server Ranking of the Week, Month, and Total!! **${putEmoji(
        bot,
        "910545619238678538"
      )}`,
      embed
    );
  }
};
