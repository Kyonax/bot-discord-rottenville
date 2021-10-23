//Importación especifica de Metodos - RichEmbed - kyocolor Color - Emojis - StripIndents
const { MessageEmbed } = require("discord.js");
const {
  putEmoji,
  initObjectMember,
  numberWithCommas,
} = require("../../utils/misc/functions");
const { kyoColor,noneColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { stripIndents } = require("common-tags");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Pay
module.exports = class StoreCommand extends BaseCommand {
  constructor() {
    super(
      "store",
      ["tienda"],
      "Comando para **abrir** la tienda del Servidor.",
      "store`",
      "***Todos***",
      "store"
    );
  }
  async run(bot, message) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Emojis
    //Inicialización de Objetos
    let ObjectMember = null;
    ObjectMember = initObjectMember(
      guilds,
      ObjectMember,
      message.guild.id,
      message.author.id
    );
    let actualAuthorLevel = parseInt(ObjectMember.memberLevel);
    let actualAuthorXP = parseInt(ObjectMember.memberXP);
    let levelPrice = Math.floor(
      actualAuthorLevel * 9000 + actualAuthorXP / 9
    );
    //Inicialización de Emojis y su Uso respectivo
    //Inicialización de Emojis y su Uso respectivo
    let emojiSynkoins = putEmoji(bot, synchronous.emojiID[0].synkoin);
    let boostb = putEmoji(bot, synchronous.emojiID[0].boostb);    
    let boosta = putEmoji(bot, synchronous.emojiID[0].boosta);    
    let boostp = putEmoji(bot, synchronous.emojiID[0].boostp);    
    //Embed General que especifica la función de la Tienda
    let storeEmbed = new MessageEmbed()
      .setTitle("Tienda Mundo Kyonax !")
      .setColor(noneColor)
      .setURL("https://www.kyonax.com")
      .setDescription(
        "**Puedes encontrar recursos, y mucho más contenido** en la tienda official de Kyonax."
      )
      .setAuthor(
        "KYONAX STORE",
        "https://i.imgur.com/OXIkW3Q.png",
        "https://www.kyonax.com"
      )
      .addField(
        "Elementos de canjeo de la Tienda",
        "En esta sección podrás ver que objetos puedes **canjear** con **Kyo Shinys** y que **comando** usar."
      )
      .addField("\u200b", "\u200b")
      .addField(
        "**Boost de Experiencia**",
        `Con estos boost podrás subir de **Nivel** mucho más rápido por medio de sus **multiplicadores** de **Experiencia**: `
      )
      .addField("**#1** `pay boost base`", `${boostb} Boost **x10**`, true)
      .addField("**Valor**", `**1,800 ${emojiSynkoins} Kyo Shinys**`, true)
      .addField("**Duración**", "**1000msj**", true)
      .addField("**#2** `pay boost avanzado`", `${boosta} Boost **x50**`, true)
      .addField("**Valor**", `**3,200 ${emojiSynkoins} Kyo Shinys**`, true)
      .addField("**Duración**", "**3000msj**", true)
      .addField("**#3** `pay boost premium`", `${boostp} Boost **x100**`, true)
      .addField("**Valor**", `**6,000 ${emojiSynkoins} Kyo Shinys**`, true)
      .addField("**Duración**", "**9000msj**", true)
      .addField("\u200b", "\u200b")
      .addField(
        "**Niveles**",
        "Con el comando `pay level` subirás un **nivel**, dependiendo de el nivel que **tengas puede costar más o menos**."
      )
      .addField(
        `${message.author.username} te encuentras en el nivel **${actualAuthorLevel}**`,
        `**${numberWithCommas(
          levelPrice
        )} ${emojiSynkoins} Kyo Shinys** para subir de Nivel.`,
        true
      )
      .addField("\u200b", "\u200b", true)
      .addField(
        stripIndents`**> __Links__**`,
        `\n \n[Twitch Kyonax](https://kyonax.link/twitch) | [Comprar Kyo Shinys](https://www.kyonax.link/donation)`
      )
      .setFooter(
        "Recuerda que cuando haces un pago, se te retira dinero de tu cuenta, para saber cuanto dinero tienes usa el comando `!bank`.",
        bot.user.displayAvatarURL()
      )
      .setTimestamp();

    //Envio del Mensage Embed
    message.channel.send(storeEmbed).then((msg) => {
      msg.delete({ timeout: 40000, reason: "It had to be done." });
    });
  }
};

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

StateManager.on(
  "updateMemberLevel",
  (guildID, memberID, memberLevel, memberXP) => {
    let ObjectMember = null;
    ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
    ObjectMember.memberLevel = memberLevel;
    ObjectMember.memberXP = memberXP;
  }
);
