import Ember from 'ember';

export function errorsText(params) {
  return params[0].replace(/"|{|}|:|message/g, '');
}

export default Ember.Helper.helper(errorsText);
