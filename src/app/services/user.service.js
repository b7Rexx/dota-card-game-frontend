class UserServiceFunc {
  constructor(apiService, API_URL) {
    'ngInject';
    this.API_URL = API_URL;
    this.apiService = apiService;
  }

  getDefn() {
    return [
      { thead: 'SN', tbody: 'id', type: 'string' },
      { thead: 'Name', tbody: 'name', type: 'string' },
      { thead: 'Status', tbody: 'status', type: 'status' },
      { thead: 'Action', tbody: 'edit', icon: 'fa fa-edit', type: 'button', action: this.cbEdit },
    ];
  }

  getData() {
    return this.apiService.requestWithToken('GET', this.API_URL + '/users');
  }

  cbEdit(item) {
    console.log('edit', item);
  }

}

const UserService = {
  selector: 'userService',
  service: UserServiceFunc
};

export default UserService;
