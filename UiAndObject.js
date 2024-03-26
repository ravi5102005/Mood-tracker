
addOrChangeReaction

let emojiAddingDate;
let emojiAddingDetails;
//this is used to get user click date id and fixed emoji box id for set emoji in calander
_("calander").addEventListener("click",(Event)=>{
  let ChoosenDate = (Event.target.textContent);
  const target = Event.target;
  if(checkValidDateForPutEmoji(ChoosenDate)){
    let emojiBox = target.childNodes[1].id;
    emojiAddingDetails=_(`${target.id}`).textContent;
    emojiAddingDate=emojiBox;
    _("userDateSetEmoji").textContent=ChoosenDate+"/"+currentCalanderMonth.value+"/"+currentCalanderYear.value;
    moveModePage(1);
  }
})


//this is used to get the clicked emoji and past the emoji in the calander
_("all_moods").addEventListener("click",(Event)=>{
  
  let startingDate = findStartingDay(currentYear,currentMonth);
  let selectedEmoji =  Event.target.textContent;
  try{
   _(`${emojiAddingDate}`).textContent=selectedEmoji;
   addOrChangeReaction(emojiAddingDetails,currentCalanderMonth.value,currentCalanderYear.value,selectedEmoji);
   moveModePage(0);
  }
  catch(error){
    document.getElementsByClassName("emojibox")[`${startingDate-1+currentDate}`].textContent=selectedEmoji;
     _("mode_box").style.height="0";
     addOrChangeReaction(`${currentDate}`,currentMonth,currentYear,selectedEmoji);
  }
  })

let TodayDate = new Date().getDate();
function checkValidDateForPutEmoji(date){

 if(date=="*"){
  return false;
 }
 else if(date>TodayDate &&
  currentCalanderMonth.value==currentMonth &&
  currentCalanderYear.value==currentYear){
  return false;
 } 
 else if(currentCalanderMonth.value>currentMonth &&
   currentCalanderYear.value==currentYear){
  return false;
 }
 else if(currentCalanderYear.value>currentYear){
  return false;
 }
 else if(date.length>7){
  return false;
 }
 else{
  return true;
 }
}

//this i sused to check the given date is already put emoji or not
let pastemoji;
function checkPastDate(date){
  try{
  if(details[currentCalanderYear.value][currentCalanderMonth.value][date]!=undefined){
    pastemoji = (details[currentCalanderYear.value][currentCalanderMonth.value][date]);
    return true;
  }
  return false;
}
catch(err){
    return false;
}
}

//this is used to set the already pasted emoji using local storage
function setPastUserEmoji(){
  for(let i=7;i<49;i++){
    let checkDate = (_(`datedox${i}`).textContent);
    if(checkDate!="*"){
       if(checkPastDate(checkDate)){
       _(`emojibox${i}0`).textContent=pastemoji;
      }
  }
  }
}
setPastUserEmoji();


//this is used to set past emojies in changind date or year time
document.querySelector(".user_inputs").addEventListener("click",()=>{
  setPastUserEmoji();
})




_("calander").addEventListener("click",(Event)=>{
  let emojiParentDate = (Event.target.parentNode.id);
 
  if((Event.target.className)=="emojibox" && _(`${(Event.target.id)}`).textContent){
    removeReaction(_(`${emojiParentDate}`).textContent.slice(0,-2),currentCalanderMonth.value,currentCalanderYear.value);
    _(`${Event.target.id}`).textContent=null;
    setDataInStorage();
  }
})

let Chartdata =  [
  { y: 450, name: "😊-#percent%" },
  { y: 120, name: "😄-#percent%" },
  { y: 300, name: "😑-#percent%" },
  { y: 800, name: "😢-#percent%" },
  { y: 150, name: "😡-#percent%" },
]

let noData = [
  { y: 0, name: "😊-#percent%" },
  { y: 0, name: "😄-#percent%" },
  { y: 0, name: "😑-#percent%" },
  { y: 0, name: "😢-#percent%" },
  { y: 0, name: "😡-#percent%" },
]
document.querySelector("#currentDate").addEventListener("click",()=>{

  createCalander(currentMonth,currentYear);
  setCurrentMonthAndYear();
  CreateEmojiBox();
  setPastUserEmoji();
  giveExtraShadowToCurrentDate();
})

let MovingStartPage=true;
//creating piechart
_("StatsButton").addEventListener("click",()=>{
  try{
  let emojilabele = ["😊","😄","😑","😢","😡"]
  let a=(Object.values(details[currentCalanderYear.value][currentCalanderMonth.value]))
 
  let count;
  for(let i=0;i<5;i++){
    count=0;
    for(let j=0;j<a.length;j++){
        if(emojilabele[i]==(a[j].trim(" "))){
          count++;
        }
    }
    Chartdata[i].y=count;
  }
  MovingStartPage=true;
  showPieChart();

  }
  catch(error){
    MovingStartPage=false;
    _("NoStats").style.transform="translateY(-100%)";
    _("NoStats").style.zIndex="4";
    setTimeout(function(){_("NoStats").style.transform="translateY(0%)";},2000)
  }
});


function showPieChart() {

  var chart = new CanvasJS.Chart("chartContainer", {
    // theme: "dark1",
    exportFileName: "Doughnut Chart",
    exportEnabled: true,
    animationEnabled: true,
    title:{
      text: "Mood"
    },
    legend:{
      cursor: "pointer",
      itemclick: explodePie
    },
    data: [{
      type: "doughnut",
      innerRadius: 90,
      showInLegend: true,
      toolTipContent: "(#percent%)",
      // indexLabel: "{name} - #percent%",
      dataPoints: Chartdata
    }]
  });
  chart.render();
  
  function explodePie (e) {
    if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();
  }
  
  }

const COURTFULLPAGE = document.getElementById("court_page");
//This function is user to clear the court page
function showCourtPage() {
  COURTFULLPAGE.style.width="0";
  COURTFULLPAGE.style.height="0";
}
setTimeout(showCourtPage,1500);