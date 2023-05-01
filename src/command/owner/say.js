//Importación especifica de Metodos - RichEmbed - Perms - cautioncolor Color
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { putEmoji, getMember } = require("../../utils/misc/functions");
//Importación Clase de Objetos - Conector Error - Perms
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando news
module.exports = class NewsCommand extends BaseCommand {
  constructor() {
    super(
      "say",
      ["text", "decir", "says"],
      "Send a message with the Bot Account.",
      "say <title> ¬ <description>`",
      "***Owner***",
      "owner"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "1097508462080041030") return;
    //Eliminación del mensaje con Comandos
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const perm = new Perms();
    //Validación Permisos
    if (message.member.id != message.guild.ownerID)
      return perm.ownerPerms(bot, message);
    //Variables
    let autor = message.author;

    if(args[0] === "embed") {

    let contentArgs = "";
    let key = "¬";
    let tittle = "None";
    let description = "None";

      contentArgs = message.content;


    let REPLACE_STRINGS = [
      "s!text",
      "s!decir",
      "s!says",
      "s!say",
      "!say",
      "¬",
      "embed",
      tittle,
    ];

    for (var i = 0; i < REPLACE_STRINGS.length; i++) {
      contentArgs = contentArgs.replace(REPLACE_STRINGS[i], "");
    }

    description = contentArgs;
    const embed = new MessageEmbed()
      .setColor(noneColor)
      .setDescription(description)
    message.channel.send(embed);
    } else {
      let contentArgs = message.content;

    let REPLACE_STRINGS = [
      "s!text",
      "s!decir",
      "s!says",
      "s!say",
      "!say",
      "¬",
      "embed"
    ];

    for (var i = 0; i < REPLACE_STRINGS.length; i++) {
      contentArgs = contentArgs.replace(REPLACE_STRINGS[i], "");
    }

      message.channel.send(contentArgs)
    }

  }
};
