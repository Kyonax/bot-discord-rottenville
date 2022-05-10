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
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    message.delete().catch((O_o) => {});
    //Creación de Mensaje Embed
    let embed = new MessageEmbed().setColor(noneColor);
    embed.setTitle(`${putEmoji(bot, "905441646362107924")} Whitelist Support`);
    let _jsonString, i = 1;
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
      if (member.id === spot.id) {       
        if (upvote === true && whitelist === true) {
            embed.addField(
                "**Data from User**",
                `**User:** <@${member.id}> **Alpha Holder = __${JSON.parse(_jsonString).Whitelist[i-1].alpha}__** - **Is Whitelisted = __${JSON.parse(_jsonString).Whitelist[i-1].whitelist}__**\n **Wallet Holder = __${JSON.parse(_jsonString).Whitelist[i-1].wallet}__**\n**Upvote in ME = __${JSON.parse(_jsonString).Whitelist[i-1].upvote}__**\n\n True means **YES** - **__[Bot Developer](https://twitter.com/kyonax_on_nft)__**`
              );
              message.channel.send(
                `<@${message.author.id}> YOU ARE WHITELISTED!!! CONGRATS.`,embed).then((msg) => {
                  msg.delete({ timeout: 30000, reason: "It had to be done." });
                });        
      
              return;
        }
      }else if (
        JSON.parse(_jsonString).Whitelist.length === i &&
        message.author.id !== spot.id
      ) {
        embed.addField(
            "**VERIFY ERROR:**",
            `You need to **Upvote in __[Magic Eden](https://magiceden.io/drops/rotten_ville_sculptures)__ first**.\nIf you can't upvote, open a ticket and tell the admins.\n\nIf you upvote already, send proof too <#901155551239614485>.`
          );      
          message.channel.send(`<@${message.author.id}> YOU ARE NOT WL YET, FOLLOW THE NEXT STEPS. [UPVOTE IN ME]`,embed).then((msg) => {
              msg.delete({ timeout: 30000, reason: "It had to be done." });
            });  
      }
      i++;
    });
  }
};
