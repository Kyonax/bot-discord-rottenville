const { MessageEmbed } = require("discord.js");
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
  updateGuildLevel,
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
      (ch) => ch.name === "💬・testing-team"
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
            let ObjectBankMember = null;
            let ObjectBankAuthor = null;
            let ObjectMember = null;

            ObjectMember = initObjectMember(
              guilds,
              ObjectMember,
              reaction.message.guild.id,
              member.id
            );

            ObjectBankMember = initObjectMember(
              bankGuilds,
              ObjectBankMember,
              reaction.message.guild.id,
              "894243194051629156"
            );

            ObjectBankAuthor = initObjectMember(
              bankGuilds,
              ObjectBankAuthor,
              reaction.message.guild.id,
              member.id
            );

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
)} **You can't vote for the 2 competitors, your vote is going to be removed, and you can't recover the AR ${putEmoji(
                  bot,
                  "905441646362120232"
                )}, if you want to vote you have to do it again.**
**No puedes votar por ambos competidores, tu voto va a ser removido, y no podras recuperar el AR ${putEmoji(
                  bot,
                  "905441646362120232"
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
                  .setTitle(`**${member.displayName}'s Level Radiation**`)
                  .setColor(goldColor)
                  .setThumbnail(bot.user.displayAvatarURL())
                  .setFooter("RottenBot radiation scanner")
                  .setTimestamp();

                //Validación de variables - Monedas - Usuario

                const updateMCoins = actualMemberCoins + parseInt(ammountPay);
                const updateACoins = actualAuthorCoins - parseInt(ammountPay);
                //Validación de Variables - No suficientes Monedas

                //Transferencia de Monedas - Autor - Usuario
                const updateMemberCoins = await updateGuildBankCoins(
                  reaction.message.guild.id,
                  "894243194051629156",
                  updateMCoins
                );
                const updateAuthorCoins = await updateGuildBankCoins(
                  reaction.message.guild.id,
                  member.id,
                  updateACoins
                );
                //Update Map
                ObjectBankAuthor.memberCoins = updateACoins;
                ObjectBankMember.memberCoins = updateMCoins;
                //Emit Update
                StateManager.emit(
                  "updateMemberCoins",
                  reaction.message.guild.id,
                  "894243194051629156",
                  updateMCoins
                );
                StateManager.emit(
                  "updateAuthorCoins",
                  reaction.message.guild.id,
                  member.id,
                  updateACoins
                );
                //Inicialización de Emojis y su Uso respectivo
                let emoji = putEmoji(bot, synchronous.emojiID[0].synkoin);
                //Inicialización de Variable Razón de Transferencia
                let reason = "";
                //Agregación al Embed
                embed.setDescription(
                  `<@${member.id}> has voted in **The RTSolBattlesTournament** ${reason}.`
                );
                embed.addField(
                  "**Amount of Alpha Radiation**",
                  `**${numberWithCommas(
                    ammountPay
                  )} ${emoji} Alpha Radiation.**`,
                  true
                );
                embed.addField(
                  `**Alpha Radiation remaining from ${member.displayName}**`,
                  `**${numberWithCommas(
                    updateACoins
                  )} ${emoji} Alpha Radiation.**`,
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

StateManager.on(
  "bankMembersFetched",
  (membersBank, guildID, memberID, memberCoins) => {
    guildMembersBank.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      memberCoins: memberCoins,
    });
    bankGuilds.set(guildID, {
      Member: membersBank,
    });
  }
);

StateManager.on(
  "bankMembersUpdate",
  (membersBank, guildID, memberID, memberCoins) => {
    guildMembersBank.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      memberCoins: memberCoins,
    });
    bankGuilds.set(guildID, {
      Member: membersBank,
    });
  }
);

StateManager.on("updateCoins", (guildID, memberID, newCoins) => {
  let objectBankMember = null;
  objectBankMember = initObjectMember(
    bankGuilds,
    objectBankMember,
    guildID,
    memberID
  );
  objectBankMember.memberCoins = newCoins;
});

StateManager.on(
  "membersFetched",
  (
    membersGuild,
    guildID,
    memberID,
    memberLanguage,
    adminMember,
    inmortalMember,
    moderatorMember,
    serverRank,
    memberXP,
    memberLevel,
    memberBoost,
    boostMemberTime,
    warnings
  ) => {
    guildMembers.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      memberLanguage: memberLanguage,
      adminMember: adminMember,
      inmortalMember: inmortalMember,
      moderatorMember: moderatorMember,
      serverRank: serverRank,
      memberXP: memberXP,
      memberLevel: memberLevel,
      memberBoost: memberBoost,
      boostMemberTime: boostMemberTime,
      warnings: warnings,
    });
    guilds.set(guildID, {
      Member: membersGuild,
    });
  }
);

StateManager.on(
  "membersUpdate",
  (
    membersGuild,
    guildID,
    memberID,
    memberLanguage,
    adminMember,
    inmortalMember,
    moderatorMember,
    serverRank,
    memberXP,
    memberLevel,
    memberBoost,
    boostMemberTime,
    warnings
  ) => {
    guildMembers.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      memberLanguage: memberLanguage,
      adminMember: adminMember,
      inmortalMember: inmortalMember,
      moderatorMember: moderatorMember,
      serverRank: serverRank,
      memberXP: memberXP,
      memberLevel: memberLevel,
      memberBoost: memberBoost,
      boostMemberTime: boostMemberTime,
      warnings: warnings,
    });
    guilds.set(guildID, {
      Member: membersGuild,
    });
  }
);
