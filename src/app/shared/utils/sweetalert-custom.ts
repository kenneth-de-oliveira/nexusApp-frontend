import Swal from 'sweetalert2';

export class SweetalertCustom {

    constructor() { }

    /**
     * Função para exibir o alerta pelo tempo
     * @param titleAlert Titulo que vai ser exibido no alerta
     * @param typeAlert Qual o tipo do alerta que deseja exibir
     * @param timerAlert Quanto tempo deseja exibir caso não queira o padrão
     */
    static showAlertTimer(
        titleAlert: string,
        typeAlert: any,
        timerAlert: number = 2000,
        textAlert?: string) {
        return Swal.fire({
            title: titleAlert,
            html: textAlert,
            icon: typeAlert.type,
            showConfirmButton: false,
            timer: timerAlert,
            allowOutsideClick: false,
        });
    }

    /**
     * Função para exibir o alerta com apenas confirmar
     * @param titleAlert Titulo que vai ser exibido no alerta
     * @param typeAlert Qual o tipo do alerta que deseja exibir
     * @param confirmButtonTxt Texto para ser exibido no Botão caso não queira o padrão
     * @param textAlert Texto complementar caso queira exibir
     */
    static showAlertConfirm(
        titleAlert: string,
        typeAlert: any,
        confirmButtonTxt: string = 'Ok',
        textAlert?: string) {
        return Swal.fire({
            title: titleAlert,
            html: textAlert,
            icon: typeAlert.type,
            confirmButtonText: confirmButtonTxt,
            allowOutsideClick: false,
        });
    }

    /**
     * Função para Exibir o alerta com confirmar e cancelar
     * @param titleAlert Titulo que vai ser exibido no alerta
     * @param typeAlert  Qual o tipo do alerta que deseja exibir
     * @param confirmButtonTxt Texto para ser exibido no Botão caso não queira o padrão
     * @param cancelButtonTxt Texto para ser exibido no Botão caso não queira o padrão
     * @param textAlert Texto complementar caso queira exibir
     */
    static showAlertConfirmAndCancel(
        titleAlert: string,
        typeAlert: any,
        textAlert?: string,
        confirmButtonTxt: string = 'Sim',
        cancelButtonTxt: string = 'Não') {
        return Swal.fire({
            title: titleAlert,
            html: textAlert,
            icon: typeAlert.type,
            showCancelButton: true,
            confirmButtonColor: '#006A46',
            cancelButtonColor: '#DE2021',
            confirmButtonText: confirmButtonTxt,
            cancelButtonText: cancelButtonTxt,
            allowOutsideClick: false,
        });
    }
}
