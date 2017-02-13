import Ember from 'ember';
 
export default Ember.Controller.extend({
  session: Ember.inject.service(),
 
  actions: {
    authenticate: function() {
    var _this = this;
      var credentials = this.getProperties('identification', 'password'),
        authenticator = 'authenticator:jwt';
 
      this.get('session').authenticate(authenticator, credentials).then(function(){
      	_this.transitionToRoute('profile');
      }, function() {
      	_this.set('errors', 'Oops, there was an error. Please check your email and password.');
      });
    }
  }
});
