const { MessageEmbed } = require("discord.js");
const guildBankJSON = require("../../../database/misc/GuildBank.json");
const {
  getMember,
  putEmoji,
  initObjectMember,
  numberWithCommas,
} = require("../../utils/misc/functions");
const {
  goldColor,
  cleverColor,
} = require("../../../database/utils/color/color.json");
const {
  updateGuildBankCoins,
  updateGuildMemberBoost,
  updateGuildLevel, updateGuildBankCoinsJSON
} = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const  RTSolBattles  = require("../../../database/utils/adds/votes.json");
const { limit } = require("../../utils/logic/logicMember");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const StateManager = require("../../utils/database/StateManager");
//Mapa de pregijos guildCommandPrefix
const guildMembersBank = new Map();
const bankGuilds = new Map();
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Pay
//Importación de paquetes JS de Node.js
const fs = require("fs");
//Importación de la Clase Padre
const BaseEvent = require("../../utils/structure/BaseEvent");
module.exports = class MessageReactionAdd extends BaseEvent {
  constructor() {
    super("messageReactionAdd");
  }
  async run(bot, reaction, user) {
    const err = new Error();
    let eventChannel = reaction.message.guild.channels.cache.find(
      (ch) => ch.name === "🎁・events-holders"
    );

    if (user.bot) return;

    let applyRole = async () => {
      let emojiName = reaction.emoji.name;
      let member = reaction.message.guild.members.cache.find(
        (member) => member.id === user.id
      );
      const userReactions = reaction.message.reactions.cache.filter(
        (reaction) => reaction.users.cache.has(user.id)
      );

      try {
        if (member) {
          if (
            emojiName.toLowerCase() == "p1" ||
            emojiName.toLowerCase() == "p2"
          ) {
            //Creación de Objeto Bank Member

            let ObjectMember = null;
            let ObjectBankMember = null;
            let ObjectBankAuthor = null, _jsonString, _jsonString_bank;
          //Inicialización Guild Prefix
          _jsonString = await fs.readFileSync(
            "./database/misc/GuildMembers.json",
            "utf8",
            (err, jsonString) => {
              if (err) {
                console.log("File read failed:", err);
                return;
              }
            }
          );
      
          _jsonString_bank = await fs.readFileSync(
            "./database/misc/GuildBank.json",
            "utf8",
            (err, jsonString) => {
              if (err) {
                console.log("File read failed:", err);
                return;
              }
            }
          );
      
          JSON.parse(_jsonString_bank).forEach((_member) => {
            if (_member.guildID == reaction.message.guild.id) {
              
            
            if (member.id == _member.memberID) {
              
              ObjectBankAuthor = _member;
            }
            if ("894243194051629156" == _member.memberID) {
              ObjectBankMember = _member;  
            }           
      
            }
          });
      
          JSON.parse(_jsonString).forEach((_member) => {
            if (_member.guildID == reaction.message.guild.id) {
            if (member.id == _member.memberID) {
              ObjectMember = _member;
            }}
          });           

            if (!ObjectMember) {
              for (const reaction of userReactions.values()) {
                member.roles.remove("918907276981583932");
                await reaction.users.remove(user.id);
              }

              return err.noFindMember(bot, reaction.message);
            }

            if (!ObjectBankMember.memberCoins) {
              for (const reaction of userReactions.values()) {
                member.roles.remove("918907276981583932");
                await reaction.users.remove(user.id);
              }

              return err.noFindMember(bot, reaction.message);
            }

            let actualMemberCoins = parseInt(ObjectBankMember.memberCoins);
            let actualAuthorCoins = parseInt(ObjectBankAuthor.memberCoins);

            const ammountPay = 100;
            if (actualAuthorCoins < ammountPay) {
              for (const reaction of userReactions.values()) {
                member.roles.remove("918907276981583932");
                await reaction.users.remove(user.id);
              }

              return err.dontHaveSynkoins(
                bot,
                reaction.message,
                member.displayName
              );
            }

            try {
              if (
                member.roles.cache.some(
                  (role) => role.id === "918907618330808381"
                )
              ) {
                for (const reaction of userReactions.values()) {
                  member.roles.remove("918907276981583932");
                  await reaction.users.remove(user.id);
                }

                eventChannel.send(
                  putEmoji(bot, "910558104838615090") +
                    "**<@" +
                    member +
                    "> If you are a <@&918907618330808381> you can't vote, tell your friends and wait for the best** **| Si eres un <@&918907618330808381> no puedes votar, dile a tus amigos y espera lo mejor** "
                );
                return;
              }
              if (
                member.roles.cache.some(
                  (role) => role.id === "918907276981583932"
                )
              ) {
                for (const reaction of userReactions.values()) {
                  member.roles.remove("918907276981583932");
                  await reaction.users.remove(user.id);
                }
                eventChannel.send(`<@${member.id}>
${putEmoji(
  bot,
  "910558104838615090"
)} **You can't vote for the 2 competitors, your vote is going to be removed, and you can't recover the RP ${putEmoji(
                  bot,
                  "905441645980422214"
                )}, if you want to vote you have to do it again.**
**No puedes votar por ambos competidores, tu voto va a ser removido, y no podras recuperar el RP ${putEmoji(
                  bot,
                  "905441645980422214"
                )}, si deseas votar tienes que hacerlo nuevamente.**`);
              } else {

                for (const reaction of userReactions.values()) {                  
                  await reaction.users.remove(user.id);
                }
                
                if (emojiName.toLowerCase() == "p1") {
                  RTSolBattles.member[member.id] = {
                    p1: 1,
                    p2: 0
                  }
                }else if (emojiName.toLowerCase() == "p2") {
                  RTSolBattles.member[member.id] = {
                    p1: 0,
                    p2: 1
                  }
                }

                fs.writeFile(
                  "./database/utils/adds/votes.json",
                  JSON.stringify(RTSolBattles),
                  (err) => {
                    if (err) console.log(err);
                  }
                );
                
                member.roles
                  .add("918907276981583932")
                  .catch((err) => console.error);

                //Creación de Mensajes Embed para el Comando
                let embed = new MessageEmbed()
                  .setTitle(`**${member.displayName}'s Rotten Points**`)
                  .setColor(goldColor)
                  .setThumbnail(bot.user.displayAvatarURL())
                  .setFooter("RottenBot $rp scanner")
                  .setTimestamp();

                //Validación de variables - Monedas - Usuario

                const updateMCoins = actualMemberCoins + parseInt(ammountPay);
                const updateACoins = actualAuthorCoins - parseInt(ammountPay);
                //Validación de Variables - No suficientes Monedas

               
               
                //Update Map
                ObjectBankAuthor.memberCoins = updateACoins;
                ObjectBankMember.memberCoins = updateMCoins;
                //Emit Update

                const updateBankJSON = await updateGuildBankCoinsJSON(
                  guildBankJSON,
                  reaction.message.guild.id,
                  "894243194051629156",
                  updateMCoins
                );
          
                const updateAuthorBankJSON = await updateGuildBankCoinsJSON(
                  guildBankJSON,
                  reaction.message.guild.id,
                  member.id,
                  updateACoins
                );

                //Inicialización de Emojis y su Uso respectivo
                let emoji = putEmoji(bot, "905441645980422214");
                //Inicialización de Variable Razón de Transferencia
                let reason = "";
                //Agregación al Embed
                embed.setDescription(
                  `<@${member.id}> has voted in **The RTSolBattlesTournament** ${reason}.`
                );
                embed.addField(
                  "**Amount of Rotten Points**",
                  `**${numberWithCommas(
                    ammountPay
                  )} ${emoji} Rotten Points.**`,
                  true
                );
                embed.addField(
                  `**Rotten Points remaining from ${member.displayName}**`,
                  `**${numberWithCommas(
                    updateACoins
                  )} ${emoji} Rotten Points.**`,
                  true
                );

                eventChannel.send(
                  "**Congrats <@" +
                    member +
                    "> you are now a Cool <@&918907276981583932>**",
                  embed
                );
                reaction.message.channel
                  .send(
                    putEmoji(bot, "910545619238678538") +
                      " **Check on <#898996309334310913> the transaction accomplished - thank you for vote.**"
                  )
                  .then((msg) => {
                    msg.delete({
                      timeout: 20000,
                      reason: "It had to be done.",
                    });
                  });

                  for (const reaction of userReactions.values()) {                  
                    await reaction.users.remove(user.id);
                  }
              }
            } catch (error) {
              console.error(error);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }

      for (const reaction of userReactions.values()) {                  
        await reaction.users.remove(user.id);
      }
    };

    try {
      let msg = await reaction.message.fetch();
      if(!msg.embeds) return;            
      if (msg.embeds[0].title.includes("Solana RottenVille-Battles")) {
        applyRole();
        for (const reaction of userReactions.values()) {                  
          await reaction.users.remove(user.id);
        }
      }
    } catch (err) {
      
    }
  }
};
