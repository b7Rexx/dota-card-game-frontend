class MainController {
  constructor() {
    'ngInject';
  }
}

const MainComponent = {
  selector: 'mainComponent',
  controller: MainController,
  template: require('../template/main.template.html')
};

export default MainComponent;
