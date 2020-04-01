//env config
import '../../env';
var env = {};
if (window) {
  Object.assign(env, window.__env);
}

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome';
import '@fortawesome/fontawesome-free-solid';
import './root.component.scss';

angular
  .module('root', [uiRouter, uiBootstrap])
  .constant('API_URL', env.API_URL)
  .value('authToken', null)


  // components
  .component(AdminHomeComponent.selector, AdminHomeComponent)
  .component(HeroComponent.selector, HeroComponent)
  .component(UserComponent.selector, UserComponent)
  .component(ListComponent.selector, ListComponent)


  //services
  .service(HeroService.selector, HeroService.service)
  .service(UserService.selector, UserService.service)
  .service(ApiService.selector, ApiService.service)

  // routes
  .config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('admin', { name: 'admin', url: '/admin', component: AdminHomeComponent.selector })
      .state('heroes', { name: 'admin.heroes', url: '/heroes', component: HeroComponent.selector, parent: 'admin' })
      .state('users', { name: 'admin.users', url: '/users', component: UserComponent.selector, parent: 'admin' })
      ;

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/admin');
  });

import AdminHomeComponent from './admin/components/admin-home.component';
import HeroComponent from './admin/components/hero.component';
import UserComponent from './admin/components/user.component';
import ListComponent from './admin/components/list.component';

import HeroService from "./admin/services/hero.service";
import UserService from "./admin/services/user.service";
import ApiService from "./admin/services/api.service";
