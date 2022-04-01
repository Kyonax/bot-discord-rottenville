//Importación especifica de Metodos - findUserID putEmoji Functions
const { putEmoji, getMember } = require("../../utils/misc/functions.js");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de Usuario
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de la Clase Padre y Conexión con la Base de Datos
const BaseCommand = require("../../../src/utils/structure/BaseCommand.js");
const fs = require("fs");
//Exportación del Comando Clear
module.exports = class ClearCommand extends BaseCommand {
  constructor() {
    super(
      "clear",
      ["cls", "limpiar"],
      "Clear messages from a Channel.",
      "clear`\n**Options:** `<number>`",
      "_***Admin - Inmortales - Moderadores***_",
      "mod"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminación del mensaje con Comandos
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    let member = getMember(message, args[0]);
    let _jsonString, ObjectAuthor = null        
    //Inicialización Guild Prefix
    _jsonString = await fs.readFileSync('./database/misc/GuildMembers.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }
    })        

    JSON.parse(_jsonString).forEach(_member => {   
      if (_member.guildID == member.guild.id) {               
      if(message.author.id == _member.memberID){
        ObjectAuthor = _member
      }}
    });        
    //Inicialización de Párametros Member
    const { moderatorMember } = ObjectAuthor;
    //Insuficientes Permisos para usar el Comando
    if (moderatorMember != 1) return perm.moderatorPerms(bot, message);
    //Emoji from Map
    const emoji = synchronous.emojiID[0].afirmado;
    if (!args[0]) {
      message.channel.bulkDelete(10);
      message.channel
        .send(`${putEmoji(bot, emoji)} Se han destruido **10** mensajes.`)
        .then((msg) =>
          msg.delete({ timeout: 5000, reason: "It had to be done." })
        );
      return;
    }
    if (isNaN(args[0]) === true) return err.noCorrectArguments(bot, message);
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel
        .send(`${putEmoji(bot, emoji)} Se han destruido ${args[0]} mensajes.`)
        .then((msg) =>
          msg.delete({ timeout: 5000, reason: "It had to be done." })
        );
    });
  }
};
