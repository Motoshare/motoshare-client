import Ember from 'ember';

export default Ember.Service.extend({
	openBikePanel: function (id){
		jQuery(window).on('ready', Ember.run.bind(this, this.openBikePanel));
		console.log('Bike ID: ' +id);
	}
});
