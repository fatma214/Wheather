
var locationInput=document.getElementById("locationInput");
var btnFind=document.getElementById("btnFind");
var nameOFCountry=document.getElementById("name");
var date=document.getElementById("date");
var day=document.getElementById("day");
var tempC=document.getElementById("tempC")
var weatherCondition=document.getElementById('weatherCondition');
var iconImg=document.getElementById('iconImg');
var tomorrowTemp=document.getElementById("tomorrowmaxtemp_c");
var tomorrowmintemp_c=document.getElementById("tomorrowmintemp_c");
var tomorrowImg=document.getElementById("tomorrowImg");
var thirdDayMax=document.getElementById("thirdDayMax");
var thirdDayMin=document.getElementById("thirdDayMin");
var thirdDayImg=document.getElementById("thirdDayImg");
var tomorrowText=document.getElementById('tomorrowText');
var thirdDayText=document.getElementById("thirdDayText");
var tomorrowHeader=document.getElementById("tomorrowHeader");
var thirdDayHeader=document.getElementById("thirdDayHeader");

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var object={};

function reqServer(x){
        var httpReq=new XMLHttpRequest;
        httpReq.open("GET",`http://api.weatherapi.com/v1/forecast.json?key=fe4e3366237344a2aed101300232102&q=${x}&days=3`)
        httpReq.send();
        httpReq.addEventListener("readystatechange",function(){
        if(httpReq.readyState==4){
            object=JSON.parse(httpReq.response);
            displayToday();
            displayTomorrow();
            displayThirdDay();
            }
        })   
     
}
reqServer("cairo");

locationInput.addEventListener("keyup",function(){
    reqServer(locationInput.value)
}
)

function displayToday(){
    nameOFCountry.innerHTML=object.location.name;
    let d=object.location.localtime;
    let dateObj=new Date(d);
    let monthName=months[dateObj.getMonth()];
    let currentDay = dateObj.toLocaleDateString("local",{weekday:'long'})
    date.innerHTML=object.location.localtime.slice(8,10)+monthName;
    day.innerHTML=currentDay;
    weatherCondition.innerHTML=object.current.condition.text
    weatherCondition.innerHTML=object.current.condition.text
    tempC.innerHTML=object.current.temp_c;
    iconImg.setAttribute("src",`${object.current.condition.icon}`)
}

function displayTomorrow(){
    tomorrowTemp.innerHTML=object.forecast.forecastday[1].day.maxtemp_c;
    tomorrowmintemp_c.innerHTML=object.forecast.forecastday[1].day.mintemp_c;
    tomorrowText.innerHTML=object.forecast.forecastday[1].day.condition.text;
    tomorrowImg.setAttribute("src",`${object.forecast.forecastday[1].day.condition.icon}`);
    let d=object.forecast.forecastday[1].date;
    let dateObj=new Date(d);
    let currentDay = dateObj.toLocaleDateString("local",{weekday:'long'});
    tomorrowHeader.innerHTML=currentDay;
}
function displayThirdDay(){
    thirdDayMax.innerHTML=object.forecast.forecastday[2].day.maxtemp_c;
    thirdDayMin.innerHTML=object.forecast.forecastday[2].day.mintemp_c;
    thirdDayText.innerHTML=object.forecast.forecastday[2].day.condition.text;
    thirdDayImg.setAttribute("src",`${object.forecast.forecastday[2].day.condition.icon}`);
    let d=object.forecast.forecastday[2].date;
    let dateObj=new Date(d);
    let currentDay = dateObj.toLocaleDateString("local",{weekday:'long'});
    thirdDayHeader.innerHTML=currentDay;
}


























