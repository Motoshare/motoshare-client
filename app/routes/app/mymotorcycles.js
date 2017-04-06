import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
	session: Ember.inject.service(),
	model(){
		var uid = this.get('session.data.authenticated.uid');
		console.log(uid);
		return this.store.findAll('motorcycle').then(results => results.filter((motorcycle) => {
			return motorcycle.get('uid') === uid;
		}));
	}
});