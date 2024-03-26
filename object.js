let details={
  2024:{
        10:{
            7:"😊",
            2:"😊",
            3:"😊"
           }
       },
  2023:{
        10:{
            1:"😊",
            2:"😊",
            3:"😊"
           }
       }
}

function _(idName) {
  let id = document.getElementById(idName);
  return id;
}
function C(className) {
  let UserClassName = document.getElementsByClassName(idName);
  return UserClassName;
}


function getDataInStroge(){
    let strogeDetails = JSON.parse(localStorage.getItem("Details"));
    let keyss = Object.keys(strogeDetails);
    Object.entries(strogeDetails).forEach(([year,month])=>{
      details[year]={};
      Object.entries(month).forEach(([month,value])=>{
        details[year][month]=value;
      });
    });
    return details;
}
console.log(getDataInStroge());



function addYearInDetails(date,month,year){

   if(details[year]==undefined){
       details[year]={
      [month]:month={
          [date]:""
                  }
               };
   }
   else if(details[year][month]==undefined){
    details[year][month]={
            [date]:""
                }
   }
   else if(details[year][month][date]=undefined){
    details[year][month][date]=" ";
   }
}

function addOrChangeReaction(date,month,year,reaction){
   
   addYearInDetails(date,month,year);
   let newDate = date.match(/\d+/);//get only number
   details[year][month][parseInt(newDate)]=reaction;
   setDataInStorage();
   
}



function removeReaction(date,month,year){
  delete details[year][month][parseInt(date)];
}


function setDataInStorage(){
  let a =JSON.stringify(details);
  localStorage.setItem("Details",a);
}
setDataInStorage();