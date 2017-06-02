import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
	messageBus: Ember.inject.service('message-bus'),
	actions: {
		// menuOpen: function() {
		// 	console.log("Open");
		//     this.get('messageBus').publish('menuOpen', 'open');
		// },
		// menuClose: function() {
		// 	console.log('Closed');
		// 	this.get('messageBus').publish('menuClose', 'close');
		// },
	}
});
