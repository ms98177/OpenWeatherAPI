// const apiURL = "https://api.openweathermap.org/data/2.5/weather"
//const apiURL = "https://uwpce-weather-proxy.herokuapp.com/data/2.5/weather?"
const apiURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?"
const form = document.getElementById("apiOptions")
// const apiURL = "https://uwpce-fortune-proxy.herokuapp.com/?format=html"

// ***** Buttons *****
const lon = document.querySelector("button.londonButton")
const sea = document.querySelector('button.seattleButton')
const myLoc = document.querySelector('button.myLocationButton')

let debug = null
const London = 'lat=51.5074&lon=0.1278'
const Seattle = 'lat=47.6762&lon=-122.3182'
const apiKey = '&appid=fcdcf1d41daf42b0c84ba9783ba72827'
const units = '&units=imperial'


//let selectedCity = form.city.value
//console.log("1 form.city.value=" + form.city.value)
//selectedCity = Seattle

// ***** Click event listeners for buttons *****
lon.addEventListener("click", getLondon)
sea.addEventListener("click", getSeattle)
myLoc.addEventListener("click", getMyLoc)

//console.log("OpenWeatherAPI link = " + apiURL + selectedCity + apiKey)


function getWeather() {
	console.log("getWeather() starting")
	//console.log("getWeather() selectedCity = " + selectedCity)
	document.getElementById("container").innerHTML = ""
}

// Get the weather for London
function getLondon() {
  console.log("getLondon() starting")
  getWeather()
  callApi(London)
}

// Get the weather for Seattle
function getSeattle() {
  console.log("getSeattle() starting")
  getWeather()
  callApi(Seattle)
}

// Get the weather for my location
function getMyLoc() {
	getWeather()
	navigator.geolocation.getCurrentPosition(myLocSuccess, myLocError)
}

// Get my location
function getLocation(locObj) {
	let myLatLon = 'lat=' + locObj.lat + '&lon=' + locObj.lng
	console.log('myLatLon = ' + myLatLon)
	callApi(myLatLon)
}

// Called by getMyLoc
function myLocSuccess(position) {
	const myPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
	console.log('myPosition = ' + myPosition)
	getLocation(myPosition)
}

function myLocError() {
	console.log("We can't find you!")
	document.getElementById("container").innerHTML = "Please allow us to track your every move 8)"
}

// Use handleSubmit for form checkboxes
// function handleSubmit () {
//   event.preventDefault()
//   console.log("handleSubmit form.city.value=" + form.city.value)
//   selectedCity = form.city.value
//   console.log("OpenWeatherAPI link = " + apiURL + selectedCity + apiKey + units)
//
//   // serialize them into a query string
//   let queryString = selectedCity + apiKey + units
//
//   console.log("queryString=" + queryString)
//   getWeather(queryString)
// }


function queryBuilder (latLon) {
	console.log("queryBuilder() starting")
  console.log("queryBuilder(): latLon = " + latLon)
  //let queryString = apiURL + selectedCity + apiKey + units
  //console.log("queryBuilder(): queryString = " + queryString)
  //return queryString
  //getWeather(queryString)
}


function callApi (latLon) {
	console.log("callApi() starting")
  console.log("callApi(): latLon = " + latLon)
  queryString = apiURL + latLon + apiKey + units
  console.log("callApi(): queryString = " + queryString)
  let request = new XMLHttpRequest()
	console.log("callApi() request = " + request)
	console.log("callApi() request.open")
  request.open("GET", queryString, true)
	console.log("callApi() request.onload")
  request.onload = onLoadFunction
	console.log("callApi() request.onerror")
  request.onerror = onErrorFunction
  // send the request!
	console.log("callApi() request.send")
  request.send()
	console.log("callApi() return request = " + request)
  return request
}

// ***** onload function *****
function onLoadFunction() {
	console.log("onLoadFunction() starting")
  //let weatherDiv = document.getElementById("forcast")

  const resp = JSON.parse(this.response)
	console.log("JSON.parse(this.response)")
	console.log(JSON.parse(this.response))

//document.getElementById("weatherDiv").innerHTML = ""

	//var weatherData = document.getElementById("weatherDiv")
  var cont = document.getElementById("container")
  var list = document.createElement("ul")
  for (var i = 0; i < listInfo.length; i++) {
    var item = document.createElement("li")
    var item2 = document.createElement("li")
    var item3 = document.createElement("li")
    var item4 = document.createElement("li")
    var item5 = document.createElement("li")
    item.innerHTML = "Name is " + resp.name  //this.name
//		item2.innerHTML = "Description is " + this.description //"few clouds"
    item2.innerHTML = "Description is " + resp.weather[0].description //"few clouds"
    item3.innerHTML = Math.round(resp.main.temp) + " °F"
    item4.innerHTML = "A High of: " + Math.round(resp.main.temp_max) + " °F"
    item5.innerHTML = "A Low of: " + Math.round(resp.main.temp_min) + " °F"
  }
  list.appendChild(item).setAttribute("class", "city-name")
  list.appendChild(item2).setAttribute("class", "weather-description")
  //console.log(item2.innerHTML)
  list.appendChild(item3).setAttribute("class", "current-temp")
  list.appendChild(item4).setAttribute("class", "high-temp")
  list.appendChild(item5).setAttribute("class", "low-temp")
  cont.appendChild(list)
  changeColor(item2.innerHTML)
}


  // Error handler
function onErrorFunction(errorObject) {
	console.log("onErrorFunction() starting")
    console.log("bwoken :(")
    console.log(errorObject)
  }


function listInfo(message) {
	let p = document.createElement("p")
	p.innerHTML = message
	document.getElementById("weatherDiv").appendChild(p)
}


//function changes the css background color depending
// the weather.description
//******************************
function changeColor(myWeaDesc) {
  console.log("changeColor is firing")
  $("li.weather-description").each(function() {
    switch (myWeaDesc) {
      case ("clear sky"):
        $('body').css("background-color","#7EC0EE");
        $("weather").attr("class","clear-sky");
        break;
      case ("few clouds"):
        $('body').css("background-color","#ADD8E6");
        $("weather").attr("class","few-clouds");
        break;
      case ("overcast clouds"):
        $('body').css("background-color","#b3cbd1");
        $("weather").attr("class","cloudy");
        break;
      case ("scattered clouds"):
      case ("broken clouds"):
        $('body').css("background-color","#b3cbd1");
        $("weather").attr("class","scattered-clouds");
        break;
      case ("shower rain"):
      case ("light rain"):
      case ("rain"):
        $('body').css("background-color","#B0C4DE");
        $("weather").attr("class","rain");
        break;
      case ("thunderstorm"):
        $('body').css("background-color","#999999");
        $("weather").attr("class","thunder");
        break;
      case ("snow"):
        $('body').css("background-color","#efefef");
        $('ul').css("color","#666");
        $("weather").attr("class","snow");
        break;
      case ("mist"):
        $('body').css("background-color","#e2e2e2");
        $('ul').css("color","#666");
        $("weather").attr("class","mist");
        break;
      default:
        console.log("oops");
      }
  });
}
