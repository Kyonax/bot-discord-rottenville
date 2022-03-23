const guildJSON = require("../../../database/misc/Guild.json");
const guildConfigurableJSON = require("../../../database/misc/GuildConfigurable.json");
//Methods
const { insertNewGuildIntoJSON } = require("../../utils/database/functions");
//Importación de cuerpo de Eventos e importación de Conexión Base de Datos
const BaseEvent = require("../../utils/structure/BaseEvent");
//Exportación del Evento guildCreate
module.exports = class guildCreateEvent extends BaseEvent {
  //Constructor del Objeto
  constructor() {
    super("guildCreate");
  }
  async run(bot, guild) {
    try {
      const insertNewGuild = await insertNewGuildIntoJSON(
        guildJSON,
        guildConfigurableJSON,
        guild.id,
        guild.ownerID
      );
    } catch (error) {
      console.log(error);
    }
  }
};
