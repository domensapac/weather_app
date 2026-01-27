var placeNameTxt; 
var municipalityTxt; 
var elevationTxt; 
var latitudeTxt;
var longitudeTxt; 
var contentArea; 

window.onload = () =>{
    placeNameTxt = document.getElementById("placeName"); 
    municipalityTxt = document.getElementById("municipality"); 
    elevationTxt = document.getElementById("elevation");
    latitudeTxt = document.getElementById("latitude");
    longitudeTxt = document.getElementById("longitude");
    contentArea = document.getElementById("contentArea"); 
    getCoords(); 
}; 

async function getCoords(){ //dobimo koordinate kraja
    const name = 'Kranjska Gora'; 
    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`
    const response = await fetch(apiUrl);
    let data = await response.json(); 
    updateText(
        data.results[0].name,
        data.results[0].admin1,
        data.results[0].elevation,
        data.results[0].latitude,
        data.results[0].longitude,
    )

    getData(
        data.results[0].latitude,
        data.results[0].longitude,
    )
}

async function getData(latitude, longitude){ //dobimo podatke za kraj
    const latVal = latitude; 
    const lonVal = longitude;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latVal}&longitude=${lonVal}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,precipitation_probability,precipitation,weather_code&current=temperature_2m,precipitation,is_day,apparent_temperature&timezone=Europe%2FBerlin`; 
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

function displayData(data){
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

    for(var i=0; i<7; i++){
        if(dataDaily.weather_code[i] == 0){
            console.log("sonce"); 
        }
        else if(dataDaily.weather_code[i] <10 && dataDaily.weather_code[i]>0){
            console.log("partly cloudy"); 
        }
        else if(dataDaily.weather_code[i]>=45 && dataDaily.weather_code[i]<50){
            console.log("megla");
        }
        else if(dataDaily.weather_code[i] >50 && dataDaily.weather_code[i]<= 61){
            console.log("rosa / rahel dež"); 
        }
        else if((dataDaily.weather_code[i]>61 && dataDaily.weather_code[i]<70) || (dataDaily.weather_code[i]>=80 && dataDaily.weather_code[i]<=82)){
            console.log("dež");
        }
        else if( (dataDaily.weather_code[i] > 70 && dataDaily.weather_code[i]< 80) || dataDaily.weather_code[i] == 86 || dataDaily.weather_code[i] ==85){
            console.log("sneg");
        }
        else if(dataDaily.weather_code[i]>= 95 && dataDaily.weather_code[i]<100){
            console.log("nevihta");
        }

    
        var d= new Date(uniqueDays[i]); 
        var dayName = days[d.getDay()]; 
        var element = document.createElement("div"); 
        element.innerHTML = `<div class='card-body'> <h5 class='card-title'> ${dayName}</h5> <p class='card-text'> ${dataDaily.temperature_2m_max[i]} / ${dataDaily.temperature_2m_min[i] }${data.hourly_units.temperature_2m} </p> <img alt='picture' src='images/sun.png' class='img-fluid weatherIcon' > </div>`; 
        element.setAttribute("class", "card text-center mb-3"); 
        element.setAttribute("style", "width:18rem");
        contentArea.appendChild(element); 
    }
}

