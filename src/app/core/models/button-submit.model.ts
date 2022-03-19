export class ButtonSubmit {

    buttonText?: string;
    buttonSubmited?: boolean;

    constructor(buttonSubmitObj?) {
        if (buttonSubmitObj) {
            this.buttonText = buttonSubmitObj.buttonText;
            this.buttonSubmited = buttonSubmitObj.buttonSubmited;
        }
    }
}
