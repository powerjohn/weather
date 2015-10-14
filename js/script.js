 $(document).ready(function() {
   var loc, units = "metric";

   $('button').on('click', function() {
     var $this = $(this);
     units = $this.data('file');
     $this
       .siblings('button')
       .removeAttr('disabled')
       .end()
       .attr('disabled', 'disabled');
     getWeather(lat, lon, units);
   });
   $.getJSON('http://ip-api.com/json', function(res) {
     lat = res.lat;
     lon = res.lon;
     getWeather(lat, lon, units);
     console.log(lon + ", " + lat + "," + units);

   });

   function getWeather(lat, lon, units) {
     $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=' + units, function(results) {
       $(document).trigger('weather/results', results);
     });

     $(document).on('weather/results', function(e, results) {
       console.log(results);
       $("#city").html('Location: ' + results.name + "," + results.sys.country);
       $('#desc').text('Current Weather: ' + results.weather[0].description);
       $('#pressure').text('Air Pressure: ' + results.main.pressure + 'bar');
       $('#humidity').text('Humidity: ' + results.main.humidity + '%');

       $('#max').html((units == "metric") ? "<span> MAX: " + results.main.temp_max + '&deg;C</span>' : "<span> MAX: " + results.main.temp_max + '&deg;F</span>');

       $('#min').html((units == "metric") ? "<span> MIN: " + results.main.temp_min + '&deg;C</span>' : "<span> MIN: " + results.main.temp_max + '&deg;F</span>');

       $('#temp').html((units == "metric") ? "<span> AVE: " + results.main.temp + '&deg;C</span>' : "<span> AVE: " + results.main.temp + '&deg;F</span>');

       $('#ico').html('<img  src="http://openweathermap.org/img/w/' + results.weather[0].icon + '.png" alt="icon"/>');

     });
   }

 });