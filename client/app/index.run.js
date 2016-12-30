(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock)
    .constant('toastr', toastr)
  .config(function (toastr,ivhTreeviewOptionsProvider) {
      toastr.options.timeOut = 4000;
      toastr.options.positionClass = 'toast-bottom-right';
      ivhTreeviewOptionsProvider.set({
        idAttribute: 'id',
        labelAttribute: 'label',
        childrenAttribute: 'children',
        selectedAttribute: 'selected',
        useCheckboxes: true,
        expandToDepth: -1,
        indeterminateAttribute: '__ivhTreeviewIndeterminate',
        expandedAttribute: '__ivhTreeviewExpanded',
        defaultSelectedState: true,
        validate: true,
        twistieExpandedTpl: '(-)',
        twistieCollapsedTpl: '(+)',
        twistieLeafTpl: ''
        // nodeTpl: '...'
       });
  });

  /** @ngInject */
  function runBlock($log,$rootScope, $state, Auth,DTDefaultOptions) {
      // DTDefaultOptions.setLanguageSource('//cdn.datatables.net/plug-ins/1.10.9/i18n/Chinese.json');
     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
       if(toState.name=='index.login'){
         $rootScope.islogin = true;
       }else{
         $rootScope.islogin = false;
       }
        if (toState.authenticate) {
            Auth.isLoggedIn(function (loggedIn) {
                if (!loggedIn) {
                    event.preventDefault();
                    $state.go('index.login');
                }
            });
        }
    });
    $log.debug('runBlock end');
  }
 
})();
