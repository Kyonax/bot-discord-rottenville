//Importación Clase de Objetos - Conector Error - Perms
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Normal Imports
const cores = require('os').cpus()
const cluster = require('cluster')

module.exports = class CpuCommand extends BaseCommand {
    constructor() {
      super(
        "cpu",
        ["cores", "threads", "forks"],
        "Comando para **saber cuantos ** procesadores tiene el Host.",
        "cpu`",
        "***Owner***",
        "owner"
      );
    }
  
    async run(bot, message, args) {      
      //Eliminación del mensaje con Comandos
      message.delete().catch((O_o) => {});
      //Creación de Objetos
      const perm = new Perms();
      //Validación Permisos
      if (message.member.id != message.guild.ownerID)
        return perm.ownerPerms(bot, message);
        console.log(cores) 

        if (cluster.isMaster){
            console.log("Master process: ",process.pid)     
            cluster.fork()
            cluster.fork()
            cluster.fork()
        }else {
            console.log("Worker process: ",process.pid)
        }
    }}