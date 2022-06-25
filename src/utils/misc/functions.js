//Importación Functions de Database
const { updateGuildServerRank, updateGuildRolePlayRank } = require("../database/functions");
const Api = require("./api_discord_functions");
const Path = require("path");
const Axios = require("axios");

PNG = require("pngjs").PNG;
var fs = require("fs"),
  gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });
//Exportación de las Funciones Generales
module.exports = {
  getMember: function (message, toFind = "") {
    toFind = toFind.toLowerCase();
    let target = message.guild.members.cache.get(toFind);

    if (!target && message.mentions.members)
      target = message.mentions.members.first();

    if (!target && toFind) {
      target = message.guild.members.cache.find((member) => {
        return (
          member.displayName.toLowerCase().includes(toFind) ||
          member.user.tag.toLowerCase().includes(toFind)
        );
      });
    }
    if (!target) target = message.member;
    return target;
  },
  formatDate: function (date) {
    return new Intl.DateTimeFormat("es-CO").format(date);
  },
  putEmoji: function (bot, emoji) {
    return bot.emojis.cache.get(emoji).toString();
  },
  attachIsImagePNG: function (msgAttach) {
    var url = msgAttach.url;
    return url.indexOf("png", url.length - "png".length) !== -1;
  },
  attachIsImageJPG: function (msgAttach) {
    var url = msgAttach.url;
    return url.indexOf("jpg", url.length - "jpg".length) !== -1;
  },
  attachIsImageJPEG: function (msgAttach) {
    var url = msgAttach.url;
    return url.indexOf("jpeg", url.length - "jpeg".length) !== -1;
  },
  wait: function (ms) {
    var d = new Date();
    var d2 = null;
    do {
      d2 = new Date();
    } while (d2 - d < ms);
  },
  downloadUser: async function (imageUrl, name) {
    console.log("DOING STUFF COOKING")
    const url = imageUrl;
    const path = Path.resolve(
      __dirname,
      "",
      `../../../database/multimedia/images/users/avatar/${name}.png`
    );
    const response = await Axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    response.data.pipe(fs.createWriteStream(path));

    return new Promise((resolve, reject) => {
      response.data.on("end", () => {
        resolve();
      });

      response.data.on("error", (err) => {
        reject(err);
      });
    });
  },
  circleImage: async function (inImage, name) {
    fs.createReadStream(__dirname + inImage)
      .pipe(
        new PNG({
          filterType: 4,
        })
      )
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            var radius = this.height / 2;
            if (
              y >=
              Math.sqrt(Math.pow(radius, 2) - Math.pow(x - radius, 2)) +
              radius ||
              y <=
              -Math.sqrt(Math.pow(radius, 2) - Math.pow(x - radius, 2)) +
              radius
            ) {
              this.data[idx + 3] = 0;
            }
          }
        }
        this.pack().pipe(
          fs.createWriteStream(
            __dirname +
            `/database/multimedia/images/users/circleAvatar/${name}CircleImage.png`
          )
        );
      });
  },
  resizeImage: async function (name) {
    gm(`database/multimedia/images/users/circleAvatar/${name}CircleImage.png`)
      .resize(198, 198)
      .write(
        `database/multimedia/images/users/circleAvatar/${name}CircleImageR.png`,
        function (err) {
          if (err) console.log("Error!: " + err);
        }
      );
  },
  delay: function (t, v) {
    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, v), t);
    });
  },
  searchUser: function (bot, id) {
    return bot.users.cache.get(id).toString();
  },
  searchTextChannel: function (bot, id) {
    return bot.channels.cache.get(id).toString();
  },
  replaceRoleItems: function (role) {
    role = role.replace("-", "");
    role = role.replace(">", "");
    role = role.replace("<", "");
    role = role.replace("@", "");
    role = role.replace("&", "");
    return role;
  },
  replaceUserItemsMention: function (user) {
    user = user.replace("<", "");
    user = user.replace("!", "");
    user = user.replace("@", "");
    user = user.replace(">", "");
    return user;
  },
  numberWithCommas: function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  initObjectMember: function (guilds, objectMember, guildID, memberID) {
    const arrayMembers = guilds.get(guildID).Member;
    for (let index = 0; index < arrayMembers.length; index++) {
      if (arrayMembers[index].memberID === memberID) {
        objectMember = arrayMembers[index];
      }
    }
    return objectMember;
  },
  deleteObjectMember: function (guilds, guildID, memberID) {
    const arrayMembers = guilds.get(guildID).Member;
    for (let index = 0; index < arrayMembers.length; index++) {
      if (arrayMembers[index].memberID === memberID) {
        arrayMembers.splice(arrayMembers.indexOf(arrayMembers[index]), 1);
      }
    }
  },
  sortServerRanksJSON: async function (_json_file, usersRank, _guild, message) {

    

    let _jsonString, i = 0


    _jsonString = await fs.readFileSync('./database/misc/GuildMembers.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }
    })

    JSON.parse(_jsonString).forEach(variable => {
      if (_guild == variable.guildID) {
        usersRank.push({
          "memberXP": variable.memberXP,
          "memberID": variable.memberID
        });
      }
    });

    _json_file = JSON.parse(_jsonString);

    usersRank.sort(function (a, b) {
      if (parseInt(a.memberXP) < parseInt(b.memberXP)) {
        return 1;
      }
      if (parseInt(a.memberXP) > parseInt(b.memberXP)) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    _json_file.forEach(variable => {
      i = 0
      usersRank.forEach(rank => {
        if (variable.memberID === rank.memberID) {
          variable.serverRank = i + 1
        }
        i++
      });
    });

    const writeData = await fs.writeFileSync(
      "./database/misc/GuildMembers.json",
      JSON.stringify(_json_file),
      (err) => {
        if (err) console.log(err);
      }
    );

  },
  sortServerRanks: function (usersRank, guilds, message, StateManager) {
    const arrayMembers = guilds.get(message.guild.id).Member;
    for (let index = 0; index < arrayMembers.length; index++) {
      usersRank.push(arrayMembers[index].memberXP);
    }
    usersRank.sort((a, b) => b - a);
    for (let i = 0; i < usersRank.length; i++) {
      for (let index = 0; index < arrayMembers.length; index++) {
        if (parseInt(arrayMembers[index].memberXP) === parseInt(usersRank[i])) {
          arrayMembers[index].serverRank = i + 1;
          updateGuildServerRank(
            arrayMembers[index].guildID,
            arrayMembers[index].memberID,
            i + 1
          );
          StateManager.emit(
            "updateServerRank",
            arrayMembers[index].guildID,
            arrayMembers[index].memberID,
            arrayMembers[index].serverRank,
            i + 1
          );
        }
      }
    }
  },
  sortRolePlayRanks: function (usersRank, guilds, message, StateManager) {
    const arrayMembers = guilds.get(message.guild.id).Member;
    for (let index = 0; index < arrayMembers.length; index++) {
      usersRank.push(arrayMembers[index].memberXP);
    }
    usersRank.sort((a, b) => b - a);
    for (let i = 0; i < usersRank.length; i++) {
      for (let index = 0; index < arrayMembers.length; index++) {
        if (parseInt(arrayMembers[index].memberXP) === parseInt(usersRank[i])) {
          arrayMembers[index].rolePlayRank = i + 1;
          updateGuildRolePlayRank(
            arrayMembers[index].guildID,
            arrayMembers[index].memberID,
            i + 1
          );
          StateManager.emit(
            "updateRolePlayRank",
            arrayMembers[index].guildID,
            arrayMembers[index].memberID,
            arrayMembers[index].rolePlayRank,
            i + 1
          );
        }
      }
    }
  },
};
