//Importación especifica de Metodos - RichEmbed - Colors - Errors
const { MessageEmbed } = require("discord.js");
const { lightbluecolor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Variables js de Node.js
const fetch = require("node-fetch");
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand.js");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//Exportación del Comando Alpaca
module.exports = class AlpacaCommand extends BaseCommand {
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
        message.delete().catch((O_o) => { });
        //Creación de Objetos
        const err = new Error();
        const walletAdress = args[0]
        //Mensaje generando
        let msg = await message.channel.send("Generando...");
        //Solicitando Json
        var url = `https://public-api.solscan.io/account/tokens?account=${walletAdress}`;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Accept", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {                
                console.table(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    }
};
