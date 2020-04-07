/**
 * User Home Layout  
 */
class HomeController {
  constructor(authService, $state) {
    'ngInject';
    this.$state = $state;
    this.authService = authService;
    this.auth = authService.isAuthenticated();
  }

  logout() {
    this.authService.destroyAuth();
    this.$state.transitionTo("login");
  }

}

const HomeComponent = {
  selector: 'homeComponent',
  controller: HomeController,
  template: require('../template/home.template.html')
};

export default HomeComponent;
