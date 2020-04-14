class UserServiceFunc {
  constructor(ApiService) {
    'ngInject';
    this.apiService = ApiService;
  }


  getData() {
    return this.apiService.requestWithToken('GET', '/users');
  }

  /**
 * 
 * @param {string} name 
 * @param {number} email 
 * @param {string} password 
 */
  create(name, email, password) {
    return this.apiService.request('POST', '/users', {
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
    return this.apiService.requestWithToken('PUT', '/users/' + id, {
      name: name, email: email
    });
  }

  /**
   * 
   * @param {number} id 
   */
  remove(id) {
    return this.apiService.requestWithToken('DELETE', '/users/' + id);
  }
}

const UserService = {
  selector: 'UserService',
  service: UserServiceFunc
};

export default UserService;
