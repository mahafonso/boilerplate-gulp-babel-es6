// Get hexa of the color of a list
const gradientColors = { //hexa colors for the lists
    default_gradient: ['#00aac1', '#37ccc6'],
    cinza: ['#f4f4f4', '#828282'],
    verde: ['#1cd1b9', '#30df93'],
    laranja: ['#ff9435', '#ffcd33'],
    azul: ['#61d2fa', '#20a6e5'],
    vermelho: ['#f85580', '#f87173'],
    azul_dark: ['#0a9aec', '#2f80ed'],
    lilaz: ['#d667ff', '#7700ff'],
    amarelo: ['#ffb80a', '#ffe733'],
    rosa_dark: ['#ff5ca3', '#ff3986'],
    verde_dark: ['#27ae60', '#00db5b']
};
const getHexaGradientColor = color => gradientColors[color];

// Get the name of the month by its number
const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const getMonthByNumber = number => months[number];

export { getHexaGradientColor, getMonthByNumber }