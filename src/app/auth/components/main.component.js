class MainController {
  constructor($scope, heroService, heroTypeService) {
    'ngInject';
    this.$scope = $scope;
    this.heroTypeService = heroTypeService;
    this.heroService = heroService;
    this.game = {
      start: false,
      herotypes: [],
      heroes: [],
      selected: []
    };
    this.getHeroes();
    this.getHeroTypes();
  }

  start() {
    this.game.start = true;
  }

  select(hero) {
    if (this.game.selected.includes(hero.id)) {
      this.game.selected.splice(this.game.selected.indexOf(hero.id), 1);
    } else {
      this.game.selected = [...this.game.selected, hero.id];
    }
  }

  getHeroes() {
    var that = this;
    this.heroService.getData().then((result) => {
      that.game.heroes = [...result.data.data.model];
      that.$scope.$apply();
    }).catch(err => {
      console.log(err);
    });
  }

  getHeroTypes() {
    var that = this;
    this.heroTypeService.getFormattedHeroType().then(result => {
      that.game.herotypes = [...result];
      that.$scope.$apply();
    }).catch(err => {
      console.log(err);
    });
  }
}

const MainComponent = {
  selector: 'mainComponent',
  controller: MainController,
  template: require('../template/main.template.html')
};

export default MainComponent;
