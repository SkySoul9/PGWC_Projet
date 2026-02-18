const newDiv = document.createElement('div');
document.body.appendChild(newDiv);

const newTitle = document.createElement('h1');
newTitle.textContent = "Météo test1";
newDiv.appendChild(newTitle);

function response(query){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", query, false); 
    xhr.send();
    const response = JSON.parse(xhr.response);
    console.log(response);
    return response;
}
//température link a 1j
rep = response("https://api.open-meteo.com/v1/forecast?latitude=47.5943&longitude=1.3291&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,is_day&models=best_match&timezone=auto&forecast_days=1");


const pTempMin = document.createElement('p');
pTempMin.textContent = "Température Min journée à Blois" + rep.daily.temperature_2m_min;
newDiv.appendChild(pTempMin);


const pTempMax = document.createElement('p');
pTempMax.textContent = "Temperature Max journée à Blois :" + rep.daily.temperature_2m_max;
newDiv.appendChild(pTempMax);

date = new Date;
heure = date.getHours();

console.log(heure);

const tempActuel = document.createElement('p');
tempActuel.textContent = "Temperature Actuel : " + rep.hourly.temperature_2m[heure];
newDiv.appendChild(tempActuel);
//api link température a 4j
// https://api.open-meteo.com/v1/forecast?latitude=47.5943&longitude=1.3291&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,is_day&models=best_match&timezone=auto