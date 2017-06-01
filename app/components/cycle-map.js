import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({
    messageBus: Ember.inject.service('message-bus'), 
    store: Ember.inject.service(), 
    popup: Ember.inject.service,
    geolocation: Ember.inject.service(),
    currentLocation: '',
    init() {
    this._super(...arguments);
    var _this = this;
    this.get('messageBus').subscribe('setCoords', this, this.setCoords);
    // this.get('geolocation').getLocation().then(function(geoObject) {
    //         console.log(geoObject);
    //         var lat = geoObject.coords.latitude;
    //         var lng = geoObject.coords.longitude;
    //         _this.setCoords(lat, lng);
    //     });
    },
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
            '<img src="'+ thumb +'" width="200px"/></div><a href="/motorcycle/'+id+'"><p>See More Info</p></a>';
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
            zoom: 10
        };

        window.map = new window.google.maps.Map(container, options);
        this.displayCycles();

        google.maps.event.addListener(map, 'click', function() {
              infoWindow.close();
        });

    }.on('didInsertElement'),

    setCoords: function(lat, lng){
        this.set('latitude', lat);
        this.set('longitude', lng);
        this.insertMap();
    },

    actions: {

    }
});