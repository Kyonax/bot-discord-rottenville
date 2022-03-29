//Importación especifica de Metodos - findUserID putEmoji Functions
const { MessageEmbed, DataResolver } = require("discord.js");
const { putEmoji, getMember } = require("../../utils/misc/functions.js");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const { noneColor } = require("../../../database/utils/color/color.json");
const Perms = require("../../../database/conectors/perm");
const CitizenJSON = require("../../../database/utils/adds/citizen.json");
//Importación de Usuario
const { memberExist } = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de la Clase Padre y Conexión con la Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand.js");
const fs = require("fs");
//Exportación del Comando Clear
module.exports = class CitizenCommand extends BaseCommand {
  constructor() {
    super(
      "citizen",
      ["newciti"],
      "Upload a new Citizen to the Database.",
      "citizen` `<@user>` - `<wallet>`",
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
    //Miembro existente
    const existMember = (
      await memberExist(message.guild.id, message.author.id)
    )[0];
    //Inicialización de Párametros Member
    const { moderatorMember } = existMember[0];
    //Insuficientes Permisos para usar el Comando
    if (moderatorMember != 1) return perm.moderatorPerms(bot, message);
    //Emoji from Map
    const emoji = synchronous.emojiID[0].afirmado;
    const member = getMember(message, args[0]);
    const walletAdress = args[1];

    CitizenJSON.citizenData.RottenVille.result[`${member.id}`] = {
      memberID: member.id,
      wallet: walletAdress,
    };

    fs.writeFile(
      "./database/utils/adds/citizen.json",
      JSON.stringify(CitizenJSON),
      (err) => {
        if (err) console.log(err);
      }
    );
  }
};

