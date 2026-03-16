//questions : es-ce qu'il faut afficher pour la journée les heures futures genre toute la journée ca passe ou précisement le temps apres l'heure actuel et la temperature seule suffit ?
//es-ce que c'est important de gerer avec un dico ou non le stockage des lieux ou si on utilise des tableaux ca passe 
// boucle pour cacher les elements, comment faire 

// Conteneur ajouté dynamiquement pour les résultats principaux du projet
// (utilisé pour les informations globales de Blois et les infos horaires).
const newDiv = document.createElement('div');
//document.body.appendChild(newDiv);

const newTitle = document.createElement('h1');
newTitle.textContent = "Températures";
//newDiv.appendChild(newTitle);
document.querySelectorAll("div")[0].appendChild(newTitle);


// fonction appelle a l'api
// param query : URL de requête Open-Meteo ou Nominatim
// renvoie l'objet JSON parsé (synchrone pour simplicité, mais en production préférer fetch/async)
function response(query){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", query, false); 
    xhr.send();
    const response = JSON.parse(xhr.response);
    console.log(response);
    return response;
}

// temperature link a 1j (donnée de base pour affichage initial de Blois)
rep = response("https://api.open-meteo.com/v1/forecast?latitude=47.5943&longitude=1.3291&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,is_day&models=best_match&timezone=auto&forecast_days=1");

//température Min de la jouréne 
const pTempMin = document.createElement('p');
pTempMin.textContent = "Température Min journée à Blois : " + rep.daily.temperature_2m_min + rep.daily_units.temperature_2m_min;
pTempMin.hidden = true;
//newDiv.appendChild(pTempMin);
document.querySelectorAll("div")[0].appendChild(pTempMin);

//Température Max de la journée 
const pTempMax = document.createElement('p');
pTempMax.textContent = "Temperature Max journée à Blois : " + rep.daily.temperature_2m_max + rep.daily_units.temperature_2m_max;
pTempMax.hidden = true;
//newDiv.appendChild(pTempMax);
document.querySelectorAll("div")[0].appendChild(pTempMax);


//Température a l'heure actuel

let date = new Date;
let heure = date.getHours();//récupere l'heure du PC pour l'utiliser pour tempActuel

const tempActuel = document.createElement('p');
tempActuel.textContent = "Temperature Actuel : " + rep.hourly.temperature_2m[heure] + rep.hourly_units.temperature_2m;
tempActuel.hidden = true;
//newDiv.appendChild(tempActuel);
document.querySelectorAll("div")[0].appendChild(tempActuel);

//gestion affichage temperature max/min/actuel exo1
var checkTempMax = document.querySelector("input[id=cbTempMax]");
var checkTempMin = document.querySelector("input[id=cbTempMin]");
var checkTempActuel = document.querySelector("input[id=cbTempActuel]");

checkTempMax.addEventListener('change', function() {
  if (this.checked) {
    pTempMax.hidden = false;
  } else {
    pTempMax.hidden = true;
  }
});

checkTempMin.addEventListener('change', function() {
  if (this.checked) {
    pTempMin.hidden = false;
  } else {
    pTempMin.hidden = true;
  }
});

checkTempActuel.addEventListener('change', function() {
  if (this.checked) {
    tempActuel.hidden = false;
  } else {
    tempActuel.hidden = true;
  }
});


//affichage de la température en fonction de l'heure future choisis par l'utilisateur 
//e de l’évolution du temps dans les prochaines heures
const pTempHeure = document.createElement('p');
let p_t = document.createElement('p');
all_d = document.querySelectorAll('div');
all_d[1].appendChild(p_t);
function getHeure(){
  var cHeure = document.getElementById("choixHeure").value;
  if(cHeure > heure && heure < 24){ //vérification que l'heure demandé par l'utilisateur est une heure future
    p_t.textContent = "Il fera " + rep.hourly.temperature_2m[cHeure] +"°C";
    //newDiv.appendChild(pTempHeure);
  }else {
    alert('Vous devez mettre une heure future (heure mise : '+ cHeure + ")")
  }
}
all_d[1].appendChild(p_t); // ajout de l'affichage de la température en dessous du bouton div en dessous de la Météo à Blois
const courbeTemp = document.getElementById('tempFuture');
// marche pas

new Chart(courbeTemp, {// sert a afficher un graphique avec les température de la journée
  type: 'line', 
  data:{
    labels: Object.keys(rep.hourly.temperature_2m) ,
    datasets: [{
      label: 'température',
      data: Object.values(rep.hourly.temperature_2m),
    }],

  
    },
});


//etape 3


var divTab = document.querySelectorAll("div");

//Météo de la journée 
const meteoDaily = document.createElement('p');

const pluieDaily = document.createElement('p');
const neigeDaily = document.createElement('p');
const PrecipitationDaily= document.createElement('p');
const temperatureDaily = document.createElement('p');


const lieuAjouté = document.createElement('p');
const list_lieux = document.createElement('p');
//jsp comment faire avec un dictionnaire, pour l'instant j'utilise 3 tableaux, 1 lieux, 1 coordX, 1 coordY, chaque indice = 1 lieu  indice 0 de chaque tableau = lieu[0] coordX[0] etc
// tableaux pour conserver les lieux utilisés / compatibilité avec le code existant.
// lieux : noms des endroits
// coordX = longitude, coordY = latitude
const lieux = [];
const coordX = []; //longitude
const coordY = []; //latitude


function notEmpty(string){ // verifie si un string n'est pas vide
  if(string.trim() !== ""){
    return true;
  }else {
    return false;
  }

}

function validNumber(nombre){ // verifie si un string est un nombre
  if(!Number.isNaN(Number(nombre))){ //vérifie que ce n'est pas pas un nombre (NaN = Not a Number) ou un nombre invalid (0/0 etc)
    return true;
  }else {
    return false;
  }
  
}

//var dict_lieu = new Map();// défini pour afficher si le lieu est ajouté ou non et pour avoir acces a la liste plus tard

function getMeteoActuel(){ //fonction qui affiche la meteoActuel(daily)

  var longitude = document.getElementById("longitude").value;
  var latitude = document.getElementById("latitude").value;
  var lieu = document.getElementById("place").value;
  console.log(longitude);
  console.log(latitude);

  if(notEmpty(longitude) && notEmpty(latitude) && validNumber(latitude) && validNumber(longitude)){ //vérifie que ca va pas faire planter l'appel api
    repMP = response("https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&daily=weather_code,rain_sum,snowfall_sum,precipitation_sum,wind_speed_10m_max&hourly=temperature_2m,cloud_cover,rain,snowfall&models=meteofrance_seamless&current=temperature_2m,rain,snowfall,precipitation,cloud_cover,wind_speed_10m");

    var dRain = repMP.current.rain;
    var dNeige = repMP.current.snowfall;
    var dPrecipitation = repMP.current.precipitation;
    var dTemperature = repMP.current.temperature_2m;
    meteoDaily.textContent = "Voici la météo du jour en " + longitude + " , " + latitude;
    temperatureDaily.textContent="Il fait "+ dTemperature + "°C aujourd'hui.";
    if(dRain>0){
      pluieDaily.textContent = "Il pleut aujourd'hui " + dRain +" mm.";
    }
    if(dNeige>0){
      neigeDaily.textContent = "Il neige aujourd'hui " + dNeige + "cm.";
    }
    if(dPrecipitation>0){
     PrecipitationDaily.textContent ="Il pleut ou il neige aujourd'hui"+ dPrecipitation+"mm.";
    }
    
    divTab[3].appendChild(meteoDaily);
    divTab[3].appendChild(PrecipitationDaily);
    divTab[3].appendChild(temperatureDaily);
    divTab[3].appendChild(neigeDaily);
    divTab[3].appendChild(pluieDaily);

    if(notEmpty(lieu))
    {
      addSavedLocation(lieu, Number(latitude), Number(longitude));
      lieuAjouté.textContent = "Nouveau lieu ajouté "+ lieu  +", " +"Longitude : "+ longitude +" Latitude : "+  latitude;
      divTab[3].appendChild(lieuAjouté);
    }

  }
  else
  {
    meteoDaily.textContent ="Les coodonnées indiqués ne fonctionne pas.";
    divTab[3].appendChild(meteoDaily);
  }

}

// afficher la liste des lieu via un boutton

// liason à la liste sauvegardée
function getLieu(){renderSavedLocationList();}

// liste des lieux stockée dans localStorage (avec nom, latitude et longitude)
let savedLocations = [];

function loadSavedLocations()
{
  // s'exécute au démarrage gardant les données existantes.

  const saved = localStorage.getItem('savedLocations');
  if(saved)
  {
    try {
      savedLocations = JSON.parse(saved);
      if(!Array.isArray(savedLocations)) savedLocations = [];
    } 
    catch(e) {savedLocations = [];}
  }

  // on remplit aussi les tableaux existants pour compatibilité (liste des villes avec son info)
  savedLocations.forEach(loc => {
    if(!lieux.includes(loc.name)) 
    {
      lieux.push(loc.name);
      coordY.push(Number(loc.latitude));
      coordX.push(Number(loc.longitude));
    }
  });

  renderSavedLocationList();
}

// pour stocker les "locations" dans le localStorage
function saveSavedLocations() {localStorage.setItem('savedLocations', JSON.stringify(savedLocations));}

function renderSavedLocationList()
{
  const list = document.getElementById('savedLocationsList');
  if(!list) return; // si vide alors drop
  list.innerHTML = '';
  if(savedLocations.length === 0)
  {
    list.innerHTML = '<li>(Aucun lieu enregistré)</li>';
    return;
  }

  savedLocations.forEach((loc, index) => {
    const li = document.createElement('li');
    li.textContent = `${loc.name} (lat ${loc.latitude}, lon ${loc.longitude}) `;

    const btn = document.createElement('button');
    btn.textContent = 'Afficher météo';
    btn.addEventListener('click', () => {
      getWeatherForLocation(loc.latitude, loc.longitude, loc.name);
    });
    const btnRemove = document.createElement('button');
    btnRemove.textContent = 'Supprimer';
    btnRemove.addEventListener('click', () => {
      savedLocations.splice(index, 1);
      const pos = lieux.indexOf(loc.name);
      if(pos !== -1){ lieux.splice(pos,1); coordY.splice(pos,1); coordX.splice(pos,1); }
      saveSavedLocations();
      renderSavedLocationList();
    });

    li.appendChild(btn);
    li.appendChild(btnRemove);
    list.appendChild(li);
  });
}

function addSavedLocation(name, latitude, longitude)
{
  if(!name || !validNumber(latitude) || !validNumber(longitude)) return;
  const exists = savedLocations.some(loc => loc.name === name && Number(loc.latitude) === Number(latitude) && Number(loc.longitude) === Number(longitude));
  if(!exists)
  {
    savedLocations.push({name, latitude: Number(latitude), longitude: Number(longitude)});
    saveSavedLocations();
    if(!lieux.includes(name)){
      lieux.push(name);
      coordY.push(Number(latitude));
      coordX.push(Number(longitude));
    }
    renderSavedLocationList();
  }
}

function clearWeatherResults()
{
  const div = document.getElementById('savedLocationWeather');
  if(div) div.innerHTML = '';
}

function getWeatherForLocation(latitude, longitude, name)
{
  const target = document.getElementById('savedLocationWeather');
  if(!target) return;

  let row = document.createElement('div');
  row.style.border = '1px solid #ccc';
  row.style.padding = '7px';
  row.style.marginBottom = '6px';

  try
  {
    const repL = response(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m&current_weather=true&timezone=auto&forecast_days=1`);
          rep = response("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_mean,precipitation_probability_mean&hourly=temperature_2m,precipitation_probability,precipitation&timezone=auto");

    let current = repL.current_weather?.temperature ?? 'Inconnu';
    let sup = repL.daily?.temperature_2m_min?.[0] ?? '-';
    let smax = repL.daily?.temperature_2m_max?.[0] ?? '-';

    row.innerHTML = `<strong>Météo pour ${name} (lat ${latitude}, lon ${longitude})</strong><br>Actuel: ${current} °C<br>Min: ${sup} °C, Max: ${smax} °C`;

    const hIndex = new Date().getHours();
    const valNext = repL.hourly?.temperature_2m?.slice(hIndex, hIndex+4) || [];
    row.innerHTML += `<br>Heures suivantes: ${valNext.join(' / ')} °C`;

    target.appendChild(row);
  }
  catch(err)
  {
    row.textContent = `Erreur météo pour ${name} : ${err}`;
    target.appendChild(row);
  }
}

function displayWeatherForAllSaved(){
  clearWeatherResults();
  if(savedLocations.length === 0){
    const target = document.getElementById('savedLocationWeather');
    if(target) target.textContent = 'Aucun lieu enregistré';
    return;
  }
  savedLocations.forEach(loc => getWeatherForLocation(loc.latitude, loc.longitude, loc.name));
}

// Recherche un lieu avec Nominatim et affiche sa météo, puis l'ajoute dans les lieux enregistrés
function searchLocationByName()
{
  const name = document.getElementById('locationName').value;
  if(!notEmpty(name))
  {
    alert('Entrez un nom de lieu pour rechercher.');
    return;
  }

  try
  {
    const result = response(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(name)}`);
    if(!result || result.length === 0)
    {
      alert('Aucun lieu trouvé.');
      return;
    }
    const item = result[0];
    const lat = Number(item.lat);
    const lon = Number(item.lon);
    const displayName = item.display_name || name;
    document.getElementById('latitude').value = lat;
    document.getElementById('longitude').value = lon;
    document.getElementById('place').value = displayName;
    addSavedLocation(displayName, lat, lon);
    getWeatherForLocation(lat, lon, displayName);
  }
  catch(err){alert('Erreur appel Nominatim : ' + err);}
}

function filterLocationsByBBox() // la partie la plus chiante (bonus)
{
  const minLat = Number(document.getElementById('minLatitude').value);
  const maxLat = Number(document.getElementById('maxLatitude').value);
  const minLon = Number(document.getElementById('minLongitude').value);
  const maxLon = Number(document.getElementById('maxLongitude').value);

  if(!validNumber(minLat) || !validNumber(maxLat) || !validNumber(minLon) || !validNumber(maxLon))
  {
    alert('Veuillez renseigner des nombres valides pour la bounding box.');
    return;
  }
  if(minLat>maxLat || minLon>maxLon)
  {
    alert('Latitude ou longitude min doit être inférieur ou égal à max.');
    return;
  }

  const venues = savedLocations.filter(loc => loc.latitude >= minLat && loc.latitude <= maxLat && loc.longitude >= minLon && loc.longitude <= maxLon);
  clearWeatherResults();
  if(venues.length === 0)
  {
    document.getElementById('savedLocationWeather').textContent = 'Aucun lieu enregistré dans cette box.';
    return;
  }
  venues.forEach(loc => getWeatherForLocation(loc.latitude, loc.longitude, loc.name));
}

function filterLocationsByRegion()
{
  const region = document.getElementById('regionName').value;
  if(!notEmpty(region))
  {
    alert('Entrez une région ou département.');
    return;
  }

  try
  {
    const result = response(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(region)}&countrycodes=fr`);
    if(!result || result.length === 0)
    {
      alert('Région non trouvée.');
      return;
    }

    const bbox = result[0].boundingbox;
    if(!bbox || bbox.length !== 4)
    {
      alert('Impossible de récupérer le bbox pour cette région.');
      return;
    }

    const minLat = Number(bbox[0]);
    const maxLat = Number(bbox[1]);
    const minLon = Number(bbox[2]);
    const maxLon = Number(bbox[3]);

    const venues = savedLocations.filter(loc => loc.latitude >= minLat && loc.latitude <= maxLat && loc.longitude >= minLon && loc.longitude <= maxLon);
    clearWeatherResults();
    if(venues.length === 0)
    {
      document.getElementById('savedLocationWeather').textContent = 'Aucun lieu enregistré dans cette région.';
      return;
    }
    venues.forEach(loc => getWeatherForLocation(loc.latitude, loc.longitude, loc.name));
  }
  catch(err){alert('Erreur Nominatim région : ' + err);}
}

// Charger les lieux enregistrés au démarrage du site
loadSavedLocations();

//api link localisation exacte longitude latitude
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,rain_sum,snowfall_sum,precipitation_sum,wind_speed_10m_max&hourly=temperature_2m,cloud_cover,rain,snowfall&models=meteofrance_seamless&current=temperature_2m,rain,snowfall,precipitation,cloud_cover,wind_speed_10mhttps://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,rain_sum,snowfall_sum,precipitation_sum,wind_speed_10m_max&hourly=temperature_2m,cloud_cover,rain,snowfall&models=meteofrance_seamless&current=temperature_2m,rain,snowfall,precipitation,cloud_cover,wind_speed_10m


//api link température a 4j
// https://api.open-meteo.com/v1/forecast?latitude=47.5943&longitude=1.3291&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,is_day&models=best_match&timezone=auto
//console.log(savedLocations);

// Partie 2

// création division -> partie affichage prévision et graphique pour les jours à venir
const d = document.createElement('div');
document.body.appendChild(d);
const t = document.createElement('h1');
t.innerText = "Prévision météo & temps";
d.appendChild(t);
// ---------------------------------------------------------------------------------------
// api partie 2
//const rep2 = response(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_mean,precipitation_probability_mean&hourly=temperature_2m,precipitation_probability,precipitation&timezone=auto`);
rep2 = response("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_mean,precipitation_probability_mean&hourly=temperature_2m,precipitation_probability,precipitation&timezone=auto");


day_prec = rep2.daily.precipitation_probability_mean;
day = rep2.daily.time;
temp = rep2.daily.temperature_2m_mean;

// création d'un menu de sélection + option
select = document.createElement('select');
option = document.createElement('option');
last_div = document.querySelectorAll('div')[8];
//console.log(last_div)
last_div.appendChild(select);

select.appendChild(option);
option.textContent = "date de prévision";

// création d'un bouton de submit
let p = document.createElement('p');
last_div.appendChild(p);

precipitation_today = day_prec[0];
today = rep2.daily.time[0];
temp_today = rep2.daily.temperature_2m_mean[0];

// options de sélection des dates

for(i = 1; i < 7; i++){
    //let k = i - 1;
    // initialisation des paramètres d'aujourd'hui
    option2 = document.createElement('option');
    select.appendChild(option2);
    choix = document.querySelectorAll('option');
    option2.textContent = day[i];
    
    // visualisation des choix
    //console.log(choix[2]);
   
    }

 function choix_date(date){
        for(let k = 1; k < day_prec.length; k++){
            if(date == day[k]){
                if(day_prec[k] > day_prec[k-1]){//precipitation_today sur toutes les conditions if){
                    // cas ou le niveau de % de précipitation est plus élevé
                    p.textContent = "Le temps a une probabilité plus élevée de +" +(day_prec[k] - day_prec[k-1]) +"% de se dégrader à ce jour : " + date + " par rapport au jour d'avant :" + day[k-1];
                    //break;

                }
                if(day_prec[k] == day_prec[k-1]){
                    p.textContent = "Le temps a une probabilité similaire de se dégrader à ce jour : " + date + " par rapport au jour d'avant :" + day[k-1];
                    //break;
            }

                if(day_prec[k] < day_prec[k-1]){
                    p.textContent = "Le temps a une probabilité plus réduite de " +(day_prec[k] - day_prec[k-1]) +"% de se dégrader à ce jour : " + date + " par rapport au jour d'avant :" + day[k-1];
                    //break;
                }
                break;
            }
    
    }
}
const c = document.createElement("canvas");
c.setAttribute("id","Temp");
c.setAttribute("style", "display: flex; box-sizing: border-box; height: 375px; width: 750px;")
last_div.appendChild(c);
let g;
// ------------------------------------------------------------------------------------------------------------
// fonctions dont on aura besoin pour la fonction suivante
time = rep2.hourly.time;
temp_h = rep2.hourly.temperature_2m;
let hour_p = []; // tab pour les heures
let temp_p = []; // tab pour pour les températures
//console.log(time);
function getHourDay(j, h){ // obtient le jour avec l'heure
    return time[(24*(j - 1))+ h]
}

function getTemp(j, h){
    return temp_h[(24*(j - 1))+ h]
}
// -------------------------------------------------------------------------------------------------------------
// créer une fonction qui prendra une date et renverra ses température (hourly.temperature_2m) par rapport aux heures (hourly.time)
function time_temp(date){
  
    for(i = 0; i < 24; i++){
      for(k = 1; k < day.length; k++){
        if (date == day[k]){
          //if(time.includes(date)){
            //k+=1;
          //}
          hour_p.push(getHourDay(k+1,i)); //on ajoute dans le tableau les données des dates 
          temp_p.push(getTemp(k+1,i));
        }}}
        // création du canvas
    g = new Chart(c,
          {
            type: "line", // graphique linéaire
            data : {
              labels: Object.values(hour_p),//day), // affichage des jours graphique en x
              datasets: [{
                label: 'Température moyenne/jour',
                data: Object.values(temp_p), // affichage températures graphique en y
              }],
            },
            options: {
            responsive: true}
          }
        );
} 
let reset = document.createElement('button');
reset.innerText = "actualiser";
last_div.appendChild(reset);
//reset.onclick = g.destroy();
//const graphique = document.getElementById("Temp");
    select.addEventListener("change",(event) =>{
        //console.log(event.target.value);
        console.log(choix_date(event.target.value)); // on récupère le choix fait dans le menu avec (event.target.value)
        time_temp(event.target.value);
        if(event.target.value == option.textContent){
          p.textContent = ""; // cas où l'on rechoisit date de prévision, on n'affichera rien
          //Chart.id.
        }
        reset.addEventListener("click",()=>{
          reset = g.destroy();
          reset;
          //time_temp(event.target.value);
          //g.update();
          //g.datasets
});
});

console.log(getHourDay(2,18), getTemp(2,18));