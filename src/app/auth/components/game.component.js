class GameController {
  constructor($scope, HeroService, HeroTypeService) {
    'ngInject';
    this.$scope = $scope;
    this.heroTypeService = HeroTypeService;
    this.heroService = HeroService;
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
    let that = this;
    this.heroService.getData()
      .then((result) => {
        that.game.heroes = [...result.data.data.model];
        that.$scope.$apply();
      }).catch(err => {
        console.log(err);
      });
  }

  getHeroTypes() {
    let that = this;
    this.heroTypeService.getFormattedHeroType()
      .then(result => {
        that.game.herotypes = [...result];
        that.$scope.$apply();
      }).catch(err => {
        console.log(err);
      });
  }
}

const GameComponent = {
  selector: 'gameComponent',
  controller: GameController,
  template: require('../template/game.template.html')
};

export default GameComponent;
