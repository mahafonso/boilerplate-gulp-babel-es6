// Validate if the CNPJ is correct
const validateCNPJ = cnpj => {
    let isValid = false,
        isAllEqual = false,
        documentDigits = cnpj.split('');

    isAllEqual = this.validateDocumentEquality(documentDigits);

    if (!isAllEqual) {
        isValid = this.validateCNPJDigits(documentDigits);
    }

    return isValid;
}

const validateCNPJDigits = documentDigits => {
    let sumFirst = (parseInt(documentDigits[0]) * 5) + (parseInt(documentDigits[1]) * 4) + (parseInt(documentDigits[2]) * 3) + (parseInt(documentDigits[3]) * 2) + (parseInt(documentDigits[4]) * 9) + (parseInt(documentDigits[5]) * 8) + (parseInt(documentDigits[6]) * 7) + (parseInt(documentDigits[7]) * 6) + (parseInt(documentDigits[8]) * 5) + (parseInt(documentDigits[9]) * 4) + (parseInt(documentDigits[10]) * 3) + (parseInt(documentDigits[11]) * 2),
        restFirst = sumFirst % 11,
        checkDigitFirst,
        sumSecond = (parseInt(documentDigits[0]) * 6) + (parseInt(documentDigits[1]) * 5) + (parseInt(documentDigits[2]) * 4) + (parseInt(documentDigits[3]) * 3) + (parseInt(documentDigits[4]) * 2) + (parseInt(documentDigits[5]) * 9) + (parseInt(documentDigits[6]) * 8) + (parseInt(documentDigits[7]) * 7) + (parseInt(documentDigits[8]) * 6) + (parseInt(documentDigits[9]) * 5) + (parseInt(documentDigits[10]) * 4) + (parseInt(documentDigits[11]) * 3) + (parseInt(documentDigits[12]) * 2),
        restSecond = sumSecond % 11,
        checkDigitSecond;

    if (restFirst < 2) {
        checkDigitFirst = 0;
    } else {
        checkDigitFirst = 11 - restFirst;
    }

    if (restSecond < 2) {
        checkDigitSecond = 0;
    } else {
        checkDigitSecond = 11 - restSecond;
    }

    return checkDigitFirst === parseInt(documentDigits[12]) && checkDigitSecond === parseInt(documentDigits[13]);
}

const validateDocumentEquality = documentDigits => {
    let digit = documentDigits[0];

    return documentDigits.every(current => current === digit);
}

// Verify if the CNPJ already exists on MD
const verifyCNPJExists = cnpj => {
    $.ajax({
        url: `/api/dataentities/CL/search?corporateDocument=${cnpj}`,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {
            _fields: 'email,corporateDocument'
        }
    }).done(res => {
        if (res && res.length) {
            this.validCNPJ = false;

            this.$formCNPJRegister.find('#corporateDocument').addClass('error');
            this.$formCNPJRegister.find('#corporateDocument').siblings('.error-msg').find('.text').text('CNPJ já está cadastrado').fadeIn();
        } else {
            this.validCNPJ = true;

            this.$formCNPJRegister.find('#corporateDocument').removeClass('error');
            this.$formCNPJRegister.find('#corporateDocument').siblings('.error-msg').fadeOut(function() {
                $(this).find('.text').text('Preencha o CNPJ');
            });
        }
    });
}

export { validateCNPJ };
