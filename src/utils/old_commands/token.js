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
const BaseCommand = require("../structure/BaseCommand.js");
const fs = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const minted_nfts_method = async (url, bodyNet, CandyData, CandyRottenVille) => {
  for (let i = 0, len = CandyData.minted_nfts.length; i < len; i++) {
    CandyData.minted_nfts.forEach((data) => {
      if (data.nft_metadata.data.name == "Rotten Ville #" + i) {
        console.log(data.nft_metadata.data.name)
        url = data.nft_metadata.data.uri;

        fetch(url)
          .then((res) => res.json())
          .then((body) => {
            console.log(body);
            bodyNet = body;

            CandyRottenVille.CandyMachine.RottenVille.minted_nfts[i] = {
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

const unminted_nfts_method = async (url, bodyNet, CandyData, CandyRottenVille)=> {
  for (let i = 332, len = CandyData.unminted_nfts.length; i < len; i++) {
    CandyData.unminted_nfts.forEach((data) => {
      console.table("EL ITERADOR "+i)
      if (data.name == "Rotten Ville #" + i) {
        console.log(data.name)
        url = data.uri;

        fetch(url)
          .then((res) => res.json())
          .then((body) => {
            if (!body) return err.fetchCrash(bot, message);
            console.log(body);
            bodyNet = body;

            CandyRottenVille.CandyMachine.RottenVille.unminted_nfts[i] = {
              name: body.name,
              symbol: body.symbol,
              uri: data.uri,
              token: body.mint,
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


//Exportación del Comando Alpaca
module.exports = class TokenCommand extends BaseCommand {
  constructor() {
    super(
      "token",
      ["solanatoken", "soltoken", "wallet"],
      "Fetch all the Data from the Candy Machine and all the NFTs Transactions.",
      "token`",
      "_***Mod***_",
      "miscellaneous"
    );
  }

  async run(bot, message, args) {
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => { });
    const CandyData = CandyMachineJSON.dataNFTs.RottenVille.result;
    let bodyNet = null;
    let url = null;
    //Creación de Objetos
    const err = new Error();
    console.table(CandyMachineJSON.dataNFTs.RottenVille.result["minted_nfts"]);
    console.log(" --->  NFT METADATA");
    console.table(CandyMachineJSON.dataNFTs.RottenVille.result["minted_nfts"][0].nft_metadata);
    console.log(" ---> KEY HASH");
    console.table(CandyMachineJSON.dataNFTs.RottenVille.result["minted_nfts"][0].pub_key_hash);
    console.log(" ---> DATA");
    console.table(
      CandyMachineJSON.dataNFTs.RottenVille.result["minted_nfts"][0].nft_metadata.data
    );
    console.log(" ---> MARIA NET");

    //Solicitando Json

    function scanMinted() {
      setTimeout(async function () {
        minted_nfts_method(url, bodyNet, CandyData, CandyRottenVille).then(()=>{
        scanUNMinted();
        })
      }, 3000); 
    }

    

    function scanUNMinted() {
      setTimeout(async function () {
        unminted_nfts_method(url, bodyNet, CandyData, CandyRottenVille);
      }, 45000); 
    }      

    scanMinted()
     
    }
  };
