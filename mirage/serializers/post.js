import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  /* eslint-disable */
  include: ['thread']
  /* eslint-enable */

  //
  // following ember-eslint suggestion does not work for Mirage 'include'
  //
  // init() {
  //   this._super(...arguments);
  //   this.include = ['thread'];
  // }
});
