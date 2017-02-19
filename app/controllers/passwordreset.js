import Ember from 'ember';

export default Ember.Controller.extend({
	actions:{
		passwordreset: function() {
			var _this = this;
			var email = this.get('resetemail');
			Ember.$.ajax('http://localhost:8080/api/passwordreset', {
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				data: JSON.stringify({email: email}),
				error: function(response){
					_this.set('errors', response.responseText);
				}
			});
		}
	}
});
