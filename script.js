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
    const name = 'Bodonci'; 
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
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latVal}&longitude=${lonVal}&hourly=temperature_2m,precipitation_probability&timezone=Europe%2FBerlin&forecast_days=3`; 
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
    var arrDays = new Set();
    console.log(data); 

    for(var i=0; i< dataHourly.time.length ; i++){
        let dateTime = dataHourly.time[i].split("T")[0] ; 
        arrDays.add(dateTime); 
    }
    const uniqueDays = Array.from(arrDays); // TEGA UPORABLJAS 
    

    for(var i=0; i<3; i++){

        var element = document.createElement("div"); 
        element.innerHTML = `<div class='dayText'> ${uniqueDays[i]} </div> <div class='tempText'> ${i}${data.hourly_units.temperature_2m}</div>`; 
        element.setAttribute("class", "cardElement"); 
        contentArea.appendChild(element); 
    }
}

