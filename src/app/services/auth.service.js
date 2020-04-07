class AuthServiceFunc {
  constructor() {
    'ngInject';
    // this.authToken = localStorage.getItem('authToken');//session variable for token
    // this.authExpire = localStorage.getItem('authExpire');//session variable for expire time
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
   * set auth session variables
   * @param {*} token 
   * @param {*} expire 
   */
  setAuth(token, expire) {
    this.authToken = token;
    this.authExpire = expire;
    localStorage.setItem('authToken', token);
    localStorage.setItem('authExpire', expire);
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
    localStorage.setItem('authToken', null);
    localStorage.setItem('authExpire', null);
  };
}

const AuthService = {
  selector: 'authService',
  service: AuthServiceFunc
};

export default AuthService;
