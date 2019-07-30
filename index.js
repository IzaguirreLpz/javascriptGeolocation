var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  var coordenadas = document.getElementById('cordenada')
  var altitud = document.getElementById('altura')
  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
  coordenadas.innerHTML = crd.latitude + ',' + crd.longitude
  altitud.innerHTML = crd.accuracy + ' Mts.'
  loadUbication(crd.latitude,crd.longitude)
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
  ubicacion.innerHTML = err.code + ' - - -' + err.message;
};

navigator.geolocation.getCurrentPosition(success, error, options);


function myMap(latitu,logitu) {
var mapProp= {
  center:new google.maps.LatLng(latitu,logitu),
  zoom:5,
};
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}


function loadUbication(latitu,logitu) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var ubicacion = document.getElementById('ubicacion')
      console.log(this.response.results);
      console.log(JSON.parse(this.response));
      var localidad = JSON.parse(this.response)
      console.log(localidad['results'][0]['address_components'][0]['long_name']);
      console.log(localidad['results'][1]['address_components'][0]['long_name']);
      console.log(localidad['results'][2]['address_components'][0]['long_name']);
      localizacion_1 = localidad['results'][0]['address_components'][0]['long_name']
      localizacion_2 = localidad['results'][1]['address_components'][0]['long_name']
      localizacion_3 = localidad['results'][2]['address_components'][0]['long_name']
      ubicacion.innerHTML = localizacion_1 + ', ' + localizacion_2 + ', ' + localizacion_3;
      myMap(latitu,logitu)
    }
  };
  xhttp.open("GET", `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitu},${logitu}&key=AIzaSyDN79kG4OiJYPvpcJfFout7Kg5BS_g4trM`, true);
  xhttp.send();
}
