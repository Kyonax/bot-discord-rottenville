//Importación especifica de Metodos - findUserID putEmoji Functions
const { MessageEmbed } = require("discord.js");
const {
  initObjectMember,
  getMember,
  putEmoji,
  replaceRoleItems,
} = require("../../utils/misc/functions.js");
const { goldColor } = require("../../../database/utils/color/color.json");
const { addMessageToBin } = require("../../utils/misc/bin");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de Usuario
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const fs = require("fs");
//Importación de la Clase Padre y Conexión con la Base de Datos
const BaseCommand = require("../../../src/utils/structure/BaseCommand.js");
//Exportación de Comando Poll
module.exports = class PollCommand extends BaseCommand {
  constructor() {
    super(
      "poll",
      ["encuesta", "enc"],
      "Create a new poll for the members to vote on it.",
      "poll`\n**Options:** `<rol>`",
      "_***Admin - Inmortales - Moderadores***_",
      "mod"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    const autor = getMember(message, message.author.id);
    let [cmd, role] = message.content.split(" ");
    let poll = args.slice(1).join(" ");

    let _jsonString, ObjectAutor = null        
    //Inicialización Guild Prefix
    _jsonString = await fs.readFileSync('./database/misc/GuildMembers.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }
    })        

    JSON.parse(_jsonString).forEach(_member => {                   
      if(message.author.id == _member.memberID){
        ObjectAutor = _member
      }
    });     

    //Permisos de Autor
    const { moderatorMember } = ObjectAuthor;
    //Validaciones - Permisos de Uso - Usuario - Rol - Rol Encontrado
    if (moderatorMember !== 1) return perm.moderatorPerms(bot, message);
    if (!role.includes("@")) {
      role = "@everyone";
      poll = args.slice(0).join(" ");
    }
    role = replaceRoleItems(role);
    let gRole = message.guild.roles.cache.find((rol) => rol.id == role);
    //Creación del Mensaje Embed
    let embed = new MessageEmbed()
      .setTitle(`**${autor.displayName}'s Poll**`)
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(poll)
      .setColor(goldColor)
      .addField("**User**", `${autor}`, true)
      .addField(
        `**Poll for - [${gRole.name}]**`,
        `**Send it from ${message.channel}**`,
        true
      )
      .setFooter("RottenVille Poll & Giveaways")
      .setTimestamp();

    const encChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "📣・rottenvile-poll"
    );
    if (!encChannel) {
      return message.guild.channels
        .create("encuestas", {
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

    encChannel.send(
      `New Poll ${gRole}!! ${putEmoji(bot, "910558105031544842")}`
    );
    encChannel.send(embed);
  }
};