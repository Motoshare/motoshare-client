import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Component.extend({
	tagName: 'span',
	state: storageFor('appstore'),
	messageBus: Ember.inject.service('message-bus'),

	actions: {
		menuToggle: function() {
			var menu = this.get('state.menu');
			console.log('This is clicked.');
			if(menu === false){
				this.toggleProperty('state.menu');
				this.get('messageBus').publish('menuOpen', true);
			}

			if(menu === true){
				this.toggleProperty('state.menu');
				this.get('messageBus').publish('menuOpen', false);
			}
		}
	}

});
