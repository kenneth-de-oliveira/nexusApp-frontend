export class ErrorMessage {

    public errorType: string;
    public existError: boolean;
    public errorList: any[] = [];

    constructor(errorMessageObj?: any) {
        if (errorMessageObj) {
            this.errorType = errorMessageObj.errorType;
            this.existError = errorMessageObj.existError;
            this.errorList = errorMessageObj.errorList;
        }
    }
}
