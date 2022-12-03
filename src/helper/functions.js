import parsePhoneNumber from 'libphonenumber-js'
import {toast} from "react-toastify";
export const functions={
    formatPhoneNumbers,
    openToaster
}

function formatPhoneNumbers(phoneNumberString, tenDigit) {

    if (phoneNumberString != undefined) {
        let nm = parsePhoneNumber(phoneNumberString);
        let lnth = nm.nationalNumber.length;

        var match = lnth > 8 ? nm.nationalNumber.match(/^(\d{3})(\d{3})(\d{4})$/) : nm.nationalNumber.match(/^(\d)(\d{3})(\d{4})$/)
        if (match) {
            return !tenDigit ? "+"+nm.countryCallingCode +" "+ match[1]+ " " + match[2] + ' ' + match[3] : phoneNumberString
        }
        return null
    } else {
        return null
    }
}

function openToaster(title){
    toast(title, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
