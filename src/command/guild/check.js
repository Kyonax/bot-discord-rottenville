//Importación especifica de Metodos - MessageEmbed - nonecolor Color - putEmoji Function
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { putEmoji } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const {
    getMember,    
    initObjectMember,
    numberWithCommas,
  } = require("../../utils/misc/functions");
const WhitelistJSON = require("../../../database/misc/Whitelist.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
var fs = require("fs"),
  gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });
//Exportación del Comando Check
module.exports = class CheckCommand extends BaseCommand {
  constructor() {
    super(
      "check",
      ["veri", "check"],
      "Check the data user in the Whitelist.",
      "check`",
      "_***Everyone***_",
      "guild"
    );
  }
  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    message.delete().catch((O_o) => {});
    //Creación de Mensaje Embed
    let embed = new MessageEmbed().setColor(noneColor);
    embed.setTitle(`${putEmoji(bot, "905441646362107924")} Whitelist Support`);
    let _jsonString, i = 1;
    let member = getMember(message, args[0]);
    //Emoji from Map
    let msg = null;    

    const emoji = synchronous.emojiID[0].afirmado;
    //Creación de Objetos
    _jsonString = await fs.readFileSync(
      "./database/misc/Whitelist.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );
    //Solicitando Json
    JSON.parse(_jsonString).Whitelist.forEach(async (spot) => {
        let { alpha, whitelist, upvote, wallet } = spot;
      if (member.id === spot.id) {       
        if (upvote === true && whitelist === true) {
            embed.addField(
                "**Data from User**",
                `**User:** <@${member.id}> **Alpha Holder = __${JSON.parse(_jsonString).Whitelist[i-1].alpha}__** - **Is Whitelisted = __${JSON.parse(_jsonString).Whitelist[i-1].whitelist}__**\n **Wallet Holder = __${JSON.parse(_jsonString).Whitelist[i-1].wallet}__**\n**Upvote in ME = __${JSON.parse(_jsonString).Whitelist[i-1].upvote}__**\n\n True means **YES** - **__[Bot Developer](https://twitter.com/kyonax_on_nft)__**`
              );
              embed.addField(
                "**VERIFY SUCCES:**",
                `**Whitelisted __${wallet}__**, you'll recieve a Whitelist Token that will help you MINT the Rotten Bust Sculptures. Be pretty alert to the Announcements on Twitter & Discord, let's build the RottenVerse together!\n\n**Important Links:**
                **__[Rotten Ville Bust Sculptures](https://twitter.com/rotten_ville/status/1519365371710615553)__**
                **__[Rotten Ville Project](https://twitter.com/rotten_ville/status/1518978216706420738)__**
                **__[Development Team](https://twitter.com/rotten_ville/status/1517512268975677440)__**\n
                **__[Bot Developer](https://twitter.com/kyonax_on_nft)__**\n\n
          
                Help the project with an **__[Upvote in Magic Eden - Click here -](https://magiceden.io/drops/rotten_ville_sculptures)__**.\nThis upvote will help the Collection get to the eyes of everyone in the ecosystem!!\n\n check your wallet on <#973604972614811729> using the command `+"`!check` - deploy a Wallet status.\n\nESPAÑOL:\n"+`
                Ayuda al proyecto con un **__[Voto a favor en Magic Eden - Haga clic aquí -](https://magiceden.io/drops/rotten_ville_sculptures)__**.\nEste voto a favor ayudará a que la Colección llegue a los ojos de todos en el ecosistema!!\n\n verifica tu billetera en <#973604972614811729> usando el comando `+"`!check` - muestra un panel con el estado de su billetera."+`
                
                \n\n**Important Links:**
                **__[Rotten Ville Bust Sculptures](https://twitter.com/rotten_ville/status/1519365371710615553)__**
                **__[Rotten Ville Project](https://twitter.com/rotten_ville/status/1518978216706420738)__**
                **__[Development Team](https://twitter.com/rotten_ville/status/1517512268975677440)__**\n            
                `
              );  
    
              message.channel.send(
                `${putEmoji(bot, "910545619238678538")} <@${message.author.id}> **Congrats!!! You are now Whitelisted - Felicidades! Ahora estás dentro de la Whitelist.**`,
                embed
              ).then((msg) => {
                msg.delete({ timeout: 30000, reason: "It had to be done." });
              });       
      
              return;
        }
      }else if (
        JSON.parse(_jsonString).Whitelist.length === i &&
        message.author.id !== spot.id
      ) {
        embed.addField(
            "**YOU NEED TO UPVOTE IN MAGIC EDEN/DEBES VOTAR EN MAGIC EDEN:**",
            `You need to **__[Upvote in Magic Eden - Click here -](https://magiceden.io/drops/rotten_ville_sculptures)__ first**.\nIf you can't upvote, take a screenshot of the error, and post it in <#901155551239614485>, tag <@248204538941538308>.\n\n then go to <#973604972614811729> and use the command `+"`!whitelist <wallet_address>` to get Whitelisted.\n\nESPAÑOL:\n"+`
            Debes **__[Votar en Magic Eden - Haga clic aquí -](https://magiceden.io/drops/rotten_ville_sculptures)__ primero**.\nSi no puedes votar, toma una captura de pantalla al error que no te permite votar y publícalo en <#901155551239614485>, etiqueta a <@248204538941538308>.\n\n luego dírigete a <#973604972614811729> y usa el comando `+"`!whitelist <wallet_address>` para entrar a la Whitelist."
          );        
          message.channel.send(`${putEmoji(bot, "910558105228677211")} <@${message.author.id}> **Please read the information below, you are not whitelisted yet.**\n**Porfavor lee la información a continuación, aún no estás en la whitelist.**`,embed).then((msg) => {
            msg.delete({ timeout: 30000, reason: "It had to be done." });
          });
      }
      i++;
    });
  }
};
