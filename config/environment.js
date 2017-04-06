/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'motoshare-client',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
  ENV['ember-simple-auth'] = {
  authorizer: 'authorizer:token',
  crossOriginWhitelist: ['http://localhost:8080']
  };
  ENV['ember-simple-auth-token'] = {
    routeAfterAuthentication: 'app/profile',
    //serverTokenEndpoint: 'https://motoshare-v1.appspot.com/api/login/',
    serverTokenEndpoint: 'http://localhost:8080/api/login/',
    identificationField: 'email',
    passwordField: 'password',
    tokenPropertyName: 'access_token',
    timeFactor: 1000,
    authorizationPrefix: 'Bearer ',
    authorizationHeaderName: 'Authorization',
    //headers: {},
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com",
    'font-src': "'self' fonts.gstatic.com",
    'connect-src': "'self' maps.gstatic.com",
    'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com",
    'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com"
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
