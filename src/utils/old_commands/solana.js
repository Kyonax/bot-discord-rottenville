//Importación especifica de Metodos - RichEmbed - Colors - Errors
const { MessageEmbed } = require("discord.js");
const { lightbluecolor } = require("../../../database/utils/color/color.json");
const CandyMachineJSON = require("../../../database/utils/adds/BustJSON.json");
//const CandyMachineJSON2 = require("../../../database/utils/adds/CandyMachine_Data2.json");
var theblockchainapi = require("theblockchainapi");
let defaultClient = theblockchainapi.ApiClient.instance; //Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Variables js de Node.js
const fetch = require("node-fetch");
//Importación de la Clase Padre
const BaseCommand = require("../structure/BaseCommand.js");
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
    if (message.guild.id != "894634118267146272") return;
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const walletAdress = "12hr7uZfayc5c6ny2BgwrpPD54Q4Hm8g61xL16vS4Mfd";

    

    let defaultClient = theblockchainapi.ApiClient.instance;

    // Get a free API Key Pair here: https://dashboard.blockchainapi.com/api-keys

    let APIKeyID = defaultClient.authentications["APIKeyID"];
    APIKeyID.apiKey = "Jg7gGpZ7E0qjtJ2";

    let APISecretKey = defaultClient.authentications["APISecretKey"];
    APISecretKey.apiKey = "Pr9iSo0eIoProXA";

    let apiInstance = new theblockchainapi.SolanaCandyMachineApi();

    let network = "mainnet-beta"; // String | The network ID (devnet, mainnet-beta)
    let candyMachineId = "12hr7uZfayc5c6ny2BgwrpPD54Q4Hm8g61xL16vS4Mfd"; // String | The ID of the candy machine

    console.log("This takes about 45 seconds... Starting the API call...");

    let result = await apiInstance
      .solanaGetAllNFTsFromCandyMachine(network, candyMachineId)
      .then(
        (data) => {
          console.log("API called successfully.");
          return data;
        },
        (error) => {
          console.error(error);
          return null;
        }
      );

    console.log(result);    

    CandyMachineJSON.dataNFTs["RottenVille"] = {
      result: result,
    };

    //CandyMachineJSON2.dataNFTs["RottenVille"] = {
    // result: result2,
    //};

    console.table(result);

    fs.writeFile(
      "./database/utils/adds/BustJSON.json",
      JSON.stringify(CandyMachineJSON),
      (err) => {
        if (err) console.log(err);
      }
    );
  }
};
