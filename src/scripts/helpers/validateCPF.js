const validateDocument = document => {
    let isValid = false,
        isAllEqual = false,
        documentDigits = document.split('');

    isAllEqual = this.validateDocumentEquality(documentDigits);

    if (!isAllEqual) {
        isValid = this.validateDocumentDigits(documentDigits);
    }

    return isValid;
}

const validateDocumentEquality = documentDigits => {
    let digit = documentDigits[0];

    return documentDigits.every(current => current === digit);
}

const validateDocumentDigits = documentDigits => {
    let isFirstDigitValid = false,
        isSecondDigitValid = false;

    //validate first digit
    isFirstDigitValid = this.validateSingleDocumentDigit(documentDigits, 10);
    //validate second digit
    isSecondDigitValid = this.validateSingleDocumentDigit(documentDigits, 11);

    return isFirstDigitValid && isSecondDigitValid;
}

const validateSingleDocumentDigit = (documentDigits, numberInit) => {
    let digits = documentDigits.slice(0, numberInit - 1),
        count = numberInit,
        sum = 0,
        rest = 0;

    digits.forEach(current => {
        sum += (parseInt(current) * count);
        count--;
    });

    rest = ((sum * 10) % 11);
    rest = rest === 10 ? 0 : rest;

    return rest === parseInt(documentDigits[numberInit - 1]);
}

export { validateDocument };