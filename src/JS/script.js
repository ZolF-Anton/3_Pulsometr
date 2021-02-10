////////////////////////JQ   Kingdom////////////////////
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
    /////////////////
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
    ////////////////
    ////Валидация формы
    /////////////
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
    ///////////////////////////////
    //////////Рабoта PHP mailer'a
    $('form').submit(function (e) {
        e.preventDefault(); //отключение стандартного поведения браузера - отменяем его перезагрузку
        $.ajax({
            type: 'POST', // получить или отправить данные с сервера
            url: 'mailer/smart.php',
            data: $(this).serialize(),
        }).done(function () {
            //после выполнения PHP выполним ещё действие
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #tnx').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    /////Smooth scroll&pageUp

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageUp').fadeIn('fast');
        } else {
            $('.pageUp').fadeOut('slow');
        }
    });
    ////Scroll
    $("a[href^='#']").click(function () {
        const _href = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(_href).offset().top + 'px' });
        return false;
    });
});

//////////////////////////////////
/////////////Clear JS Phone mask
//////////////////////////////////////////////////////////////////
function phoneMaskValid(inputForms) {
    let phoneInput = document.querySelector(inputForms);
    phoneInput.addEventListener('keydown', function (event) {
        if (
            !(
                event.key == 'ArrowLeft' ||
                event.key == 'ArrowRight' ||
                event.key == 'Backspace' ||
                event.key == 'Tab'
            )
        ) {
            event.preventDefault();
        }
        let mask = '+7 (111) 111-11-11'; // Задаем маску

        if (/[0-9\+\ \-\(\)]/.test(event.key)) {
            // Здесь начинаем сравнивать this.value и mask
            // к примеру опять же
            let currentString = this.value;
            let currentLength = currentString.length;
            if (/[0-9]/.test(event.key)) {
                if (mask[currentLength] == '1') {
                    this.value = currentString + event.key;
                } else {
                    for (let i = currentLength; i < mask.length; i++) {
                        if (mask[i] == '1') {
                            this.value = currentString + event.key;
                            break;
                        }
                        currentString += mask[i];
                    }
                }
            }
        }
    });
}

phoneMaskValid('#first-form input[name="phone"]');
phoneMaskValid('#consultation input[name="phone"]');
phoneMaskValid('#order input[name="phone"]');
