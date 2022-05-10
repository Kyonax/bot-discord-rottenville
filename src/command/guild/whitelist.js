//Importación especifica de Metodos - MessageEmbed - nonecolor Color - putEmoji Function
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { putEmoji } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
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
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    message.delete().catch((O_o) => {});
    //Creación de Mensaje Embed
    let embed = new MessageEmbed().setColor(noneColor);
    embed.setTitle(`${putEmoji(bot, "905441646362107924")} Whitelist Support`);
    let _jsonString;
    //Emoji from Map
    let msg = null;
    let wallet = args[0],
      i = 1;
    if (!wallet)
      return err.noWalletAddress(bot, message);

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
      if (message.author.id === spot.id) {
        let { alpha, whitelist, upvote, wallet } = spot;

        WhitelistJSON.Whitelist[i-1].wallet = wallet;

        const writeData = await fs.writeFileSync(
          "./database/misc/Whitelist.json",
          JSON.stringify(WhitelistJSON),
          (err) => {
            if (err) console.log(err);
          }
        );

        if (upvote === false) {
          embed.addField(
            "**VERIFY ERROR:**",
            `You need to **Upvote in __[Magic Eden](https://magiceden.io/drops/rotten_ville_sculptures)__ first**.\nIf you can't upvote, open a ticket and tell the admins.\n\nIf you upvote already, send proof too <#901155551239614485>.`
          );          
        }

        if (whitelist === false) {
          embed.addField(
            "**VERIFY ERROR:**",
            `You need to be whitelisted first to use this command.`
          );                              
        }

        if (upvote === true && whitelist === true) {
          embed.addField(
            "**VERIFY SUCCES:**",
            `**Whitelisted __${wallet}__**, you'll recieve a Whitelist Token that will help you MINT the Rotten Bust Sculptures. Be pretty alert to the Announcements on Twitter & Discord, let's build the RottenVerse together!\n\n**Important Links:**
            **__[Rotten Ville Bust Sculptures](https://twitter.com/rotten_ville/status/1519365371710615553)__**
            **__[Rotten Ville Project](https://twitter.com/rotten_ville/status/1518978216706420738)__**
            **__[Development Team](https://twitter.com/rotten_ville/status/1517512268975677440)__**\n
            **__[Bot Developer](https://twitter.com/kyonax_on_nft)__**\n            
            `
          );  
        }

        message.channel.send(
          `<@${message.author.id}> Verifying your whitelist spot & Wallet.`,
          embed
        );
      } else if (
        JSON.parse(_jsonString).Whitelist.length === i &&
        message.author.id !== spot.id
      ) {
        let members_array = message.guild.members.cache,
          statusHolder = false,
          statusWhitelist = false;

        members_array.forEach((member) => {
          if (member.id === message.author.id) {
            if (
              member.roles.cache.has("900152631828299826") ||
              member.roles.cache.has("958140020517109781")
            ) {
              statusHolder = member.roles.cache.has("900152631828299826");
            }

            if (member.roles.cache.has("968906978904649748")) {
              statusWhitelist = member.roles.cache.has("968906978904649748");
            }
          }
        });

        WhitelistJSON.Whitelist.push({
          id: message.author.id,
          wallet: wallet,
          alpha: statusHolder,
          whitelist: statusWhitelist,
          upvote: false,
        });

        embed.addField(
          "**VERIFY ERROR:**",
          `You need to **Upvote in __[Magic Eden](https://magiceden.io/drops/rotten_ville_sculptures)__ first**.\nIf you can't upvote, open a ticket and tell the admins.\n\nIf you upvote already, send proof too <#901155551239614485>.`
        );
        message.channel.send(embed);

        const writeData = await fs.writeFileSync(
          "./database/misc/Whitelist.json",
          JSON.stringify(WhitelistJSON),
          (err) => {
            if (err) console.log(err);
          }
        );

        return;
      }
      i++;
    });
  }
};
