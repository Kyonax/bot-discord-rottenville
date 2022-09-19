//Importación especifica de Metodos - RichEmbed - putEmoji - Errors - nonecolor Color - afirmado Emoji
const { MessageEmbed } = require("discord.js");
const {
  putEmoji,
  getMember,
  initObjectMember,
} = require("../../utils/misc/functions");
const { noneColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { RottenVille } = require("../../../database/utils/adds/story.json");
const { updateGuildRolePlayAge } = require("../../utils/database/functions");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Age
module.exports = class AgeCommand extends BaseCommand {
  constructor() {
    super(
      "story",
      ["origin", "historia", "origen"],
      "Deploy your Rotten story in any channel.",
      "story`",
      "Everyone",
      "DNI"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    const description = RottenVille.citizen["655875670278144031"][0].story;
    message.channel.send(description);
  }
};

