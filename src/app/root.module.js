import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './root.component.scss';

angular
  .module('root', [uiRouter, uiBootstrap])

  // components
  .component(AdminHomeComponent.selector, AdminHomeComponent)
  .component(HeroComponent.selector, HeroComponent)

  // routes
  .config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state(AdminHomeComponent.selector, { url: `/${AdminHomeComponent.route}`, component: AdminHomeComponent.selector })
      .state(HeroComponent.selector, { url: `/${HeroComponent.route}`, component: HeroComponent.selector, parent: AdminHomeComponent.selector })
      ;

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  });

import AdminHomeComponent from './admin/components/admin-home.component';
import HeroComponent from './admin/components/hero.component';
