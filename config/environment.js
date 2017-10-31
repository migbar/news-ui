/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'news-ui',
    environment,
    rootURL: '/',
    // locationType: 'auto',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      webhoseApiKey: process.env.WEBHOSE_IO_API_KEY,
      Host: 'http://webhose.io'
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
  if (environment === 'development') {

    ENV['ember-cli-mirage'] = {
      enabled: false
    };

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV.contentSecurityPolicy = {
    // Deny everything by default
    'default-src': "'none'",

    // Then allow as follows:
    'connect-src': ["'self'", "http://webhose.io"],
    'img-src': "*"
  }

  return ENV;
};
