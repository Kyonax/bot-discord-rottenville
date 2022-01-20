//Importación especifica de Metodos - RichEmbed - Perms - cautioncolor Color
const { MessageEmbed } = require("discord.js");
const { kyoColor } = require("../../../database/utils/color/color.json");
const { putEmoji } = require("../../utils/misc/functions");
const { addMessageToBin } = require("../../utils/misc/bin");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando news
module.exports = class NewsCommand extends BaseCommand {
  constructor() {
    super(
      "news",
      ["nws", "noticias"],
      "Send to the News Channel a new Message.",
      "news <type> <title> ¬ <description>`\n**Type:** `<normal>`, `<holders>`",
      "***Owner***",
      "owner"
    );
  }

  async run(bot, message, args) {
    addMessageToBin(bot, message);
    //Eliminación del mensaje con Comandos
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const perm = new Perms();
    //Validación Permisos
    if (message.member.id != message.guild.ownerID)
      return perm.ownerPerms(bot, message);
    //Variables
    let autor = message.author;
    let contentArgs = "";
    let key = "¬";
    let tittle = "None";
    let description = "None";
    for (var i = 0; i < args.length; i++) {
      contentArgs = contentArgs + " " + args[i];
      if (args[i].toString() === key) {
        tittle = contentArgs;
        contentArgs = message.content;
        break;
      }
    }
    tittle = tittle.replace("¬", "");
    contentArgs = contentArgs.replace("!news", "");
    contentArgs = contentArgs.replace("¬", "");
    contentArgs = contentArgs.replace(tittle, "");
    description = contentArgs;
    //Embed
    const embed = new MessageEmbed()
      .setColor("#22e2f0")
      .setTitle(tittle)
      .setDescription(description)
      .setTimestamp()
      .addField("**Att**", `${autor}`, true)
      .addField(
        `**Noticia - [News - Notify]**`,
        `**Enviado desde ${message.channel}**`,
        true
      )
      .setFooter("Central de Periodismo Mundo Kyonax");
    embed.attachFiles(["database/multimedia/gifs/embeds/BAR.gif"]);
    embed.setImage("attachment://BAR.gif");
    const serverChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "nuevos-anuncios"
    );
    if (!serverChannel) {
      return message.channel.send(
        "El Mensaje no se ha podido enviar porque no se ha creado el canal para announcements"
      );
    }
    serverChannel
      .send(
        `` +
          putEmoji(bot, "780487068119859220") +
          ` **¡Nuevo anuncio <@&779080288701382667>**`,
        embed
      )
      .catch((err) => console.log(err));
  }
};
