import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: 'https://motoshare-v1.appspot.com',
  	namespace: 'api'
});
