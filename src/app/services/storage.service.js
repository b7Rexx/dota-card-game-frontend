class StorageServiceFunc {
  constructor() {
    'ngInject';
  }

  /**
   * 
   * @param {*} key 
   * @param {boolean} parseObject 
   */
  getItem(key, parseObject = false) {
    let item = localStorage.getItem(key);
    if (parseObject) {
      if (this.isJson(item))
        item = JSON.parse(item);
      else
        item = {};
    }
    return item;
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
