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
const ToCSV = require("../../../database/misc/ToCSV.json");
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
module.exports = class CsvCommand extends BaseCommand {
  constructor() {
    super(
      "csv",
      ["cs"],
      "CSV a JSON File.",
      "csv`",
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
    let _jsonString;
    message.delete().catch((O_o) => {});
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
      console.log(
        `Fetching Data Whitelist - ID MEMBER: ${spot.id} WALLET: ${spot.wallet}`
      );
      let _member = getMember(message, spot.id);
      let _member_structure = `${_member.user.username}#${_member.user.discriminator}`;

      ToCSV.Structure.push({
        "Discord Tag": `${_member_structure}`,
        "Discord ID": `${spot.id}`,
        "Solana Wallet": `${spot.wallet}`,
      });

      const writeData = await fs.writeFileSync(
        "./database/misc/ToCSV.json",
        JSON.stringify(ToCSV),
        (err) => {
          if (err) console.log(err);
        }
      );
    });
  }
};
