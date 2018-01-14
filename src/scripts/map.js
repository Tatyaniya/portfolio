function initMap() {
    var element = document.getElementById('map');
    var options = {
        zoom: 5,
        center: {lat: 50.4501, lng: 30.5234}
    };

    var myMap = new google.maps.Map(element, options);