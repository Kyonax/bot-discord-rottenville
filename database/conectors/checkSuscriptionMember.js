
const fs = require("fs");

module.exports.checkingSuscriptions = async (member, bot) => {
 const currentDate = new Date().getTime();

  let todayDate = new Date(currentDate+0 *24*60*60*1000);
  todayDate = todayDate.toLocaleDateString();
  todayDate = todayDate.replace("/"," ");
  todayDate = todayDate.replace("/"," ");

 let _objJSONMembers = null;
  _objJSONMembers = await fs.readFileSync("./database/utils/adds/usersSuscriptions.json");
  _objJSONMembers = JSON.parse(_objJSONMembers);


  for(var member_local in _objJSONMembers) {
    if (_objJSONMembers[member_local].time.end.year === todayDate.split(' ')[2]){
      //console.log(`El Usuario ${member_local} tiene el mismo año de caducimiento: ${_objJSONMembers[member_local].time.end.year} = ${todayDate.split(' ')[2]}`)
      if (_objJSONMembers[member_local].time.end.month === todayDate.split(' ')[0]) {
        //console.log(`El Usuario ${member_local} tiene el mismo mes de caducimiento: ${_objJSONMembers[member_local].time.end.month} = ${todayDate.split(' ')[0]}`)
        if (_objJSONMembers[member_local].time.end.day === todayDate.split(' ')[1]) {
          _objJSONMembers[member_local].paid = 0;
          try {
          
            member.roles.remove("1098486568991326330");
            member.roles.remove("1098487509324939324");
            member.roles.remove("1098487966009131029");

            member.roles.remove("1098495106073514106");
            member.roles.add("1098498388963622932");
          } catch (err) {
              console.log(err);
          }
          console.log(`Usuario ${member_local} no ha renovado sub!`)
         //console.log(`El Usuario ${member_local} tiene el mismo año de caducimiento: ${_objJSONMembers[member_local].time.end.day} = ${todayDate.split(' ')[1]}`)
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
