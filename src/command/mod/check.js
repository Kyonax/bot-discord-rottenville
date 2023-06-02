
//Importación especifica de Metodos - findUserID putEmoji Functions
const { putEmoji, getMember, delay } = require("../../utils/misc/functions.js");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de Usuario
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de la Clase Padre y Conexión con la Base de Datos
const Api = require("../../utils/misc/api_discord_functions");
const BaseCommand = require("../../../src/utils/structure/BaseCommand.js");
const fs = require("fs");

async function expulsar_usuario (bot, emoji, _objJSONMembers, member, member_local, message) {
  _objJSONMembers[member_local].paid = 0;

  try {
    member.roles.remove("1098486568991326330");
    member.roles.remove("1098487509324939324");
    member.roles.remove("1098487966009131029");
    member.roles.remove("1098495106073514106");
    member.roles.add("1098498388963622932");
  } catch (err) {
    console.log(err);
  }
  message.channel.send(`> ${putEmoji(bot, emoji)} **El Bot a detectado que el usuario <@${member_local}> se le ha terminado la Suscripción al plan <@&${_objJSONMembers[member_local].type}>.** *(Puede Renovarla con el comando: `+"`!renovar @user @suscripción`"+`)*`);
  console.log(`Usuario ${member_local} no ha renovado sub!`)
  //console.log(`El Usuario ${member_local} tiene el mismo año de caducimiento: ${_objJSONMembers[member_local].time.end.day} = ${todayDate.split(' ')[1]}`)
}

async function dar_role (_objJSONMembers, member_local, message, member) {
  _objJSONMembers[member_local].paid = 1;

  try {
    member.roles.add(_objJSONMembers[member_local].type);
    member.roles.add("1098495106073514106");
    member.roles.remove("1098498388963622932");
  } catch (err) {
    console.log(err) ;
  }
}
//Exportación del Comando Clear
module.exports = class CheckCommand extends BaseCommand {
  constructor() {
    super(
      "check",
      ["look", "checking"],
      "Check if any Sub is Out-of-date",
      "check`",
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


    const currentDate = new Date().getTime();

    let todayDate = new Date(currentDate+0 *24*60*60*1000);
    todayDate = todayDate.toLocaleDateString();
    todayDate = todayDate.replace("/"," ");
    todayDate = todayDate.replace("/"," ");

    let _objJSONMembers = null;
    _objJSONMembers = await fs.readFileSync("./database/utils/adds/usersSuscriptions.json");
    _objJSONMembers = JSON.parse(_objJSONMembers);



    for(var member_local in _objJSONMembers) {


    const dayEnd = _objJSONMembers[member_local].time.end.day;
    const monthEnd = _objJSONMembers[member_local].time.end.month;
    const yearEnd = _objJSONMembers[member_local].time.end.year;

    let fechaInicio = new Date(`${todayDate.split(' ')[2]}-${todayDate.split(' ')[0]}-${todayDate.split(' ')[1]}`);
    let fechaFin = new Date(`${yearEnd}-${monthEnd}-${dayEnd}`);

    let diff = fechaFin - fechaInicio;

      try{
      let guildID = bot.guilds.cache.get(message.guild.id);
      let member = await guildID.members.fetch(member_local);



    await delay(1000).then(function () {
      message.channel.send(`> ${putEmoji(bot, emoji)} **Checking to <@${member_local}>** suscription end on **__${_objJSONMembers[member_local].time.end.day}/${_objJSONMembers[member_local].time.end.month}/${_objJSONMembers[member_local].time.end.year}__**`);
    });

        console.log(`-------------------------------------------------------`);
        console.log(`Persona: ${member.user}`);
        console.log("Tiempo en base de Datos: "+`Año: ${_objJSONMembers[member_local].time.end.year}/ Mes: ${_objJSONMembers[member_local].time.end.month}/ Día: ${_objJSONMembers[member_local].time.end.day}`);
        console.log("Tiempo de hoy: "+`Año: ${todayDate.split(' ')[2]}/ Mes: ${todayDate.split(' ')[0]}/ Día: ${todayDate.split(' ')[1]}`);
        console.log(`Tiempo Restante: ${diff}`);
        diff = diff/(1000*60*60*24);
        console.log(`Tiempo Restante Remake: ${diff}`);

        if (diff <= 0){
          expulsar_usuario(bot, emoji, _objJSONMembers, member, member_local, message);
        } else {
          dar_role(_objJSONMembers, member_local, message, member)
        }

      } catch (err){
        message.channel.send(err);
      }

    }

    try{
      const writeData = await fs.writeFileSync("./database/utils/adds/usersSuscriptions.json", JSON.stringify(_objJSONMembers), (err) => {
        if (err) console.log(err);
      })}catch (error) {console.log(error)
    }

  }
};
