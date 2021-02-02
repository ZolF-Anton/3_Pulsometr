$(document).ready(function () {
    $('.carousel__inner').slick({
        infinite: true,
        speed: 500,

        prevArrow:
            '<button type="button" class="slick-prev"><img src="icon/red/chevron_left_solid.png" /></button>',
        nextArrow:
            '<button type="button" class="slick-next"><img src="icon/red/chevron_right_solid.png" /></button>',
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    //mobileFirst: true,

                    infinite: true,
                    dots: false,
                    swipeToSlide: true,
                    arrows: false,
                },
            },
        ],
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active')
            .siblings()
            .removeClass('catalog__tab_active')
            .closest('div.container')
            .find('div.catalog__content')
            .removeClass('catalog__content_active')
            .eq($(this).index())
            .addClass('catalog__content_active');
    });
    // Переключение табов
    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
    //Modal Window

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('fast');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #tnx, #order').fadeOut('slow'); // закрывает модальное окно
    });
    //$('.button_mini').on('click', function () {
    //$('.overlay, #order').fadeIn('fast');  }); // показывает модально окно
    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text()); //Вытаскиваем текст из карточки товара и помещаем его в модальное окно.
            $('.overlay, #order').fadeIn('fast');
        });
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                    required: true,
                    email: true,
                },
            },
            messages: {
                name: 'Будтье добры, введите своё Имя',
                phone: 'Укажите свой телефон',
                email: {
                    required: 'Укажите ваш email',
                    email: 'Почта должна быть формата name@domain.com',
                },
            },
        });
    }
    valideForms('#first-form');
    valideForms('#consultation form');
    valideForms('#order form');
});
