//Importación de cuerpo de Eventos e importación de Conexión Base de Datos
const Api = require("../../utils/misc/api_discord_functions");
const BaseEvent = require("../../utils/structure/BaseEvent");
//Exportación del Evento guildCreate
module.exports = class guildCreateEvent extends BaseEvent {
  //Constructor del Objeto
  constructor() {
    super("guildCreate");
  }
  async run(bot, guild) {
    try {
      await Api.postGuild(guild.id, guild.ownerID, "en");      
    } catch (error) {
      console.log(error);
    }
  }
};
