//Importación especifica de Metodos - RichEmbed - Perms - cautioncolor Color
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const FAQ = require ("../../../database/conectors/faq.json")
const { putEmoji, getMember } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const fs = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const BaseCommand = require("../../utils/structure/BaseCommand");

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
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
    if (contentArgs == "alpha") {
      let embed = new MessageEmbed().setTitle(FAQ["alpha"].tittle).setDescription(readTextFile(FAQ["alpha"].description))
      message.channel.send(embed)
    } else {
    }
    message.channel.send(textResponse);
  }
};
