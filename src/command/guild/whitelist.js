//Importación especifica de Metodos - MessageEmbed - nonecolor Color - putEmoji Function
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { putEmoji } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
var fs = require("fs"),
  gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });
//Exportación del Comando Whitelist
module.exports = class WhitelistCommand extends BaseCommand {
  constructor() {
    super(
      "whitelist",
      ["wl", "lista"],
      "Whitelist for the FREE MINT.",
      "whitelist`",
      "_***Everyone***_",
      "guild"
    );
  }
  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Mensaje Embed
    let embed = new MessageEmbed().setColor(noneColor);
    let _jsonString;
    //Emoji from Map
    let msg = null;
    let wallet = args[0],
      i = 1;
    const emoji = synchronous.emojiID[0].afirmado;

    //Creación de Objetos
    const err = new Error();
    _jsonString = await fs.readFileSync(
      "./database/misc/Whitelist.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );
    //Solicitando Json
    JSON.parse(_jsonString).Whitelist.forEach((spot) => {
      if (message.author.id === spot.id) {
        let { alpha, whitelist, upvote } = spot;
        console.log(`Alpha point: ${alpha} - Whitelisted: ${whitelist} - Upvote ME: ${upvote}`);
      } else if (JSON.parse(_jsonString).Whitelist.length === i) {
        console.log("Whitelisted")
      }
      i++;
    });
  }
};
