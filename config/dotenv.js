/* eslint-env node */
'use strict';

module.exports = function(env) {
  return {
    clientAllowedKeys: ['WALLET_ADDRESS'],
    // Fail build when there is missing any of clientAllowedKeys environment variables.
    // By default false.
    failOnMissingKey: true,
  };
};