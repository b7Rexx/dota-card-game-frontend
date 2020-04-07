//env config
import '../../env';
var env = {};
if (window) {
  Object.assign(env, window.__env);
}

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';
import Swal from 'sweetalert2'

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome';
import '@fortawesome/fontawesome-free-solid';
import './root.component.scss';

angular
  .module('root', [uiRouter, uiBootstrap,])
  .constant('API_URL', env.API_URL)
  .constant('Swal', Swal)

  .run(function ($state, $transitions, authService, $timeout) {
    $transitions.onStart({}, function (transition) {

      switch (transition.to().authenticate) {
        case 'redirectIfAuth':
          if (authService.isAuthenticated()) {
            $timeout(function () {
              $state.go('home')
            })
            // $state.target("home");
          }
          break;
        case 'requireAuth':
          if (!authService.isAuthenticated()) {
            $timeout(function () {
              $state.go('login')
            })
            // $state.target("login");
          } else {
            if (transition.to().isAdmin === true) {
              if (!authService.isAdminAuthenticated())
                $timeout(function () {
                  $state.go('home')
                })
              // $state.target("home");
            }
          }
          break;
        default:
          break;
      }
    });
  })

  // components
  .component(AdminHomeComponent.selector, AdminHomeComponent)
  .component(HeroComponent.selector, HeroComponent)
  .component(UserComponent.selector, UserComponent)
  .component(ListComponent.selector, ListComponent)
  .component(ModalComponent.selector, ModalComponent)

  .component(HomeComponent.selector, HomeComponent)
  .component(LoginComponent.selector, LoginComponent)
  .component(RegisterComponent.selector, RegisterComponent)


  //services
  .service(HeroService.selector, HeroService.service)
  .service(HeroTypeService.selector, HeroTypeService.service)
  .service(UserService.selector, UserService.service)
  .service(ApiService.selector, ApiService.service)
  .service(AuthService.selector, AuthService.service)
  .service(SwalService.selector, SwalService.service)
  .service(ErrMessageService.selector, ErrMessageService.service)

  //filters
  .filter(OptionFilter.selector, OptionFilter.filter)

  // routes
  .config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('admin', {
        authenticate: 'requireAuth', isAdmin: true,
        name: 'admin', url: '/admin', component: AdminHomeComponent.selector
      })
      .state('heroes', {
        authenticate: 'requireAuth', isAdmin: true,
        name: 'admin.heroes', url: '/heroes', component: HeroComponent.selector, parent: 'admin'
      })
      .state('users', {
        authenticate: 'requireAuth', isAdmin: true,
        name: 'admin.users', url: '/users', component: UserComponent.selector, parent: 'admin'
      })

      .state('home', {
        authenticate: false, isAdmin: false,
        name: 'home', url: '/home', component: HomeComponent.selector
      })
      .state('login', {
        authenticate: 'redirectIfAuth',
        name: 'home.login', url: '/login', component: LoginComponent.selector, parent: 'home'
      })
      .state('register', {
        authenticate: 'redirectIfAuth',
        name: 'home.register', url: '/register', component: RegisterComponent.selector, parent: 'home'
      })
      ;

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');
  });

import AdminHomeComponent from './admin/components/admin-home.component';
import HeroComponent from './admin/components/hero.component';
import UserComponent from './admin/components/user.component';
import ListComponent from './admin/components/list.component';
import ModalComponent from './admin/components/modal.component';

import HomeComponent from './auth/components/home.component';
import LoginComponent from './auth/components/login.component';
import RegisterComponent from './auth/components/register.component';

import HeroService from "./services/hero.service";
import HeroTypeService from "./services/hero_type.service";
import UserService from "./services/user.service";
import ApiService from "./services/api.service";
import AuthService from "./services/auth.service";
import SwalService from "./services/swal.service";
import ErrMessageService from "./services/err_message.service";

import OptionFilter from "./filters/option.filter";
