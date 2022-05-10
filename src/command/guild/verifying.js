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
//Exportación del Comando Verifying
module.exports = class VerifyingCommand extends BaseCommand {
  constructor() {
    super(
      "verifying",
      ["vr", "check"],
      "Verifying a user for Whitelist.\nUso: !vr (alpha,whitelist,upvote)",
      "verifying`",
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
    let member = getMember(message, args[0]);
    //Emoji from Map
    let msg = null;
    let wallet = args[1],
      i = 1;
    if (!wallet) return err.noWalletAddress(bot, message);

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
      if (member.id !== spot.id) {
        WhitelistJSON.Whitelist[wallet] = true;

        embed.addField(
          "**Updating User Whitelist:**",
          `User: <@${member.id}> update Whitelist info: ${wallet} = ${WhitelistJSON.Whitelist[wallet]} by **__[Kyonax](https://twitter.com/kyonax_on_nft)__**`
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
