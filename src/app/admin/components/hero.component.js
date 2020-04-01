class HeroController {
  constructor(heroService, $scope) {
    'ngInject';
    this.heroService = heroService;
    this.$scope = $scope;
  }

  $onInit() {
    this.tableDefn = this.heroService.getDefn();
    this.heroService.getData().then((result) => {
      this.tableData = result.data.data.model;
      this.$scope.$apply();
    }).catch(err => {
      console.log(err);
    });
  }
}

const HeroComponent = {
  selector: 'heroComponent',
  controller: HeroController,
  template: require('../template/hero.template.html')
};

export default HeroComponent;
