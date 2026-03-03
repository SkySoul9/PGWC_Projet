//questions : es-ce qu'il faut afficher pour la journée les heures futures genre toute la journée ca passe ou précisement le temps apres l'heure actuel et la temperature seule suffit ?
//es-ce que c'est important de gerer avec un dico ou non le stockage des lieux ou si on utilise des tableaux ca passe 
// boucle pour cacher les elements, comment faire 
const newDiv = document.createElement('div');
document.body.appendChild(newDiv);

const newTitle = document.createElement('h1');
newTitle.textContent = "Météo test1";
newDiv.appendChild(newTitle);


//fonction appelle a l'api
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

//température Min de la jouréne 
const pTempMin = document.createElement('p');
pTempMin.textContent = "Température Min journée à Blois : " + rep.daily.temperature_2m_min + rep.daily_units.temperature_2m_min;
pTempMin.hidden = true;
newDiv.appendChild(pTempMin);

//Température Max de la journée 
const pTempMax = document.createElement('p');
pTempMax.textContent = "Temperature Max journée à Blois : " + rep.daily.temperature_2m_max + rep.daily_units.temperature_2m_max;
pTempMax.hidden = true;
newDiv.appendChild(pTempMax);


//Température a l'heure actuel

date = new Date;
heure = date.getHours();//récupere l'heure du PC pour l'utiliser pour tempActuel

const tempActuel = document.createElement('p');
tempActuel.textContent = "Temperature Actuel : " + rep.hourly.temperature_2m[heure] + rep.hourly_units.temperature_2m;
tempActuel.hidden = true;
newDiv.appendChild(tempActuel);


//gestion affichage temperature max/min/actuel exo1
var checkTempMax = document.querySelector("input[id=cbTempMax]");

checkTempMax.addEventListener('change', function() {
  if (this.checked) {
    pTempMax.hidden = false;
  } else {
    pTempMax.hidden = true;
  }
});

var checkTempMin = document.querySelector("input[id=cbTempMin]");

checkTempMin.addEventListener('change', function() {
  if (this.checked) {
    pTempMin.hidden = false;
  } else {
    pTempMin.hidden = true;
  }
});

var checkTempActuel = document.querySelector("input[id=cbTempActuel]");

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
 
function getHeure(){
  var cHeure = document.getElementById("choixHeure").value;
  if(cHeure > heure){ //vérification que l'heure demandé par l'utilisateur est une heure future
    pTempHeure.textContent = rep.hourly.temperature_2m[cHeure];
    newDiv.appendChild(pTempHeure);
  }else {
    alert('Vous devez mettre une heure future (heure mise : '+ cHeure + ")")
  }
}
const courbeTemp = document.getElementById('tempFuture');
courbeTemp.height = 1;
courbeTemp.width = 3; // ratio de taille 1/3

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

  let longitude = document.getElementById("longitude").value;
  let latitude = document.getElementById("latitude").value;
  let lieu = document.getElementById("place").value;
  console.log(longitude);
  console.log(latitude);

  if(notEmpty(longitude) && notEmpty(latitude) && validNumber(latitude) && validNumber(longitude)){ //vérifie que ca va pas faire planter l'appel api
    repMP = response("https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&daily=weather_code,rain_sum,snowfall_sum,precipitation_sum,wind_speed_10m_max&hourly=temperature_2m,cloud_cover,rain,snowfall&models=meteofrance_seamless&current=temperature_2m,rain,snowfall,precipitation,cloud_cover,wind_speed_10m");

    let dRain = repMP.current.rain;
    let dNeige = repMP.current.snowfall;
    let dPrecipitation = repMP.current.precipitation;
    let dTemperature = repMP.current.temperature_2m;
    meteoDaily.textContent = "Voici la météo du jour en " + longitude +" , " +latitude;
    temperatureDaily.textContent="Il fait "+ dTemperature+"°C aujourd'hui.";
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

    if(notEmpty(lieu)){
      lieux.push(document.getElementById("place").value);
      coordX.push(Number(longitude));
      coordY.push(Number(latitude));
      lieuAjouté.textContent = "Nouveau lieu ajouté "+ lieu  +", " +"Longitude : "+ longitude +" Latitude : "+  latitude;
      divTab[3].appendChild(lieuAjouté);
    }

  }else{
    meteoDaily.textContent ="Les coodonnées indiqués ne fonctionne pas.";
    divTab[3].appendChild(meteoDaily);
  }

}

//afficher la liste des lieu via un boutton 
function getLieu(){
  for (let i=0;i < lieux.length ; i++){
    list_lieux.textContent = "Votre liste de lieux " + lieux;
  }
  divTab[3].appendChild(list_lieux);
  console.log("lieux : "+ lieux);
}





//Ajouter la meme chose pour l'heure actuel 
//ajouter la meme chose pour le jour futur grace a une variable entre 1 et 4 on accede a quel jour futur on veut savoir
//le tout relié a 2 différent bouton

//api link localisation exacte longitude latitude
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,rain_sum,snowfall_sum,precipitation_sum,wind_speed_10m_max&hourly=temperature_2m,cloud_cover,rain,snowfall&models=meteofrance_seamless&current=temperature_2m,rain,snowfall,precipitation,cloud_cover,wind_speed_10mhttps://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,rain_sum,snowfall_sum,precipitation_sum,wind_speed_10m_max&hourly=temperature_2m,cloud_cover,rain,snowfall&models=meteofrance_seamless&current=temperature_2m,rain,snowfall,precipitation,cloud_cover,wind_speed_10m


//api link température a 4j
// https://api.open-meteo.com/v1/forecast?latitude=47.5943&longitude=1.3291&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,is_day&models=best_match&timezone=auto