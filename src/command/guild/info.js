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

let _obj_faq_map = {};

function readTextFile(file) {
  try {
    const data = fs.readFileSync(file, "utf8");
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

function readFAQIndex(){
  let _obj_faq = "", i = 0;

  for(var faq in FAQ){
    if(i <= 6){
    _obj_faq = _obj_faq + "`" + `${faq}` + "` -";
    i++;
    } else break;
  }

  _obj_faq_map = _obj_faq;
}

readFAQIndex();

//Exportación del Comando news
module.exports = class InfoCommand extends BaseCommand {
  constructor() {
    super(
      "info",
      ["inf", "i", "information", "faq", "ask"],
      "Send definitions and important information about the Server.",
      "say <text>`\n**Options:** "+_obj_faq_map,
      "***Everyone***",
      "everyone"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "1097508462080041030") return;
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    //Variables    
    let contentArgs = args[0];        
    let embed = new MessageEmbed()
      .setColor("#FFFFFF")
      .setThumbnail(message.guild.iconURL())
      .setTitle(FAQ[contentArgs].tittle)
      .setFooter("Last Updated・"+FAQ[contentArgs].updated)
      .setDescription(readTextFile(FAQ[contentArgs].description));
    message.channel.send(embed);
  }
};
