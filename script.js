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
    //getCoords(); 

    weatherForm.addEventListener('submit', function(event){
        event.preventDefault();
        const placeName = placeInput.value;
        getCoords(placeName);
        placeInput.value = "";
    }); 

    backBtn.addEventListener('click', () =>{
        hourlyView.setAttribute("style", "display:none"); 
        dailyView.setAttribute("style", "display:flex"); 
    }); 
}; 




async function getCoords(name){ //dobimo koordinate kraja
    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`
    const response = await fetch(apiUrl);
    let data = await response.json(); 
    placeNameForDisplay= data.results[0].name + ', ' + data.results[0].country;

    /*updateText(
        data.results[0].name,
        data.results[0].admin1,
        data.results[0].elevation,
        data.results[0].latitude,
        data.results[0].longitude,
    )
    */

    getData(
        data.results[0].latitude,
        data.results[0].longitude,
    )
}

async function getData(latitude, longitude){ //dobimo podatke za kraj
    dailyView.innerHTML = "<div class='d-flex justify-content-center'><div class='spinner-border' role='status'><span class='visually-hidden'>Loading...</span></div></div>" ; 
    const latVal = latitude; 
    const lonVal = longitude;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latVal}&longitude=${lonVal}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,precipitation_probability,precipitation,weather_code&current=temperature_2m,is_day,apparent_temperature,wind_speed_10m,relative_humidity_2m,rain,precipitation,surface_pressure&timezone=Europe%2FBerlin&forecast_days=7`; 
    const response = await fetch(apiUrl); 
    let data = await response.json(); 
    outputDataConsole(data); 
    displayData(data);
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
    placeDisplay.innerHTML = ` <i class='fa-solid fa-location-crosshairs'></i> <span > ${name} </span>`;
    tempDisplay.innerHTML = `<span > ${temperature} ${unit}</span>`
    appTempDisplay.innerHTML =  `<span> Feels like ${apparent} ${unit} </span>`; 

}

function writeTopRight(humidity, windSpeed, pressure, pressureUnit, unitHumidity, unitWind){
    otherDisplay.innerHTML = `<div class='mt-2'><i class="fa-solid fa-droplet"></i> <span> Humidity: ${humidity} ${unitHumidity}</span> </div>
   <div class='mt-2'> <i class="fa-solid fa-wind"></i> <span> Wind speed: ${windSpeed} ${unitWind}</span> </div>
   <div class='mt-2'><i class="fa-brands fa-cloudflare"></i><span> ${pressure} ${pressureUnit}</span> </div>`;

}

function writeBottom(dataDaily, uniqueDays, days, data){
    const getIcon= (code) =>{
        const icons = {
            0: "sun.png",
            1: "cloudy.png",
            2: "cloudy_fully.png",
            3: "fog.png",
            4: "light_rainy.png",
            5: "rainy.png",
            6: "snowy.png",
            7: "thunderstorm.png"
        };
        return icons[code];
    };
    var weatherCode;
    
    for(var i=0; i<7; i++){
        if(dataDaily.weather_code[i] == 0 || dataDaily.weather_code[i] == 1){
            weatherCode=0;
        }
        else if(dataDaily.weather_code[i] == 2){
            weatherCode=1;
        }
        else if(dataDaily.weather_code[i] ==3){
            weatherCode=2;
        }
        else if(dataDaily.weather_code[i]>=45 && dataDaily.weather_code[i]<50){
            weatherCode=3;
        }
        else if(dataDaily.weather_code[i] >50 && dataDaily.weather_code[i]<= 61){
            weatherCode=4;
        }
        else if((dataDaily.weather_code[i]>61 && dataDaily.weather_code[i]<70) || (dataDaily.weather_code[i]>=80 && dataDaily.weather_code[i]<=82)){
            weatherCode=5;
        }
        else if( (dataDaily.weather_code[i] > 70 && dataDaily.weather_code[i]< 80) || dataDaily.weather_code[i] == 86 || dataDaily.weather_code[i] ==85){
            weatherCode=6;
        }
        else if(dataDaily.weather_code[i]>= 95 && dataDaily.weather_code[i]<100){
            weatherCode=7;
        }

        var d= new Date(uniqueDays[i]); 
        var dayName = days[d.getDay()]; 
        var element = document.createElement("div"); 
        element.innerHTML = `<div class='card-body'> <h5 class='card-title'> ${dayName}</h5> <p class='card-text'> ${dataDaily.temperature_2m_max[i]} / ${dataDaily.temperature_2m_min[i] }${data.hourly_units.temperature_2m} </p> <img alt='picture' src='images/${getIcon(weatherCode)}' class='img-fluid weatherIcon' > </div>`; 
        element.setAttribute("class", "card text-center mb-3"); 
        element.setAttribute("id", i); 
        element.setAttribute("style", "width:12rem");
        element.addEventListener('click', () =>{
            const clickedID = event.currentTarget.id; 
            displayHourlyData(data, uniqueDays, clickedID); 
        }); 
        weatherForm.setAttribute("style", "visibility:hidden"); 
        dailyView.appendChild(element); 
        console.log(weatherCode);
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
    if(index!=0){ // ZA DANES JE LOGIKA DRUGAČNA
        writeDailyCards(data, selectedDate); 
    }

}

function writeDailyCards(dataHourly, date){
    hourlyCards.innerHTML = " "; 
    for(var i=0; i<9; i++){
        var element = document.createElement("div"); 
        element.innerHTML = `<div class='card-body'> <h5 class='card-title'> ${i}</h5> <p class='card-text'> ${i} / ${i }${i} </p> <img alt='picture' src='images/' class='img-fluid weatherIcon' > </div>`; 
        element.setAttribute("class", "card text-center mb-3"); 
        element.setAttribute("style", "width:12rem");
        hourlyCards.appendChild(element); 
    }
}



