/**
 * Admin Home Layout  
 */
class AdminHomeController {
  constructor(authService, $state) {
    'ngInject';
    this.$state = $state;
    this.authService = authService;
  }

  logout() {
    this.authService.destroyAuth();
    this.$state.transitionTo("login");
  }
}

const AdminHomeComponent = {
  selector: 'adminHomeComponent',
  controller: AdminHomeController,
  template: require('../template/admin-home.template.html')
};

export default AdminHomeComponent;
