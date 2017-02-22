import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({ 
    store: Ember.inject.service(), 
    popup: Ember.inject.service,
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
                var id = cycle.get('id');
                self.createMarker(latlng, make, model, thumb, id);
            });
        });
    },
    createMarker: function(latlng, make, model, thumb, id) {
        var map = window.map;
        var icon = "https://storage.googleapis.com/motoshare-v1.appspot.com/general_gfx/icon_pin.png"
        var marker = new google.maps.Marker({
            position: latlng,
            icon: icon,
            animation: google.maps.Animation.DROP,
        });

        var infoWindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker, 'click', function(){
            var infoContent = '<div class="iw-container"><h3 class="iw-title">' + make + ' ' + model + '</h3>' + 
            '<img src="'+ thumb +'" width="200px"/><p>See More Info</p></div>';
            console.log(infoContent);
            infoWindow.setContent(infoContent);
            infoWindow.open(map, marker);
        });
        marker.setMap(map);
    },
    openBikePanel: function(){
        console.log('Fired');
        window.openBikePanel(this, this.openBikePanel);
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

    }.on('didInsertElement'),

    actions: {
        openBikePanel: function(id){
            console.log('Bike'+ id);
        }
    }
});