//Importación de cuerpo de Eventos e importación de Conexión Base de Datos
const BaseEvent = require("../../utils/structure/BaseEvent");
//Exportación del Evento guildMemberAdd
module.exports = class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super("guildMemberRemove");
  }
  async run(bot, member) {
    //Variables
    let numberOfMembers = 0;
    let auxNumberOfMembers = 0;
    //Selección y conexión Con DATOS de la Guild Correspondiente
    bot.guilds.cache.forEach((guild) => {
      //Numero de Miembros Totales
      auxNumberOfMembers = numberOfMembers;
      numberOfMembers = auxNumberOfMembers + guild.members.cache.size;
      //Tracker Members      
    });
  }
};
