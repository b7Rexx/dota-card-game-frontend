class RegisterController {
  constructor($scope, $state, ApiService,  API_URL, ErrMessageService) {
    'ngInject';
    this.$scope = $scope;
    this.$state = $state;
    this.apiService = ApiService;
    this.errMessageService = ErrMessageService;
    this.API_URL = API_URL;
  }

  $onInit() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.registerBtn = 'Register';
    this.requiredInput = true;
  }

  /**
   * Email input change handle/validation
   */
  nameChangeHandler() {
    this.submitValidation();
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
    if (this.name && this.email && this.password)
      this.requiredInput = false;
    else
      this.requiredInput = true;
  }

  /**
   * register click handler
   */
  submitAction() {
    let that = this;
    this.requiredInput = true;
    this.registerBtn = 'Processing';
    this.apiService.request('POST', this.API_URL + '/users', {
      name: this.name,
      email: this.email,
      password: this.password
    }).then((result) => {
      that.name = '';
      that.email = '';
      that.password = '';
      that.submitValidation();
      that.$state.go('login');
    }).catch((err) => {
      that.submitValidation();
      let errors = that.errMessageService.parseError(err.data.error);
      that.registerError = 'Register failed | ' + errors.message;
      that.registerBtn = 'Register';
      that.$scope.$apply();
    });
  }
}

const RegisterComponent = {
  selector: 'registerComponent',
  controller: RegisterController,
  template: require('../template/register.template.html')
};

export default RegisterComponent;
