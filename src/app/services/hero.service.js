class HeroServiceFunc {
  constructor(apiService, API_URL) {
    'ngInject';
    this.API_URL = API_URL;
    this.apiService = apiService;
  }

  getData() {
    return this.apiService.request('GET', this.API_URL + '/heroes/paginate?pagesize=100');
  }

  /**
   * 
   * @param {string} name 
   * @param {number} hero_type_id 
   * @param {*} image 
   */
  create(name, hero_type_id, image) {
    return this.apiService.requestWithToken('POST', this.API_URL + '/heroes', {
      name: name, hero_type_id: hero_type_id, image: image.data || null
    });
  }

  /**
   * 
   * @param {number} id 
   * @param {string} name 
   * @param {number} hero_type_id 
   * @param {*} image 
   */
  edit(id, name, hero_type_id, image) {
    return this.apiService.requestWithToken('PUT', this.API_URL + '/heroes/' + id, {
      name: name, hero_type_id: hero_type_id, image: image.data || null
    });
  }

  /**
   * 
   * @param {number} id 
   */
  remove(id) {
    return this.apiService.requestWithToken('DELETE', this.API_URL + '/heroes/' + id);
  }
}

const HeroService = {
  selector: 'heroService',
  service: HeroServiceFunc
};

export default HeroService;
