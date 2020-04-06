class UserServiceFunc {
  constructor(apiService, API_URL) {
    'ngInject';
    this.API_URL = API_URL;
    this.apiService = apiService;
  }


  getData() {
    return this.apiService.requestWithToken('GET', this.API_URL + '/users');
  }

  /**
 * 
 * @param {string} name 
 * @param {number} email 
 * @param {string} password 
 */
  create(name, email, password) {
    return this.apiService.requestWithToken('POST', this.API_URL + '/users', {
      name: name, email: email, password: password
    });
  }

  /**
   * 
   * @param {number} id 
   * @param {string} name 
   * @param {number} email 
   * @param {string} password 
   */
  edit(id, name, email) {
    return this.apiService.requestWithToken('PUT', this.API_URL + '/users/' + id, {
      name: name, email: email
    });
  }

  /**
   * 
   * @param {number} id 
   */
  remove(id) {
    return this.apiService.requestWithToken('DELETE', this.API_URL + '/users/' + id);
  }
}

const UserService = {
  selector: 'userService',
  service: UserServiceFunc
};

export default UserService;
