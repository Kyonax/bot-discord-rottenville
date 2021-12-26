//Importación especifica de Metodos - findUserID putEmoji Functions
const { MessageEmbed, DataResolver } = require("discord.js");
const { putEmoji, getMember } = require("../../utils/misc/functions.js");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const { noneColor } = require("../../../database/utils/color/color.json");
const Perms = require("../../../database/conectors/perm");
const CandyMachineJSON = require("../../../database/utils/adds/CandyMachine_Data.json");
const CandyRottenVille = require("../../../database/utils/adds/CandyMachineRottenVille.json");
//Importación de Usuario
const { memberExist } = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de la Clase Padre y Conexión con la Base de Datos
const BaseCommand = require("../../../src/utils/structure/BaseCommand.js");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//Exportación del Comando Clear
module.exports = class FetchCommand extends BaseCommand {
    constructor() {
        super(
            "fetch",
            ["getData"],
            "Command to get the Addres and Compare with database.",
            "clear`\n**Options:** `<wallet>`",
            "_***Pilares - Inmortales - Moderadores***_",
            "mod"
        );
    }

    async run(bot, message, args) {
        //Eliminación del mensaje con Comandos
        message.delete().catch((O_o) => { });
        //Creación de Objetos
        const err = new Error();
        const perm = new Perms();
        const CandyData = CandyRottenVille.CandyMachine.RottenVille.NFT
        //Miembro existente
        const existMember = (
            await memberExist(message.guild.id, message.author.id)
        )[0];
        //Inicialización de Párametros Member
        const { moderatorMember } = existMember[0];
        //Insuficientes Permisos para usar el Comando
        if (moderatorMember != 1) return perm.moderatorPerms(bot, message);
        //Emoji from Map
        const emoji = synchronous.emojiID[0].afirmado;
        let rottensMember = [];
        let iteratorCount = 1;
        let arrayCount = [];
        let baseNumber = 11;
        const typeFetch = args[0];
        const member = getMember(message, args[1])
        const walletAdress = args[2];

        let initialize = [new MessageEmbed().setTitle("#1 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#2 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#3 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#4 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#5 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#6 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#7 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#8 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#9 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#10 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#11 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#12 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#13 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#14 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#15 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#16 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#18 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#19 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#20 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#21 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#22 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#23 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#24 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#25 Fetch Rottens in Wallet"), new MessageEmbed().setTitle("#26 Fetch Rottens in Wallet")]
        let [embed, embed2, embed3, embed4, embed5, embed6, embed8, embed9, embed10, embed11, embed12, embed13, embed14, embed15, embed16, embed17, embed18, embed19, embed20, embed21, embed22, embed23, embed24, embed25] = initialize;
        let embeds = [embed, embed2, embed3, embed4, embed5, embed6, embed8, embed9, embed10, embed11, embed12, embed13, embed14, embed15, embed16, embed17, embed18, embed19, embed20, embed21, embed22, embed23, embed24, embed25]


        if (typeFetch == "wallet") {
            //Solicitando Json
            var url = `https://public-api.solscan.io/account/tokens?account=${walletAdress}`;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.setRequestHeader("Accept", "application/json");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    for (let index = 0; index < JSON.parse(xhr.responseText).length; index++) {
                        CandyData.forEach((data) => {
                            if (data.token == JSON.parse(xhr.responseText)[index].tokenAddress) {
                                rottensMember.push(data.name);
                                try {
                                    arrayCount.push(parseInt(String(iteratorCount * baseNumber)[0]))
                                    arrayCount.push(parseInt(String(iteratorCount * baseNumber)[1]))  

                                    embeds.forEach((emb) => {                                        
                                        if (emb.title.includes(arrayCount[iteratorCount-1])) {
                                            emb.setDescription(`**${putEmoji(bot, emoji)} Fetching Candy Machine** actual data from <@${member.id}>`)
                                                .addField(`Wallet Member `, `**${walletAdress}**`)
                                                .addField(`${data.name}`, `**◎ ${data.token}**`, false)
                                                .addField(`Image NFT`, `**${data.image}**`, false)
                                                .setColor("#00F27F");

                                            data.attributes.forEach((att) => {
                                                emb.addField(`${att.trait_type}`, `**${att.value}**`, true);
                                            })
                                            emb.setThumbnail(`${data.image}`);
                                            emb.addField(`---`, `**---**`, false);
                                        }
                                    })
                                                                                                          
                                    iteratorCount = iteratorCount + 1;
                                } catch (error) {
                                    console.log(error)
                                }
                            }

                        })
                    }

                    embeds.forEach((emb) =>{
                      console.log(emb);
                    })

                    console.log(iteratorCount)
                    console.log(rottensMember)
                }
            };
            xhr.send();
        }

    }
}
