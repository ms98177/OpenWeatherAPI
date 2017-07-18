// const apiURL = "https://api.openweathermap.org/data/2.5/weather"
const apiURL = "https://uwpce-weather-proxy.herokuapp.com/data/2.5/weather"
const form = document.getElementById("apiOptions")
// const apiURL = "https://uwpce-fortune-proxy.herokuapp.com/?format=html"
let debug = null
let apiKey = '&appid=b1b15e88fa797225412429c1c50c122a1'
let London = '?lat=51.5074&lon=0.1278'
let Seattle = '?lat=47.6762&lon=-122.3182'
//let selectedCity = form.city.value
console.log("1 form.city.value=" + form.city.value)
//selectedCity = Seattle

//console.log("OpenWeatherAPI link = " + apiURL + selectedCity + apiKey)



// Create code in the button (or form) handler to generate the quote

function handleSubmit () {
  event.preventDefault()
  console.log("handleSubmit form.city.value=" + form.city.value)
  selectedCity = form.city.value
  console.log("OpenWeatherAPI link = " + apiURL + selectedCity + apiKey)

  // get form values
//  let values = form.city.value

  // serialize them into a query string
//  let queryString = queryBuilder(values)
  let queryString = apiURL + selectedCity + apiKey
  // call getQuote with the query string
  //console.log("values=" + values)
  console.log("queryString=" + queryString)
  getWeather(queryString)
}

function getWeather (queryString) {
  let request = new XMLHttpRequest()

  // starts talk to API - 3 params
  // request method, url, (optional) async flag (default true)
  request.open("GET", apiURL + queryString, true)

  // fires when the request is complete
  // long term - I want to update the DOM
  request.onload = function () {
    let weatherDiv = document.getElementById("forcast")
    let response = JSON.parse(request.response)
    console.log(response.body)

    // debug = response
    quoteDiv.innerHTML = response.body
  }

  // fires if something goes wrong
  request.error = function (errorObject) {
    console.log("bwoken :(")
    console.log(errorObject)
  }

  // send the request!
  request.send()
}

function queryBuilder(queryObj){
  let holder = []
  // loop through queryObj key value pairs
  for(let key in queryObj){
    // turn each one into "key=value"
    let convert = `${encodeURIComponent(key)}=${encodeURIComponent(queryObj[key])}`
    // encodeURIComponent converts spaces and & to URI friendly values so we don't have to worry about them
    holder.push(convert)
  }
  // concatenate the pairs together, with & between
  let longString = holder.join("&")
  // prepend a ? to concatenated string, return
  return `?${longString}`
}

// document.addEventListener("DOMContentLoaded", function () {
//   let btnQuote = document.querySelector("button")
//   btnQuote.addEventListener("click", getQuote)
// })
