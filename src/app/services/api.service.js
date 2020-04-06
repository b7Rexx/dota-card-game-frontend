class ApiServiceFunc {
  constructor($http, authService) {
    'ngInject';
    this.$http = $http;
    this.authService = authService;
  }

  /**
   * Http Request without token
   * @param {*} method 
   * @param {*} url 
   * @param {*} params 
   * @returns {Promise}
   */
  request(method, url, params = {}) {
    return this.httpByMethod(method, url, false, params);
  }

  /**
   * Http Request with Token
   * @param {*} method 
   * @param {*} url 
   * @param {*} params 
   * @returns {Promise}
   */
  requestWithToken(method, url, params = {}) {
    return this.httpByMethod(method, url, true, params);
  }

  /**
   * General api consumer
   * @param {*} method 
   * @param {*} url 
   * @param {*} token 
   * @param {*} params 
   */
  httpByMethod(method, url, token = false, params = {}) {
    var httpOptions = {
      method: method,
      url: url,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json'
      },
      data: { ...params }
    };
    if (token)
      httpOptions.headers.Token = this.authService.getToken();
    return new Promise((res, rej) => {
      this.$http(httpOptions)
        .then(
          result => {
            res(result);
          },
          err => {
            rej(err);
          })
    });
  }
}

const ApiService = {
  selector: 'apiService',
  service: ApiServiceFunc
};

export default ApiService;
