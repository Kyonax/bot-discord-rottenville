//Importación de cuerpo de Eventos e importación de Conexión Base de Datos
const {
  welcomeMessage,
} = require("../../../database/conectors/welcomeMessage");

const BaseEvent = require("../../utils/structure/BaseEvent");

const fs = require("fs");
const Invites = require("../../../database/utils/adds/invites.json");
const { suscriptionAdd } = require("../../../database/conectors/suscriptionMembers");
const { checkingSuscriptions } = require("../../../database/conectors/checkSuscriptionMember");
//Exportación del Evento guildMemberAdd
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }
  async run(bot, member) {

    const welcome = await welcomeMessage(member, bot);
    const _checkingSuscriptions = await checkingSuscriptions(member, bot);

    let _objJSONMembers = null, userPaid = 1;
    _objJSONMembers = await fs.readFileSync("./database/utils/adds/usersSuscriptions.json");
    _objJSONMembers = JSON.parse(_objJSONMembers);

    let _objJSONInvites = null;

    _objJSONInvites = await fs.readFileSync("./database/utils/adds/invites.json");
    _objJSONInvites = JSON.parse(_objJSONInvites);

    if(_objJSONMembers[member.user.id]){
      if(_objJSONMembers[member.user.id].paid === 0){
        userPaid = 0;
      }
    }

    if(userPaid === 1){

    for(var invite in _objJSONInvites){

    await member.guild.fetchInvites().then(guildInvites => {

      guildInvites.forEach(async inviting => {
        if(invite === inviting.code){
          console.log(`Local Invites: ${_objJSONInvites[invite].uses} - Discord Invites: ${inviting.uses}`)
          if((_objJSONInvites[invite].uses + 1) === inviting.uses ){
            _objJSONInvites[invite].uses = _objJSONInvites[invite].uses +1;
            var role= member.guild.roles.cache.find(role => role.id === _objJSONInvites[invite].role);
            member.roles.add(role);
            member.roles.add("1098495106073514106");
            const addSuscriptionMember = await suscriptionAdd(member,bot,role);
          }
        }
      })

    });

    }

    } else {
     for(var invite in _objJSONInvites){

    await member.guild.fetchInvites().then(guildInvites => {

      guildInvites.forEach(async inviting => {
        if(invite === inviting.code){
          console.log(`Local Invites: ${_objJSONInvites[invite].uses} - Discord Invites: ${inviting.uses}`)
          if((_objJSONInvites[invite].uses + 1) === inviting.uses ){
            _objJSONInvites[invite].uses = _objJSONInvites[invite].uses +1;
          }
        }
      })

    });

    }
    }



    try{
      const writeData = await fs.writeFileSync("./database/utils/adds/invites.json", JSON.stringify(_objJSONInvites), (err) => {
        if (err) console.log(err);
      })
    }catch (error) {
      console.log(error)
    }


    try {
      switch (member.guild.id) {
        case "894634118267146272":
          console.log(`Ingreso un nuevo usuario`);
          break;
        default:
          if (member.id == "248204538941538308") break;
          return;
      }
    } catch (error) {
      console.log(
        "Se ha registrado una interacción de Usuario fuera de una Guild. [" +
          error +
          "]"
      );
    }

  }
};
