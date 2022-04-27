//Importación especifica de Metodos - RichEmbed - Perms - cautioncolor Color
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const FAQ = require("../../../database/conectors/faq.json");
const { putEmoji, getMember } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const fs = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const BaseCommand = require("../../utils/structure/BaseCommand");

function readTextFile(file) {
  try {
    const data = fs.readFileSync(file, "utf8");
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

//Exportación del Comando news
module.exports = class InfoCommand extends BaseCommand {
  constructor() {
    super(
      "info",
      ["inf", "i", "information", "faq", "ask"],
      "Send definitions and important information about the Server.",
      "say <text>`\n**Options:** `alpha` - `battles`",
      "***Everyone***",
      "everyone"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    //Variables
    let autor = message.author;
    let contentArgs = args[0];
    let cancelado = synchronous.emojiID[0].cancelado;
    let afirmado = synchronous.emojiID[0].afirmado;
    let textResponse = putEmoji(bot, cancelado) + " **Information not found.**";

    let embed = new MessageEmbed()
      .setTitle(FAQ[contentArgs].tittle)
      .setDescription(readTextFile(FAQ[contentArgs].description));
    message.channel.send(embed);
  }
};
