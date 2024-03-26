const months = [ "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December", "January"];
const currentMonth=(new Date().getMonth())+1;
const currentYear=new Date().getFullYear();
let currentCalanderMonth=_("userMonth");
let currentCalanderYear=_("Year");
function _(idName) {
    let id = document.getElementById(idName);
    return id;
  }

  function C(className) {
    let UserClassName = document.getElementsByClassName(idName);
    return UserClassName;
  }
function createNewElement(number,parentName,properties){
  for(let i=0;i<number;i++){
     const ele = document.createElement(`${properties["elementName"]}`);
   if(properties["className"]!=undefined){
     ele.setAttribute("class",`${properties["className"]}`);
   }
   if(properties["idName"]!=undefined){
     ele.setAttribute("id",`${properties["idName"]}${i}`);
   }
   _(`${parentName}`).appendChild(ele);
   if(properties["content"]!=undefined){
     if(properties["idName"]!=undefined){
       _(`${properties["idName"]}${i}`).textContent=properties["content"];
     }
     else if(properties["className"]!=undefined){
         document.getElementsByClassName(`${properties["className"]}`)[i].textContent=properties["content"];
         
     }
   }
   
  }
}



let mentionday=["Su","Mo","Tu","We","Th","Fr","Sa"];


function CreateEmojiBox(){
  for(let i=7;i<49;i++){
  let eleDetails={
      elementName:"div",
      className:"emojibox",
      idName:`emojibox${i}`,
      }
    createNewElement(1,`datedox${i}`,eleDetails);
  }
}



function setDayInUi(){
  for(let i=0;i<7;i++){
    _(`datedox${i}`).textContent=mentionday[i];
  }
}

function fintTotalDays(year,month){
   let totDays = new Date(year,(month),0).getDate();
   return (totDays);
}

function findStartingDay(year,month){
   let firstDay    = new Date(year,(month-1),1);
   let dayOfWeek   = firstDay.getDay();
   return dayOfWeek;
}



function createCalander(month,year){
  let datecount = 1;
  let sDate = findStartingDay(year,month);
  let totDays = fintTotalDays(year,month);
  for(let i=7;i<49;i++){
    if(i>=(`${sDate+7}`) && datecount<=totDays){
      _(`datedox${i}`).textContent=datecount;
      datecount++;
    }
    else{
      _(`datedox${i}`).textContent="*";
    }
  }
}

let Cmonth = _("userMonth");
let Cyear = _("Year");
function setCurrentMonthAndYear(){
   Cmonth.value=currentMonth;
   Cyear.value=currentYear;
}

function intial(){
let eleDetails={
  elementName:"div",
  className:"datedox",
  idName:"datedox",
  }
createNewElement(49,"calander",eleDetails);
setDayInUi();
setCurrentMonthAndYear();
createCalander(currentMonth,currentYear);
CreateEmojiBox();
}
intial();



function changeMonth(month){
createCalander(month,`${currentCalanderYear.value}`)
CreateEmojiBox();
giveExtraShadowToCurrentDate();
}

let userGivenYear = _("Year");
function changeYear(year){
  if((+year)>=1 && (+year)<1000000){
    createCalander(`${currentCalanderMonth.value}`,year);
    CreateEmojiBox();
    giveExtraShadowToCurrentDate();
  }
  else{
    userGivenYear.value=currentYear;
    createCalander(currentMonth,currentYear);
    CreateEmojiBox();
    giveExtraShadowToCurrentDate();
  }
}

let scaleValue=0;
function scaleMoodEmoji(){
  if(scaleValue==0){
  for(let i=1;i<6;i++){
    _(`mood${i}`).style.scale="1";
   
  }
  scaleValue=1;
  }
  else{
    for(let i=1;i<6;i++){
      _(`mood${i}`).style.scale="1.2";
    }
    scaleValue=0;
  }
}
setInterval(scaleMoodEmoji,1000);

function moveModePage(value){
  if(value==0){
    _("mode_box").style.height="0";
  }
  else{
    _("mode_box").style.height="100vh";
  }
}



function changeDayBox(){
  for(let i=0;i<7;i++){
    _(`datedox${i}`).setAttribute("class","dayStyle")
  }
}
changeDayBox();

let currentDate = new Date().getDate();
function giveExtraShadowToCurrentDate(){
 for(let i=7;i<49;i++){
_(`datedox${i}`).style.boxShadow="1px 1px 5px rgba(8, 100, 105,18%)";
 if(currentCalanderMonth.value==currentMonth && currentCalanderYear.value==currentYear && _(`datedox${i}`).textContent.includes(currentDate)){
  _(`datedox${i}`).style.boxShadow="-2px -2px 1px rgba(0,0,0,0.5) , 2px 2px 1px rgba(0,0,0,0.5)";
 }
}
}
giveExtraShadowToCurrentDate();


_("userDateSetEmoji").textContent=`${currentDate}`+"/"+`${currentMonth}`+"/"+`${currentYear}`;