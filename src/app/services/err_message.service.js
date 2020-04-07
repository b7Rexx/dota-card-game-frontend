import { isArray } from "@uirouter/angularjs";

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
    var errorsParsed = {};
    if (Array.isArray(errors)) {
      errors.forEach(element => {
        errorsParsed[element.param] = element.message;
      });
    }
    return errorsParsed;
  }

}

const ErrMessageService = {
  selector: 'errMessageService',
  service: ErrMessageServiceFunc
};

export default ErrMessageService;
