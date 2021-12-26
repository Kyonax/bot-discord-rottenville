//Importación especifica de Metodos - RichEmbed - Colors - Errors
const { MessageEmbed } = require("discord.js");
const { lightbluecolor } = require("../../../database/utils/color/color.json");
const CandyMachineJSON = require("../../../database/utils/adds/CandyMachine_Data.json");
const CandyRottenVille = require("../../../database/utils/adds/CandyMachineRottenVille.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Variables js de Node.js
const fetch = require("node-fetch");
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand.js");
const fs = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//Exportación del Comando Alpaca
module.exports = class TokenCommand extends BaseCommand {
  constructor() {
    super(
      "token",
      ["solanatoken", "soltoken", "wallet"],
      "Command to get the Tokens of a Wallet.",
      "token`",
      "_***Mod***_",
      "miscellaneous"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    const CandyData = CandyMachineJSON.dataNFTs.RottenVille.result;
    let bodyNet = null;
    //Creación de Objetos
    const err = new Error();
    console.table(CandyMachineJSON.dataNFTs.RottenVille.result[0]);
    console.log(" --->  NFT METADATA");
    console.table(CandyMachineJSON.dataNFTs.RottenVille.result[0].nft_metadata);
    console.log(" ---> KEY HASH");
    console.table(CandyMachineJSON.dataNFTs.RottenVille.result[0].pub_key_hash);
    console.log(" ---> DATA");
    console.table(
      CandyMachineJSON.dataNFTs.RottenVille.result[0].nft_metadata.data
    );
    console.log(" ---> MARIA NET");

    //Solicitando Json
    var url =
      CandyMachineJSON.dataNFTs.RottenVille.result[0].nft_metadata.data.uri;
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        if (!body) return err.fetchCrash(bot, message);
        console.log(body);
        bodyNet = body;
        message.channel.send(body.image);

        for (let i = 0, len = CandyData.length; i < len; i++) {
          CandyData.forEach((data) => {
            if (data.nft_metadata.data.name == "Rotten Ville #" + i) {
              CandyRottenVille.CandyMachine.RottenVille.NFT[i] = {
                name: data.nft_metadata.data.name,
                symbol: data.nft_metadata.data.symbol,
                uri: data.nft_metadata.data.uri,
                token: data.nft_metadata.mint,
                image: body.image,
                external_url: body.external_url,
                edition: body.edition,
                attributes: body.attributes,
                properties: body.properties,
              };
            }
          });
        }

        fs.writeFile(
          "./database/utils/adds/CandyMachineRottenVille.json",
          JSON.stringify(CandyRottenVille),
          (err) => {
            if (err) console.log(err);
          }
        );
      });
  }
};
