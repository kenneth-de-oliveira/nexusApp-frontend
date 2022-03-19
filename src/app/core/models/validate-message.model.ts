import { GenericValidatorForm } from 'src/app/shared/utils/generic-validator-form';

export class ValidateMessage {

    public messageDisplay: { [key: string]: string } = {};
    public validationMessages: { [key: string]: { [key: string]: string } };
    public genericValidator: GenericValidatorForm;

    construtor(validateMessageObj?: any) {
      if (validateMessageObj) {
        this.messageDisplay     = validateMessageObj.messageDisplay;
        this.validationMessages = validateMessageObj.validationMessages;
        this.genericValidator   = validateMessageObj.genericValidator;
      }
    }
}
