class UserController {
  constructor(userService, $scope, swalService) {
    'ngInject';
    this.$scope = $scope;
    this.userService = userService;
    this.swalService = swalService;

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
      console.log(err);
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
      'id': { 'name': 'id', 'label': 'Id', 'type': 'hidden', 'value': editId },
      'name': { 'name': 'name', 'label': 'Name', 'type': 'text', 'value': name },
      'email': { 'name': 'email', 'label': 'Email', 'type': 'email', 'value': email },
    };

    if (editId !== null) {
      this.modalTitle = 'Edit User';
      this.modalAction = "edit";
    } else
      this.modalContent.password = { 'name': 'password', 'label': 'Password', 'type': 'password', 'value': password };

  }

  modalSave(action, cb) {
    var that = this;
    switch (action) {
      case 'edit':
        this.userService.edit(this.modalContent.id.value, this.modalContent.name.value, this.modalContent.email.value)
          .then(() => {
            cb(true);
            that.getUserData();
          }).catch(() => {
            cb(false);
          });
        break;
      default:
        this.userService.create(this.modalContent.name.value, this.modalContent.email.value, this.modalContent.password.value).then(() => {
          cb(true);
          that.getUserData();
        }).catch(() => {
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
