import $ from 'jquery';
import { computed } from '@ember/object';
import { bind } from '@ember/runloop';
import Service from '@ember/service';
import ENV from "news-ui/config/environment";

export default Service.extend({
  satoshis: 0,
  priceString: '',
  price: 0,

  init() {
    this.fetchWalletBalance();
  },

  _handleWalletFetchResponse(d) {
    this.set('satoshis', d.balance);
    this.fetchBitcoinPrice();
  },

  _handleBitcoinPriceResponse(d) {
    let priceString = JSON.parse(d).bpi.USD.rate;
    let price = JSON.parse(d).bpi.USD.rate_float;
    this.set('price', price);
    this.set('priceString', priceString);
  },
  
  fetchWalletBalance() {
    $.get(`https://api.blockcypher.com/v1/btc/main/addrs/${ENV.APP.WALLET_ADDRESS}/balance`)
      .then(bind(this, this._handleWalletFetchResponse));
  },

  fetchBitcoinPrice() {
    $.get(`https://api.coindesk.com/v1/bpi/currentprice/USD.json`)
      .then(bind(this, this._handleBitcoinPriceResponse));
  },

  bitcoinBalance: computed('satoshis', function() {
    return this.get('satoshis') / 100000000;
  }),

  dollarBalance: computed('bitcoinBalance', 'price', function() {
    return this.get('bitcoinBalance') * this.get('price');
  })


});
