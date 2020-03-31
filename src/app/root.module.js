import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import './root.component.scss';

angular
  .module('root', [uiRouter])

  // components
  .component(AdminHomeComponent.selector, AdminHomeComponent)

  // routes
  .config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state(AdminHomeComponent.selector, { url: `/${AdminHomeComponent.route}`, component: AdminHomeComponent.selector });

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  });

import AdminHomeComponent from './admin/components/admin-home.component';
