class NavbarController {
  constructor(AuthService, $state, $scope) {
    'ngInject';
    this.$state = $state;
    this.$scope = $scope;
    this.authService = AuthService;
    this.auth = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdminAuthenticated();
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
