import Ember from 'ember';

export default Ember.Component.extend({ 
    store: Ember.inject.service(), 
    displayCycles: function() {
        var self = this;
        var cycles = this.get('store').findAll('motorcycle').then(function(motorcycle){
            motorcycle.forEach(function(cycle){
                var make = cycle.get('make');
                var lat = cycle.get('lat');
                var lng = cycle.get('long');
                var latlng = {lat, lng};
                var model = cycle.get('model');
                var thumb = cycle.get('media')[0];
                self.createMarker(latlng, make, model, thumb);
            });
        });
    },
    createMarker: function(latlng, make, model, thumb) {
        var map = window.map;
        var icon = "https://storage.googleapis.com/motoshare-v1.appspot.com/general_gfx/icon_pin.png"
        var marker = new google.maps.Marker({
            position: latlng,
            icon: icon,
            animation: google.maps.Animation.DROP,
        });

        var infoWindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker, 'click', function(){
            var infoContent = '<h3>' + make + ' ' + model + '</h3>' + '<img src="'+ thumb +'" width="200px"/><p>See More Details</p>';
            console.log(infoContent);
            infoWindow.setContent(infoContent);
            infoWindow.open(map, marker);
        });
        marker.setMap(map);
    },
    insertMap: function() {
    	var container = Ember.$('.map-canvas')[0];
        var options = {
            center: new window.google.maps.LatLng(
                this.get('latitude'),
                this.get('longitude')
            ),
            zoom: 15
        };

        window.map = new window.google.maps.Map(container, options);
        this.displayCycles();

        google.maps.event.addListener(map, 'click', function() {
              infoWindow.close();
        });

    }.on('didInsertElement')

});