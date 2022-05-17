//Importación especifica de Metodos - RichEmbed - Colors - Errors
const { MessageEmbed } = require("discord.js");
const CandyMachineJSON = require("../../../database/utils/adds/CandyMachine_Data.json");
const CandyRottenVille = require("../../../database/utils/adds/CandyMachineRottenVille.json");
const AlphaNFTs = require("../../../database/utils/adds/AlphaNFTs.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
const { delay } = require("../../utils/misc/functions");
//Variables js de Node.js
const fetch = require("node-fetch");
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand.js");
const fs = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const theblockchainapi = require("theblockchainapi");

module.exports = class HashCommand extends BaseCommand {
    constructor() {
        super(
            "hash",
            ["fetchhash"],
            "Fetch all the RottenVille Holders",
            "hash`",
            "_***Owner***_",
            "miscellaneous"
        );
    }

    async run(bot, message, args) {
        if (message.guild.id != "894634118267146272") return;
        //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
        message.delete().catch((O_o) => { });
        const CandyData = CandyRottenVille.alpha_rottens;
        let bodyNet = null;
        let url = null;
        let mint = null;
        let holder = null;
        //Creación de Objetos
        const err = new Error();
        //Solicitando Json
        for (let i = 0, len = CandyData.length; i < len; i++) {
            CandyData.forEach(async (data) => {
                if (data.name == "Rotten Ville #" + i) {
                    let defaultClient = theblockchainapi.ApiClient.instance;

                    // Get a free API Key Pair here: https://dashboard.blockchainapi.com/api-keys

                    let APIKeyID = defaultClient.authentications["APIKeyID"];
                    APIKeyID.apiKey = "Jg7gGpZ7E0qjtJ2";

                    let APISecretKey = defaultClient.authentications["APISecretKey"];
                    APISecretKey.apiKey = "Pr9iSo0eIoProXA";

                    let apiInstance = new theblockchainapi.SolanaNFTApi();

                    let network = "mainnet-beta"; // String | The network ID (devnet, mainnet-beta)
                    let mintAddress = data.token; // String | The mint address of the NFT

                    const _body = await apiInstance
                        .solanaGetNFT(network, mintAddress)
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

                    let view_nft_url =
                        "https://explorer.solana.com/address/" +
                        mintAddress +
                        "?cluster=" +
                        network;
                    console.log("View the NFT: " + view_nft_url);

                    const result = await apiInstance
                        .solanaGetNFTOwner(network, mintAddress)
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

                    let nft_owner = result["nft_owner"];
                    url = _body.data.uri;
                    mint = data.token;

                    AlphaNFTs.alpha_rottens.push({
                        "name": data.name,
                        "symbol": data.symbol,
                        "uri": url,
                        "token": data.token,
                        "holder": nft_owner,
                        "explorer_url": _body.explorer_url,
                        "edition": data.edition                                                
                    })

                    await fs.writeFileSync(
                        "./database/utils/adds/AlphaNFTs.json",
                        JSON.stringify(AlphaNFTs),
                        (err) => {
                          if (err) console.log(err);
                        }
                      );
                }
            });
        }
    }
};
