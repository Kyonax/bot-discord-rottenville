const fs = require("fs");
//Exportación de las Funciones
module.exports = {
  
  getMember: async function (_json_file, _member, _guild) {
    let _result = "none";
    let _jsonString;

    _jsonString = await fs.readFileSync(
      "./database/misc/GuildMembers.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );

    JSON.parse(_jsonString).forEach((_memberObject) => {
      if (
        _member === _memberObject.memberID &&
        _guild === _memberObject.guildID
      ) {
        _result = {
          guildID: _memberObject.guildID,
          memberID: _memberObject.memberID,
          memberLanguage: _memberObject.memberLanguage,
          adminMember: _memberObject.adminMember,
          inmortalMember: _memberObject.inmortalMember,
          moderatorMember: _memberObject.moderatorMember,
          serverRank: _memberObject.serverRank,
          memberXP: _memberObject.memberXP,
          memberLevel: _memberObject.memberLevel,
          memberBoost: _memberObject.memberBoost,
          boostMemberTime: _memberObject.boostMemberTime,
          warnings: _memberObject.warnings,
        };
      }
    });

    return _result;
  },
  getMemberBank: async function (_json_file, _member, _guild) {
    let _result = "none";
    let _jsonString;

    _jsonString = await fs.readFileSync(
      "./database/misc/GuildBank.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );

    JSON.parse(_jsonString).forEach((_memberObject) => {
      if (
        _member === _memberObject.memberID &&
        _guild === _memberObject.guildID
      ) {
        _result = {
          guildID: _memberObject.guildID,
          memberID: _memberObject.memberID,
          memberCoins: _memberObject.memberCoins,
        };
      }
    });

    return _result;
  },
  isVariableOnJSON: async function (_json_file, _variable, _index, _guild) {
    let _result = "not_registered";
    let type = _json_file;
    let _jsonString;

    switch (_json_file[0].memberCoins) {
      case undefined:
        type = "./database/misc/GuildMembers.json";
        break;
      default:
        type = "./database/misc/GuildBank.json";
        break;
    }

    _jsonString = await fs.readFileSync(type, "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
    });

    JSON.parse(_jsonString).forEach((variable) => {
      if (_guild == variable.guildID && _variable == variable[_index])
        _result = "registered";
    });

    return _result;
  },

  isVariableOnWeekJSON: async function (_json_file, _variable, _index, _guild) {
    let _result = "not_registered";
    let type = _json_file;
    let _jsonString;

    type = "./database/misc/GuildMembersWeek.json";

    _jsonString = await fs.readFileSync(type, "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
    });

    JSON.parse(_jsonString).forEach((variable) => {
      if (_guild == variable.guildID && _variable == variable[_index])
        _result = "registered";
    });

    return _result;
  },
  isPrefixOnJSON: async function (_json_file, _index, _guild) {
    let _result = "not_registered";
    let _jsonString;

    _jsonString = await fs.readFileSync(
      "./database/misc/GuildConfigurable.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );

    JSON.parse(_jsonString).forEach((variable) => {
      if (_guild == variable.guildID) _result = variable.cmdPrefix.toString();
    });

    return _result;
  },
  isGuildOnJSON: async function (_json_file, _json_file_configurable, _guild) {
    let _result = "not_registered",
      _result_configurable = "not_registered";
    let _jsonString, _jsonString_configurable;

    _jsonString = await fs.readFileSync(
      "./database/misc/Guild.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );

    _jsonString_configurable = await fs.readFileSync(
      "./database/misc/GuildConfigurable.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );

    JSON.parse(_jsonString_configurable).forEach((variable) => {
      if (_guild == variable.guildID) _result_configurable = "registered";
    });

    JSON.parse(_jsonString).forEach((configurable) => {
      if (_guild == configurable.guildID) _result = "registered";
    });

    return [_result, _result_configurable];
  },
  insertMemberIntoJSON: async function (_json_file, _guild, _member) {
    let _result = "not_registered";
    let _jsonString;

    try {
      _json_file.push({
        memberID: _member,
        guildID: _guild,
        memberLanguage: "es",
        adminMember: 0,
        inmortalMember: 0,
        moderatorMember: 0,
        serverRank: 0,
        memberXP: 0,
        memberLevel: 1,
        memberBoost: 1,
        boostMemberTime: 0,
        warnings: 0,
      });

      const writeData = await fs.writeFileSync(
        "./database/misc/GuildMembers.json",
        JSON.stringify(_json_file),
        (err) => {
          if (err) console.log(err);
        }
      );

      _result = "registered";
    } catch (error) {
      console.log(error);
    }
    return _result;
  },
  insertMemberBankIntoJSON: async function (_json_file, _guild, _member) {
    let _result = "not_registered";
    let _jsonString;

    try {
      _json_file.push({
        memberID: _member,
        guildID: _guild,
        memberCoins: 0,
      });

      const writeData = await fs.writeFileSync(
        "./database/misc/GuildBank.json",
        JSON.stringify(_json_file),
        (err) => {
          if (err) console.log(err);
        }
      );

      _result = "registered";
    } catch (error) {
      console.log(error);
    }
    return _result;
  },
  insertNewGuildIntoJSON: async function (
    _json_file,
    _json_file_configurable,
    _guild,
    _owner
  ) {
    let _result = "not_registered";

    try {
      _json_file.push({
        guildID: _guild,
        guildOwnerID: _owner,
      });

      _json_file_configurable.push({
        guildID: _guild,
        guildLanguage: "en",
        cmdPrefix: "!",
      });

      const writeData = await fs.writeFileSync(
        "./database/misc/Guild.json",
        JSON.stringify(_json_file),
        (err) => {
          if (err) console.log(err);
        }
      );

      const writeDataConfigurable = await fs.writeFileSync(
        "./database/misc/GuildConfigurable.json",
        JSON.stringify(_json_file_configurable),
        (err) => {
          if (err) console.log(err);
        }
      );

      _result = "registered";
    } catch (error) {
      console.log(error);
    }
    return _result;
  },
  updateGuildMemberBoostJSON: async function (
    _json_file,
    _guild,
    _member,
    _memberBoost,
    _boostMemberTime
  ) {
    let _result = "not_registered";
    let _jsonString;

    _jsonString = await fs.readFileSync(
      "./database/misc/GuildMembers.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );

    JSON.parse(_jsonString).forEach((variable) => {
      if (_guild == variable.guildID && _member == variable.memberID) {
        variable.memberBoost = _memberBoost;
        variable.boostMemberTime = _boostMemberTime;
        _result = "registered";
      }
    });

    fs.writeFile(
      "./database/misc/GuildMembers.json",
      JSON.stringify(_json_file),
      (err) => {
        if (err) console.log(err);
      }
    );

    return _result;
  },
  updateGuildMemberXPJSON: async function (
    _json_file,
    _guild,
    _member,
    _memberXP,
    _memberLevel
  ) {
    let _result = "not_registered";
    let _jsonString,
      i = 0;

    _jsonString = await fs.readFileSync(
      "./database/misc/GuildMembers.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );

    JSON.parse(_jsonString).forEach((variable) => {
      if (_guild == variable.guildID && _member == variable.memberID) {
        _json_file[i].memberXP = _memberXP;
        _json_file[i].memberLevel = _memberLevel;
        _result = "registered";
      }
      i++;
    });

    const writeData = await fs.writeFileSync(
      "./database/misc/GuildMembers.json",
      JSON.stringify(_json_file),
      (err) => {
        if (err) console.log(err);
      }
    );

    return _result;
  },
  updateGuildBankCoinsJSON: async function (
    _json_file,
    _guild,
    _member,
    _memberCoins
  ) {
    let _result = "not_registered";
    let _jsonString,
      i = 0;

    _jsonString = await fs.readFileSync(
      "./database/misc/GuildBank.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
      }
    );

    JSON.parse(_jsonString).forEach((variable) => {
      if (_guild == variable.guildID && _member == variable.memberID) {
        _json_file[i].memberCoins = _memberCoins;
        _result = "registered";
      }
      i++;
    });

    const writeData = await fs.writeFileSync(
      "./database/misc/GuildBank.json",
      JSON.stringify(_json_file),
      (err) => {
        if (err) console.log(err);
      }
    );

    return _result;
  },
};
