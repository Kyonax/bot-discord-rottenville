//Importación de cuerpo de Eventos e importación de Conexión Base de Datos
const Api = require("../../utils/misc/api_discord_functions");
const BaseEvent = require("../../utils/structure/BaseEvent");

//Exportación de Evento ready
module.exports = class ReadyEvent extends BaseEvent {
  //Constructor del Objeto
  constructor() {
    super("ready");
  }

  async run(bot) {
    console.log(`${bot.user.tag} iniciado y en funcionamiento! ☠️`);
    bot.user.setActivity("English Academy", { type: `PLAYING`, });
    //Selección y conexión Con DATOS de la Guild Correspondiente
    bot.guilds.cache.forEach(async (guild) => {

      let _guild = await Api.getGuild(guild.id);

      if (_guild.id === undefined) {
        await Api.postGuild(guild.id, guild.ownerID, "en");
      }

    });
  }
};
