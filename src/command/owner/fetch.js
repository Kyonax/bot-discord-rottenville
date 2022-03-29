//Importación especifica de Metodos - findUserID putEmoji Functions
const { MessageEmbed, DataResolver } = require("discord.js");
const { putEmoji, getMember } = require("../../utils/misc/functions.js");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const { noneColor } = require("../../../database/utils/color/color.json");
const Perms = require("../../../database/conectors/perm");
const CandyMachineJSON = require("../../../database/utils/adds/CandyMachine_Data.json");
const CandyRottenVille = require("../../../database/utils/adds/CandyMachineRottenVille.json");
//Importación de Usuario
const { memberExist } = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de la Clase Padre y Conexión con la Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand.js");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//Exportación del Comando Clear
module.exports = class FetchCommand extends BaseCommand {
  constructor() {
    super(
      "fetch",
      ["getData"],
      "Fetch the RottenVille NFTs from a Wallet.",
      "fetch`\n**Options:** `<wallet>`",
      "_***Admin - Inmortales - Moderadores***_",
      "mod"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminación del mensaje con Comandos
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    const CandyData = CandyRottenVille.CandyMachine.RottenVille.NFT;
    //Miembro existente
    const existMember = (
      await memberExist(message.guild.id, message.author.id)
    )[0];
    //Inicialización de Párametros Member
    const { moderatorMember } = existMember[0];
    //Insuficientes Permisos para usar el Comando
    if (moderatorMember != 1) return perm.moderatorPerms(bot, message);
    //Emoji from Map
    const emoji = synchronous.emojiID[0].afirmado;
    let rottensMember = [];
    let iteratorCount = 1;
    let arrayCount = [];
    let baseNumber = 11;
    const typeFetch = args[0];
    const member = getMember(message, args[1]);
    const walletAdress = args[2];
    const sizeEmbeds = 51;
    let repeatNumbers = [];
    let initialize = [];
    for (let index = 1; index <= sizeEmbeds; index++) {
      initialize.push(
        new MessageEmbed().setTitle(`#${index} Fetch Rottens in Wallet`)
      );
      repeatNumbers.push(index);
      repeatNumbers.push(index);
    }
    let [
      embed,
      embed2,
      embed3,
      embed4,
      embed5,
      embed6,
      embed8,
      embed9,
      embed10,
      embed11,
      embed12,
      embed13,
      embed14,
      embed15,
      embed16,
      embed17,
      embed18,
      embed19,
      embed20,
      embed21,
      embed22,
      embed23,
      embed24,
      embed25,
      embed26,
      embed27,
      embed28,
      embed29,
      embed30,
      embed31,
      embed32,
      embed33,
      embed34,
      embed35,
      embed36,
      embed37,
      embed38,
      embed39,
      embed40,
      embed41,
      embed42,
      embed43,
      embed44,
      embed45,
      embed46,
      embed47,
      embed48,
      embed49,
      embed50,
    ] = initialize;
    let embeds = [
      embed,
      embed2,
      embed3,
      embed4,
      embed5,
      embed6,
      embed8,
      embed9,
      embed10,
      embed11,
      embed12,
      embed13,
      embed14,
      embed15,
      embed16,
      embed17,
      embed18,
      embed19,
      embed20,
      embed21,
      embed22,
      embed23,
      embed24,
      embed25,
      embed26,
      embed27,
      embed28,
      embed29,
      embed30,
      embed31,
      embed32,
      embed33,
      embed34,
      embed35,
      embed36,
      embed37,
      embed38,
      embed39,
      embed40,
      embed41,
      embed42,
      embed43,
      embed44,
      embed45,
      embed46,
      embed47,
      embed48,
      embed49,
      embed50,
    ];

    if (typeFetch == "wallet") {
      //Solicitando Json
      var url = `https://public-api.solscan.io/account/tokens?account=${walletAdress}`;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.setRequestHeader("Accept", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          for (
            let index = 0;
            index < JSON.parse(xhr.responseText).length;
            index++
          ) {
            CandyData.forEach((data) => {
              if (
                data.token == JSON.parse(xhr.responseText)[index].tokenAddress
              ) {
                rottensMember.push(data.name);
                try {
                  embeds.forEach((emb) => {
                    if (emb.title.includes(repeatNumbers[iteratorCount - 1])) {
                      emb
                        .setDescription(
                          `**${putEmoji(
                            bot,
                            emoji
                          )} Fetching Candy Machine** actual data from <@${
                            member.id
                          }>`
                        )
                        .addField(`Wallet Member `, `**${walletAdress}**`)
                        .addField(`${data.name}`, `**◎ ${data.token}**`, false)
                        .addField(`Image NFT`, `**${data.image}**`, false)
                        .setColor("#00F27F");

                      //data.attributes.forEach((att) => {
                      //    emb.addField(`${att.trait_type}`, `**${att.value}**`, true);
                      //})
                      emb.setThumbnail(`${data.image}`);
                      emb.addField(`---`, `**---**`, false);
                    }
                  });

                  iteratorCount = iteratorCount + 1;
                } catch (error) {
                  console.log(error);
                }
              }
            });
          }

          embeds.forEach((emb) => {
            let reference = emb.title;
            reference = reference.replace("#", "");
            reference = reference.replace(" Fetch Rottens in Wallet", "");
            reference = parseInt(reference);
            if (reference <= iteratorCount / 2) {
              message.channel.send(emb);
            }
          });
          console.table(rottensMember);
        }
      };
      xhr.send();
    }
  }
};
