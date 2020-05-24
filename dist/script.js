const api = "https://fcc-weather-api.glitch.me/api/current?lat=";
var latidute;
var longitude;
var requestUrlString;
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

$(document).ready(function() {
 
  document.getElementsByTagName("body")[0].style.background="linear-gradient(to left, #29B6F6, #FFFFFF)";   
function success(position) {
  var pos = position.coords;
  getWeather (pos.latitude , pos.longitude);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
 
function getWeather(lat, lon) {
  requestUrlString = api + lat + "&" + "lon=" + lon;

  $.ajax({
    url : requestUrlString,
    success : function (result){
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
     
      console.log(result.weather[0].main)
      console.log(result.main.temp);
      $("#temperature").text(Math.round(result.main.temp) + String.fromCharCode(176)+" C - " + (Math.round(result.main.temp*1.8+32)) + String.fromCharCode(176) + " F" );
      $("#current-weather").text(result.weather[0].main);
      $("#wind").text(result.wind.speed + " m/s");
    }
  });
  
} 
});
/*
  $.getJSON( requestUrlString, function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});
*/