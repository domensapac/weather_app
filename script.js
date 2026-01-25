var placeNameTxt; 
var municipalityTxt; 
var elevationTxt; 
var latitudeTxt;
var longitudeTxt; 
var temperatureTxt; 
var precProbabilityTxt; 

window.onload = () =>{
    placeNameTxt = document.getElementById("placeName"); 
    municipalityTxt = document.getElementById("municipality"); 
    elevationTxt = document.getElementById("elevation");
    latitudeTxt = document.getElementById("latitude");
    longitudeTxt = document.getElementById("longitude");
    temperatureTxt = document.getElementById("temperature");
    precProbabilityTxt = document.getElementById("precProbability");
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
    outputData(data); 
}


function updateText(placeName, municipality, elevation, latitude, longitude){
    placeNameTxt.textContent = "Kraj: " + placeName; 
    municipalityTxt.textContent = "Občina: " + municipality; 
    elevationTxt.textContent = "Nadmorska: " + elevation; 
    latitudeTxt.textContent = "Latitude: " + latitude; 
    longitudeTxt.textContent = "Longitude: " + longitude; 
}

function outputData(data){
    console.log(data); 
    for(var i=0; i< data.hourly.; i++){ // !
        console.log("a");
    }
    /*
    Object.values(data.temperature_2m).forEach(element => {
        console.log(element); 
    });
    */
}