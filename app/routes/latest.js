import Ember from 'ember';
import ENV from 'news-ui/config/environment';

export default Ember.Route.extend({

  model() {
    let params = {
      token: ENV.APP.webhoseApiKey,
      format: 'json',
      sort: 'crawled',
      q: 'Food Trucks',
      language: 'english'
    };

    return this.store.query('post', params);
  }
});
