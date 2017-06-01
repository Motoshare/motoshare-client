import Ember from 'ember';

export default Ember.Controller.extend({
	remodal: Ember.inject.service(),
	session: Ember.inject.service(),
	closeModal() {
      this.get('remodal').close();
    },

	actions: {
		fileUploadProgress: function (e) {
			this.set('uploadPercentage', e.percent.toFixed(2));
		},
		fileUploadComplete: function (e) {
			this.set('uploadPercentage', 0);
			this.closeModal();
	},
	}
});
