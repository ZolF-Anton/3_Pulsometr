$(document).ready(function () {
    $('.carousel__inner').slick({
        infinite: true,
        speed: 1000,
        // adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        cssEase: 'linear',
        prevArrow:
            '<button type="button" class="slick-prev"><img src="icon/red/chevron_left_solid.png" /></button>',
        nextArrow:
            '<button type="button" class="slick-next"><img src="icon/red/chevron_right_solid.png" /></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    infinite: true,
                    dots: true,
                },
            },
        ],
    });
});
