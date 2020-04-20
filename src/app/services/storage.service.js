class StorageServiceFunc {
  constructor() {
    'ngInject';
  }

  getItem(key) {
    return localStorage.getItem(key) ;
  }

  /**
   * set auth session variables
   * @param {*} token 
   * @param {*} expire 
   */
  setAuth(token, expire, user, isAdmin) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authExpire', expire);
    localStorage.setItem('authUser', JSON.stringify(user));
    localStorage.setItem('authIsAdmin', isAdmin);
  }

  /**
   * empty session
   */
  destroyAuth() {
    localStorage.clear();
  };

  /**
   * 
   * @param {string} string 
   * @return {string} Json string
   */
  isJson(string) {
    let text = string || JSON.stringify({});
    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      return text;
    } else {
      return false;
    }
  }

}

const StorageService = {
  selector: 'StorageService',
  service: StorageServiceFunc
};

export default StorageService;
