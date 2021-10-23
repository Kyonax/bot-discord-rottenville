const fs = require("fs");
module.exports = {
  addMessageToBin: function (bot, message) {},
  //TODO: Removal Items by Position
  removeMessageFromBin: function (bot, message, location, items) {
    let messages = bin[message.guild.id].users[message.author.id].messages;
    messages = messages.splice(location, items);

    fs.writeFile(
      "./database/utils/adds/bin.json",
      JSON.stringify(bin),
      (err) => {
        if (err) console.log(err);
      }
    );
  },
};
