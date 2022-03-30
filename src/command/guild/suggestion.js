//Importación especifica de Metodos - getMember formateDate findUserID - RichEmbed - stripIndents - Perms
const { getMember } = require("../../utils/misc/functions");
const { MessageEmbed } = require("discord.js");
const { kyoColor } = require("../../../database/utils/color/color.json");
const { addMessageToBin } = require("../../utils/misc/bin");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando Suggestion
module.exports = class WhoisCommand extends BaseCommand {
  constructor() {
    super(
      "suggestion",
      ["sug", "sugges", "idea", "ideas"],
      "Send a suggestion message with votation system to a Channel.",
      "suggestion <text>`.",
      "_***Everyone***_",
      "guild"
    );
  }
  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;    
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const autor = getMember(message, message.author.id);
    const SERVER = message.guild.name;
    const text = args.slice(0).join(" ");
    if (!SERVER) return err.noTypeDigit(bot, message);
    if (!text) return err.noSuggestionDigit(bot, message);
    //Creación EMBED
    //Creación del Mensaje Embed del Comando
    let embed = new MessageEmbed()
      .setTitle(`**${autor.displayName}'s Suggestion 🧠**`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`${text}`)
      .setColor(kyoColor)
      .addField("**User**", `${autor}`, true)
      .addField(
        `**Suggestion - [${SERVER}]**`,
        `**Send it from ${message.channel}**`,
        true
      )
      .setFooter("Server RottenVille Suggestions")
      .setTimestamp();
    const serverChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "👽・community-ideas"
    );
    if (!serverChannel) {
      return message.guild.channels
        .create("👽・community-ideas", {
          type: "text",
          permissionOverwrites: [
            {
              id: message.guild.roles.everyone,
              deny: ["SEND_MESSAGES", "ATTACH_FILES"],
              allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
            },
          ],
        })
        .catch((err) => console.log(err));
    }
    serverChannel.send(embed);
  }
};
