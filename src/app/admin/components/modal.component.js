class ModalController {
  constructor($scope, $timeout) {
    'ngInject';
    this.$scope = $scope;
    this.$timeout = $timeout;
  }

  $onInit() {
    this.modalState = 'fade';
    this.loading = false;
  }

  $onChanges() {
    this.open();
  }

  open() {
    this.modalState = 'show';
    this.loading = false;
    this.saveState = false;
  }

  close() {
    this.modalState = 'fade';
  }

  save() {
    let that = this;
    that.loading = true;
    this.modalSave({
      action: this.modalAction,
      cb: function (status) {
        that.loading = false;
        if (status) {
          that.modalState = 'fade';
          that.$scope.$apply();
        } else {
          that.saveState = true;
          that.$scope.$apply();
          that.$timeout(function () {
            that.saveState = false;
            that.$scope.$apply();
          }, 2000);
        }
      }
    });
  }
}

const ModalComponent = {
  selector: 'modalComponent',
  controller: ModalController,
  template: require('../template/modal.template.html'),
  bindings: {
    modalTitle: '=',
    modalContent: '=',
    modalSave: '&',
    modalOpen: '<',
    modalAction: '<'
  },
};

export default ModalComponent;
