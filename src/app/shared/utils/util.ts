import { ErrorMessage } from 'src/app/core/models/error-message.model';
import { isObject, isNullOrUndefined, isArray } from 'util';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { $ } from 'protractor'; // Não Apagar
import * as moment from 'moment';
import { HttpHeaders } from '@angular/common/http';
import { Guid } from 'guid-typescript';

export class Util {

    /**
     * Função para setar os errors da requisição conforme de acordo com os seus tipos
     * @param errorMessage Objeto utilizado para incluir os erros
     * @param error Objeto que vem o HttpErroResponse
     * @param typeErr String para setar qual o tipo de error ex: danger, success, warning, info
     * @param errorCustom Boolean para caso queira inserir uma mensagem sem ser pelo tipo do erro da requisição
     */
    static setErrorMessage(errorMessage: ErrorMessage, error, typeErr = 'danger', errorCustom = false) {
        if (errorCustom) {
            errorMessage.errorType  = typeErr;
            errorMessage.existError = true;
            errorMessage.errorList  = this.setErrorList(error);
        }

        if (!errorCustom && error.status === 400) {
            errorMessage.errorType  = typeErr;
            errorMessage.existError = true;
            errorMessage.errorList  = this.setErrorList(error);
        }

        if (!errorCustom && error.status === 403) {
            errorMessage.errorType  = 'warning';
            errorMessage.existError = true;
            errorMessage.errorList.push('Usuário não tem permissão de acesso!');
        }

        if (!errorCustom && error.status === 0 || error.status === 404) {
            errorMessage.errorType  = 'warning';
            errorMessage.existError = true;
            errorMessage.errorList.push('Não foi possivel conectar ao servidor :(');
            errorMessage.errorList.push('Ocorreu um erro a processar o seu pedido, por favor tente novamente!');
        }

        setTimeout(() => {
            this.clearErrorMessage(errorMessage);
        }, 10000);
    }

    static setErrorMessageCustom(errorMessage: ErrorMessage, error: any, typeErr = 'danger', timeoutClearMessage = 10000) {

        errorMessage.errorType  = typeErr;
        errorMessage.existError = true;
        errorMessage.errorList  = this.setErrorListCustom(error);

        setTimeout(() => {
            this.clearErrorMessage(errorMessage);
        }, timeoutClearMessage);
    }

    /**
     * Função para Limpar Objeto utilizado para incluir os erros
     * @param errorMessage Objeto utilizado para incluir os erros
     */
    static clearErrorMessage(errorMessage: ErrorMessage) {
        errorMessage.errorType  = '';
        errorMessage.existError = false;
        errorMessage.errorList  = [];
    }

    /**
     * Função utilizada para setar os errors na lista de acordo com a requisição
     * @param error Objeto que vem o HttpErroResponse
     */
    static setErrorList(error) {
        let list = [];
        Array.isArray(error.error.errors) ? list = error.error.errors : list.push(error.error.errors);
        return list;
    }

    /**
     * Função utilizada para setar os errors na lista custumizada de acordo com a requisição
     * @param error Objeto que vem o HttpErroResponse
     */
    static setErrorListCustom(error) {
        let list = [];
        Array.isArray(error) ? list = error : list.push(error);
        return list;
    }

    /**
     * Função para alterar o valor do botão de Buscar
     * @param buttonSubmitConfig Objeto para configuração do botão
     * @param isResp Controle a submissão do botão
     */
    static setBtnFilterReq(buttonSubmitConfig?, isResp = false) {
        if (buttonSubmitConfig) {
            buttonSubmitConfig.buttonText = !isResp ? 'Buscando' : 'Buscar';
            buttonSubmitConfig.buttonSubmited = !isResp;
        }
    }

    /**
     * Função para alterar o valor do botão de Submissão
     * @param buttonSubmitConfig Objeto para configuração do submissão
     * * @param isResp Controle a submissão do botão
     */
    static setBtnSubmitReq(buttonSubmitConfig?, isResp = false) {
        if (buttonSubmitConfig) {
            buttonSubmitConfig.buttonText = !isResp ? 'Salvando' : 'Salvar';
            buttonSubmitConfig.buttonSubmited = !isResp;
        }
    }

    /**
     * Função para alterar o valor do botão de Submissão
     * @param buttonSubmitConfig Objeto para configuração do submissão
     * * @param isResp Controle a submissão do botão
     */
    static setBtnSubmitReqCustom(buttonSubmitConfig?, isResp = false, desc1 = '', desc2 = '') {
        if (buttonSubmitConfig) {
            buttonSubmitConfig.buttonText = !isResp ? desc2 : desc1;
            buttonSubmitConfig.buttonSubmited = !isResp;
        }
    }

    /**
     * Metodo para pegar o nome para a tela (cadastrar/editar)
     * @param id Identificador
     * @param detalhes Bolean para informar se a tela é de detalhes
     */
    static getScreenName(id?: string, detalhes = false) {
        return (!id || !id.trim()) ? 'ADICIONAR' : (id && !detalhes) ? 'EDITAR' : 'VISUALIZAR';
    }

    /**
     * Função para setar a classe de errro no campo
     * @param formGroup FormGroup do parametro
     * @param messageDisplay Mensagem a ser exibida
     * @param field Campo que receberá a mensagem de validação
     */
    static setErrorsValidate(formGroup: FormGroup, messageDisplay, field: string) {
        if (messageDisplay[field]) {
            return 'is-invalid';
        }
    }

    /**
     * Função para preencher os valores pelo ID
     * @param resp variavel que vem os dados da requisição
     * @param formGroup variavel que traz o form group
     */
    static patchValueForm(obj: any, formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(key => {
            if (!isNullOrUndefined(obj[key])) {
                formGroup.controls[key].patchValue(obj[key]);
            }
        });
    }

    /**
     * Adiciona na URL o parametro de "Ativo" com o valor "true"
     */
    static createFilterStatusActive() {
        const params: URLSearchParams = new URLSearchParams();
        params.append('ativo', 'true');

        return params;
    }

    /**
     * Retorna as URL Search Params utilizadas nas requisições
     */
    static createFilter() {
        const params: URLSearchParams = new URLSearchParams();
        return params;
    }

    /**
     * Remove os acentos da string
     * @param str string para ser removida os acentos
     */
    static removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    /**
     * Remove os acentos e espaços da string
     * @param str string para ser removida os acentos
     */
    static removeAccentsSpace(str: string) {
        return str.normalize('NFD').replace(/[^a-zA-Zs]/g, '');
    }

    /**
     * Limpa todos os campo do form
     * @param formGroup O form a ser limpo os campos
     */
    static clearFields(formGroup: FormGroup | FormArray) {
        Object.keys(formGroup.controls).forEach(campo => {
            const control = formGroup.get(campo);
            if (control instanceof FormGroup || control instanceof FormControl) {
                if (control instanceof FormGroup) {
                    this.clearFields(control);
                } else {
                    if (isArray(control.value)) {
                        control.setValue([]);
                    } else {
                        control.setValue('');
                    }
                }
            } else if (control instanceof FormArray) {
                control.controls.splice(0);
                control.updateValueAndValidity();
            }
        });
        formGroup.updateValueAndValidity();
    }

    /**
     * Verifica se existe algum campo preenchido no objeto informado
     * @param param Objeto a ser checado
     */
    static checkFilledField(param: object): boolean {
        let aux = 0;
        Object.keys(param).forEach(campo => {
            const item = param[campo];
            if (item) {
                if (isArray(item) && item.length > 0) {
                    aux++;
                } else if (isObject(item) && this.checkFilledField(item)) {
                    aux++;
                } else {
                    aux++;
                }
            }
        });
        return aux > 0 ? true : false;
    }

    /**
     * Cria as query params do filtro de busca
     * @param param Objero a ser convertido em parametros
     */
    static getQueryParams(param: object) {
        const params: URLSearchParams = Util.createFilter();

        Object.keys(param).forEach(campo => {
            const item = param[campo];
            if (item) {
                params.append(campo, item);
            }
        });

        return params;
    }

    /**
     * Retorna um arquivo base64
     */
    static getBase64(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    /**
     * Obtem os campos invalidos do form
     * @param form Form a ser verificado
     */
    static catchFieldsInvalids(form: FormGroup | FormArray): string[] {
        const invalidControls: string[] = [];

        const recursiveFunc = (formGP: FormGroup | FormArray) => {
            Object.keys(formGP.controls).forEach(field => {
                const control = formGP.get(field);
                if (control instanceof FormGroup) {
                    recursiveFunc(control);
                } else if (control instanceof FormArray) {
                    recursiveFunc(control);
                } else {
                    if (control.invalid) { invalidControls.push(field); }
                }
            });
        };
        recursiveFunc(form);
        return invalidControls;
    }

    /**
     * * Abre o modal no tamanho
     * @param modalService Serviço do modal
     * @param component O componente a ser aberto
     * @param size O tamanho do modal (lg, xl, sm) / Valor defaul md
     */
    static openModal(modalService: NgbModal, component: any, size: string = 'md') {
        const modalRef = modalService.open(component,
            { backdrop: 'static', size, keyboard: false, windowClass: 'modal-custom-' + size }
        );

        return modalRef;
    }

    /**
     * Convert o arquivo de base64 em BlobData
     * @param base64Data Arquivo em Base64
     * @param contentType Tipo do content type
     * @param sliceSize Tamanhp do arquivo
     */
    static convertBase64ToBlobData(base64Data: string, contentType: string = 'image/png', sliceSize = 512) {
        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

    /**
     * Realiza o download do arquivo
     * @param file Arquivo para ser baixado
     */
    static downloadFile(file: any) {
        const blobData = Util.convertBase64ToBlobData(file.base64);

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blobData, file.filename);
        } else { // chrome
            const blob = new Blob([blobData], { type: file.extension });
            const url = URL.createObjectURL(blob);
            const ext = file.extension.split('/').length > 0 ? file.extension.split('/')[1] : '';
            if (ext === 'pdf' || ext === 'PDF' ||
                ext === 'png' || ext === 'PNG' ||
                ext === 'jpg' || ext === 'JPG' ||
                ext === 'jpeg' || ext === 'JPEG') {
                window.open(url, '_blank');
                return;
            }

            const link = document.createElement('a');
            link.href = url;
            link.download = file.filename;
            link.click();
        }
    }

    static distinct(myArr, prop): any[] {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj =>
                mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }

    static getUsuarioSession() {
        const usuLocal = localStorage.getItem(`nexusApp-frontend.usuario`);
        return usuLocal ? JSON.parse(atob(usuLocal)) : null;
    }

    static getPerfilUsuarioSession() {
        const usuLocal = localStorage.getItem(`nexusApp-frontend.usuario`);
        return usuLocal ? JSON.parse(atob(usuLocal)).perfilFuncao : null;
    }

    static getListYear(): any[] {
        const yearToday = new Date().getFullYear();
        const range = [];
        range.push(yearToday);
        for (let i = 1; i < 12; i++) {
        range.push(yearToday - i);
        }
        return range;
    }

    static getRandomColor() {
        const color = Math.floor(0x1000000 * Math.random()).toString(16);
        return '#' + ('000000' + color).slice(-6);
    }

    static openModalMD(modalService: NgbModal, component) {
        const modalRef = modalService.open(component,
        {backdrop: 'static', keyboard: false, windowClass: 'modal-custom-md'}
        );

        return modalRef;
    }

    static openModalLG(modalService: NgbModal, component) {
        const modalRef = modalService.open(component,
        {backdrop: 'static', size: 'lg' , keyboard: false, windowClass: 'modal-custom-lg'}
        );

        return modalRef;
    }

    static openModalXL(modalService: NgbModal, component) {
        const modalRef = modalService.open(component,
        {backdrop: 'static', keyboard: false, windowClass: 'modal-custom-xl'}
        );

        return modalRef;
    }

    static calcAgeByDate(dataNasc) {
        return  moment().diff(dataNasc, 'years', false);
    }

    /**
     * Obtem o token da sessão para utilizar nas requisições do excel
     */
    static getOptionsExcel(): any {
        // tratar caso tenha o token
        const TOKEN = localStorage.getItem('nexusApp-frontend.token') ? 'Bearer ' + localStorage.getItem('nexusApp-frontend.token') : '';
        return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            Authorization: TOKEN
        }),
        responseType: 'blob' as 'blob',
        observe: 'response' as 'response'
        };
    }

    /**
     * Faz o download do exel informado no response.
     */
    static DownLoadFiles(response, params) {
        const FileSaver = require('file-saver');
        const blob = new Blob([response.body], {type: 'application/vnd.ms-excel;charset=utf-8'});
        FileSaver.saveAs(blob, Guid.create() + '.xlsx');
    }

    /**
     * Retira o T do timestamp
     */
    static convertDate(dateParam): string | null {
        if (!isNullOrUndefined(dateParam) && dateParam !== '') {
            const date = new Date(dateParam);
            return new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split('T')[0];
        }
        return '';
    }

}
