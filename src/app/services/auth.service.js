class AuthServiceFunc {
  constructor() {
    'ngInject';
    this.authToken = localStorage.getItem('authToken');//session variable for token
    this.authExpire = localStorage.getItem('authExpire');//session variable for expire time
    this.authUser = JSON.parse(this.isJson(localStorage.getItem('authUser')));//session variable for user data
    this.authIsAdmin = localStorage.getItem('authIsAdmin');//session variable for isAdmin
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
    localStorage.setItem('authToken', token);
    localStorage.setItem('authExpire', expire);
    localStorage.setItem('authUser', JSON.stringify(user));
    localStorage.setItem('authIsAdmin', isAdmin);
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
    localStorage.setItem('authToken', null);
    localStorage.setItem('authExpire', null);
    localStorage.setItem('authUser', null);
    localStorage.setItem('authIsAdmin', null);
  };

  /**
   * 
   * @param {string} string 
   * @return {string} Json string
   */
  isJson(string) {
    var text = string || JSON.stringify({});
    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      return text;
    } else {
      return false;
    }
  }

}

const AuthService = {
  selector: 'authService',
  service: AuthServiceFunc
};

export default AuthService;
