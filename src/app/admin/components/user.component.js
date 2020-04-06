class UserController {
  constructor(userService, $scope, Swal) {
    'ngInject';
    this.$scope = $scope;
    this.Swal = Swal;
    this.userService = userService;

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
    this.Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data set!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        that.userService.remove(item.id).then(() => {
          that.Swal.fire(
            'Deleted!',
            'Your data set has been deleted.',
            'success'
          );
          that.getUserData();
        })
          .catch(() => {
            this.Swal.fire(
              'Cancelled',
              'Something went wrong!',
              'error'
            )
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
