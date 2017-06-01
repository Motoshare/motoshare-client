import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
	messageBus: Ember.inject.service('message-bus'),
	latitude: '',
	longitude: '',
    init() {
    this._super(...arguments);
    this.get('messageBus').subscribe('bikeCoords', this, this.setCoords);
    },
	getCoords: function(street, city, state) {
		var _this = this;
		var coords = street+city+state;
		var url = 'https://maps.google.com/maps/api/geocode/json?address=' + coords;
		return Ember.$.ajax({
			url: url,
			type: 'GET',
			success: function(response){
			var lat = response.results[0].geometry.location.lat;
			var lng = response.results[0].geometry.location.lng;
			_this.get('messageBus').publish('bikeCoords', lat, lng);
			}
		});
	},
	setCoords: function(lat, lng){
        this.set('latitude', lat);
        this.set('longitude', lng);
        //this.insertMap();
    },
	actions: {
		setStart: function(value){
			this.set('setStart', value);
		},
		setEnd: function(value){
			this.set('setEnd', value);
		},
		addmotorcycle: async function(){
			var _this = this;
			var year = parseInt(this.get('year'));
			var make = this.get('make');
			var model = this.get('model');
			var cc = this.get('cc');
			//var VIN = this.get('vin');
			//var license = this.get('license');
			var category = document.getElementById('category').value;
			//var color = this.get('color');
			//var description = this.get('description');
			var startDate = this.get('setStart');
			var endDate = this.get('setEnd');
			var availableDates = {startDate, endDate};
			var street = this.get('street');
			if (street){
				street = street.replace(/\s+/g, '');
			}
			var isCompleted = this.get('isCompleted');
			var uid = this.get('session.data.authenticated.uid');
			var price = parseInt(this.get('price'));
			var authToken = this.get('session.data.authenticated.access_token');
			var city = this.get('city');
			var state = this.get('state');
			const coords = await this.get('getCoords').call(this, street, city, state);
			var latitude = this.get('latitude');
			var longitude = this.get('longitude');
			Ember.$.ajax('http://localhost:8080/api/addmotorcycle' /*'https://motoshare-v1.appspot.com/api/addmotorcycle'*/, {
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				data: JSON.stringify({year: year, make: make, model: model, cc: cc, category: category, 
									availableDates: availableDates, isCompleted: isCompleted, uid: uid,
									latitude: latitude, longitude: longitude, price: price}),
				beforeSend: xhr => {
					xhr.setRequestHeader("Authorization", "Bearer " + authToken);
				},
				error: function(response){
					_this.set('errors', response.responseText);
				}
			}).then(function(message){
				let route = message.next;
				console.log(route);
				debugger;
				_this.transitionToRoute('motorcycle', route);
			});
		}
	}
});

