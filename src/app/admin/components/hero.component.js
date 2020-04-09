class HeroController {
  constructor($scope, heroService, heroTypeService, heroImageService, swalService, errMessageService) {
    'ngInject';
    this.$scope = $scope;
    this.heroService = heroService;
    this.heroImageService = heroImageService;
    this.swalService = swalService;
    this.errMessageService = errMessageService;

    //get formatted hero types from hero services api
    heroTypeService.getFormattedHeroType().then(result => {
      this.heroType = result;
      this.init();
    });
  }

  init() {
    this.listDefn = {
      title: 'Hero',
      tableDefn: [
        { thead: 'SN', tbody: 'id', type: 'string' },
        { thead: 'Name', tbody: 'name', type: 'string' },
        { thead: 'Image', tbody: 'image', type: 'image', imageFunc: this.imageFunc.bind(this) },
        { thead: 'Hero Type', tbody: 'hero_type_id', type: 'select', option: this.heroType },
        { thead: 'Status', tbody: 'status', type: 'status' },
        { thead: 'Edit', tbody: 'edit', icon: 'fa fa-edit', type: 'button', action: this.cbEdit.bind(this) },
        { thead: 'Delete', tbody: 'delete', icon: 'fa fa-trash', type: 'button', action: this.cbDelete.bind(this) },
      ]
    };
    this.$scope.$apply();
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
    this.swalService.confirmWithSwal()
      .then((result) => {
        if (result.value) {
          that.heroService.remove(item.id)
            .then(() => {
              that.swalService.alertWithSwal(true);
              that.getHeroData();
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

  imageFunc(item) {
    return this.heroImageService.getHeroImageByHeroObject(item, 'thumbnail');
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

    this.modalContent = {
      'id': { 'name': 'id', 'label': 'Id', 'type': 'hidden', 'value': editId, 'error': '' },
      'name': { 'name': 'name', 'label': 'Name', 'type': 'text', 'value': name, 'error': '' },
      'hero_type_id': { 'name': 'hero_type_id', 'label': 'Hero type', 'type': 'select', option: this.heroType, 'value': hero_type_id, 'error': '' },
      'image': { 'name': 'image', 'label': 'Hero Image', 'type': 'file', 'value': {}, 'error': '' },
    };
  }

  modalSave(action, cb) {
    var that = this;
    switch (action) {
      case 'edit':
        this.heroService.edit(this.modalContent.id.value, this.modalContent.name.value, this.modalContent.hero_type_id.value, this.modalContent.image.value)
          .then(() => {
            cb(true);
            that.getHeroData();
          }).catch((err) => {
            var errors = this.errMessageService.parseError(err.data.error);
            this.modalContent.hero_type_id.error = errors.validations.hero_type_id;
            this.modalContent.name.error = errors.validations.name;
            cb(false);
          });
        break;
      default:
        this.heroService.create(this.modalContent.name.value, this.modalContent.hero_type_id.value, this.modalContent.image.value)
          .then(() => {
            cb(true);
            that.getHeroData();
          }).catch((err) => {
            var errors = this.errMessageService.parseError(err.data.error);
            this.modalContent.hero_type_id.error = errors.validations.hero_type_id;
            this.modalContent.name.error = errors.validations.name;
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
