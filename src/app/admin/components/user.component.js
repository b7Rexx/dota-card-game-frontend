class UserController {
  constructor(userService, $scope) {
    'ngInject';
    this.userService = userService;
    this.$scope = $scope;
  }

  $onInit() {
    this.tableDefn = this.userService.getDefn();
    this.userService.getData().then((result) => {
      this.tableData = result.data.data.model;
      this.$scope.$apply();
    }).catch(err => {
      console.log(err);
    });
  }
}

const UserComponent = {
  selector: 'userComponent',
  controller: UserController,
  template: require('../template/user.template.html')
};

export default UserComponent;
