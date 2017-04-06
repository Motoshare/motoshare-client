import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
	model(params) {
	    return this.get('store').findRecord('motorcycle', params.motorcycle_id);
	  },
});