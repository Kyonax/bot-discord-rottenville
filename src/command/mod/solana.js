//Importación especifica de Metodos - RichEmbed - Colors - Errors
const { MessageEmbed } = require("discord.js");
const { lightbluecolor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Variables js de Node.js
const fetch = require("node-fetch");
const solanaWeb3 = require('@solana/web3.js');
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand.js");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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
        message.delete().catch((O_o) => { });
        //Creación de Objetos
        const err = new Error();
        const walletAdress = args[0]        

        // Connect to cluster
        var connection = new solanaWeb3.Connection(
            solanaWeb3.clusterApiUrl('devnet'),
            'confirmed',
        );

        console.table(solanaWeb3)

        // Generate a new wallet keypair and airdrop SOL
        var wallet = solanaWeb3.Keypair.generate(walletAdress);        
        var airdropSignature = await connection.requestAirdrop(
            wallet.publicKey,
            solanaWeb3.LAMPORTS_PER_SOL,
        );

        //wait for airdrop confirmation
        await connection.confirmTransaction(airdropSignature);

        // get account info
        // account data is bytecode that needs to be deserialized
        // serialization and deserialization is program specic
        let account = await connection.getAccountInfo(wallet.publicKey);    

        // Connect to cluster
        var connection = new solanaWeb3.Connection(
            solanaWeb3.clusterApiUrl('devnet'),
            'confirmed',
        );

        

    }
};
