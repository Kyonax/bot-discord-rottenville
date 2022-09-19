//Importacion de node.js events (EventEmitter)
const { EventEmitter } = require("events");
EventEmitter.defaultMaxListeners = 300;
//Importando archivo Conexión con la Base de Datos

//Creando Clase StateManager - padre(EventEmitter)
class StateManager extends EventEmitter {
  constructor(opts) {
  }
}
//Exportando Conexión obtenida
module.exports = new StateManager();
//Creando la Conexión de Mysql DataBase Global
