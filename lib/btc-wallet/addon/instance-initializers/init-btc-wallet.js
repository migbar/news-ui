export function initialize(application) {
  application.lookup('service:btc-info');
}

export default {
  name: 'init-btc-wallet',
  initialize: initialize
};