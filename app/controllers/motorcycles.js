import Ember from 'ember';

export default Ember.Controller.extend({
	messageBus: Ember.inject.service('message-bus'),
	map: true,
	init() {
    this._super(...arguments);
    this.get('messageBus').subscribe('mapView', this, this.setMap);
    this.get('messageBus').subscribe('listView', this, this.setList);
    },
    
    isUser: function() {
        return true;
    }.property('model.uid'),

    setMap: function() {
    	this.set('map', true);
    },
    setList: function() {
    	this.set('map', false);
    }
});
