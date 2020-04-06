class HeroController {
  constructor($scope, Swal, heroService) {
    'ngInject';
    this.$scope = $scope;
    this.Swal = Swal;
    this.heroService = heroService;

    this.listDefn = {
      title: 'Hero',
      tableDefn: [
        { thead: 'SN', tbody: 'id', type: 'string' },
        { thead: 'Name', tbody: 'name', type: 'string' },
        { thead: 'Hero Type', tbody: 'hero_type_id', type: 'string' },
        { thead: 'Status', tbody: 'status', type: 'status' },
        { thead: 'Edit', tbody: 'edit', icon: 'fa fa-edit', type: 'button', action: this.cbEdit.bind(this) },
        { thead: 'Delete', tbody: 'delete', icon: 'fa fa-trash', type: 'button', action: this.cbDelete.bind(this) },
      ]
    };
  }

  $onInit() {
    this.getHeroData();
  }

  getHeroData() {
    this.heroService.getData().then((result) => {
      this.tableData = result.data.data.model;
      this.$scope.$apply();
    }).catch(err => {
      console.log(err);
    });
  }

  cbEdit(item) {
    this.openAddModal(item.id, item.name, item.hero_type_id);
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
        that.heroService.remove(item.id).then(() => {
          that.Swal.fire(
            'Deleted!',
            'Your data set has been deleted.',
            'success'
          );
          that.getHeroData();
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
   * modal functions
   */
  openAddModal(editId = null, name = '', hero_type_id = '') {
    this.modalOpen = new Date();
    this.modalTitle = 'Add Hero';
    this.modalAction = "add";
    if (editId !== null) {
      this.modalTitle = 'Edit Hero';
      this.modalAction = "edit";
    }
    var heroType = [{ 'name': 'Strength', 'value': 1 }, { 'name': 'Agility', 'value': 2 }, { 'name': 'Intelligence', 'value': 3 }];

    this.modalContent = {
      'id': { 'name': 'id', 'label': 'Id', 'type': 'hidden', 'value': editId },
      'name': { 'name': 'name', 'label': 'Name', 'type': 'text', 'value': name },
      'hero_type_id': { 'name': 'hero_type_id', 'label': 'Hero type', 'type': 'select', option: heroType, 'value': hero_type_id },
    };
  }

  modalSave(action, cb) {
    var that = this;
    switch (action) {
      case 'edit':
        this.heroService.edit(this.modalContent.id.value, this.modalContent.name.value, this.modalContent.hero_type_id.value).then(() => {
          cb(true);
          that.getHeroData();
        }).catch(() => {
          cb(false);
        });
        break;
      default:
        this.heroService.create(this.modalContent.name.value, this.modalContent.hero_type_id.value).then(() => {
          cb(true);
          that.getHeroData();
        }).catch(() => {
          cb(false);
        });
        break;
    }
  }
}

const HeroComponent = {
  selector: 'heroComponent',
  controller: HeroController,
  template: require('../template/hero.template.html'),
};

export default HeroComponent;
