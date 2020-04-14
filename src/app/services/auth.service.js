class AuthServiceFunc {
  constructor(StorageService) {
    'ngInject';
    this.storageService = StorageService;
    this.authToken = this.storageService.getItem('authToken');//session variable for token
    this.authExpire = this.storageService.getItem('authExpire');//session variable for expire time
    this.authUser = this.storageService.getItem('authUser');//session variable for user data
    this.authIsAdmin = this.storageService.getItem('authIsAdmin');//session variable for isAdmin
  }

  /**
   * Checks authentication by token and expire time
   * @returns {boolean}
   */
  isAuthenticated() {
    if (this.authToken)
      if (new Date() <= new Date(this.authExpire))
        return true;
    return false;
  }


  /**
   * Checks admin authentication by isAdmin,  token and expire time
   * @returns {boolean}
   */
  isAdminAuthenticated() {
    if (this.authIsAdmin != 0)
      if (this.authToken)
        if (new Date() <= new Date(this.authExpire))
          return true;
    return false;
  }

  /**
   * set auth session variables
   * @param {*} token 
   * @param {*} expire 
   */
  setAuth(token, expire, user, isAdmin) {
    this.authToken = token;
    this.authExpire = expire;
    this.authUser = user;
    this.authIsAdmin = isAdmin;
    this.storageService.setAuth(token, expire, user, isAdmin);
  }

  /**
   * Get session token
   * @returns {string} token
   */
  getToken() {
    return this.authToken;
  }

  /**
   * empty session
   */
  destroyAuth() {
    this.authToken = null;
    this.authExpire = null;
    this.authUser = null;
    this.authIsAdmin = null;
    this.storageService.destroyAuth();
  };
}

const AuthService = {
  selector: 'AuthService',
  service: AuthServiceFunc
};

export default AuthService;
