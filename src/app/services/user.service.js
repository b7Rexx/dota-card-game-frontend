class UserServiceFunc {
  constructor(ApiService, AuthService) {
    'ngInject';
    this.apiService = ApiService;
    this.authService = AuthService;
  }


  getData() {
    return this.apiService.requestWithToken('GET', '/users');
  }

  getAuthUser() {
    let authId = 0;
    if (this.authService.authUser) authId = this.authService.authUser.id || 0;
    return this.apiService.requestWithToken('GET', '/users/' + authId);
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
