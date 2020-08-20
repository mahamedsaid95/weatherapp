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
function getcurrentweather(cityname){
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIKey}&units=imperial`

  $.ajax({                               
  url: queryURL,
  method: "GET"
})


.then(function(response) {

  // Log the queryURL
  console.log(queryURL);

  // Log the resulting object
  console.log(response);
  
  var lat = response.coord.lat

  var lon = response.coord.lon

  getuvIndex(lat, lon);

  // Transfer content to HTML
  $(".city").text(response.name + " Weather Details");
  $(".wind").text("Wind Speed: " + response.wind.speed);
  $(".humidity").text("Humidity: " + response.main.humidity);
  $("#imgtag").attr("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`);

  $(".temp").text("Temperature: " + response.main.temp);

  // Thereafter, we have to save the data in our local storage. 
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);

   let myCityName = window.localStorage.getItem("cityName")

   $('#citySearch').html('<div>' +myCityName + '</div>');

  });
}

function getuvIndex(lat,lon) {
var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`         // We neeed the URL to query the database


$.ajax({                                
  url: queryURL,
  method: "GET"
})


.then(function(response) {

  // Log the queryURL
  console.log(queryURL);

  console.log(response)

  $("#uvindex").text("uvindex: " + response.value);
 
});
}