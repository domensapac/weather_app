//var placeNameTxt; 
//var municipalityTxt; 
//var elevationTxt; 
//var latitudeTxt;
//var longitudeTxt; 
var contentArea; 
var weatherForm; 
var placeInput;
var placeDisplay; 
var placeNameForDisplay; 
var locationIcon; 
var tempDisplay; 
var otherDisplay;
var appTempDisplay; 
var cardElements; 
var dailyView; 
var hourlyView; 
var hourlyCards; 
var backBtn; 
var locationIcon; 
var inputContainer; 
var mainContainer; 
var placeOptions; 

window.onload = () =>{
    //placeNameTxt = document.getElementById("placeName"); 
    //municipalityTxt = document.getElementById("municipality"); 
    //elevationTxt = document.getElementById("elevation");
    //latitudeTxt = document.getElementById("latitude");
    //longitudeTxt = document.getElementById("longitude");
    contentArea = document.getElementById("contentArea");
    weatherForm = document.getElementById("weatherForm"); 
    placeInput = document.getElementById("placeInput"); 
    placeDisplay = document.getElementById("placeDisplay"); 
    locationIcon = document.getElementById("locationIcon"); 
    tempDisplay = document.getElementById("tempDisplay"); 
    otherDisplay = document.getElementById("otherDisplay"); 
    appTempDisplay = document.getElementById("appTempDisplay"); 
    cardElements = document.getElementsByClassName("card"); 
    dailyView = document.getElementById("dailyView"); 
    hourlyView = document.getElementById("hourlyView"); 
    backBtn = document.getElementById("backBtn"); 
    hourlyCards = document.getElementById("hourlyCards"); 
    inputContainer = document.getElementById("inputContainer"); 
    mainContainer = document.getElementById("mainContainer"); 
    mainContainer.setAttribute("style", "display: none !important"); 
    placeOptions = document.getElementById("placeOptions");
    //getCoords(); 

    weatherForm.addEventListener('submit', function(event){
        event.preventDefault();
        const placeName = placeInput.value;
        getCoords(placeName);
        placeInput.value = "";
        //inputContainer.setAttribute("style", "display: none !important"); 
        //mainContainer.setAttribute("style", "display: flex !important"); 

    }); 
    

    backBtn.addEventListener('click', () =>{
        hourlyView.setAttribute("style", "display:none"); 
        dailyView.setAttribute("style", "display:flex"); 
    }); 

}; 

async function getCoords(name){ //dobimo koordinate kraja
    try{
        const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`
        const response = await fetch(apiUrl);

        if(!response.ok){
            throw new Error(`Connection error: ${response.status}`);
        }

        let data = await response.json(); 
        if(data.results.length == 1){
            placeNameForDisplay= data.results[0].name + ', ' + data.results[0].country;
            getData(
            data.results[0].latitude,
            data.results[0].longitude)
        }
        else{               
            pickLocation(data);
        }

        console.log(data);
        /*getData(
        data.results[0].latitude,
        data.results[0].longitude)
        */
    
    }catch(error){
        console.error("Prišlo je do napake:", error);
        alert("Cant find this place. Try again");  
        location.reload(); 
    }
}

function getFlagEmoji(countryCode) {
    if (!countryCode) return "📍"; 

    return countryCode
        .toUpperCase()
        .replace(/./g, (char) => 
            String.fromCodePoint(char.charCodeAt(0) + 127397)
        );
}

function pickLocation(data){
    placeOptions.innerHTML = "";
    for(let i=0; i<data.results.length; i++){
        let element = document.createElement("div"); 
        const flag = getFlagEmoji(data.results[i].country_code);

        element.innerHTML = `${flag} ${data.results[i].name}, ${data.results[i].admin1}`;
        element.setAttribute("id", i);
        element.addEventListener('click', ()=>{
            let clickedID= event.currentTarget.id;
            console.log(clickedID);
            placeNameForDisplay= data.results[clickedID].name + ', ' + data.results[clickedID].country;
            getData(
                data.results[clickedID].latitude,
                data.results[clickedID].longitude)
        });
        placeOptions.appendChild(element); 
    }
}

async function getData(latitude, longitude){ //dobimo podatke za kraj
    dailyView.innerHTML = "<div class='d-flex justify-content-center'><div class='spinner-border' role='status'><span class='visually-hidden'>Loading...</span></div></div>" ; 
    
    try{
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,is_day&current=temperature_2m,is_day,apparent_temperature,wind_speed_10m,relative_humidity_2m,rain,precipitation,surface_pressure&timezone=Europe%2FBerlin&forecast_days=7`; 
        const response = await fetch(apiUrl);

        if(!response.ok){
            throw new Error(`Connection error: ${response.status}`);
        }

        inputContainer.setAttribute("style", "display: none !important"); 
        mainContainer.setAttribute("style", "display: flex !important"); 

        let data = await response.json(); 
        outputDataConsole(data); 
        displayData(data);
    }catch (error){
        console.error("Prišlo je do napake:", error);
                
        dailyView.innerHTML = `
            <div class="alert alert-danger text-center" role="alert">
                <i class="fa-solid fa-triangle-exclamation"></i> 
                Error.
            </div>`;
    }
}

function updateText(placeName, municipality, elevation, latitude, longitude){
    placeNameTxt.textContent = "Kraj: " + placeName; 
    municipalityTxt.textContent = "Občina: " + municipality; 
    elevationTxt.textContent = "Nadmorska: " + elevation; 
    latitudeTxt.textContent = "Latitude: " + latitude; 
    longitudeTxt.textContent = "Longitude: " + longitude; 
}

function outputDataConsole(data){
    const dataHourly = data.hourly; 
    const currDate = new Date(); 
    for(var i=0; i< dataHourly.temperature_2m.length ; i++){ 
        const forecastDate = new Date(dataHourly.time[i]); 
        if (forecastDate >= currDate) {
            //console.log(dataHourly.time[i] + " : " + dataHourly.temperature_2m[i]); 
        }
    }
}

function writeTopLeft(name, temperature, apparent, unit){
    placeDisplay.innerHTML = ` <i class="fa-solid fa-location-dot me-2" id='locationIcon'></i><span>${name}</span>`;
    tempDisplay.innerHTML = `<span > ${temperature} ${unit}</span>`
    appTempDisplay.innerHTML =  `<span> Feels like ${apparent} ${unit} </span>`; 

    placeDisplay.addEventListener('click', changeLocation);
}

function writeTopRight(humidity, windSpeed, pressure, pressureUnit, unitHumidity, unitWind){
    otherDisplay.innerHTML = `<div class='mt-2'> <div class='infoText'> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-droplets-icon lucide-droplets"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg><span> Humidity </span> </div> <span class='infoTextValue'> ${humidity} ${unitHumidity}</span> </div>
   <div class='mt-4 mb-4'> <div class='infoText'> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wind-icon lucide-wind"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/></svg><span> Wind speed </span> </div> <span class='infoTextValue'>${windSpeed} ${unitWind}</span> </div>
   <div class='mt-4 mb-4'> <div class='infoText'> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wind-arrow-down-icon lucide-wind-arrow-down"><path d="M10 2v8"/><path d="M12.8 21.6A2 2 0 1 0 14 18H2"/><path d="M17.5 10a2.5 2.5 0 1 1 2 4H2"/><path d="m6 6 4 4 4-4"/></svg><span> Air pressure </span></div> <span class='infoTextValue'> ${pressure} ${pressureUnit}</span> </div>`;

}

const getIcon= (code, isDay) =>{

    if(isDay == 0 && (code == 0 || code == 1) ){
        return "moon.png";
    }
    if(isDay == 0 && code == 2){
        return "cloudy_moon.png";
    }
    const icons = {
        0: "sun.png",
        1: "cloudy.png",
        2: "cloudy_fully.png",
        3: "fog.png",
        4: "light_rainy.png",
        5: "rainy.png",
        6: "snowy.png",
        7: "thunderstorm.png",
    };
    return icons[code];
};

function proccessWeatherCode(weatherCode){
    var pictureCode;
    if(weatherCode == 0 || weatherCode == 1)
    {
        pictureCode=0;
    }
    else if(weatherCode == 2){
        pictureCode=1;
    }
    else if(weatherCode == 3){
        pictureCode=2;
    }
    else if(weatherCode == 45 || weatherCode == 48){
        pictureCode=3;
    }
    else if(weatherCode >= 51 && weatherCode<= 61 || weatherCode == 80 || weatherCode == 81){
        pictureCode=4;
    }
    else if((weatherCode == 82) || weatherCode == 63){
        pictureCode=5;
    }
    else if((weatherCode >= 71 && weatherCode<= 77) || weatherCode == 85 || weatherCode == 86){
        pictureCode=6;
    }
    else if(weatherCode>= 95 && weatherCode<100){
        pictureCode=7;
    }
    return pictureCode;
}

function writeBottom(dataDaily, uniqueDays, days, data){
    for(var i=0; i<7; i++){
        var d= new Date(uniqueDays[i]); 
        var dayName = days[d.getDay()]; 
        var element = document.createElement("div"); 
        element.innerHTML = `<div class='card-body'> <h5 class='card-title'> ${dayName}</h5> <p class='card-text'> ${dataDaily.temperature_2m_max[i]} / ${dataDaily.temperature_2m_min[i] }${data.hourly_units.temperature_2m} </p> <img alt='picture' src='images/${getIcon(proccessWeatherCode(data.daily.weather_code[i]), 1)}' class='img-fluid weatherIcon' > </div>`; 
        element.setAttribute("class", "card text-center mb-3"); 
        element.setAttribute("id", i); 
        element.style.minWidth = "120px";
        element.addEventListener('click', () =>{
            const clickedID = event.currentTarget.id; 
            displayHourlyData(data, uniqueDays, clickedID); 
        }); 
        dailyView.appendChild(element); 
    }
}

function displayData(data){
    dailyView.innerHTML = ""; 
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dataHourly = data.hourly; 
    const dataDaily = data.daily;
    const dataCurr = data.current;

    var arrDays = new Set();
    console.log(data); 
    for(var i=0; i< dataHourly.time.length ; i++){
        let dateTime = dataHourly.time[i].split("T")[0] ; 
        arrDays.add(dateTime); 
    }
    const uniqueDays = Array.from(arrDays); // TEGA UPORABLJAS 
    console.log(uniqueDays); 

    writeTopLeft(placeNameForDisplay, dataCurr.temperature_2m, dataCurr.apparent_temperature, data.hourly_units.temperature_2m); // IZPIŠE LEVI ZGORNJI DEL 
    writeBottom(dataDaily, uniqueDays, days ,data); //IZPIŠE GLAVNI DEL SPODAJ 
    writeTopRight(dataCurr.relative_humidity_2m, dataCurr.wind_speed_10m,dataCurr.surface_pressure, data.current_units.surface_pressure, data.current_units.relative_humidity_2m, data.current_units.wind_speed_10m);
}

function displayHourlyData(data, uniqueDays, index){
    var selectedDate = uniqueDays[index]; 
    dailyView.setAttribute("style", "display:none !important"); 
    hourlyView.setAttribute("style", "display:flex"); 
    writeHourlyCards(data, selectedDate, index); 
}

function writeHourlyCards(data, selectedDate, dateIndex){
    let dayIndex= -1; 
    let index= -1; 
    for(var i=0; i<data.hourly.time.length; i++){
        if(selectedDate == data.hourly.time[i].split("T")[0]){
            dayIndex = i ;
            break;
        }
    }

    hourlyCards.innerHTML = " "; 
    hourlyCards.scrollLeft = 0; 
    dailyView.scrollLeft = 0; 
    if(dateIndex!=0 && dateIndex>0){
        for(var i=0; i<12; i++){
            index= dayIndex + i*2; 
            var element = document.createElement("div");        
            element.innerHTML = `<div class='card-body'> <h5 class='card-title'> ${data.hourly.time[index].split("T")[1]}</h5> <p class='card-text'> ${data.hourly.temperature_2m[index]}${data.hourly_units.temperature_2m} </p> <img alt='picture' src='images/${getIcon(proccessWeatherCode(data.hourly.weather_code[index]),data.hourly.is_day[index] )}' class='img-fluid weatherIcon' > </div>`; 
            element.setAttribute("class", "card text-center mb-3"); 
            element.style.minWidth = "120px";
            hourlyCards.appendChild(element); 
        }
    }
    else if(dateIndex == 0){
        let current = new Date(); 
        let currentHour = current.getHours()+1; 
        console.log((24-currentHour)/2); 
        for(var i=0; i< (24-currentHour)/2; i++){
            index= currentHour + i*2; 
            var element = document.createElement("div");        
            element.innerHTML = `<div class='card-body'> <h5 class='card-title'> ${data.hourly.time[index].split("T")[1]}</h5> <p class='card-text'> ${data.hourly.temperature_2m[index]}${data.hourly_units.temperature_2m} </p> <img alt='picture' src='images/${getIcon(proccessWeatherCode(data.hourly.weather_code[index]),data.hourly.is_day[index] )}' class='img-fluid weatherIcon' > </div>`; 
            element.setAttribute("class", "card text-center mb-3"); 
            element.style.minWidth = "120px";
            hourlyCards.appendChild(element); 
        }
    }
}

function changeLocation(){
    inputContainer.setAttribute("style", "display: flex !important"); 
    placeOptions.innerHTML = ""; 
    mainContainer.setAttribute("style", "display: none !important"); 
}


