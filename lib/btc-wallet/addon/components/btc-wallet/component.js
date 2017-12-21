import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

import formatMoney from "accounting/format-money"

import layout from './template';

export default Component.extend({
  layout,
  classNames: ['flex'],

  btcInfo: inject(),

  bitcoinBalance: computed.reads('btcInfo.bitcoinBalance'),

  dollarBalance: computed('btcInfo.dollarBalance', function() {
    return formatMoney(this.get('btcInfo.dollarBalance'));
  }),

  bitcoinPrice: computed.reads('btcInfo.priceString')
});