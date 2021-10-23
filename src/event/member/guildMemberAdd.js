//Importación de cuerpo de Eventos e importación de Conexión Base de Datos
const {
  welcomeMessage,
} = require("../../../database/conectors/welcomeMessage");
const BaseEvent = require("../../utils/structure/BaseEvent");

//Exportación del Evento guildMemberAdd
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }
  async run(bot, member) {
    try {
      switch (member.guild.id) {
        case "894634118267146272":
          console.log(`Ingreso un nuevo usuario`);
          break;
        default:
          if (member.id == "248204538941538308") break;
          return;
      }
    } catch (error) {
      console.log(
        "Se ha registrado una interacción de Usuario fuera de una Guild. [" +
          error +
          "]"
      );
    }

    welcomeMessage(member, bot);
  }
};
