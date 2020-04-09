class SwalServiceFunc {
  constructor(Swal) {
    'ngInject';
    this.Swal = Swal;
  }


  confirmWithSwal(message = null) {
    return this.Swal.fire({
      title: 'Are you sure?',
      text: message || 'You will not be able to recover this data set!',
      icon: 'warning',
      showCancelButton: true,
    });
  }

  alertWithSwal(success = true, title = null, message = null) {
    return this.Swal.fire(
      title || 'Success!',
      message || 'Your data set has been deleted.',
      success ? 'success' : 'error'
    );
  }

}

const SwalService = {
  selector: 'swalService',
  service: SwalServiceFunc
};

export default SwalService;
