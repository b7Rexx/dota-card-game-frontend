class ErrMessageServiceFunc {
  constructor() {
    'ngInject';
  }


  parseError(error) {
    return {
      code: error.code,
      message: error.message,
      validations: this.parseValidationError(error.details)
    };
  }

  parseValidationError(errors) {
    let errorsParsed = {};
    if (Array.isArray(errors)) {
      errors.forEach(element => {
        errorsParsed[element.param] = element.message;
      });
    }
    return errorsParsed;
  }

}

const ErrMessageService = {
  selector: 'ErrMessageService',
  service: ErrMessageServiceFunc
};

export default ErrMessageService;
