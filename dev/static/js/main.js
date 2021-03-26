document.addEventListener('DOMContentLoaded', function () {



    jQuery('a[href^="tel:"]').attr('href', function (_, v) {
        return v.replace(/\(/g, '').replace(/\)/g, '').replace(/\ /g, '').replace(/\-/g, '');
    });

    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();

    if (document.querySelectorAll('.calc-form').length) {
        let range = document.querySelectorAll('.calc-form__elem-range');
        let field = document.querySelectorAll('.calc-form__elem-field');

        let propertyValue = document.querySelector('#property-value'); // Стоимость недвижимости
        let propertyValueRange = document.querySelector('#property-value-range');
        let initialPayment = document.querySelector('#initial-payment'); // Первоначальный взнос
        let initialPaymentRange = document.querySelector('#initial-payment-range');
        let mortgagePayment = document.querySelector('#mortgage-payment'); // Срок ипотеки
        let creditAmount = document.querySelector('#credit-amount'); // Сумма кредита
        let monthlyPayment = document.querySelector('#monthly-payment'); // Ежемесячный платёж
        let interestRate = document.querySelector('#interest-rate'); // Процентная ставка
        let monthlyInterestRate; // Месячная процентная ставка
        let numberOfPayments; // Количество платежей
        let annuityRatio; // Коэфицент аннуитета

        function initCalc() {
            creditAmount.innerText = (+propertyValue.value - +initialPayment.value).toLocaleString('ru-RU');
            initialPayment.max = propertyValue.value;
            initialPaymentRange.max = propertyValue.value;
            if ((+creditAmount.innerText.replace(/\s+/g, '')) < 0) {
                initialPayment.value = 500000;
                initialPaymentRange.value = 500000;
            }
            monthlyInterestRate = +interestRate.innerText / 12 / 100; // считаем месячную процентную ставку
            numberOfPayments = mortgagePayment.value * 12; // считаем кол-во платежей
            annuityRatio = monthlyInterestRate * (1 + monthlyInterestRate) ** numberOfPayments / ((1 + monthlyInterestRate) ** numberOfPayments - 1); // считаем коэфицент аннуитета


            monthlyPayment.innerText = Math.round(+creditAmount.innerText.replace(/\s+/g, '') * annuityRatio).toLocaleString('ru-RU');
        }
        initCalc();

        range.forEach(function (item) {
            item.addEventListener('input', function (e) {
                item.previousSibling.value = item.value;
                // let value = (this.value - this.min) / (this.max - this.min) * 100;
                // this.style.background = 'linear-gradient(to right, #efbd36 0%, #efbd36 ' + value + '%, #fff ' + value + '%, white 100%)';
                initCalc();
            });
        })
        field.forEach(function (item) {
            item.addEventListener('input', function (e) {
                item.nextSibling.value = item.value;
            });
        })
    }



    if (document.querySelectorAll('.stages').length) {
        let stageTab = document.querySelectorAll('.stages-tab__btn');
        let stageTabContent = document.querySelectorAll('.stages-content__block');
        for (let i = 0; i < stageTab.length; i++) {
            function clearTabClass() {
                for (let i = 0; i < stageTab.length; i++) {
                    stageTab[i].classList.remove('stages-tab__btn_active');
                }
            }
            stageTab[i].addEventListener('click', function () {
                for (let j = 0; j < stageTabContent.length; j++) {
                    let display = window.getComputedStyle(stageTabContent[j]).display;
                    if (display == "block") {
                        stageTabContent[j].style.display = "none";
                    }
                }
                stageTabContent[i].style.display = "block";
                clearTabClass();
                stageTab[i].classList.add('stages-tab__btn_active');
            })
        }
    }

    Inputmask({ "mask": "+7 (999) 999-99-99" }).mask('input[type="tel"]');

    if (document.querySelectorAll('.header-burger').length) {
        document.querySelector('.header-burger').addEventListener('click', function () {
            document.querySelector('.header').classList.toggle('header_active');
            document.querySelector('.header-burger').classList.toggle('header-burger_active');
        })
    }


    if (document.querySelectorAll('.slider-main').length) {
        var galleryThumbs = new Swiper('.slider-list', {
            lazy: true,
            spaceBetween: 20,
            slidesPerView: 5,
            //loop: true,
            freeMode: true,
            loopedSlides: 5, //looped slides should be the same
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
        var galleryTop = new Swiper('.slider-main', {
            lazy: {
                loadPrevNext: true,
            },
            spaceBetween: 10,
            // loop: true,
            loopedSlides: 5, //looped slides should be the same
            navigation: {
                nextEl: '.slider-main__nav-next',
                prevEl: '.slider-main__nav-prev',
            },
            thumbs: {
                swiper: galleryThumbs,
            },
            pagination: {
                el: '.slider-main__pagination',
                type: 'fraction',
            },
        });
    }



    if (document.querySelectorAll('.btn-show').length) {
        document.querySelector('.btn-show').addEventListener('click', function () {
            document.querySelector('.btn-show__link').classList.add('btn-show__link_active');
        })
    }


    // закрываем попапы
    jQuery('.cta-popup-overlay').on('click', function () {
        jQuery('.cta-popup').removeClass('cta-popup_active');
        jQuery('body').css('overflow', '');
        setTimeout(() => {
            jQuery('.cta-popup-wrap').removeClass('cta-popup-wrap_active');
            jQuery('.cta-popup-overlay').removeClass('cta-popup-overlay_active');
        }, 300);
    })
    // закрываем попапы

    // страница квартиры вторички 
    jQuery('.btn-cta').on('click', function () {
        setTimeout(() => {
            jQuery('.cta-popup__wrap .cta-popup').addClass('cta-popup_active');
        }, 100);
        jQuery('.cta-popup__wrap').addClass('cta-popup-wrap_active');
        jQuery('.cta-popup__wrap .cta-popup-overlay').addClass('cta-popup-overlay_active');
        jQuery('body').css('overflow', 'hidden');
    })
    // страница квартиры вторички 

    // узнать больше
    jQuery('.zhk-needfull__more').on('click', function () {
        setTimeout(() => {
            jQuery('.zhk-needfull__more-popup .cta-popup').addClass('cta-popup_active');
        }, 100);
        jQuery('.zhk-needfull__more-popup').addClass('cta-popup-wrap_active');
        jQuery('.zhk-needfull__more-popup .cta-popup-overlay').addClass('cta-popup-overlay_active');
        jQuery('body').css('overflow', 'hidden');
    })
    // узнать больше

    // узнать стоимость
    jQuery('.apartment-card__more').on('click', function () {
        setTimeout(() => {
            jQuery('.apartment-card__more-popup .cta-popup').addClass('cta-popup_active');
        }, 100);
        jQuery('.apartment-card__more-popup').addClass('cta-popup-wrap_active');
        jQuery('.apartment-card__more-popup .cta-popup-overlay').addClass('cta-popup-overlay_active');
        jQuery('body').css('overflow', 'hidden');
    })
    // узнать стоимость

    // КАК ПРИОБРЕСТИ
    jQuery('.zhk-how__btn').on('click', function () {
        setTimeout(() => {
            jQuery('.zhk-how__btn-popup .cta-popup').addClass('cta-popup_active');
        }, 100);
        jQuery('.zhk-how__btn-popup').addClass('cta-popup-wrap_active');
        jQuery('.zhk-how__btn-popup .cta-popup-overlay').addClass('cta-popup-overlay_active');
        jQuery('body').css('overflow', 'hidden');
    })
    // КАК ПРИОБРЕСТИ

    // ХОД СТРОИТЕЛЬСТВА
    jQuery('.zhk-process__slider-btn').on('click', function () {
        setTimeout(() => {
            jQuery('.zhk-process__slider-btn-wrap .cta-popup').addClass('cta-popup_active');
        }, 100);
        jQuery('.zhk-process__slider-btn-wrap').addClass('cta-popup-wrap_active');
        jQuery('.zhk-process__slider-btn-wrap .cta-popup-overlay').addClass('cta-popup-overlay_active');
        jQuery('body').css('overflow', 'hidden');
    })
    // ХОД СТРОИТЕЛЬСТВА


    function cardSliderInit() {
        if (document.querySelectorAll('.second-list__card-slider').length) {
            var cardSlider = new Swiper('.second-list__card-slider', {
                lazy: true,
                spaceBetween: 20,
                loop: true,
                pagination: {
                    el: '.second-list__card-pagination',
                    clickable: true,
                },
            });
        }
    }
    cardSliderInit();



    if (document.querySelectorAll('.zhk-needfull__contents').length) {
        var zhkNeedfullSlider = new Swiper('.zhk-needfull__contents', {
            autoHeight: true, //enable auto height
            spaceBetween: 20,
            // loop: true,
            navigation: {
                nextEl: '.zhk-needfull__tab-nearby',
                prevEl: '.zhk-needfull__tab-territory',
            },
        });
    }


    if (document.querySelectorAll('.zhk-presentation__slider').length) {
        var zhkPresentationSlider = new Swiper('.zhk-presentation__slider', {
            navigation: {
                nextEl: '.zhk-presentation__nav-next',
                prevEl: '.zhk-presentation__nav-prev',
            },
        });
    }



    jQuery('.zhk-apartments__filter').on('click', function () {
        jQuery('.zhk-apartments__filter').removeClass('zhk-apartments__filter_active');
        jQuery(this).addClass('zhk-apartments__filter_active');
    })
    if (document.querySelectorAll('.apartment-card').length) {
        const filterBox = document.querySelectorAll('.apartment-card');
        document.querySelector('.zhk-apartments__filters').addEventListener('click', function (event) {
            if (event.target.tagName !== 'LI') return false;
            let filterClass = event.target.dataset['f'];
            filterBox.forEach(function (elem) {
                elem.classList.remove('apartment-card_hide');
                if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
                    elem.classList.add('apartment-card_hide');
                }

            })
        })
    }




    if (document.querySelectorAll('.zhk-select__form-floor').length) {
        let countFloor = document.querySelector('.zhk-select__count-floor').textContent;
        let floorSlider = document.querySelector('.zhk-select__form-floor');
        noUiSlider.create(floorSlider, {
            start: [1, 3],
            connect: true,
            step: 1,
            range: {
                'min': 1,
                'max': +countFloor
            },
        });

        let handleLowerNum = document.createElement("div");
        handleLowerNum.classList.add('noUi-handle-lower-num');

        let handleUpperTriangle = document.createElement("div");
        handleUpperTriangle.classList.add('noUi-handle-upper-triangle');

        setTimeout(() => {
            document.querySelector('.noUi-handle-lower').prepend(handleLowerNum);
            document.querySelector('.noUi-handle-upper').prepend(handleUpperTriangle);

            let floorValues = [
                document.querySelector('.noUi-handle-lower-num'),
                document.querySelector('.noUi-handle-upper-num')
            ];

            floorSlider.noUiSlider.on('update', function (values, handle) {
                floorValues[handle].innerHTML = Math.round(values[handle]);
            });
        }, 100);
    }



    if (document.querySelectorAll('.zhk-developer__files-more').length) {
        document.querySelector('.zhk-developer__files-more').addEventListener('click', function () {
            let fileLinks = document.querySelectorAll('.zhk-developer__files-list li');
            fileLinks.forEach(function (elem) {
                elem.style.maxHeight = '400px';
                elem.style.opacity = '1';
            })
            document.querySelector('.zhk-developer__files-more').style.display = 'none';
        });
    }





    jQuery('.zhk-process__slider-tab:eq(0)').addClass('zhk-process__slider-tab_active');
    jQuery('.zhk-process__slider-content:eq(0)').addClass('zhk-process__slider-content_active');

    function processSliderInit() {
        var processSlider = new Swiper('.process-slider', {
            navigation: {
                nextEl: '.process-slider__nav-next',
                prevEl: '.process-slider__nav-prev',
            },
        });
    }
    processSliderInit();

    jQuery('.zhk-process__slider-tab').on('click', function () {
        jQuery('.zhk-process__slider-tab').removeClass('zhk-process__slider-tab_active');
        jQuery(this).addClass('zhk-process__slider-tab_active');
        jQuery('.zhk-process__slider-content').removeClass('zhk-process__slider-content_active');
        jQuery('.zhk-process__slider-content:eq(' + jQuery(this).index() + ')').addClass('zhk-process__slider-content_active');
        processSliderInit();
    })


    jQuery(window).scroll(function () {
        jQuery('.poligon_left').css({
            'top': +(jQuery(this).scrollTop() / 5) + "px"
        });
        jQuery('.poligon_right').css({
            'top': -(jQuery(this).scrollTop() / 5) + "px"
        });
    });


    jQuery(document).ajaxSuccess(function (event, xhr, settings) {
        cardSliderInit();
    });


})