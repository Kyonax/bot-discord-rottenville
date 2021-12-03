//Importación especifica de Metodos - RichEmbed - Perms - cautioncolor Color
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { putEmoji, getMember } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando news
module.exports = class InfoCommand extends BaseCommand {
  constructor() {
    super(
      "info",
      ["inf", "i", "information"],
      "**Command to get important Information,** about RottenVille.",
      "say <text>`",
      "***Everyone***",
      "everyone"
    );
  }

  async run(bot, message, args) {
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    //Variables
    let autor = message.author;
    let contentArgs = args[0];
    let cancelado = synchronous.emojiID[0].cancelado;
    let afirmado = synchronous.emojiID[0].afirmado;
    let textResponse = putEmoji(bot, cancelado) + " **Information not found.**";
    if (contentArgs == "alpha") {
      textResponse = `${putEmoji(
        bot,
        "910558104838615090"
      )} **FAQ Response・What is Alpha Radiation?**

**Economy System is the short answer to the question**, in our Discord Server exists something called **__"Alpha Radiation ${putEmoji(
        bot,
        "905441646362120232"
      )}"__** this can be collected just by writing, trading, and participating in the events server.

${putEmoji(
  bot,
  "910558104838615090"
)} **FAQ Response・Why is this so important??**

**The function for the "AR ${putEmoji(
        bot,
        "905441646362120232"
      )}" is to make valuable the User Discord interaction**, you can share and meet the other members of the community at the same time where you can win valuable points, that you can exchange in a near future.
 
${putEmoji(
  bot,
  "910558104838615090"
)} **FAQ Response・Can I exchange the AR ${putEmoji(
        bot,
        "905441646362120232"
      )}?**

**Yes, The laboratory system use AR ${putEmoji(
        bot,
        "905441646362120232"
      )} to convert it on RottenPoints ${putEmoji(
        bot,
        "905441645980422214"
      )}**, this RP ${putEmoji(
        bot,
        "905441645980422214"
      )} can buy some NFTs from our collection, can be exchanged with merch, and **$SOL**, that's right being active on Discord gives you the opportunity to get **NFTs and $SOL with 0 investment**, everyone can collect Alpha Radiation ${putEmoji(
        bot,
        "905441646362120232"
      )}, and everyone can get one of our **5,459 NFTs, __just be active__.**
`;
    } else {
    }
    message.channel.send(textResponse);
  }
};
