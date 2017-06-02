import Ember from 'ember';
import config from './config/environment';
import { storageFor } from 'ember-local-storage';

const Router = Ember.Router.extend({
  location: config.locationType,
  messageBus: Ember.inject.service('message-bus'),
  state: storageFor('appstore'),

  closeMenu: function () {
    console.log('Route Transition closing menu.');
    this.get('messageBus').publish('menuOpen', false);
    this.set('state.menu', false);
  }.on('didTransition'),
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
