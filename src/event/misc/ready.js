//Importación de Status en diferentes Idiomas
const {
  StatusLanguageChannels,
  StatusLanguageEmojis,
  StatusLanguageGuild,
  StatusLanguageGuilds,
  StatusLanguageHelp,
  StatusLanguageRole,
  StatusLanguageRoles,
  StatusLanguageUsers,
} = require("../../utils/languages/languageStatus");
const { insertNewGuildIntoJSON, isGuildOnJSON } = require("../../utils/database/functions");
const guildJSON = require("../../../database/misc/Guild.json");
const guildConfigurableJSON = require("../../../database/misc/GuildConfigurable.json");
//Importación de cuerpo de Eventos e importación de Conexión Base de Datos
const BaseEvent = require("../../utils/structure/BaseEvent");
const { twitter } = require("../../utils/misc/twitter");
//Exportación de Evento ready
module.exports = class ReadyEvent extends BaseEvent {
  //Constructor del Objeto
  constructor() {
    super("ready");    
  }
  async run(bot) {
    const Twitter_Notify = await twitter(bot);
    //Mensaje por Consola Bot Iniciado
    console.log(`${bot.user.tag} iniciado`);
    //Variables
    const numberOfGuilds = bot.guilds.cache.size;
    let numberOfMembers = 0;
    let numberOfChannels = 0;
    let numberOfRoles = 0;
    let numberOfEmojis = 0;
    let nameOfGuilds = [];
    let nameOfRoles = [];
    //Auxiliares
    let auxNumberOfMembers = 0;
    let auxNumberOfChannels = 0;
    let auxNumberOfRoles = 0;
    let auxNumberOfEmojis = 0;
    //Selección y conexión Con DATOS de la Guild Correspondiente
    bot.guilds.cache.forEach(async (guild)  => {
      let guildRegistered, guildConfigurableRegistered
      let dataRegistered = await isGuildOnJSON(guildJSON,guildConfigurableJSON,guild.id)
      guildRegistered = dataRegistered[0]
      guildConfigurableRegistered = dataRegistered[1]
      
      if (guildRegistered != "registered" || guildConfigurableRegistered != "registered") {
        const newGuildRegister = await insertNewGuildIntoJSON(guildJSON,guildConfigurableJSON,guild.id,guild.ownerID);
        console.log(`NEW GUILD REGISTERED - Guild: ${guild.id} & Owner: ${guild.ownerID}`)
      }
      //Numero de Miembros Totales
      auxNumberOfMembers = numberOfMembers;
      numberOfMembers = auxNumberOfMembers + guild.members.cache.size;
      //Numero de Canales Totales
      auxNumberOfChannels = numberOfChannels;
      numberOfChannels = auxNumberOfChannels + guild.channels.cache.size;
      //Numero de Roles Totales
      auxNumberOfRoles = numberOfRoles;
      numberOfRoles = auxNumberOfRoles + guild.roles.cache.size;
      //Numero de Emojis
      auxNumberOfEmojis = numberOfEmojis;
      numberOfEmojis = auxNumberOfEmojis + guild.emojis.cache.size;
      //Nombre de las Guild
      nameOfGuilds.push(guild.name);
      //Nombre de todos los Roles
      guild.roles.cache.forEach((rol) => {
        nameOfRoles.push(rol.name);
      });                            
    });

    //Status Bot
    let translate = [];
    let statuses = [
      "Danger Zones "+numberOfGuilds,
      "Radiation "+numberOfMembers*numberOfRoles,
      "Alpha Zone",
      "Gamma Zone",
      "Beta Zone",
      "Radioactive Levels",
      "Mutations",
      "Rotten Points "+numberOfMembers*numberOfRoles/6,
      "Radiation Exposure",
      "Survivor Radar",
      "Transmutate Radiation",
      "Collecting Radiation",
      "Extracting Radiation",
    ];
    let types = ["WATCHING", "PLAYING", "LISTENING"];
    setInterval(function () {
      let status = statuses[Math.floor(Math.random() * statuses.length)];
      let type = types[Math.floor(Math.random() * types.length)];
      bot.user.setActivity(status, {
        type: `${type}`,
      });
    }, 12000);
  }
};
