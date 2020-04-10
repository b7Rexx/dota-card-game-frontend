class NavbarController {
  constructor(authService, $state, $scope) {
    'ngInject';
    this.$state = $state;
    this.$scope = $scope;
    this.authService = authService;
    this.auth = authService.isAuthenticated();
    this.isAdmin = authService.isAdminAuthenticated();
  }

  logout() {
    this.authService.destroyAuth();
    this.$state.transitionTo("login");
  }
}

const NavbarComponent = {
  selector: 'navbarComponent',
  controller: NavbarController,
  // bindings: {
  //   auth: '<',
  //   isAdmin: '<'
  // },
  template: require('../template/navbar.template.html')
};

export default NavbarComponent;
