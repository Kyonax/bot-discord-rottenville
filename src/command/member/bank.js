//Importación especifica de Metodos - MessageEmbed - getMember putEmoji initObjectMember Function - kyocolor
const { MessageEmbed } = require("discord.js");
const {
  getMember,
  putEmoji,
  initObjectMember,
  numberWithCommas,
} = require("../../utils/misc/functions");
const { goldColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const fs = require("fs");
//Exportación de Comando Bank
module.exports = class BankCommand extends BaseCommand {
  constructor() {
    super(
      "exposure",
      ["coins", "banco", "monedas", "synkoins"],
      "Deploy a panel with the exposure information.",
      "bank`\n**Admin Options:** `<user>`",
      "_***Everyone***_",
      "member"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Inicialización para el Usuario escrito
    let autor = message.author;
    let member = getMember(message, args[0]);
    let _jsonString, _jsonString_bank, ObjectMember = null, ObjectBankMember = null        
    //Inicialización Guild Prefix
    _jsonString = await fs.readFileSync('./database/misc/GuildMembers.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }
    })

    _jsonString_bank = await fs.readFileSync('./database/misc/GuildBank.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }
    })

    JSON.parse(_jsonString_bank).forEach(_member => {       
      if (member.id == _member.memberID) {
        ObjectBankMember = _member           
      }      
    });

    JSON.parse(_jsonString).forEach(_member => {       
      if (member.id == _member.memberID) {
        ObjectMember = _member           
      }      
    });        
    
    if (ObjectMember === null)
      return err.noFindMember(bot, message, member.displayName);
    const { inmortalMember } = ObjectMember;
    const { memberCoins } = ObjectBankMember;
    if (!memberCoins) {
      return err.noFindMember(bot, message, member.displayName);
    }
    //Validación de Permisos Synks
    if (parseInt(inmortalMember) === 0) {
      if (member.id != autor.id) return perm.inmortalPerms(bot, message);
    }
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].synkoin);
    //Creación del Mensaje Embed del Comando
    let embed = new MessageEmbed()
      .setTitle(`**${member.displayName}'s Level Radiation**`)
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(
        `${putEmoji(bot, synchronous.emojiID[0].afirmado)} Checking <@${
          member.id
        }> Alpha Radiation.`
      )
      .setColor("#b4e634")
      .addField("**User**", `**[${member.displayName}]**`, true)
      .addField(
        " **Alpha Radiation**",
        `**${numberWithCommas(memberCoins)} ${emoji} Becquerel.**`,
        true
      )
      .addFields({ name: "\u200B", value: "\u200B", inline: true })
      .addField("**Beta Radiation**", `**0 ${emoji} Becquerel.**`, true)
      .addField("**Gamma Radiation**", `**0 ${emoji} Becquerel.**`, true)
      .addFields({ name: "\u200B", value: "\u200B", inline: true })
      .setFooter("RottenBot radiation scanner")
      .setTimestamp();
    //Lectura del Mensaje - Envío al canal Destinado - Mensaje que usa el Comando Eliminado
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 60000, reason: "It had to be done." });
    });
  }
};
