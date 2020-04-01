class ApiServiceFunc {
  constructor($http, authToken) {
    'ngInject';
    this.$http = $http;
    this.authToken = authToken;
  }

  request(method, url, params = {}) {
    return this.httpByMethod(method, url, false, params);
  }

  requestWithToken(method, url) {
    return this.httpByMethod(method, url, true, params);
  }

  httpByMethod(method, url, token = false, params = {}) {
    var httpOptions = {
      method: method,
      url: url,
      data: params
    };
    if (token)
      httpOptions.headers = {
        Token: this.authToken
      };
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
