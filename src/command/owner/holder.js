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
const axios = require('axios').default;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { Console } = require("console");

const holderFetching = async (url, holder) => {

  try {
    const { data } = await axios.get(url)
    holder = data.data[0].owner
    return holder
  } catch (error) {
    console.log(error)
  }

}

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
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => { });
    const CandyData = CandyMachineJSON.dataNFTs.RottenVille.result;
    let bodyNet = null;
    let url = null;
    let mint = null;
    let holder = null;
    let holderObj = null;
    //Creación de Objetos
    const err = new Error();

    //Solicitando Json
    var url_2 = null;
    let i_2 = 1
    let indice = 0
    let indice_2 = 0
    function myLoop() {
      setTimeout(async function () {
        if (CandyData.length != 0) {
          url_2 = `https://public-api.solscan.io/token/holders?tokenAddress=${CandyData[indice].nft_metadata.mint}`;
          holderObj = await holderFetching(url_2, holder)


          if (holderObj != undefined) {
            CandyRottenVille.CandyMachine.RottenVille.NFT.forEach((candy_rottenville) => {
              try {
                if (CandyData[indice].nft_metadata.mint === candy_rottenville.token) {
                  console.log("HOLDER x MINT ORIGIN OWNER:\nORIGIN MINT TOKEN= " + CandyData[indice].nft_metadata.mint + "\nMINT TOKEN CANDY = " + candy_rottenville.token + "\nHOLDER OBJ = " + holderObj + "\nIndice:"+indice_2+"\n\n")
                  CandyRottenVille.CandyMachine.RottenVille.NFT[indice_2].holder = holderObj                  
                } else {
                  
                }
                indice_2++
              } catch (error) {
                console.log(error)
              }
            })
          }
          indice_2 = 0





          fs.writeFile(
            "./database/utils/adds/CandyMachineRottenVille.json",
            JSON.stringify(CandyRottenVille),
            (err) => {
              if (err) console.log(err);
            }
          );

        } else {
          return console.log("No ROTENSSS!!!")
        }

        i_2++
        indice++

        if (i_2 < CandyData.length) {
          myLoop()
        } else {
          console.log("GAME OVER")
        }

      }, 1000)
    }

    myLoop();

  }
};
