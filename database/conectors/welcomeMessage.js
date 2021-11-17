const { MessageEmbed } = require("discord.js");
const {
  getMember,
  putEmoji,
  delay,
  initObjectMember,
} = require("../../src/utils/misc/functions");

const { stripIndents } = require("common-tags");

const Error = require("../conectors/error");

module.exports.welcomeMessage = async (member, bot) => {
  const _GUILD_ID = member.guild.id;
  const _MEMBER_ID = member.user.id;
  const _MEMBER = member;
  const _SALUTE = [
    `**Hey!! ${_MEMBER} welcome to RottenVille Gang**, make sure to read all the Server Rules <#898963212433764373>, and start to get **Alpha Radiation ${putEmoji(
      bot,
      "901151325117636618"
    )}**`,
    `What? A new Survivor? **Welcome ${_MEMBER} to the RottenVille Gang, enjoy your stay!!!**`,
    `**Gang gang, We have a new member in our Gang, congrats ${_MEMBER}** and Welcome to RottenVille!`,
  ];
  const _RANDOM_SALUTE = _SALUTE[Math.floor(Math.random() * _SALUTE.length)];
  const _SERVER_CHANNEL = member.guild.channels.cache.find((ch) =>
    ch.name.includes("🍕・welcome")
  );
  const _HELLO_CHANNEL = member.guild.channels.cache.find((ch) =>
    ch.name.includes("💬・general-chat")
  );
  const _SERVER_CHANNEL_ = member.guild.channels.cache.find((ch) =>
    ch.name.includes("🍵・welcome-survivor")
  );

  let _embed = new MessageEmbed()
    .setColor("#13ea83")
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter(
      "📣 Collection comming soon・check out our twitter.com/rotten_ville"
    )
    .setDescription(
      `**╭・—————— » ` +
        "`👽`" +
        ` — Welcome to Rottenville! —-**
┊ **This community have rules that you must follow, **
┊ for this you have to read and implement each rule that
┊ appear in <#898963212433764373> ・` +
        "`📖`" +
        `
┊
┊ If you want to know more about the server and how to get
┊ the **Premium Roles** go to <#898983390227865650> ・` +
        "`👹`" +
        `
┊
┊ **Verify on <#898985535819902996> ** to see the other channels
┊ and get the role ** <@&895850023311540225> **
┊
┊ _If you have any question go to <#898983573607030834> or_
┊ **__ask for help on <#899003268473180230>__**
╰
    `
    );
  try {
    _SERVER_CHANNEL_.send(
      `**Hey ${_MEMBER} check this out before Verify.**`,
      _embed
    );
  } catch (error) {
    console.log("No se pudo enviar el welcome. " + error);
  }
};
