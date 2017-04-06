import Ember from 'ember';

export default Ember.Controller.extend({
	remodal: Ember.inject.service(),
	session: Ember.inject.service(),
	closeModal() {
      this.get('remodal').close();
    },
    // isUser() {
    // 	var uid = this.get('model.uid');
    // 	var userid = this.get('session.data.authenticated.uid');
    // 	if (uid === userid){
    // 		console.log('fired');
    // 		return true;
    // 	}
    // 	return false;
    // },
    isUser: function() {
    	var uid = this.get('model.uid');
    	var userid = this.get('session.data.authenticated.uid');
  		return userid === uid;
	}.property('model'),
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
