//Importación especifica de Metodos - findUserID putEmoji Functions
const { putEmoji, getMember } = require("../../utils/misc/functions.js");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de Usuario
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de la Clase Padre y Conexión con la Base de Datos
const Api = require("../../utils/misc/api_discord_functions");
const BaseCommand = require("../../../src/utils/structure/BaseCommand.js");
const fs = require("fs");
//Exportación del Comando Clear
module.exports = class RestanteCommand extends BaseCommand {
  constructor() {
    super(
      "restante",
      ["restante", "restante"],
      "Observar Cuanto tiempo le queda a un Usuario con su Suscripción.",
      "restante @user`",
      "_***Admin - Inmortales - Moderadores***_",
      "mod"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "1097508462080041030") return;
    //Eliminación del mensaje con Comandos
    message.delete().catch((O_o) => { });
    //Creación de Objetos
    const err = new Error(), perm = new Perms(), autor = getMember(message, message.author.id);
    const ObjAuthorMember = await Api.getMember(autor.guild.id, message.author.id), { perms } = ObjAuthorMember;
    if (perms.moderator !== 1) return perm.moderatorPerms(bot, message);
    //Emoji from Map
    const emoji = synchronous.emojiID[0].afirmado;

    let member = getMember(message, args[0]);


    const currentDate = new Date().getTime(), daysOfSuscription = 31;

    let joinedAt = new Date(currentDate+0 *24*60*60*1000);
    joinedAt = joinedAt.toLocaleDateString();
    joinedAt = joinedAt.replace("/"," ");
    joinedAt = joinedAt.replace("/"," ");

    let _objJSONMembers = null, inDatabase = 0;
    _objJSONMembers = await fs.readFileSync("./database/utils/adds/usersSuscriptions.json");
    _objJSONMembers = JSON.parse(_objJSONMembers);

    const dayEnd = _objJSONMembers[member.user.id].time.end.day;
    const monthEnd = _objJSONMembers[member.user.id].time.end.month;
    const yearEnd = _objJSONMembers[member.user.id].time.end.year;

    let fechaInicio = new Date(`${joinedAt.split(' ')[2]}-${joinedAt.split(' ')[0]}-${joinedAt.split(' ')[1]}`);
    let fechaFin = new Date(`${yearEnd}-${monthEnd}-${dayEnd}`);

    let diff = fechaFin - fechaInicio;
    diff = diff/(1000*60*60*24);

    message.channel.send(`> **La Suscripción del Usuario <@${member.user.id}>** expirará en **__${fechaFin}.__** \n> Tiempo Restante: **__${diff} Días__**`)

  }
};
