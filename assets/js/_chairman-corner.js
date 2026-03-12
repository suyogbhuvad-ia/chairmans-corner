function ChairmanSpeech() {

    function initLoad() {
        const tl = gsap.timeline();
        // 1. Logo fades in (1 second)
        tl.to(".load-logo", {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        });

        // 2. Logo stays visible (3 seconds) and then fades out (1 second)
        tl.to(".load-logo", {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
        }, "+=1"); // The "+=3" creates the 3-second delay/stay

        // 3. Container unmasks to the left
        tl.to(".load-container", {
            clipPath: "inset(0 100% 0 0)",
            duration: 1.5,
            ease: "expo.inOut",
            onComplete: () => {
                document.body.style.overflow = "auto";
                gsap.set(".load-container", {
                    display: "none"
                });
                introChairman();
            }
        });
    }

    /* setTimeout(function() {
        introChairman();
    }, 2000); */

    /* function introChairman() {
        // Create a GSAP timeline for better sequencing control
        const tl = gsap.timeline({
            defaults: {
                ease: 'power2.out'
            }
        });

        // Set initial states
        gsap.set('.img-chairman img', {
            scale: 1.8,
            filter: 'grayscale(100%)'
        });

        gsap.set('.section-screen-bg', {
            opacity: 0
        });

        // Animate both elements simultaneously
        tl.to('.img-chairman img', {
                scale: 1,
                filter: 'grayscale(0%)',
                duration: 3,
                ease: 'power3.out'
            }, 'start')
            .to('.section-screen-bg', {
                opacity: 1,
                duration: 3,
                ease: 'power3.out'
            }, 'start');

        return tl;
    } */

    function introChairman() {
        // Create timeline with callback
        const tl = gsap.timeline({
            onComplete: function() {
                //controlAnim(); // Call cpanel() when everything is done
            }
        });

        // Set initial states
        /* gsap.set('.img-chairman img', {
            opacity: 0,
        }); */

        gsap.set('.img-chairman img', {
            scale: 1.8,
            filter: 'grayscale(100%)'
        });

        gsap.set('.section-screen-bg', {
            opacity: 0,
            display: 'block' // Ensure it's visible for fade in
        });

        gsap.set('.caption-chairman', {
            opacity: 0,
            x: '50px'
        });

        // Animate image scale and filter together over 3 seconds
        /* tl.to('.img-chairman img', {
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        }, 'opacity'); */

        tl.to('.img-chairman img', {
            scale: 1,
            duration: 1.5,
            ease: 'power3.out'
        }, 'scale');

        tl.to('.img-chairman img', {
            filter: 'grayscale(0%)',
            duration: 1,
            ease: 'power2.out'
        }, 'scale+=1');

        // Fade in background AFTER scale animation completes
        tl.to('.section-screen-bg', {
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        }, 'scale');

        tl.to('.patcher', {
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        }, 'scale+=1');

        tl.to('.caption-chairman', {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out'
        }, 'scale+=1');

        tl.to('header', {
            y: 0,
            duration: 1,
            ease: 'power2.out'
        }, 'scale+=1.5');

        // Fade in background AFTER scale animation completes
        tl.to('.chairman-marquee', {
            y: 0,
            duration: 1,
            ease: 'power2.out'
        }, 'scale+=1.5');

        return tl;
    }

    gsap.set('header', {
        y: '-150%',
    });

    gsap.set('.chairman-marquee', {
        y: '150%',
    });

    function controlAnim() {
        const tl = gsap.timeline();

        // Set initial states
        /* tl.to('header', {
            y: 0,
            duration: 1,
            ease: 'power2.out'
        }, 'nav');

        // Fade in background AFTER scale animation completes
        tl.to('.chairman-marquee', {
            y: 0,
            duration: 1,
            ease: 'power2.out'
        }, 'nav'); */

        return tl;
    }

    /* function marquee() {
        var pauseOnHover = true;
        var mySwiper = new Swiper('.chairman-marquee-container', {
            direction: 'horizontal',
            loop: true,
            //noSwiping: true,
            //noSwipingClass: "swiper-wrapper",
            slidesPerView: 4.5,
            spaceBetween: 40,
            speed: 5000,
            autoplay: {
                delay: 0,
                reverseDirection: false,
                disableOnInteraction: false,
            },
        })

        $('.chairman-marquee-container').on('mouseover', function() {
            if (pauseOnHover) {
                mySwiper.autoplay.stop();
            }
        });

        $('.chairman-marquee-container').on('mouseout', function() {
            if (pauseOnHover) {
                mySwiper.autoplay.start();
            }
        });
    } */

    function marquee() {
        //var pauseOnHover = true;
        var mySwiper = new Swiper('.chairman-marquee-container', {
            loop: true,
            centeredSlides: false,
            //noSwiping: true,
            //noSwipingClass: "swiper-wrapper",
            slidesPerView: 4.5,
            spaceBetween: 40,
            speed: 5000,
        })
    }

    function popContent() {
        // State variables
        var isPopupActive = false;
        var animationTimeout = null;
        var pendingBackImagePath = '';

        // Click handler for swiper slide anchors
        $(document).on('click', '.chairman-marquee-container .swiper-slide a', function(e) {
            e.preventDefault();
            if (isPopupActive) return;

            clearTimeout(animationTimeout);
            isPopupActive = true;

            // Get and set popup image
            var screenImage = $(this).data('screen');
            var imagePath = 'dist/images/' + screenImage;
            $('#imgPopupScreenContent').attr('src', imagePath);

            // Store back image for later use (on close)
            var backImage = $(this).data('backbg');
            pendingBackImagePath = 'dist/images/' + backImage;

            // Preload images
            new Image().src = imagePath;
            new Image().src = pendingBackImagePath;

            // Reset and animate overlay open
            $('.chairman-overlay').css({
                'width': '0%',
                'left': '0',
                'right': 'auto',
                'transition': 'width 1s ease'
            });

            $('.chairman-overlay')[0].offsetHeight; // Force reflow

            setTimeout(function() {
                $('.chairman-overlay').css({
                    'width': '100%',
                    'right': '0',
                    'left': 'auto'
                });

                animationTimeout = setTimeout(function() {
                    $('.popup-content').fadeIn(300);
                    $('.chairman-overlay').css({
                        'width': '0%',
                        'left': '0',
                        'right': 'auto'
                    });
                }, 1000);
            }, 50);
        });

        // Close button handler
        $(document).on('click', '.popup-close-btn', function(e) {
            e.preventDefault();
            if (!isPopupActive) return;

            clearTimeout(animationTimeout);

            // Apply back image path when closing starts
            if (pendingBackImagePath) {
                $('#imgBackScreenContent').attr('src', pendingBackImagePath);
            }

            // Start close animation sequence
            $('.chairman-overlay').css({
                'width': '0%',
                'left': '0',
                'right': 'auto'
            });

            $('.chairman-overlay')[0].offsetHeight; // Force reflow

            setTimeout(function() {
                $('.chairman-overlay').css({
                    'width': '100%',
                    'right': '0',
                    'left': 'auto'
                });

                animationTimeout = setTimeout(function() {
                    $('.popup-content').fadeOut(300, function() {
                        $('.chairman-overlay').css({
                            'width': '0%',
                            'left': '0',
                            'right': 'auto'
                        });

                        setTimeout(function() {
                            isPopupActive = false;
                            pendingBackImagePath = '';
                        }, 1000);
                    });
                }, 1000);
            }, 50);
        });

        // Escape key handler
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && isPopupActive) {
                // Apply back image before closing
                if (pendingBackImagePath) {
                    $('#imgBackScreenContent').attr('src', pendingBackImagePath);
                }
                $('.popup-close-btn').trigger('click');
            }
        });

        // Close when clicking outside
        $(document).on('click', function(e) {
            if (isPopupActive &&
                !$(e.target).closest('.popup-content').length &&
                !$(e.target).closest('.chairman-marquee-container .swiper-slide a').length) {
                $('.popup-close-btn').trigger('click');
            }
        });
    }

    function init() {
        initLoad();
        marquee();
        popContent();
    }

    init();
}

document.addEventListener('DOMContentLoaded', ChairmanSpeech);