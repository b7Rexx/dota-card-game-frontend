class UserController {
  constructor(UserService, $scope, SwalService, ErrMessageService, ListDefinitionService) {
    'ngInject';
    this.$scope = $scope;
    this.userService = UserService;
    this.swalService = SwalService;
    this.errMessageService = ErrMessageService;
    this.listDefinitionService = ListDefinitionService;

    this.listDefn = this.listDefinitionService.getListDefinition('Users',
      [
        this.listDefinitionService.getTableColumn('SN', 'string', 'id'),
        this.listDefinitionService.getTableColumn('Name', 'string', 'name'),
        this.listDefinitionService.getTableColumn('Email', 'string', 'email'),
        this.listDefinitionService.getTableColumn('Status', 'status', 'status'),
        this.listDefinitionService.getTableColumn('Edit', 'button', 'edit', { icon: 'fa fa-edit', action: this.onEdit.bind(this) }),
        this.listDefinitionService.getTableColumn('Delete', 'button', 'delete', { icon: 'fa fa-trash', action: this.onDelete.bind(this) })
      ]
    );
  }

  $onInit() {
    this.getUserData();
  }

  getUserData() {
    this.userService.getData()
      .then((result) => {
        this.tableData = result.data.data.model;
        this.$scope.$apply();
      }).catch(err => {
        let errors = this.errMessageService.parseError(err.data.error);
        this.modalContent.hero_type_id.error = errors.validations.hero_type_id;
        this.modalContent.name.error = errors.validations.name;
      });
  }
  onEdit(item) {
    this.openAddModal(item.id, item.name, item.email);
  }

  onDelete(item) {
    let that = this;
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
    let that = this;
    switch (action) {
      case 'edit':
        this.userService.edit(this.modalContent.id.value, this.modalContent.name.value, this.modalContent.email.value)
          .then(() => {
            cb(true);
            that.getUserData();
          }).catch((err) => {
            let errors = this.errMessageService.parseError(err.data.error);
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
          let errors = this.errMessageService.parseError(err.data.error);
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
