class HeroServiceFunc {
  constructor(ApiService) {
    'ngInject';
    this.apiService = ApiService;
  }

  getData() {
    return this.apiService.request('GET', '/heroes/paginate?pagesize=100');
  }

  /**
   * 
   * @param {string} name 
   * @param {number} hero_type_id 
   * @param {*} image 
   */
  create(name, hero_type_id, image) {
    return this.apiService.requestWithToken('POST', '/heroes', {
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
    return this.apiService.requestWithToken('PUT', '/heroes/' + id, {
      name: name, hero_type_id: hero_type_id, image: image.data || null
    });
  }

  /**
   * 
   * @param {number} id 
   */
  remove(id) {
    return this.apiService.requestWithToken('DELETE', '/heroes/' + id);
  }
}

const HeroService = {
  selector: 'HeroService',
  service: HeroServiceFunc
};

export default HeroService;
