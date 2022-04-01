//Importación especifica de Metodos - findUserID putEmoji Functions
const { MessageEmbed } = require("discord.js");
const {
  initObjectMember,
  getMember,
  putEmoji,
  replaceRoleItems,
} = require("../../utils/misc/functions.js");
const { goldColor } = require("../../../database/utils/color/color.json");

//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de Usuario
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de la Clase Padre y Conexión con la Base de Datos
const BaseCommand = require("../../../src/utils/structure/BaseCommand.js");
const fs = require("fs");
//Exportación de Comando Poll
module.exports = class BattlesCommand extends BaseCommand {
  constructor() {
    super(
      "battles",
      ["batalla", "btl", "battle"],
      "Create a new RottenVille Battle Selection.",
      "battle`\n**Rol Announcement:** `<rol>`\n**Members:** `@competitor_1` `@competitor_2`",
      "_***Admin - Inmortales - Moderadores***_",
      "mod"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});    
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    const autor = getMember(message, message.author.id);
    let number = args[3];
    let member = getMember(message, args[0]);
    if (!number) number = 1;
    let [cmd, role] = message.content.split(" ");
    let _competitor_1 = args[1];
    let _competitor_2 = args[2];

    let _jsonString, ObjectAuthor = null        
    //Inicialización Guild Prefix
    _jsonString = await fs.readFileSync('./database/misc/GuildMembers.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }
    })        

    JSON.parse(_jsonString).forEach(_member => {  
      if (_member.guildID == member.guild.id) {                
      if(message.author.id == _member.memberID){
        ObjectAuthor = _member
      }}
    });         
    
    //Permisos de Autor
    const { moderatorMember } = ObjectAuthor;
    
    //Validaciones - Permisos de Uso - Usuario - Rol - Rol Encontrado
    if (moderatorMember !== 1) return perm.moderatorPerms(bot, message);
    if (!role.includes("@")) {
      role = "@everyone";
    }
    role = replaceRoleItems(role);
    let gRole = message.guild.roles.cache.find((rol) => rol.id == role);
    //Creación del Mensaje Embed
    let embed = new MessageEmbed()
      .setTitle(`**Solana RottenVille-Battles | Tournament 🏁**`)
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(
        `**🥊 The competitor with more reactions wins!! (Every Reaction cost 100 $RP ${putEmoji(
          bot,
          "905441645980422214"
        )})**

${putEmoji(bot, "918868797367148604")} **<@&918875434639323136> #39 VS ${putEmoji(
          bot,
          "918869733783269436"
        )} <@&918875434639323136> #127 **

**You have only 24Hrs,** if you vote for the winner Rotten you can win $RP ${putEmoji(
          bot,
          "905441645980422214"
        )}, **all the radiation voted for the Winner Rotten goes directly to their exposure.**

${putEmoji(bot, "910558104838615090")} Happy Tournament! - RottenVille Team

`
      )
      .setColor("#8942C0")
      .addField("**User**", `${autor}`, true)
      .addField(
        `**Vote for your favorite - [${gRole.name}]**`,
        `**Send it from ${message.channel}**`,
        true
      )
      .attachFiles([
        `database/multimedia/images/demo/server/RTSolBattlesTournament${number}.png`,
      ])
      .setImage(`attachment://RTSolBattlesTournament${number}.png`)
      .setFooter("Solana RottenVille-Battles Tournament Selection")
      .setTimestamp();
/*
    const encChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "🎁・rottenville-battles"
    );
    if (!encChannel) {
      return message.guild.channels
        .create("encuestas", {
          type: "text",
          permissionOverwrites: [
            {
              id: message.guild.roles.everyone,
              deny: ["SEND_MESSAGES", "ATTACH_FILES"],
              allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
            },
          ],
        })
        .catch((err) => console.log(err));
    }
*/
    message.channel.send(
      `**RTSolBattles Tournament ${gRole}!! | ${_competitor_1} VS ${_competitor_2}** ${putEmoji(
        bot,
        "910558105031544842"
      )}`
    );
    message.channel.send(embed);
  }
};
