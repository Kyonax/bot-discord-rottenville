//Importación especifica de Metodos - MessageEmbed - nonecolor Color - putEmoji Function
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { putEmoji } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando Uptime
module.exports = class UptimeCommand extends BaseCommand {
  constructor() {
    super(
      "uptime",
      ["up", "onbot"],
      "Send the time since the bot was deploy.",
      "uptime`",
      "_***Everyone***_",
      "guild"
    );
  }
  async run(bot, message) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Mensaje Embed
    let embed = new MessageEmbed().setColor(noneColor);
    //Emoji from Map
    let msg = null;
    const emoji = synchronous.emojiID[0].afirmado;

    msg = await message.channel.send(`${putEmoji(bot, emoji)} Calculating...`);
    embed.setTitle(`${putEmoji(bot, emoji)} Uptime`);

    function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (1000 * 60)) % 60).toString();
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
      const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
      return `${days.padStart(1, "0")} days / ${hrs.padStart(
        2,
        "0"
      )} hours / ${min.padStart(2, "0")} minutes / ${sec.padStart(
        2,
        "0"
      )} seconds.`;
    }
    //Iserción de la información de la Duración activa del Bot
    embed.addField(
      "**THE BOT WAS INITIATED SINCE:**",
      `${duration(bot.uptime)}.`
    );

    msg.edit(embed).then((msg) => {
      msg.delete({ timeout: 10000, reason: "It had to be done." });
    });
  }
};
