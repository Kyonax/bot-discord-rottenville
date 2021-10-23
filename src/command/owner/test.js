//Importación Clase de Objetos - Conector Error - Perms
const Perms = require("../../../database/conectors/perm");
const {welcomeMessage} = require("../../../database/conectors/welcomeMessage"); 
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando news
module.exports = class NewsCommand extends BaseCommand {
  constructor() {
    super(
      "test",
      ["test", "tst"],
      "Comando para **testear** algún **Comando Nuevo del Servidor**",
      "image <type>`",
      "***Owner***",
      "owner"
    );
  }

  async run(bot, message, args) {
    welcomeMessage(message.member,bot);
  }};