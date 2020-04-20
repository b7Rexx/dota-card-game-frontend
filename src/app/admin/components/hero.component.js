class HeroController {
  constructor($scope, HeroService, HeroTypeService, HeroImageService, SwalService, ErrMessageService, ListDefinitionService) {
    'ngInject';
    this.$scope = $scope;
    this.swalService = SwalService;
    this.heroService = HeroService;
    this.heroTypeService = HeroTypeService;
    this.heroImageService = HeroImageService;
    this.errMessageService = ErrMessageService;
    this.listDefinitionService = ListDefinitionService;
    this.heroType = [];

    //get formatted hero types from hero services api
    this.heroTypeService.getFormattedHeroType()
      .then(result => {
        this.heroType = result;
        this.init();
      });
  }

  init() {
    this.listDefn = this.listDefinitionService.getListDefinition('Hero',
      [
        this.listDefinitionService.getTableColumn('SN', 'string', 'id'),
        this.listDefinitionService.getTableColumn('Name', 'string', 'name'),
        this.listDefinitionService.getTableColumn('Image', 'image', 'image', { imageFunc: this.imageFunc.bind(this) }),
        this.listDefinitionService.getTableColumn('Hero Type', 'select', 'hero_type_id', { option: this.heroType }),
        this.listDefinitionService.getTableColumn('Status', 'status', 'status'),
        this.listDefinitionService.getTableColumn('Edit', 'button', 'edit', { icon: 'fa fa-edit', action: this.onEdit.bind(this) }),
        this.listDefinitionService.getTableColumn('Delete', 'button', 'delete', { icon: 'fa fa-trash', action: this.onDelete.bind(this) })
      ]
    );
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

  onEdit(item) {
    this.openAddModal(item.id, item.name, item.hero_type_id);
  }

  onDelete(item) {
    let that = this;
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
    let that = this;
    switch (action) {
      case 'edit':
        this.heroService.edit(this.modalContent.id.value, this.modalContent.name.value, this.modalContent.hero_type_id.value, this.modalContent.image.value)
          .then(() => {
            cb(true);
            that.getHeroData();
          }).catch((err) => {
            let errors = this.errMessageService.parseError(err.data.error);
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
            let errors = this.errMessageService.parseError(err.data.error);
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
