class HeroController {
  constructor() {
    'ngInject';
  }
}

const HeroComponent = {
  selector: 'heroComponent',
  route: 'hero',
  controller: HeroController,
  template: require('../template/hero.template.html')
};

export default HeroComponent;
