class RecordServiceFunc {
  constructor(ApiService) {
    'ngInject';
    this.apiService = ApiService;
  }

  getData() {
    return this.apiService.requestWithToken('GET', '/records');
  }
}

const RecordService = {
  selector: 'RecordService',
  service: RecordServiceFunc
};

export default RecordService;
