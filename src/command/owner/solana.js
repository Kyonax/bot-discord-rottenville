//Importación especifica de Metodos - RichEmbed - Colors - Errors
const { MessageEmbed } = require("discord.js");
const { lightbluecolor } = require("../../../database/utils/color/color.json");
const CandyMachineJSON = require("../../../database/utils/adds/CandyMachine_Data.json");
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
      "Command to use Solana API.",
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
    const walletAdress = "AaDok1ZGwDTgAdeXZxuyprCdbRvAK1VzM2EvuBmTAw3E";
    var APIKeyID = defaultClient.authentications["APIKeyID"];
    APIKeyID.apiKey = "tjcqBAvBw68bF34";

    var APISecretKey = defaultClient.authentications["APISecretKey"];
    APISecretKey.apiKey = "IjSjwGO2I6ykPiQ";
    let apiInstance = new theblockchainapi.SolanaCandyMachineApi();

    let request = new theblockchainapi.GetMintedNFTsRequest(); // GetMintedNFTsRequest |
    request.candy_machine_id = walletAdress;
    request.network = "mainnet-beta";

    let opts = {
      getMintedNFTsRequest: request,
    };

    const result = await apiInstance
      .solanaGetNFTsMintedFromCandyMachine(opts)
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
    CandyMachineJSON.dataNFTs["RottenVille"] = {
      result: result,
    };
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
