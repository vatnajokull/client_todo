(function() {
  'use strict';
  require('dotenv').config();

  angular
    .module('clientTodo')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, FlashProvider, $authProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    // FlashProvider
    FlashProvider.setTimeout(5000);
    FlashProvider.setShowClose(true);

    // ng-token-auth config:
   $authProvider.configure({
     apiUrl:                  '/api',
     tokenValidationPath:     '/auth/validate_token',
     signOutUrl:              '/auth/sign_out',
     emailRegistrationPath:   '/auth',
     accountUpdatePath:       '/auth',
     accountDeletePath:       '/auth',
     confirmationSuccessUrl:  window.location.href,
     passwordResetPath:       '/auth/password',
     passwordUpdatePath:      '/auth/password',
     passwordResetSuccessUrl: window.location.href,
     emailSignInPath:         '/auth/sign_in',
     storage:                 'cookies',
     forceValidateToken:      false,
     validateOnPageLoad:      true,
     proxyIf:                 function() { return false; },
     proxyUrl:                '/proxy',
     omniauthWindowType:      'sameWindow',
     tokenFormat: {
       "access-token": "{{ token }}",
       "token-type":   "Bearer",
       "client":       "{{ clientId }}",
       "expiry":       "{{ expiry }}",
       "uid":          "{{ uid }}"
     },
     cookieOps: {
       path: "/",
       expires: 9999,
       expirationUnit: 'days',
       secure: false,
       domain: process.env.DOMAIN
     },
     createPopup: function(url) {
       return window.open(url, '_blank', 'closebuttoncaption=Cancel');
     },
     parseExpiry: function(headers) {
       // convert from UTC ruby (seconds) to UTC js (milliseconds)
       return (parseInt(headers.expiry) * 1000) || null;
      },
     handleLoginResponse: function(response) {
       return response.data;
     },
     handleAccountUpdateResponse: function(response) {
       return response.data;
     },
     handleTokenValidationResponse: function(response) {
       return response.data;
     }
   });
  }

})();
