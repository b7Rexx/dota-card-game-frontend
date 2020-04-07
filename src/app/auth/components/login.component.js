class LoginController {
  constructor($scope, $state, apiService, authService, API_URL, errMessageService) {
    'ngInject';
    this.$scope = $scope;
    this.$state = $state;
    this.apiService = apiService;
    this.authService = authService;
    this.errMessageService = errMessageService;
    this.API_URL = API_URL;
  }

  $onInit() {
    this.email = '';
    this.password = '';
    this.loginBtn = 'Login';
    this.requiredInput = true;
  }

  /**
   * Email input change handle/validation
   */
  emailChangeHandler() {
    this.submitValidation();
  }

  /**
   * Password input change handle/validation
   */
  passwordChangeHandler() {
    this.submitValidation();
  }

  /**
   * Submit button toggle on validation
   */
  submitValidation() {
    if (this.email && this.password)
      this.requiredInput = false;
    else
      this.requiredInput = true;
  }

  /**
   * Login click handler
   */
  submitAction() {
    var that = this;
    this.requiredInput = true;
    this.loginBtn = 'Processing';
    this.apiService.request('POST', this.API_URL + '/auth/login', {
      email: this.email,
      password: this.password
    }).then((result) => {
      that.email = '';
      that.password = '';
      that.submitValidation();
      that.authService.setAuth(result.data.token, result.data.expire_at, result.data.user, result.data.isAdmin)
      if (result.data.isAdmin)
        that.$state.go('admin');
      else
        that.$state.go('home');
    }).catch((err) => {
      that.submitValidation();
      var errors = that.errMessageService.parseError(err.data.error);
      that.loginError = 'Login failed | ' + errors.message;
      that.loginBtn = 'Login';
      that.$scope.$apply();
    });
  }
}

const LoginComponent = {
  selector: 'loginComponent',
  controller: LoginController,
  template: require('../template/login.template.html')
};

export default LoginComponent;
