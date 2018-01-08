import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: ['thread'],
  // init() {
  //   this._super(...arguments);
  //   this.include = ['thread'];
  // }
});
