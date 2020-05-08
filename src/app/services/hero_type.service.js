class HeroTypeServiceFunc {
  constructor(ApiService) {
    'ngInject';
    this.apiService = ApiService;
  }

  getData() {
    return this.apiService.request('GET', '/herotypes');
  }

  getFormattedHeroType() {
    //return format  > [{ 'name': 'Strength', 'value': 1 }, { 'name': 'Agility', 'value': 2 }, { 'name': 'Intelligence', 'value': 3 }];
    return this.getData()
      .then(res => {
        return Object.values(res.data.data.model).map(item => {
          return { name: item.name, value: item.id };
        });
      })
  }
}

const HeroTypeService = {
  selector: 'HeroTypeService',
  service: HeroTypeServiceFunc
};

export default HeroTypeService;
