import Route from '@ember/routing/route';
import ENV from 'news-ui/config/environment';
import { task } from 'ember-concurrency';

const requestParams = {
        token: ENV.APP.webhoseApiKey,
        format: 'json',
        sort: 'crawled',
        language: 'english'
      };

export default Route.extend({
  // queryParams: {
  //   search: {
  //     as: 's',
  //     replace: true,
  //     refreshModel: true
  //   }
  // },

  model(params) {
    return {
      loadTask: this.get('loadTask').perform(params)
    };
  },

  loadTask: task(function * (qp) {
    let fullParams = Object.assign(requestParams, { q: qp.search });

    return yield this.store.query('post', fullParams);
  }),

  setupController(controller) {
    this._super(...arguments);

    let latest = this.get('store').peekAll('post');
    controller.set('_latest', latest);
  }

});
