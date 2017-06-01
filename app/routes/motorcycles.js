import Ember from 'ember';

export default Ember.Route.extend({
	geolocation: Ember.inject.service(),
	lat: null,
	model: function(){
		var _this = this;
		return Ember.RSVP.hash({
			motorcycles: this.store.findAll('motorcycle'),
      		// coords: this.get('geolocation').getLocation().then(function(geoObject) {
        //     	var lat = geoObject.coords.latitude;
        //    		var lng = geoObject.coords.longitude;
        //    		_this.set('lat', lat);
        //    		_this.set('lng', lng);
        //    	}),
        });
  	},

  	setupController(controller, models) {
  		controller.set('motorcycle', models.motorcycles);
  		controller.set('lat', 37.7749/*this.get('lat')*/);
  		controller.set('lng', -122.4194/*this.get('lng')*/);
  }
});