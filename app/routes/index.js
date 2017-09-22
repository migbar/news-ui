import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    console.log('in replace');
    this.replaceWith('latest');
  }
});
