// Variables
// Base options
let baseSliderOptions = { //default options of owl carousel
		items: 1,
		slideBy: 1,
		navSpeed: 400,
		responsive: {
			769: {
				dots: true,
				nav: false
			},
			1024: {
				dots: false,
				nav: true
			}
		}
	};

// General validations
let isMobile = $(window).width() <= 769, //is mobile
    isTablet = $(window).width <= 1024 && $(window).width >= 768, //is tablet
    isDesktop = !isMobile && !isTablet;


module.exports = {
    baseSliderOptions,
    isMobile,
    isTablet,
    isDesktop
};