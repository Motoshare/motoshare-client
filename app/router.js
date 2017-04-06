import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('motorcycles');
  this.route('motorcycle', { path: '/motorcycle/:motorcycle_id'}, function() {
    this.route('edit');
    this.route('rental');
  });
  this.route('passwordreset');
  this.route('app', function() {
    this.route('mymotorcycles');
    this.route('profile');
    this.route('addmotorcycle');
  });
  this.route('not-found', { path: '/*path' });
});

export default Router;
