class UserController {
  constructor(userService, $scope, swalService, errMessageService) {
    'ngInject';
    this.$scope = $scope;
    this.userService = userService;
    this.swalService = swalService;
    this.errMessageService = errMessageService;

    this.listDefn = {
      title: 'Users',
      tableDefn: [
        { thead: 'SN', tbody: 'id', type: 'string' },
        { thead: 'Name', tbody: 'name', type: 'string' },
        { thead: 'Email', tbody: 'email', type: 'string' },
        { thead: 'Status', tbody: 'status', type: 'status' },
        { thead: 'Action', tbody: 'edit', icon: 'fa fa-edit', type: 'button', action: this.cbEdit.bind(this) },
        { thead: 'Delete', tbody: 'delete', icon: 'fa fa-trash', type: 'button', action: this.cbDelete.bind(this) },

      ]
    };
  }

  $onInit() {
    this.getUserData();
  }

  getUserData() {
    this.userService.getData().then((result) => {
      this.tableData = result.data.data.model;
      this.$scope.$apply();
    }).catch(err => {
      var errors = this.errMessageService.parseError(err.data.error);
      this.modalContent.hero_type_id.error = errors.validations.hero_type_id;
      this.modalContent.name.error = errors.validations.name;
    });
  }
  cbEdit(item) {
    this.openAddModal(item.id, item.name, item.email);
  }

  cbDelete(item) {
    var that = this;
    this.swalService.confirmWithSwal()
      .then((result) => {
        if (result.value) {
          that.userService.remove(item.id)
            .then(() => {
              that.swalService.alertWithSwal(true);
              that.getUserData();
            })
            .catch(() => {
              that.swalService.alertWithSwal(
                false,
                'Cancelled',
                'Something went wrong!',
              );
            });
        }
      });
  }



  /**
   * user modal functions
   */
  openAddModal(editId = null, name = '', email = '', password = '') {
    this.modalOpen = new Date();
    this.modalTitle = 'Add User';
    this.modalAction = "add";

    this.modalContent = {
      'id': { 'name': 'id', 'label': 'Id', 'type': 'hidden', 'value': editId, 'error': '' },
      'name': { 'name': 'name', 'label': 'Name', 'type': 'text', 'value': name, 'error': '' },
      'email': { 'name': 'email', 'label': 'Email', 'type': 'email', 'value': email, 'error': '' },
    };

    if (editId !== null) {
      this.modalTitle = 'Edit User';
      this.modalAction = "edit";
    } else
      this.modalContent.password = { 'name': 'password', 'label': 'Password', 'type': 'password', 'value': password, 'error': '' };

  }

  modalSave(action, cb) {
    var that = this;
    switch (action) {
      case 'edit':
        this.userService.edit(this.modalContent.id.value, this.modalContent.name.value, this.modalContent.email.value)
          .then(() => {
            cb(true);
            that.getUserData();
          }).catch((err) => {
            var errors = this.errMessageService.parseError(err.data.error);
            this.modalContent.name.error = errors.validations.name;
            this.modalContent.email.error = errors.validations.email;
            cb(false);
          });
        break;
      default:
        this.userService.create(this.modalContent.name.value, this.modalContent.email.value, this.modalContent.password.value).then(() => {
          cb(true);
          that.getUserData();
        }).catch((err) => {
          var errors = this.errMessageService.parseError(err.data.error);
          this.modalContent.name.error = errors.validations.name;
          this.modalContent.email.error = errors.validations.email;
          this.modalContent.password.error = errors.validations.password;
          cb(false);
        });
        break;
    }
  }
}

const UserComponent = {
  selector: 'userComponent',
  controller: UserController,
  template: require('../template/user.template.html')
};

export default UserComponent;
