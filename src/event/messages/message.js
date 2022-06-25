//Databases
const guildJSON = require("../../../database/misc/Guild.json");
const guildBansJSON = require("../../../database/misc/GuildBans.json");
const guildMembersJSON = require("../../../database/misc/GuildMembers.json");
const guildBankJSON = require("../../../database/misc/GuildBank.json");
const guildConfigurableJSON = require("../../../database/misc/GuildConfigurable.json");
const guildRoleplayMembersJSON = require("../../../database/misc/RolePlayMembers.json");
//Importación especifíca de Metodos - MessageEmbed - putEmoji Function - functions Database - Colors
const { MessageEmbed } = require("discord.js");
const { putEmoji, sortServerRanksJSON } = require("../../utils/misc/functions");
const { generateXP, limitLevel } = require("../../utils/logic/logicMember");
const { generateCoins } = require("../../utils/logic/logicBank");
const {
  isVariableOnJSON,
  insertMemberIntoJSON,
  insertMemberBankIntoJSON,
  getMember,
  getMemberBank,
  isPrefixOnJSON,
  updateGuildMemberBoostJSON,
  updateGuildMemberXPJSON,
  updateGuildBankCoinsJSON,
} = require("../../utils/database/functions");
const { roleRewards } = require("../../../database/conectors/roleRewards");
const { reactionEmbeds } = require("../../utils/misc/reaction");
const { attachMessageImage } = require("../../utils/misc/attachment");
const { thrizzColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de cuerpo de Eventos e importación de Conexión Base de Datos
const BaseEvent = require("../../utils/structure/BaseEvent");
const Api = require("../../utils/misc/api_discord_functions");
//Inicialización de Variables Cooldown
let cooldown = new Set();
let cdseconds = 3;
//Exportación de Evento message
module.exports = class MessageEvent extends BaseEvent {
  //Constructor del Objeto
  constructor() {
    super("message");
  }
  async run(bot, message) {
    const reactionEmbedsA = await reactionEmbeds(bot, message)
    //No DMS no Bot Messages
    if (message.channel.id == "956120543688548362") return;
    if (message.author.bot || message.channel.type === "dm") return;
    //Restricted Servers
    try {
      switch (message.guild.id) {
        case "894634118267146272":
          break;
      }
    } catch (error) {
      console.log(
        "Se ha registrado una interacción fuera de una Guild habilitada. [" +
        error +
        "]"
      );
    }
    //Reaction specific MessageEmbeds
    // REACTION MESSAGES OUT OF FUNCTION TODO: await reactionEmbeds(bot, message);
    //Attachment Message
    const attachment = message.attachments;
    attachment.forEach((messageAttachment) => {
      attachMessageImage(messageAttachment);
    });
    //Inicialización de Variables guildID - memeberID
    const guildID = message.guild.id;
    const userID = message.author.id;
    const ObjMember = await Api.getMember(guildID, userID);
    const { id, status, perms, bank } = ObjMember;
    const ObjGuild = await Api.getGuild(guildID);

    if (ObjMember.id === undefined) return await Api.postMember(userID, guildID, ObjGuild.language);



    //Exist data
    const isMemberBank = await isVariableOnJSON(
      guildBankJSON,
      userID,
      "memberID",
      guildID
    );
    const isMemberRegistered = await isVariableOnJSON(
      guildMembersJSON,
      userID,
      "memberID",
      guildID
    );

    if (isMemberBank != "registered" || isMemberRegistered != "registered") {
      const registerMember = await insertMemberIntoJSON(
        guildMembersJSON,
        guildID,
        userID
      ).then(async () => {
        const registerMemberBank = await insertMemberBankIntoJSON(
          guildBankJSON,
          guildID,
          userID
        );
      });
      return;
    }

    const Member = await getMember(guildMembersJSON, userID, guildID);
    const MemberBank = await getMemberBank(guildBankJSON, userID, guildID);

    //Prefix del Servidor
    const prefix = ObjGuild.prefix;
    const digitPrefix = message.content.slice(0, prefix.length);

    if (digitPrefix === prefix) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(prefix.length)
        .split(/\s+/);
      const command =
        bot.commands.get(cmdName) || bot.commands.get(bot.aliases.get(cmdName));
      if (command) {
        //Validación El usuario es un Administrador


        if (perms.inmortal === 0) {
          if (cooldown.has(userID)) {
            message.delete();
            const emojiCancelado = synchronous.emojiID[0].cancelado;
            return message.reply(
              ` ${putEmoji(
                bot,
                emojiCancelado
              )} You need to wait **${cdseconds}s** to use another command.`
            );
          } else {
            command.run(bot, message, cmdArgs);
          }
          cooldown.add(userID);
        } else {
          command.run(bot, message, cmdArgs);
        }
        setTimeout(() => {
          cooldown.delete(userID);
        }, cdseconds * 1000);
      }
    } else {
      if (isMemberBank == "registered" || isMemberRegistered == "registered") {
        //Inicialización de Variables por Objetos
        const { memberCoins } = MemberBank;
        const {
          memberID,
          memberXP,
          memberLevel,
          memberBoost,
          boostMemberTime,
        } = Member;
        //Ganancia de XP por Miembro
        const curboost = status.boost;
        if (curboost > 1) {
          let curBoostTime = status.boost_time;
          curBoostTime = curBoostTime - 1;
          await Api.patchStatusMember(userID, guildID, boost_time, curBoostTime);
          const updateMemberBoostTimeJSON = await updateGuildMemberBoostJSON(
            guildMembersJSON,
            guildID,
            userID,
            curboost,
            curBoostTime
          );

          if (curBoostTime === 0) {
            const updateMemberBoostJSON = await updateGuildMemberBoostJSON(
              guildMembersJSON,
              guildID,
              userID,
              1,
              curBoostTime
            );
            //Inicialización de Variables Emojis - guildEmojis
            const emojiF = putEmoji(bot, synchronous.emojiID[0].f);
            const emojiBoostB = putEmoji(bot, synchronous.emojiID[0].boostb);
            const emojiBoostA = putEmoji(bot, synchronous.emojiID[0].boosta);
            const emojiBoostP = putEmoji(bot, synchronous.emojiID[0].boostp);
            //Mensaje EMBED de se acabo el Boost
            const timeOutEmbed = new MessageEmbed()
              .setAuthor(
                `**${message.author.username}'s Boost**`,
                bot.user.displayAvatarURL()
              )
              .setThumbnail(message.author.displayAvatarURL())
              .setColor(thrizzColor)
              .addField(
                "**Plebeyo**",
                `<@${message.author.id}> se terminó tu **boost** de experiencia`
              )
              .setFooter("Caza Recompensas Internacionales de Mundo Kyonax !")
              .setTimestamp()
              .setTitle(`**Boost Terminado** ${emojiF}`)
              .addField(
                "**Boosts de Experiencia**",
                `Si deseas **comprar** otro usa ` +
                "`" +
                prefix +
                "payboost <base> `" +
                `${emojiBoostB}` +
                " Ó `<avanzado> `" +
                `${emojiBoostA}` +
                " Ó `<premium>`" +
                `${emojiBoostP}`
              );
            message.channel.send(timeOutEmbed);
          }
        }
        //Inicialización de Variables memberXP
        const xp = generateXP(status.boost);
        let updateXP = xp + status.xp;
        const newLevel = limitLevel(updateXP, status.level);
        if (newLevel > memberLevel) {
          const emojiLevelUp = synchronous.emojiID[0].levelup;
          const levelChannel = message.guild.channels.cache.find(
            (ch) => ch.name === "👽・level-up"
          );
          if (!levelChannel) {
            return message.guild.channels
              .create("👽・level-up", {
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
          //roleRewards(message, bot, newLevel);
          const levelUpEmbed = new MessageEmbed()
            .setAuthor(message.author.username, bot.user.displayAvatarURL())
            .setColor("#13ea83")
            .setThumbnail(message.author.displayAvatarURL())
            .addField(
              "**Survivor RottenVille**",
              `<@${message.author.id}> reached a new **Level**.`
            )
            .addField("**Level Reached**", `**${newLevel}** Level`)
            .setFooter(
              "RottenVille population stats - XP & Level ・Interact to gain more XP"
            )
            .setTimestamp()
            .setTitle(`**Level Reached** ${putEmoji(bot, emojiLevelUp)}`);
          levelChannel.send(
            `**Hey Survivor <@${message.author.id}> !** You reached a new Level`,
            levelUpEmbed
          );
        }
        const coins = generateCoins();
        let newCoins = coins + bank.coins;

        await Api.patchStatusMember(userID, guildID, "xp", updateXP);
        await Api.patchStatusMember(userID, guildID, "level", newLevel);

        await Api.patchBankMember(userID, guildID, "coins", newCoins);
        const updateMemberXPJSON = await updateGuildMemberXPJSON(
          guildMembersJSON,
          guildID,
          userID,
          updateXP,
          newLevel
        );
        //Ganancia de Coins por Miembro        
        const updateMemberCoinsJSON = await updateGuildBankCoinsJSON(
          guildBankJSON,
          guildID,
          userID,
          newCoins
        );
        //Rank Members
        let usersRank = [];
        const updateServerRanks = await sortServerRanksJSON(
          guildMembersJSON,
          usersRank,
          guildID,
          message
        );
      }
    }
  }
};
