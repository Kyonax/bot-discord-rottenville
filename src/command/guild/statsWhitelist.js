//Importación especifica de Metodos - MessageEmbed - nonecolor Color - putEmoji Function
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { putEmoji } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const {
    getMember,    
    initObjectMember,
    numberWithCommas,
  } = require("../../utils/misc/functions");
const WhitelistJSON = require("../../../database/misc/Whitelist.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
var fs = require("fs"),
  gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });
//Exportación del Comando StatsWhitelist
module.exports = class StatsWhitelistCommand extends BaseCommand {
  constructor() {
    super(
      "statsw",
      ["stw"],
      "StatsWhitelist the data user in the Whitelist.",
      "statsw`",
      "_***Everyone***_",
      "guild"
    );
  }
  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    if (message.author.id != "248204538941538308") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    message.delete().catch((O_o) => {});
    //Creación de Mensaje Embed
    let embed = new MessageEmbed().setColor(noneColor);
    let gRole = message.guild.roles.cache.find((rol) => rol.id === "968906978904649748");
    embed.setTitle(`${putEmoji(bot, "905441646362107924")} Whitelist Support`);
    let _jsonString, i = 0, iv = 0, ih = 0, usersNW= [];
    let member = getMember(message, args[0]);
    //Emoji from Map
    let msg = null;    

    const emoji = synchronous.emojiID[0].afirmado;
    //Creación de Objetos
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
    JSON.parse(_jsonString).Whitelist.forEach(async (spot) => {
      let { alpha, whitelist, upvote, wallet } = spot;
      if (upvote === true && whitelist === true) {          
          iv++          
      }else if (alpha === true) {
          ih++
      } else {
        usersNW.push(`<@${spot.id}>`)
      }

      i++;
    });


    embed.addField(
        "**WHITELIST DATA:**",
        `**Total Users** = ${i} - **Whitelisted Users** = ${iv} - **Holders Whitelisted Users** = ${ih} - **People whit Whitelist Roles** = ${gRole.members.size}\n\n**Users No Whitelists:**
        ${usersNW}`
      );
      message.channel.send(
        `<@${message.author.id}> YOU ARE WHITELISTED!!! CONGRATS.`,embed).then((msg) => {
          msg.delete({ timeout: 30000, reason: "It had to be done." });
        });     
  }
};
