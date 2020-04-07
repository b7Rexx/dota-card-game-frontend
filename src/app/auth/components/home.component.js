/**
 * Admin Home Layout  
 */
class HomeController {
  constructor() {
    'ngInject';
  }
}

const HomeComponent = {
  selector: 'homeComponent',
  controller: HomeController,
  template: require('../template/home.template.html')
};

export default HomeComponent;
