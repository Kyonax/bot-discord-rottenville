
//Importación especifica de Metodos - findUserID putEmoji Functions
const { putEmoji, getMember, replaceRoleItems } = require("../../utils/misc/functions.js");
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
module.exports = class RenovarCommand extends BaseCommand {
  constructor() {
    super(
      "renovar",
      ["renovar", "renovar"],
      "Renueva la Suscripción de un Usuario",
      "renovar @user @suscripción`\n**Options Suscripción:** `time` - `progressive` - `intensive`",
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

    let member = getMember(message, args[0]);
    if (!member) return err.noUserDigitARole(bot, message);
    let role = args[1];
    if (!role) return err.noARoleDigit(bot, message);

    if(role === "time") role = "1098487966009131029";
    if(role === "progressive") role = "1098487509324939324";
    if(role === "intensive") role = "1098486568991326330";

    //Emoji from Map
    const emoji = synchronous.emojiID[0].afirmado;


    const currentDate = new Date().getTime(); let daysOfSuscription = 31;

    if(args[2]) daysOfSuscription = args[2];

    let joinedAt = new Date(currentDate+0 *24*60*60*1000);
    joinedAt = joinedAt.toLocaleDateString();
    joinedAt = joinedAt.replace("/"," ");
    joinedAt = joinedAt.replace("/"," ");
    let endAt = new Date(currentDate+daysOfSuscription *24*60*60*1000);
    endAt = endAt.toLocaleDateString();
    endAt = endAt.replace("/", " ");
    endAt = endAt.replace("/", " ");

    // console.log(`Joined At: M:${joinedAt.split(' ')[0]}|D:${joinedAt.split(' ')[1]}|Y:${joinedAt.split(' ')[2]}`);
    // console.log(`End At: M:${endAt.split(' ')[0]}|D:${endAt.split(' ')[1]}|Y:${endAt.split(' ')[2]}`)


    let _objJSONMembers = null, inDatabase = 0;
    _objJSONMembers = await fs.readFileSync("./database/utils/adds/usersSuscriptions.json");
    _objJSONMembers = JSON.parse(_objJSONMembers);

    for(var member_local in _objJSONMembers) {
      if(member.user.id === member_local){
        inDatabase = 1;
      }
    }

    if(inDatabase === 0){

      _objJSONMembers[member.user.id] = {
        "type": role,
        "paid": 1,
        "time": {
          "join": {
            "month": joinedAt.split(' ')[0],
            "day": joinedAt.split(' ')[1],
            "year": joinedAt.split(' ')[2],
          },
          "end": {
            "month": endAt.split(' ')[0],
            "day": endAt.split(' ')[1],
            "year": endAt.split(' ')[2],
          }

        }
      }
    } else {
      _objJSONMembers[member.user.id].paid = 1;
      _objJSONMembers[member.user.id].type = role;
      _objJSONMembers[member.user.id].time.end = {
            "month": endAt.split(' ')[0],
            "day": endAt.split(' ')[1],
            "year": endAt.split(' ')[2],
        }
    }

    member.roles.add(role);
    member.roles.add("1098495106073514106");
    member.roles.remove("1098498388963622932");


    message.channel.send(`> ${putEmoji(bot, emoji)} **Se ha renovado la suscripción de <@${member_local}> y se le ha otorgado <@&${_objJSONMembers[member_local].type}>.**`);
    console.log(`Usuario ${member_local} ha renovado sub!`)

    try{
      const writeData = await fs.writeFileSync("./database/utils/adds/usersSuscriptions.json", JSON.stringify(_objJSONMembers), (err) => {
        if (err) console.log(err);
      })
    }catch (error) {
      console.log(error)
    }

  }
};
