//Importando npm dotenv - discord.js (Client,Collection)
require("dotenv").config();
const { Client, Collection } = require("discord.js");
//Declarando bot como Client
const bot = new Client({ partials: ["MESSAGE", "REACTION"] });
//Iniciación de Comandos y Alias de los Mismos con - discord.js (Collection)
["commands", "aliases"].forEach((x) => (bot[x] = new Collection()));
//Importación de las funciones registerCommands - registerEvents
const { registerCommands, registerEvents } = require("./utils/handler/handler");

//Ejecución de bot.login - registerCommands - registerEvents
(async () => {  
  //Conexión con el Token del Bot Discord - usando dotenv
  bot.login(process.env.TOKEN);  
  //Lectura de Comandos y Eventos
  await registerCommands(bot, "../../command");
  await registerEvents(bot, "../../event");
})();

var pm2 = require("pm2");

pm2.connect(function (err) {
  if (err) throw err;

  setTimeout(function worker() {
    console.log("Restarting app...");
    pm2.restart("app", function () {});
    setTimeout(worker, 1815000);
  }, 1815000);
});
