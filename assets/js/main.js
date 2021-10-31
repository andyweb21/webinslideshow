jQuery(document).ready(function($) {
    
    $('.webin-slide').slick({
        infinite: false,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<a href="#" class="slick-arrow slick-prev"><svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="15 6 9 12 15 18" /></svg></a>',
        nextArrow: '<a href="#" class="slick-arrow slick-next"><svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="9 6 15 12 9 18" /></svg></a>',
    });
    $('.webin-thumbnail').slick({
        infinite: false,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        prevArrow: '<a href="#" class="slick-arrow slick-prev"><svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="15 6 9 12 15 18" /></svg></a>',
        nextArrow: '<a href="#" class="slick-arrow slick-next"><svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="9 6 15 12 9 18" /></svg></a>',
    });

})