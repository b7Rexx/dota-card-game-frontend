class ApiServiceFunc {
  constructor($http, authToken) {
    'ngInject';
    this.$http = $http;
    this.authToken = authToken;
  }

  getAll(url) {
    return new Promise((res, rej) => {
      this.$http.get(url)
        .then(
          result => {
            res(result);
          },
          err => {
            rej(err);
          })
    });
  }

  getAllWithToken(url) {
    return new Promise((res, rej) => {
      this.$http({
        method: 'GET',
        url: url,
        headers: {
          Token: this.authToken
        }
      })
        .then(
          result => {
            res(result);
          },
          err => {
            rej(err);
          })
    });
  }



  cbEdit(item) {
    console.log('edit', item);
  }

}

const ApiService = {
  selector: 'apiService',
  service: ApiServiceFunc
};

export default ApiService;
