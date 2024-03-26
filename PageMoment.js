_("StatsButton").addEventListener("click",(Event)=>{
  if(MovingStartPage===true){
  _("stats_page").style.height="100vh";
  }
});


_("statsToHome").addEventListener("click",(Event)=>{
    _("stats_page").style.height="0";
  });

_("infoIcon").addEventListener("click",()=>{
   _("info_page").style.height="100vh";
   _("info_page").style.opacity="1";
});

_("infoBack").addEventListener("click",()=>{
  _("info_page").style.height="0";
  _("info_page").style.opacity="0";
});

_("moodtohome").addEventListener("click",()=>{
  _("mode_box").style.height="0";
})
function checkTodayMoodActive(){
  if(details[currentCalanderYear.value][currentCalanderMonth.value][currentDate]==undefined){
    _("mode_box").style.height="100vh";
  }
}
checkTodayMoodActive()