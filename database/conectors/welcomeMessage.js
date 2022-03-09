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
  const _HELLO_CHANNEL = member.guild.channels.cache.find((ch) =>
    ch.name.includes("💬・testing-team")
  );
  const _SERVER_CHANNEL_ = member.guild.channels.cache.find((ch) =>
    ch.name.includes("📯・new-member")
  );

  let _embed = new MessageEmbed()
    .setColor("#13ea83")
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter(
      "📣 RottenVille Project・check out our twitter.com/rotten_ville"
    )
    .setDescription(
      `**╭・———— » ` +
      "`👽`" +
      ` — Be part of RottenVille —-**
┊ **Follow the rules of the Server, **
┊ read all the Rules that you will
┊ find in <#928319200139812864> ・` +
      "`🏁`" +
      `
┊
┊ Verify as a Holder to get full acces
┊ _"protocol under develop"_・` +
      "`👹`" +
      `
┊
┊ **Member Verify <#950907434988367933> **
┊ you will get ** <@&895850023311540225> **
┊
┊ _If you have any question <#898983573607030834> or_
┊ **__ask for help on <#899003268473180230>__**
╰
    `
    );
  try {
    _HELLO_CHANNEL.send(_RANDOM_SALUTE);
    _SERVER_CHANNEL_.send(
      `**Welcome ${_MEMBER} to RottenVille Laboratory!! Check this out before Verify.**`,
      _embed
    );
  } catch (error) {
    console.log("No se pudo enviar el welcome. " + error);
  }
};
