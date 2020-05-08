class ProfileController {
  constructor(UserService, $scope) {
    'ngInject';
    this.userService = UserService;
    this.user = {};
    this.user.relateRecords = [];
    this.userService.getAuthUser().then(data => {
      this.user = data.data.data.model;
      console.log('user >', this.user);
      $scope.$apply();
    });
  }

}

const ProfileComponent = {
  selector: 'profileComponent',
  controller: ProfileController,
  template: require('../template/profile.template.html')
};

export default ProfileComponent;
