import Ember from 'ember';

export default Ember.Controller.extend({
	confirmSame: function() {
		var password = this.get('newpassword');
		var match = this.get('repeatpassword');
		if (password === match) {
			return true;
		} else {
			return false;
		}
	}.property('newpassword', 'repeatpassword'),

	actions: {
		register: function() {
			var _this = this;
			var firstName = this.get('firstName');
			var lastName = this.get('lastName');
			var email = this.get('newEmail');
			var password = this.get('newpassword');
			Ember.$.ajax('http://localhost:8080/api/register'/*'https://motoshare-v1.appspot.com/api/register'*/, {
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				data: JSON.stringify({fname: firstName, lname: lastName, email: email, password: password}),
				error: function(response){
					_this.set('errors', response.responseText);
				}
			}).then(function(message){
				let notice = Ember.get(message,'message');
				_this.transitionToRoute('login').then(function(newRoute){
					newRoute.controller.set('notice', notice);
				});
			});
		}
	}
});
