// Format price to R$
const formatCurrencyBR = value => ('R$ ' + (parseFloat(value).toFixed(2).toString().replace('.',',')));

// Replace special caracteres
const replaceCaracteres = (text, changeSpace=true) => {
	let newText = text.replace(/\./g, '-')
		.replace('\'', '')
		.replace(/[áàâã]/g, 'a')
		.replace(/[éèê]/g, 'e')
		.replace(/[íìî]/g, 'i')
		.replace(/[óòôõ]/g, 'o')
		.replace(/[úùû]/g, 'u')
		.replace(/[ÁÀÂÃ]/g, 'a')
		.replace(/[ÉÈÊ]/g, 'e')
		.replace(/[ÍÌÎ]/g, 'i')
		.replace(/[ÓÒÔÕ]/g, 'o')
		.replace(/[ÚÙÛ]/g, 'u');

	if (changeSpace) {
		newText = newText.replace(/\s/g, '');
	}

	return newText;
}

// Capitalize string
const defaultNotToCapitalize = [
    'da',
    'das',
    'do',
    'dos',
    'de'
];
const splitString = text => text.split(' ');
const capitalizeString = text => {
    const textSplit = splitString(text);

    textSplit.map((currentWord, index) => {
        if (defaultNotToCapitalize.indexOf(currentWord.toLowerCase()) >= 0) {
            textSplit[index] = currentWord.toLowerCase();
        } else {
            textSplit[index] = `${currentWord.slice(0,1).toUpperCase()}${currentWord.slice(1).toLowerCase()}`;
        }
    });

    return textSplit.join(' ');
}

// Serialize the form data to an Object
const serializeObject = content => {
	var object = {};

	$.each(content, (index, current) => {
		object[current.name] = current.value;
	});

	return object;
}

export { formatCurrencyBR, replaceCaracteres, capitalizeString, serializeObject }