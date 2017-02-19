import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('profile');
  this.route('motorcycles');
  this.route('passwordreset');
  this.route('motorcycle', { path: '/motorcycle/:motorcycle_id'});
});

export default Router;
