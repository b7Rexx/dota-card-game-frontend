//env config
import '../../env';
var env = {};
if (window) {
  Object.assign(env, window.__env);
}

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';
import { requireAuthentication, redirectAuthenticated } from './services/auth.service';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome';
import '@fortawesome/fontawesome-free-solid';
import './root.component.scss';

angular
  .module('root', [uiRouter, uiBootstrap,])
  .constant('API_URL', env.API_URL)

  .run(function ($state, $transitions, authService) {
    $transitions.onStart({}, function (transition) {
      if (transition.to().authenticate === 'redirectIfAuth') {
        if (authService.isAuthenticated()) {
          $state.transitionTo("admin");
        }
      }
      if (transition.to().authenticate === 'requireAuth') {
        if (!authService.isAuthenticated()) {
          $state.transitionTo("login");
        }
      }
    });
  })

  // components
  .component(AdminHomeComponent.selector, AdminHomeComponent)
  .component(HeroComponent.selector, HeroComponent)
  .component(UserComponent.selector, UserComponent)
  .component(ListComponent.selector, ListComponent)

  .component(LoginComponent.selector, LoginComponent)


  //services
  .service(HeroService.selector, HeroService.service)
  .service(UserService.selector, UserService.service)
  .service(ApiService.selector, ApiService.service)
  .service(AuthService.selector, AuthService.service)

  // routes
  .config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('admin', { authenticate: 'requireAuth', name: 'admin', url: '/admin', component: AdminHomeComponent.selector })
      .state('heroes', { authenticate: 'requireAuth', name: 'admin.heroes', url: '/heroes', component: HeroComponent.selector, parent: 'admin' })
      .state('users', { authenticate: 'requireAuth', name: 'admin.users', url: '/users', component: UserComponent.selector, parent: 'admin' })

      .state('login', { authenticate: 'redirectIfAuth', name: 'login', url: '/login', component: LoginComponent.selector })
      ;

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/admin');
  });

import AdminHomeComponent from './admin/components/admin-home.component';
import HeroComponent from './admin/components/hero.component';
import UserComponent from './admin/components/user.component';
import ListComponent from './admin/components/list.component';

import LoginComponent from './auth/components/login.component';

import HeroService from "./services/hero.service";
import UserService from "./services/user.service";
import ApiService from "./services/api.service";
import AuthService from "./services/auth.service";
