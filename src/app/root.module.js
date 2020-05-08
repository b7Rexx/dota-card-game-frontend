import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';
import Swal from 'sweetalert2'

import 'ng-file-model';
import 'zingchart';
import 'zingchart-angularjs';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome';
import '@fortawesome/fontawesome-free-solid';
import './root.component.scss';

angular
  .module('root', [uiRouter, uiBootstrap, 'ng-file-model', 'zingchart-angularjs'])
  .constant('API_URL', process.env.API_URL)
  .constant('PUBLIC_URL', process.env.PUBLIC_URL)
  .constant('Swal', Swal)

  .run(function ($state, $transitions, AuthService, $timeout) {
    $transitions.onStart({}, function (transition) {

      switch (transition.to().authenticate) {
        case 'redirectIfAuth':
          if (AuthService.isAuthenticated()) {
            $timeout(function () {
              $state.go('home')
            })
            // $state.target("home");
          }
          break;
        case 'requireAuth':
          if (!AuthService.isAuthenticated()) {
            $timeout(function () {
              $state.go('login')
            })
            // $state.target("login");
          } else {
            if (transition.to().isAdmin === true) {
              if (!AuthService.isAdminAuthenticated())
                $timeout(function () {
                  $state.go('home')
                })
              // $state.target("main");
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
  .component(DashboardComponent.selector, DashboardComponent)
  .component(HeroComponent.selector, HeroComponent)
  .component(UserComponent.selector, UserComponent)
  .component(ListComponent.selector, ListComponent)
  .component(ModalComponent.selector, ModalComponent)

  .component(MainComponent.selector, MainComponent)
  .component(GameComponent.selector, GameComponent)
  .component(HomeComponent.selector, HomeComponent)
  .component(NavbarComponent.selector, NavbarComponent)
  .component(LoginComponent.selector, LoginComponent)
  .component(RegisterComponent.selector, RegisterComponent)
  .component(ProfileComponent.selector, ProfileComponent)


  //services
  .service(HeroService.selector, HeroService.service)
  .service(HeroTypeService.selector, HeroTypeService.service)
  .service(HeroImageService.selector, HeroImageService.service)
  .service(UserService.selector, UserService.service)
  .service(ApiService.selector, ApiService.service)
  .service(AuthService.selector, AuthService.service)
  .service(SwalService.selector, SwalService.service)
  .service(ErrMessageService.selector, ErrMessageService.service)
  .service(StorageService.selector, StorageService.service)
  .service(ListDefinitionService.selector, ListDefinitionService.service)
  .service(RecordService.selector, RecordService.service)

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
      .state('dashboard', {
        authenticate: 'requireAuth', isAdmin: true,
        name: 'admin.dashboard', url: '/', component: DashboardComponent.selector, parent: 'admin'
      })
      .state('users', {
        authenticate: 'requireAuth', isAdmin: true,
        name: 'admin.users', url: '/users', component: UserComponent.selector, parent: 'admin'
      })
      .state('heroes', {
        authenticate: 'requireAuth', isAdmin: true,
        name: 'admin.heroes', url: '/heroes', component: HeroComponent.selector, parent: 'admin'
      })

      .state('main', {
        authenticate: false, isAdmin: false,
        name: 'main', url: '/main', component: MainComponent.selector
      })
      .state('game', {
        authenticate: false, isAdmin: false,
        name: 'main.game', url: '/', component: GameComponent.selector, parent: 'main'
      })
      .state('profile', {
        authenticate: 'requireAuth', isAdmin: false,
        name: 'main.profile', url: '/profile', component: ProfileComponent.selector, parent: 'main'
      })
      .state('login', {
        authenticate: 'redirectIfAuth',
        name: 'main.login', url: '/login', component: LoginComponent.selector, parent: 'main'
      })
      .state('register', {
        authenticate: 'redirectIfAuth',
        name: 'main.register', url: '/register', component: RegisterComponent.selector, parent: 'main'
      })

      .state('home', {
        authenticate: 'requireAuth', isAdmin: false,
        name: 'home', url: '/home', component: HomeComponent.selector
      })
      ;

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('main/');
  });

import AdminHomeComponent from './admin/components/admin-home.component';
import DashboardComponent from './admin/components/dashboard.component';
import HeroComponent from './admin/components/hero.component';
import UserComponent from './admin/components/user.component';
import ListComponent from './admin/components/list.component';
import ModalComponent from './admin/components/modal.component';
import NavbarComponent from './auth/components/navbar.component';
import MainComponent from './auth/components/main.component';
import GameComponent from './auth/components/game.component';
import HomeComponent from './auth/components/home.component';
import LoginComponent from './auth/components/login.component';
import RegisterComponent from './auth/components/register.component';
import ProfileComponent from './auth/components/profile.component';

import HeroService from "./services/hero.service";
import HeroTypeService from "./services/hero_type.service";
import HeroImageService from "./services/hero_image.service";
import UserService from "./services/user.service";
import ApiService from "./services/api.service";
import AuthService from "./services/auth.service";
import SwalService from "./services/swal.service";
import ErrMessageService from "./services/err_message.service";
import StorageService from "./services/storage.service";
import ListDefinitionService from "./services/list_definition.service";
import RecordService from "./services/record.service";

import OptionFilter from "./filters/option.filter";
