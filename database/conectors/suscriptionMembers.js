const fs = require("fs");

module.exports.suscriptionAdd = async (member, bot, role) => {
  const currentDate = new Date().getTime(), daysOfSuscription = 31;

  let joinedAt = new Date(currentDate+0 *24*60*60*1000);
  joinedAt = joinedAt.toLocaleDateString();
  joinedAt = joinedAt.replace("/"," ");
  joinedAt = joinedAt.replace("/"," ");
  let endAt = new Date(currentDate+daysOfSuscription *24*60*60*1000);
  endAt = endAt.toLocaleDateString();
  endAt = endAt.replace("/", " ");
  endAt = endAt.replace("/", " ");

 // console.log(`Joined At: M:${joinedAt.split(' ')[0]}|D:${joinedAt.split(' ')[1]}|Y:${joinedAt.split(' ')[2]}`);
 // console.log(`End At: M:${endAt.split(' ')[0]}|D:${endAt.split(' ')[1]}|Y:${endAt.split(' ')[2]}`)


 let _objJSONMembers = null, inDatabase = 0;
  _objJSONMembers = await fs.readFileSync("./database/utils/adds/usersSuscriptions.json");
  _objJSONMembers = JSON.parse(_objJSONMembers);

  for(var member_local in _objJSONMembers) {
    if(member.user.id === member_local){
      inDatabase = 1;
    }
  }

  if(inDatabase === 0){

    _objJSONMembers[member.user.id] = {
      "type": role.id,
      "paid": 1,
      "time": {
        "join": {
          "month": joinedAt.split(' ')[0],
          "day": joinedAt.split(' ')[1],
          "year": joinedAt.split(' ')[2],
        },
        "end": {
          "month": endAt.split(' ')[0],
          "day": endAt.split(' ')[1],
          "year": endAt.split(' ')[2],
        }

      }
    }
  }


    try{
      const writeData = await fs.writeFileSync("./database/utils/adds/usersSuscriptions.json", JSON.stringify(_objJSONMembers), (err) => {
        if (err) console.log(err);
      })
    }catch (error) {
      console.log(error)
    }

}
