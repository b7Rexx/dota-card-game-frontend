/**
 * Admin Home Layout  
 */
class AdminHomeController {
  constructor() {
    'ngInject';
  }
}

const AdminHomeComponent = {
  selector: 'adminHomeComponent',
  controller: AdminHomeController,
  template: require('../template/admin-home.template.html')
};

export default AdminHomeComponent;
