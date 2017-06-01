import Ember from 'ember';

export default Ember.Controller.extend({
	messageBus: Ember.inject.service('message-bus'),
    session: Ember.inject.service(),
	map: true,
	init() {
    this._super(...arguments);
    this.get('messageBus').subscribe('mapView', this, this.setMap);
    this.get('messageBus').subscribe('listView', this, this.setList);
    },
    
    isUser: function() {
        return true;
    }.property('model.uid'),

    setMap: function() {
    	this.set('map', true);
    },
    setList: function() {
    	this.set('map', false);
    },
    actions: {
        invalidateSession() {
          this.get('session').invalidate();
        },
        listView: function(){
            this.get('messageBus').publish('listView');
        },
        mapView: function() {
            this.get('messageBus').publish('mapView');
        },
        focused: function(){
            this.set('errors', null);
        },
        searchZip: function(){
            this.set('errors', null);
            var _this = this;
            var zip = this.get('zip');
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:'+zip+'&sensor=false';
            console.log(zip);
            $.ajax({
                url: url,
                type: 'GET'
            }).then(function(response) {
                console.log(response)
                if (response.status === "ZERO_RESULTS"){
                    _this.set('errors', '    Make sure to enter a valid zip code.');
                }
                var lat = response.results[0].geometry.location.lat;
                var lng = response.results[0].geometry.location.lng;
                _this.get('messageBus').publish('setCoords', lat, lng);
            });
        }
    }
});
