//Importación especifica de Metodos - RichEmbed - Colors - Errors
const { MessageEmbed } = require("discord.js");
const { lightbluecolor } = require("../../../database/utils/color/color.json");
const CandyMachineJSON = require("../../../database/utils/adds/CandyMachine_Data.json");
//const CandyMachineJSON2 = require("../../../database/utils/adds/CandyMachine_Data2.json");
var theblockchainapi = require("theblockchainapi");
let defaultClient = theblockchainapi.ApiClient.instance; //Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Variables js de Node.js
const fetch = require("node-fetch");
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand.js");
const fs = require("fs");
//Exportación del Comando Alpaca
module.exports = class SolanaCommand extends BaseCommand {
  constructor() {
    super(
      "solana",
      ["sol"],
      "Save in the Database all the NFTs and their transactions since the MINT day.",
      "solana`",
      "_***Mod***_",
      "mod"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    let network = "mainnet-beta"; // String | The network ID (devnet, mainnet-beta)
    const walletAdress = "AaDok1ZGwDTgAdeXZxuyprCdbRvAK1VzM2EvuBmTAw3E";
    var APIKeyID = defaultClient.authentications["APIKeyID"];
    APIKeyID.apiKey = "FPv8WcgqELAwD2f";

    var APISecretKey = defaultClient.authentications["APISecretKey"];
    APISecretKey.apiKey = "djjduc9RpPH2iJ4";
    let apiInstance = new theblockchainapi.SolanaCandyMachineApi();

    let request = new theblockchainapi.GetMintedNFTsRequest(); // GetMintedNFTsRequest |
    request.candy_machine_id = walletAdress;
    request.network = "mainnet-beta";

       

    
    let candyMachineId = "AaDok1ZGwDTgAdeXZxuyprCdbRvAK1VzM2EvuBmTAw3E"; // String | The ID of the candy machine
    
    console.log("This takes about 45 seconds... Starting the API call...")
    
    let result = await apiInstance.solanaGetAllNFTsFromCandyMachine(network, candyMachineId).then((data) => {
      console.log('API called successfully.');
      return data;
    }, (error) => {
      console.error(error);
      return null;
    });
    
    console.log(result);
    
    // String | The ID of the candy machine
    // We don't have to specify whether the candy is v1 or v2 this time. It auto-detects it.

    
console.log("This takes about 45 seconds... Starting the API call...");
console.log(
    "Retrieving all NFTs from a V2 candy machines... This API call can take around 45 seconds..."
)

let result2 = await apiInstance.solanaGetAllNFTsFromCandyMachine(network, candyMachineId).then((data) => {
  console.log('API called successfully.');
  return data;
}, (error) => {
  console.error(error);
  return null;
});



    CandyMachineJSON.dataNFTs["RottenVille"] = {
      result: result,
    };

    //CandyMachineJSON2.dataNFTs["RottenVille"] = {
     // result: result2,
    //};

    console.table(result);

    fs.writeFile(
      "./database/utils/adds/CandyMachine_Data.json",
      JSON.stringify(CandyMachineJSON),
      (err) => {
        if (err) console.log(err);
      }
    );    
  }
};
