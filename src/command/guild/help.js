//Importación especifica de Metodos - MessageEmbed - nonecolor Color - readdirSync
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { readdirSync } = require("fs");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
const Api = require("../../utils/misc/api_discord_functions");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando help
module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super(
      "help",
      ["h", "support", "helping", "ayuda"],
      "Display a panel of help with the Commands Information.",
      "help`.\n**Options:** `<name_command>`",
      "_***Everyone***_",
      "guild"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "1097508462080041030") return;
    //Eliminación de mensaje que usó el Comando
    message.delete().catch((O_o) => { });
    //Creación de Objetos
    const error = new Error();
    let prefix, _jsonString
    //Inicialización Guild Prefix
    prefix = await Api.getGuild(message.guild.id);
    prefix = prefix.prefix
    //Validación de contenido y especificación del comando a Usar.
    if (!args[0]) {
      const categories = readdirSync("./src/command");
      //Creación de Mensaje Embed para Comandos Admin
      let firstEmbed = new MessageEmbed()
        .setDescription(
          `Hello there **${message.author.username}** I'm the **Main BOT** from the **${message.guild.name}** server, if you want to interact in the server I give you **${bot.commands.size}** commands that you will be able to use on the Server.\n\n\n**Prefix: **` +
          "`" +
          prefix +
          "`" +
          " to see the function of the Commands **use**: " +
          "`" +
          prefix +
          "help <command>`" +
          `\n \n **[Twitter Kyo Dev](https://twitter.com/kyonax_on_tech)** | **[Isacademi Website](https://rottenville.io/)** \n \n \n`
        )
        .setColor(noneColor)        
      categories.forEach((category) => {
        const dir = bot.commands.filter((c) => c.category === category);
        const capitalise =
          category.slice(0, 1).toUpperCase() + category.slice(1);
        try {
          firstEmbed.addField(
            `**${capitalise.toUpperCase()} COMMANDS** [${dir.size}]:`,
            dir.map((c) => `\`${c.name}\``).join(" ")
          );
        } catch (e) {
          console.log("Capitalise " + capitalise);
          console.log(e);
        }
      });
      //Envio de Mensajes
      message.author.send(firstEmbed).catch((err) => {
        message.channel
          .send(
            `${message.author} Ha ocurrido un **Error a la hora de enviar el mensaje!**`
          )
          .then((msg) => {
            msg.delete({ timeout: 40000, reason: "It had to be done." });
          });
        message.channel
          .send(error.dmCrash(bot, message, message.author))
          .catch((err) =>
            console.log(
              `El usuario ${message.author.username} tiene desactivado los Mensajes Directos.`
            )
          );
        message.channel.send(firstEmbed);
      });
    } else {
      const embed = new MessageEmbed()
        .setColor(noneColor)
        .setThumbnail(bot.user.displayAvatarURL());
      let command = bot.commands.get(
        bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase()
      );
      if (!command) return;
      const [cmdHelp, cmdName] = message.content.split(" ");
      embed.setTitle(`**${prefix + cmdName}**`);
      embed.setDescription(command.description);
      embed.addField(
        "**Command Properties**",
        " **Use:** `" + prefix + command.usage,
        true
      );
      embed.addField(
        "**Alias:**",
        "`" + command.aliases.join(" , ") + "`",
        true
      );
      embed.addField("\u200b", "\u200b", true);
      embed.addField(
        "**Category:**",
        `**[${command.category.toUpperCase()}]**`,
        true
      );
      embed.addField("**Perms:**", command.perms, true);
      embed.addField("\u200b", "\u200b", true);
      message.channel
        .send(embed)
        .then((msg) => {
          msg.delete({ timeout: 60000, reason: "It had to be done." });
        })
        .catch(console.error);
    }
  }
};
