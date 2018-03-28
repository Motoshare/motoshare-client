import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		setStart: function(value){
			this.set('setStart', value);
		},
		setEnd: function(value){
			this.set('setEnd', value);
		},
	}
});
