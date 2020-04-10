class MainController {
  constructor() {
    'ngInject';
  console.log('main')
  }
}

const MainComponent = {
  selector: 'mainComponent',
  controller: MainController,
  template: require('../template/main.template.html')
};

export default MainComponent;
