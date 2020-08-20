// run our AJAX to call the OpenWeatherMap API

var APIKey = "b17c321e09f505d0c59f40f8ee7903cf"
var previousSearch = JSON.parse(localStorage.getItem("previouscities")) || []
//var previousSearch = localStorage.getItem("cityName")

function displayLocalstorage (){
  console.log(previousSearch)
  for (let i = 0; i < previousSearch.length; i++) {
    $("#citySearch").append(`<button class = "cityDisplay"> ${previousSearch[i]}</button>`)
  }
};  
displayLocalstorage()

$("#getweather").on("click", function(){
  var cityname = $("#searchterm").val()
  console.log(cityname);
  getcurrentweather(cityname);
  get5dayforcast(cityname);
  previousSearch.push(cityname)
  window.localStorage.setItem('previouscities', JSON.stringify(previousSearch))
})