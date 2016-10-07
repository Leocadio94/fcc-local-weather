$(document).ready(function() {
  
  if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      next(lat, lon);
    }, function(){
      alert("ERROR!");
    },{maximumAge:60000, timeout:5000, enableHighAccuracy:true});
  } else {    
      alert("ERROR!");
  }
});


function next(lat, lon) {
  var url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&mode=json&units=metric&appid=532d313d6a9ec4ea93eb89696983e369";
  
  $("#unit").on("click", function() {
    if ($("#unit").text() === "°C") {
      $("#unit").text("°F");
      url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&mode=json&units=imperial&appid=532d313d6a9ec4ea93eb89696983e369";
      getWeather(url, "°F");
    } else {
      $("#unit").text("°C");
      url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&mode=json&units=metric&appid=532d313d6a9ec4ea93eb89696983e369";
      getWeather(url, "°C");
    }
  });

  getWeather(url, "°C");
}

function getWeather(url, unit) {
  $.getJSON(url, function(data) {
    var r = JSON.parse(JSON.stringify(data));
    $('#city').animate({
        'opacity': 0
      }, 300, function() {
    $(this).text(r.name + ", " + r.sys.country);
      }).animate({
        'opacity': 1
      }, 300);
    $('#number').animate({
        'opacity': 0
      }, 300, function() {
    $(this).text(r.main.temp + " " + unit);
      }).animate({
        'opacity': 1
      }, 300);
    $('#icon').animate({
        'opacity': 0
      }, 300, function() {
    $(this).html("<img src='http://openweathermap.org/img/w/"+r.weather[0].icon+".png'></img>");
      }).animate({
        'opacity': 1
      }, 300);
  });
}