import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
	messageBus: Ember.inject.service('message-bus'),
	menuState: null,
	init() {
	    this._super(...arguments);
	    this.get('messageBus').subscribe('menuOpen', this, this.menuUpdater);
    },

    menuUpdater: function(args){
    	if(args === false){
    		this.set('menuState', false);
    	}
    	if(args === true){
    		this.set('menuState', true);
    	}
    },

    actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
