
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend({
  host: 'http://localhost:8080',
  //host: 'https://motoshare-v1.appspot.com',
  namespace: 'api',
});
