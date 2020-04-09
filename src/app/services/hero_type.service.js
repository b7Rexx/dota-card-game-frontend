class HeroTypeServiceFunc {
  constructor(apiService, API_URL) {
    'ngInject';
    this.API_URL = API_URL;
    this.apiService = apiService;
  }

  getData() {
    return this.apiService.requestWithToken('GET', this.API_URL + '/herotypes');
  }

  getFormattedHeroType() {
    //return format  > [{ 'name': 'Strength', 'value': 1 }, { 'name': 'Agility', 'value': 2 }, { 'name': 'Intelligence', 'value': 3 }];
    return this.getData().then(res => {
      return Object.values(res.data.data.model).map(item => {
        return { name: item.name, value: item.id };
      });
    })
  }
}

const HeroTypeService = {
  selector: 'heroTypeService',
  service: HeroTypeServiceFunc
};

export default HeroTypeService;
