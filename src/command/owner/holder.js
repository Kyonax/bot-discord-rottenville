//Importación especifica de Metodos - RichEmbed - Colors - Errors
const { MessageEmbed } = require("discord.js");
const { lightbluecolor } = require("../../../database/utils/color/color.json");
const CandyMachineJSON = require("../../../database/utils/adds/CandyMachine_Data.json");
const CandyRottenVille = require("../../../database/utils/adds/CandyMachineRottenVille.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
const { delay } = require("../../utils/misc/functions");
//Variables js de Node.js
const fetch = require("node-fetch");
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand.js");
const fs = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//Exportación del Comando Alpaca
module.exports = class HolderCommand extends BaseCommand {
  constructor() {
    super(
      "holder",
      ["walletHolder", "dueño"],
      "Fetch all the RottenVille Holders",
      "holder`",
      "_***Owner***_",
      "miscellaneous"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    const CandyData = CandyMachineJSON.dataNFTs.RottenVille.result;    
    let bodyNet = null;
    let url = null;
    let mint = null;
    let holder = null;
    //Creación de Objetos
    const err = new Error();
    //Solicitando Json
    for (let i = 0, len = CandyData.length; i < len; i++) {
      CandyData.forEach((data) => {
        if (data.nft_metadata.data.name == "Rotten Ville #" + i) {
          url = data.nft_metadata.data.uri;
          mint = data.nft_metadata.mint;

          //Solicitando Json
          var url_2 = `https://public-api.solscan.io/token/holders?tokenAddress=${mint}`;
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url_2);
          xhr.setRequestHeader("Accept", "application/json");

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              for (
                let index = 0;
                index < JSON.parse(xhr.responseText).length;
                index++
              ) {
                console.table(data);
                holder = data.owner;
              }
            }
          };

          xhr.send();

          fetch(url_2)
            .then((res) => res.text())
            .then((body) => {
              if (!body) return err.fetchCrash(bot, message);
              bodyNet = body;
              console.table(body);
              holder = body.owner;
            })
            .catch((err) => console.log(err));

          fetch(url)
            .then((res) => res.json())
            .then((body) => {
              if (!body) return err.fetchCrash(bot, message);
              bodyNet = body;

              CandyRottenVille.CandyMachine.RottenVille.NFT[i] = {
                name: data.nft_metadata.data.name,
                mintAddress: mint,
                holder: holder,
                symbol: data.nft_metadata.data.symbol,
                uri: data.nft_metadata.data.uri,
                token: data.nft_metadata.mint,
                image: body.image,
                external_url: body.external_url,
                edition: body.edition,
                attributes: body.attributes,
                properties: body.properties,
              };

              fs.writeFile(
                "./database/utils/adds/CandyMachineRottenVille.json",
                JSON.stringify(CandyRottenVille),
                (err) => {
                  if (err) console.log(err);
                }
              );
            });
        }
      });
    }
  }
};
