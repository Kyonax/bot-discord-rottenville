//Importación especifica de Metodos - RichEmbed - findUserID putEmoji Functions - Perms - stripIndents -  Emojis - nonecolor Color
const { MessageEmbed } = require("discord.js");
const { putEmoji } = require("../../utils/misc/functions");
const { stripIndents } = require("common-tags");
const {
  cancelado,
  synchronous,
  kyonax,
  clever,
  pixxa,
  afirmado,
  thrizz,
  pokemon,
  starcraft2,
  lol,
  csgo,
  mortalkombat,
  hearthstone,
  myb,
  minecraft,
  gtasa,
  gtav,
  anothergames,
  dst,
} = require("../../../database/utils/emojis/emojis.json");
const { noneColor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Exportación del Comando set
module.exports = class PutembedsCommand extends BaseCommand {
  constructor() {
    super(
      "putembeds",
      ["pembeds", "embedsput", "pem", "colocarembeds"],
      "Send Messages Embeds to a channel.",
      "putembeds <type>`",
      "***Admin***",
      "owner"
    );
  }

  async run(bot, message, args) {
    //Eliminación del mensaje con Comandos
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Validación Permisos
    if (message.member.id != message.guild.ownerID)
      return perm.ownerPerms(bot, message);
    //Variables
    let autor = message.author;
    //Validación de Variables - Permisos de Comandos - Falta de Usuario - Falta de Razón - Auto Baneo
    const channell = args[0];
    let rulesChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "📃-reglas-rules"
    );
    let sugeChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "🧠-sugerencias"
    );
    let chatChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "💬-vc-chat"
    );
    let mtaChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "🏮-mta-server"
    );

    switch (channell) {
      case "rules" /* 
        Creación del Mensaje Embed de Reglas
        let embedRule = new MessageEmbed()
          .setTitle(`**📜 Reglas del Servidor 📜**`)
          .setDescription(
            "Todos deseamos tener una experiencia amena en este servidor por ese motivo te invito a que leas y cumplas las siguientes normas del **Servidor**."
          )
          .addBlankField(true)
          .attachFiles(["../../../database/multimedia/gifs/embeds/ServerRules.gif"])
          .setImage("attachment://ServerRules.gif")
                    .setColor(nonecolor)
                    .addField(
                        "**REGLA NÚMERO 1:**",
                        "Respetar, procura no faltarle el respeto a ninguna persona, todos merecemos respeto." +
                        `\n`
                    )
                    .addField(
                        "**REGLA NÚMERO 2:**",
                        "_No política - No religión_, sabemos que todos tenemos creencias e ideologías políticas diferentes, por esa razón merecen respeto, y la mejor manera de brindar dicho respeto es no comentar nada al respecto, todos somos diferentes y debemos entender que no todos tenemos las mismas creencias o ideologías, este es un servidor de entretenimiento nada más. Gracias por su compresión." +
                        `\n`
                    )
                    .addField(
                        "**REGLA NÚMERO 3:**",
                        "**NSFW**, En este canal puedes publicar todo lo que quieras, pero procura no publicar _pornografía, gore, vídeos extremos etc..._ en los canales que no tienen esta categoría." +
                        `\n`
                    )
                    .addField(
                        "**REGLA NÚMERO 4:**",
                        "_Spam_, el Spam no es permitido en ningún canal, si haces _Spam_ en cualquier canal, te ganas un __**Warn**__ a los __**3 Warns**__ te expulsamos del servidor." +
                        `\n`
                    )
                    .addField(
                        "**REGLA NÚMERO 5:**",
                        "Personal, procura no publicar información personal en los canales." +
                        `\n`
                    )
                    .addField(
                        "**REGLA NÚMERO 6:**",
                        "No confundir **CANALES**, existen canales para casi cualquier cosa, úsalos para lo que fueron hechos." +
                        `\n`
                    )
                    .addField(
                        "**REGLA NÚMERO 7:**",
                        "No a la _Discriminación_, no aceptamos ningún tipo de discriminación de ningún tipo." +
                        `\n`
                    )
                    .addField(
                        "**REGLA NÚMERO 8:**",
                        "_Igualdad_, ningún tipo de persona o ser existente tiene prioridades, todos somos iguales." +
                        `\n`
                    )
                    .addField(
                        "**REGLA NÚMERO 9:**",
                        "_Broma_, algunas de las reglas anteriores se pueden abolir si se demuestra que fue algo en broma, se le preguntará al afectade por los hechos y si reconoce que fue una broma se le perdonará la condena al agresor." +
                        `\n`
                    )
                    .addBlankField(true)
                    .addField(
                        stripIndents`**> __Links__**`,
                        `\n[Synchronous Fanpage](https://facebook.com/SynchronousTeam) | [Paypal Synchronous](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)`
                    )
                    .setFooter("Constitución política de Synchronous")

                    .setTimestamp();

                rulesChannel.send(embedRule); */:
        break;
      case "sugerencias" /* 
                    //Creación del Mensaje Embed de Reglas
        let embedSuge = new MessageEmbed()
          .setTitle(`**🧠 Sugerencias y Peticiones 🧠**`)
          .setDescription(
            "Siéntete libre de opinar acerca del servidor, tus _**Recomendaciones**_ o _**Peticiones**_ ayudarán a mejorar el Servidor." +
              `\n \n \n`
          )
          .addField(
            "**SUGERENCIAS**",
            `Cualquier _**Sugerencia**_ se tendrá en cuenta siempre y cuando beneficie al servidor y a sus miembros.\n`
          )
          .addField(
            "**PETICIONES**",
            `Las peticiones pueden abarcar un sin número de **posibilidades**, estás se cumplirán siempre y cuando estemos _**de acuerdo de cumplir dicha petición**_, un ejemplo sería:\n \nPuedes hacer una _**petición de comandos**_ para un _**Bot**_, si la persona que desarrolla acepta la petición, se procederá a **programar dicho comando**.`
          )
          .attachFiles(["../../../database/multimedia/gifs/embeds/Sugerencias.gif"])
          .setImage("attachment://Sugerencias.gif")
          .setColor(nonecolor)
          .addBlankField(true)
          .addField(
            stripIndents`**> __Links__**`,
            `\n[Synchronous Fanpage](https://facebook.com/SynchronousTeam) | [Paypal Synchronous](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)`
            )
                    .setFooter("Guía turística de Synchronous")

                    .setTimestamp();

                sugeChannel.send(embedSuge); */:
        break;

      case "chat" /* 
                    //Creación del Mensaje Embed de Reglas
        let embedChat = new MessageEmbed()
          .setTitle(`**💬 Chat Y Meeting 💬**`)
          .setDescription(
            "En este Canal podrás _**conversar**_ mientras te encuentras en un canal de voz, por si no tienes micrófono." +
              `\n \n \n`
          )
          .addField(
            "**USO CORRECTO**",
            `la idea de este canal es darle la **oportunidad de hablar** a alguien que no tenga _**micrófono**_, mientras se habla por **chat de voz**.\n`
          )
          .addField(
            "**USO INCORRECTO**",
            `En este canal no puedes abusar del _**SPAM**_ ${putEmoji(
              bot,
              cancelado
            )}, tampoco información que **NO** tenga que ver con la conversación **llevada** por alguno de los canales de voz.`
          )
          .attachFiles(["../../../database/multimedia/images/embeds/Chat.gif"])
          .setImage("attachment://Chat.gif")
                    .setColor(nonecolor)
                    .addBlankField(true)
                    .addField(
                        stripIndents`**> __Links__**`,
                        `\n[Synchronous Fanpage](https://facebook.com/SynchronousTeam) | [Paypal Synchronous](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)`
                    )
                    .setFooter("Guía turística de Synchronous")
                    .setTimestamp();

                chatChannel.send(embedChat); */:
        break;
      case "welcome" /* 
        let embedImageWelcome = new MessageEmbed()
          .attachFiles(["../../../database/multimedia/gifs/embeds/WelcomeToTheServer.gif"])
          .setImage("attachment://WelcomeToTheServer.gif")
                    .setColor(nonecolor);
                let embedWelcome = new MessageEmbed()
                    .setTitle(`**🎉 Bienvenida/o al Servidor 🎉**`)
                    .setDescription(
                        "Para proceder a ser parte del Servidor te invito a que primero **leas** las reglas del\nServidor luego procedas a **escoger** un rol reaccionando respectivamente a tus \nintereses.\n\n*- **Apoya** al servidor con nuestro **Fanpage** y **Paypal** -*" +
                        `\n \n \n`
                    )
                    .setColor(nonecolor)
                    .addField(
                        stripIndents`**> __Links__**`,
                        `\n[Synchronous Fanpage](https://facebook.com/SynchronousTeam) | [Paypal Synchronous](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)`
                    );
                let embedWelcomeDescription = new MessageEmbed()
                    .setTitle("**⛩ Roles de Seguidores ⛩**")
                    .setDescription(
                        `Cuando escojes un **Rol** tendrás accesos especifícos que te **otorga** dicho rol\nsi escojes un **Rol de Seguidores** de algún **Pilar** sólo podrás ver los canales de\ndicho **Pilar**, si deseas ver los canales de todos los **Pilares** escoje el rol de\n**Seguidor Synks**.\n\n\n`
                    )
                    .addField(
                        `**ROLES**`,
                        `${putEmoji(bot, synchronous)} <@&623721843949305858>\n${putEmoji(
                            bot,
                            clever
                        )} <@&623722226356715522>\n${putEmoji(
                            bot,
                            kyonax
                        )} <@&623722640036593685>`,
                        true
                    )
                    .addBlankField(true)
                    .addField(
                        `**ROLES**`,
                        `${putEmoji(bot, pixxa)} <@&624069017916669973>\n${putEmoji(
                            bot,
                            thrizz
                        )} <@&623725235040157716>\n${putEmoji(
                            bot,
                            afirmado
                        )} <@&623722441600139275>`,
                        true
                    )
                    .attachFiles(["../../../database/multimedia/embeds/PilaresGif.gif"])
                    .setImage("attachment://PilaresGif.gif")
                    .setColor(nonecolor);
                let embedSubsRoles = new MessageEmbed()
                    .setTitle("**🏆 Roles de Suscriptores 🏆**")
                    .setDescription(
                        `Los benefecios de ser un **Suscriptor** depende de cada **Pilar** pero estos beneficios pueden contener desde **Betas de aplicaciones**, **Ediciones Gratuitas**, **Contenido Innedito**, **Sponsors** y mucho mucho más.\n\nPara obtener un rol de **Suscriptor** debes estar suscrito en los canales de **Twitch** de alguno de los **Pilares**, apoyarle con **Patreon** o de alguna otra manera de forma **monetaria**.\n\n\n`
                    )
                    .addField(
                        `**ROLES**`,
                        `${putEmoji(bot, synchronous)} <@&623716996587978752>\n${putEmoji(
                            bot,
                            clever
                        )} <@&623718343966326834>\n${putEmoji(
                            bot,
                            kyonax
                        )} <@&623721044439465984>`,
                        true
                    )
                    .addBlankField(true)
                    .addField(
                        `**ROLES**`,
                        `${putEmoji(bot, pixxa)} <@&624067184544579585>\n${putEmoji(
                            bot,
                            thrizz
                        )} <@&623724655198601222>\n${putEmoji(
                            bot,
                            afirmado
                        )} <@&623720400714465300>\n\n\n`,
                        true
                    )
                    .addField(
                        stripIndents`**> __Links__**`,
                        `\n[CleverSea Twitch](https://www.twitch.tv/synk_cleversea) | [Kyonax Twitch](https://www.twitch.tv/synk_kyonax) | [Pixxa Twitch](https://www.twitch.tv/pixxa666) | [Thrizz Twitch](https://www.twitch.tv/lthrizz) | [Firehome Twitch](https://www.twitch.tv/firehome15)`,
                        false
                    )
                    .attachFiles(["../../database/gifs/embeds/PilaresGif.gif"])
                    .setImage("attachment://PilaresGif.gif")
                    .setColor(nonecolor);
                let embedWelcomeGamesRoles = new MessageEmbed()
                    .setTitle("**🎮 Roles de Juegos 🎮**")
                    .setDescription(
                        `Si quieres acceder a **Canales** dónde puedas **compartir** tus gustos acerca de tu **VideoJuego** favorito reacciona para que los **Canales de Voz** y **Texto** se activen para ti. Si deseas ver todos los **Canales de Videojuegos** usa el rol **Games**.\n\n\n`
                    )
                    .addField(
                        `**ROLES**`,
                        `${putEmoji(bot, lol)} <@&696786998609969254>\n${putEmoji(
                            bot,
                            pokemon
                        )} <@&696787286502670336>\n${putEmoji(
                            bot,
                            mortalkombat
                        )} <@&696787375107604530>\n${putEmoji(
                            bot,
                            hearthstone
                        )} <@&696787566036254760>\n${putEmoji(
                            bot,
                            csgo
                        )} <@&696788135425605732>\n${putEmoji(
                            bot,
                            myb
                        )} <@&696790273824653372>`,
                        true
                    )
                    .addBlankField(true)
                    .addField(
                        `**ROLES**`,
                        `${putEmoji(bot, starcraft2)} <@&696787175756398645>\n${putEmoji(
                            bot,
                            minecraft
                        )} <@&696787490140455054>\n${putEmoji(
                            bot,
                            gtasa
                        )} <@&696787789533937704>\n${putEmoji(
                            bot,
                            gtav
                        )} <@&696787662757036092>\n${putEmoji(
                            bot,
                            dst
                        )} <@&696787962087604264>\n${putEmoji(
                            bot,
                            anothergames
                        )} <@&696788347539947670>`,
                        true
                    )
                    .attachFiles(["../../database/gifs/embeds/GamesChannels.gif"])
                    .setImage("attachment://GamesChannels.gif")
                    .setColor(nonecolor);
                message.channel.send(embedImageWelcome);
                message.channel.send(embedWelcomeDescription);
                message.channel.send(embedSubsRoles);
                message.channel.send(embedWelcomeGamesRoles);
                message.channel.send(embedWelcome); */:
        break;
      case "MTA":
        //Inicialización de Emojis y su Uso respectivo
        let emoji = putEmoji(bot, synchronous.emojiID[0].gtasa);
        if (message.guild.id != synchronous.guildID) emoji = "💰";
        let embedWelcomeMTA = new MessageEmbed()
          .setTitle("**🎮 Server MTA - Beta Cerrada 🎮**")
          .setDescription(
            `Para acceder al contenido de el **Servidor de MTA** dónde encontrarás ***actualizaciones, recompensas, canales y mucho más*** reacciona con este emoji ${emoji}.\n\n\n`
          )
          .addField(
            `**ROLES**`,
            `${emoji} <@&711582241071038485>\n<@&623723333585862667>\n<@&711592453144313897>\n<@&711592516473978940>\n<@&711592553560014878>\n<@&711592591765798963>\n<@&711592641753645117>\n<@&711592731029536799>\n<@&711592824759648366>\n<@&711592876110250096>\n<@&711593225290383450>`,
            true
          )
          .addField(
            `**ROLES**`,
            `<@&711582059025662053>\n<@&711582151279116338>\n<@&711592908725420122>\n<@&711592946209783808>\n<@&711592974672199729>\n<@&711593034436837437>\n<@&711593082902151169>\n<@&711593190775455836>\n<@&711593147754348565>\n<@&711593190775455836>\n<@&711593335768350721>`,
            true
          )
          .attachFiles(["database/multimedia/gifs/embeds/Bio_ES.png"])
          .setImage("attachment://Bio_ES.png")
          .setColor(noneColor);
        mtaChannel.send(embedWelcomeMTA).catch((err) => console.log(err));
        break;
      case "TEST":
        let embedTest = new MessageEmbed()
          .setTitle("ABOUT KYONAX")
          .setDescription(
            `**Kyonax** was born on ** July 31, 2000 **, in ** Bogotá D.C / Colombia **, entering the world of digital content creation at the age of ** 12 years old**, and to the world of programming at ** 14 **, started with ** video editing **, shortly after with ** image editing **, ** creating ** ** scripts and poetry **.             He trained his voice for ** locution ** in a merely ** amateur ** way, He practiced and  created             programming projects in the well-known languages, ** Java, Javascript and Lua **. He currently             does not have any professional title, however he seeks to master and improve his skills in             ** programming and ** **digital content creation **, getting the necessary experience when             carrying out projects with great weight and  ** comic and informative **            **audiovisuals ** ** productions **. He is passionate about ** the seventh art ** and a complete obsessed` +
              ` with ** human creativity **. One of his major goals is to create a association of people` +
              ` who share his ** whim for creation** **and creativity **, with the objective to dazzle and show` +
              ` to the world the beautiful and complex human nature, said association that will take the` +
              ` name of ** Synchronous **.`
          )
          .setColor(noneColor)
          .attachFiles(["database/multimedia/gifs/embeds/Bio_EN.png"])
          .setImage("attachment://Bio_EN.png");
        message.channel.send(embedTest);
        break;
      case "ABOUT":
        let embedImage = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/HeadBanner_Discord.gif",
          ])
          .setImage("attachment://HeadBanner_Discord.gif");
        message.channel.send(embedImage);

        let embedAcerca = new MessageEmbed()
          .setTitle("ABOUT ROTTENVILLE")
          .setDescription(
            stripIndents`**Rottenville is our home**. It’s a small village of **__17.861 inhabitants__**, we were people who had common lives until that day. One regular day, there was a strange radioactive explosion that turned us all into rotten people. We haven’t been the same ones since that day.

A government study shows that the **radioactive epicenter points to the mad scientist’s lab**, who was experimenting with mysterious materials from the mine.

We just want to find all our people, that’s why we started an Exploration Mission.

> **Exploration**

But it’s not all bad news. The latest reports locate all our **Rottenville’s inhabitants** and it reveals that the explosion didn’t have fatalities, there were only unexpected mutations in all of us. **These mutations are different according to __our radiation exposure__**.

For the rescue, we will use a map. It shows our town divided into three main radioactive zones **- __Alpha Zone, Beta Zone, and Gamma Zone__**.`
          )
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/Discord_About_Banner.png",
          ])
          .setImage("attachment://Discord_About_Banner.png");
        message.channel.send(embedAcerca);
        break;
      case "RULES":
        let embedBannerRulesEs = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/HeadBanner_Discord.gif",
          ])
          .setImage("attachment://HeadBanner_Discord.gif");
        message.channel.send(embedBannerRulesEs);

        let embedBannerServereEsBarsrule = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/BARCOLORFULLLIGHT.gif",
          ])
          .setImage("attachment://BARCOLORFULLLIGHT.gif");

        let embedRulesEs = new MessageEmbed()

          .setDescription(
            `            
> **Rotten Community Rules**・` +
              putEmoji(bot, "899032956557991967") +
              `   

**Rule Number 1**
Do not confuse ** CHANNELS **, messages should be sent to the intended channels. ` +
              `Otherwise, they can be deleted without prior notice.

** Rule number 2 **
** Respect **, Have a respectful treatment towards other members of the chat.

** Rule number 3 **
** Spam **, It is not allowed to spam or send unnecessary and repetitive messages, images or emoticons.

** Rule number 4 **
** NSFW **, Posting links will not be tolerated under any circumstances, ` +
              `              Sexually explicit or offensive images or texts.

** Rule number 5 **
** Impersonation **, it is forbidden to impersonate "moderator" or "admin" in the channels.

** Rule number 6 **
** Advertising ** No youtube links, twitch links, or other social media profile links anywhere on the server unless it is asked for by another member of the discord or is directly involved in a currently active conversation` +
              `.

` +
              putEmoji(bot, "900098713257652264") +
              ` **All Server Rules: https://shorturl.at/kBEIK**`
          )
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/Discord_Rules_Banner.png",
          ])
          .setImage("attachment://Discord_Rules_Banner.png");
        message.channel.send(embedRulesEs);
        break;
      case "SERVER":
        let embedBannerServerEs = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/KyonaxServerBanners.png",
          ])
          .setImage("attachment://KyonaxServerBanners.png");
        message.channel.send(embedBannerServerEs);

        let embedServerEs = new MessageEmbed()
          .setTitle("COMMUNITY GUIDELINES")
          .setDescription()
          .setColor(noneColor)
          .attachFiles(["database/multimedia/gifs/embeds/Rules_EN.png"])
          .setImage("attachment://Rules_EN.png");
        message.channel.send(embedServerEs);
        break;
      case "NOTHING":
        message.channel.send(
          "Si no puedes ver los mensajes en este canal, ve a **Configuraciones de Usuario > Texto e imágenes** (Asegurate que todas las opciones estén activadas)"
        );
        message.channel.send(
          "If you can't see anything in this channel, go to **User Settings > Text & Images ** (make sure all the features are toggled on!)"
        );
        break;
      case "SOCIALME":
        let embedBannerSocialEs = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/HeadBanner_Discord.gif",
          ])
          .setImage("attachment://HeadBanner_Discord.gif");
        message.channel.send(embedBannerSocialEs);

        let embedSocialEs = new MessageEmbed()
          .setDescription(
            `
**You want to enjoy more of <@894243194051629156> content ** go to the following links below to find exclusive content that you will love, and more information about **Rottenville Collection.** 

*Don't forget to use **Discord Invites**, which will help the project to grow as a community, and you can claim rewards for inviting friends. It's a win-win! Support us on Twitter for Giveaways, Events, and much more.*


                  `
          )
          .addField(
            stripIndents`**> Social media:**`,
            `


              ` +
              putEmoji(bot, "900098713257652264") +
              ` **Web Page: https://rottenville.io**
    ` +
              putEmoji(bot, "900098713257652264") +
              ` **Twitter: https://twitter.com/rotten_ville**
    ` +
              putEmoji(bot, "900098713257652264") +
              ` **Discord Invite: https://discord.gg/QeR9yvSWvk**
    `
          )
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/Discord_Links_Banner.png",
          ])
          .setImage("attachment://Discord_Links_Banner.png");
        message.channel.send(embedSocialEs);
        break;
      case "SUPPORT":
        let embedBannerSupportEs = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/KyonaxSupportBanners.png",
          ])
          .setImage("attachment://KyonaxSupportBanners.png");
        message.channel.send(embedBannerSupportEs);

        let embedSupportEs = new MessageEmbed()
          .setTitle("APOYA A KYONAX")
          .setDescription(
            `
          Al seguir a Kyonax en sus diferentes redes sociales ya estás **apoyándolo a que siga subiendo contenido**, tú eres su mayor inspiración. Si quieres que el contenido que sube **Kyonax mejore de __calidad y cantidad__**, le puedes apoyar con alguna donación o con un aporte en los siguientes enlaces:
          `
          )
          .addField(
            stripIndents`**> Enlaces: **`,
            `
        ` +
              putEmoji(bot, "763478205071097886") +
              ` **Suscripción Twitch: https://kyonax.link/twitch**
` +
              putEmoji(bot, "763478205071097886") +
              ` **Donación Paypal: https://kyonax.link/donation**
` +
              putEmoji(bot, "763478205071097886") +
              ` **Patreon: https://kyonax.link/patreon**

Al entrar en estos enlaces y **apoyar a Kyonax**, recibirás contenido y acceso a **_canales exclusivos, ediciones, un rol que demostrará tu compromiso con el creador, y más recompensas_** que varían del rol otorgado. 

_Para más información acerca de los roles dirigete a **<#768178896855760897>**._`
          )
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/SupportConten_ESt.png",
          ])
          .setImage("attachment://SupportConten_ESt.png");
        message.channel.send(embedSupportEs);

        let embedSupportEn = new MessageEmbed()
          .setTitle("SUPPORT KYONAX")
          .setDescription(
            `
          By following Kyonax on his different social networks, you are **already supporting him to keep uploading content**, you are his biggest inspiration. If you want the content that **Kyonax uploads to improve in __quality and quantity__**, you can support it with a donation or a contribution in the following links:
          `
          )
          .addField(
            stripIndents`**> Links: **`,
            `
        ` +
              putEmoji(bot, "763478205071097886") +
              ` **Sub Twitch: https://kyonax.link/twitch**
` +
              putEmoji(bot, "763478205071097886") +
              ` **Donation Paypal: https://kyonax.link/donation**
` +
              putEmoji(bot, "763478205071097886") +
              ` **Patreon: https://kyonax.link/patreon**

By entering these links and ** supporting Kyonax **, you will receive content and access to ** _ exclusive channels, editions, a role that demonstrates your commitment to the creator, and more rewards _ ** that vary from the role awarded.

_For more information about roles go to **<#768178896855760897>**._`
          )
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/SupportConten_EN.png",
          ])
          .setImage("attachment://SupportConten_EN.png");
        message.channel.send(embedSupportEn);
        break;
      case "SCHEDULE":
        let embedBannerScheduleEs = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/KyonaxScheduleBanners.png",
          ])
          .setImage("attachment://KyonaxScheduleBanners.png");
        message.channel.send(embedBannerScheduleEs);

        let embedScheduleEs = new MessageEmbed()
          .setTitle("RUTINA DE CONTENIDO")
          .setDescription(
            `
**Kyonax** suele subir contenido en una gran variedad de redes sociales, es por eso que creó una rutina para subir contenido en cada una de ellas, cabe aclarar que **__NO__ siempre se cumplirá al pie de la letra la rutina**, ya que existen muchos factores que pueden afectar la hora de subida de algún contenido, de igual manera la rutina de subida puede **__cambiar__ en cualquier momento**.

_Al seguir a Kyonax en sus redes sociales y apoyarlo como dice el canal de <#763477659551924284> la rutina de subida puede aumentar considerablemente._

` + "\n"
          )
          .addField(
            stripIndents`**> Así se encuentra la rutina de subida de contenido de Kyonax:**`,

            "```yaml\n" +
              "Facebook: LUNES - MIÉRCOLES - VIERNES\nInstagram: MIÉRCOLES - SÁBADOS - DOMINGOS\nTwitch: LUNES - MARTES\nYouTube: SÁBADO o DOMINGO" +
              "\n" +
              "\n" +
              "GitHub: CUANDO ESTE PROGRAMANDO\nTikTok: TODOS LOS DÍAS QUE PUEDA\nTwitter: TODOS LOS DÍAS\n" +
              "\n" +
              "```"
          )
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/Schedule_Es.png",
          ])
          .setImage("attachment://Schedule_Es.png");
        message.channel.send(embedScheduleEs);

        let embedScheduleEn = new MessageEmbed()
          .setTitle("CONTENT SCHEDULE")
          .setDescription(
            `
**Kyonax** usually uploads content on a wide variety of social networks, that is why he created a routine to upload content on each of them, it should be clarified that the **routine will __NOT__ always be fulfilled to the letter**, since there are many factors that can affect the upload time of some content, in the same way, the upload **routine can __change__ at any time**.

_By following Kyonax on his social networks and supporting him as the <#763477659551924284> channel says, the upload routine can increase considerably._

` + "\n"
          )
          .addField(
            stripIndents`**> This is the Kyonax content upload routine:**`,

            "```yaml\n" +
              "Facebook: MONDAY - WEDNESDAY - FRIDAY\nInstagram: WEDNESDAY - SATURDAY - SUNDAY\nTwitch: MONDAY - TUESDAY\nYouTube: SATURDAY or SUNDAY" +
              "\n" +
              "\n" +
              "GitHub: WHEN I'M PROGRAMMING\nTikTok: EVERY DAY THAT I CAN\nTwitter: EVERY DAYS\n" +
              "\n" +
              "```"
          )
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/Schedule_En.png",
          ])
          .setImage("attachment://Schedule_En.png");
        message.channel.send(embedScheduleEn);
        break;
      case "SERVERE":
        let embedBannerServereEs = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/GIF_KyonaxComfyFort_BannerServer_Trippy.gif",
          ])
          .setImage("attachment://GIF_KyonaxComfyFort_BannerServer_Trippy.gif");
        message.channel.send(embedBannerServereEs);

        let embedServereEs = new MessageEmbed()
          .setDescription(
            `
> **¿Qué es Mundo Kyonax ! 🍟?**・` +
              putEmoji(bot, "776102088597307422") +
              `

**Mundo Kyonax ! 🍟 es un servidor fundado por <@248204538941538308>** con el objetivo de ofrecer un lugar a sus seguidores dónde pueden platicar, conectar con más personas, y hacer amigos alrededor de todo el mundo. **¿Te gusta el Anime, Arte, Programación, Memes, o los Sorteos?** - ¡Pues este lugar es perfecto para ti!

` +
              putEmoji(bot, "849623550164074516") +
              ` **Lee las reglas del servidor: <#763475354919895040>**
` +
              putEmoji(bot, "849623550164074516") +
              ` **Luego verifícate y escoge tus roles: <#849365435958951967>**

` +
              `**> Apoya el servidor con los siguientes Roles Premium・${putEmoji(
                bot,
                "764154680522833920"
              )}**` +
              `        
` +
              putEmoji(bot, "849623550164074516") +
              ` **Boostea el server y obtén: <@&776064895795855391>**
` +
              putEmoji(bot, "849623550164074516") +
              ` **Realiza una donación y obtén: <@&849674093242482708>**
` +
              putEmoji(bot, "849623550164074516") +
              ` **Invita a personas y obtén: <@&779178820057169961>**
` +
              putEmoji(bot, "849623550164074516") +
              ` **Suscríbete en Twitch y obtén: <@&849703338667802704>**`
          )
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/GIF_KyonaxComfyFort_BannerServerInfo_Trippy.png",
          ])
          .setImage(
            "attachment://GIF_KyonaxComfyFort_BannerServerInfo_Trippy.png"
          );
        message.channel.send(embedServereEs);
        break;
      case "VERIFY":
        let embedBannerRulesEss = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/GIF_KyonaxComfyFort_BannerServer_Trippy.gif",
          ])
          .setImage("attachment://GIF_KyonaxComfyFort_BannerServer_Trippy.gif");
        message.channel.send(embedBannerRulesEss);

        let embedVerifyEs = new MessageEmbed()
          .setDescription(
            `
> **¿No ves todos los canales?**・` +
              putEmoji(bot, "776106295505584149") +
              `   

**Verifícate para tener acceso al Servidor**, ver todos los canales disponibles, y poder compartir con las demás personas que se encuentran en el servidor usando este emoji **-> **` +
              putEmoji(bot, "849623151851339827") +
              `

` +
              `**> Antes de verificarse・${putEmoji(
                bot,
                "764154680582340618"
              )}**
` +
              putEmoji(bot, "849623550164074516") +
              ` **Lee todas las reglas del servidor: <#763475354919895040>**
` +
              putEmoji(bot, "849623550164074516") +
              ` **De qué trata el servidor: <#763787729695014912>**
` +
              putEmoji(bot, "849623550164074516") +
              ` **Saludo y bienvenida: <#849365399010803772>**

**[TWITCH](https://kyonax.link/twitch) | [TWITTER](https://kyonax.link/twitter) | [ENLACE DE INVITACIÓN](https://kyonax.link/discord) | [YOUTUBE](https://kyonax.link/youtube) | [IG](https://kyonax.link/instagram)**
`
          )
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/GIF_KyonaxComfyFort_BannerServerVerify_Trippy.png",
          ])
          .setImage(
            "attachment://GIF_KyonaxComfyFort_BannerServerVerify_Trippy.png"
          );
        message.channel.send(embedVerifyEs);
        break;
      case "HEAD":
        let embedBannerRulesEssa = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/HeadBanner_Discord.gif",
          ])
          .setImage("attachment://HeadBanner_Discord.gif");
        message.channel.send(embedBannerRulesEssa);
        break;
      case "BAR":
        let embedBannerServereEsBarssa = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/GIF_KyonaxComfyFort_BannerBarServer.gif",
          ])
          .setImage("attachment://GIF_KyonaxComfyFort_BannerBarServer.gif");
        message.channel.send(embedBannerServereEsBarssa);
        break;
      default:
        return message.channel.send("No se encuentra el canal.");
    }
  }
};
