function fnTabSlider($container) {
    const dotsContainer = $container.find(".dots-style")[0];
    const dots = $container.find(".dot-style");
    const totalSlides = dots.length;
    const delay = 4000;
    const step = 50;
    let progressInterval;

    const swiper = new Swiper($container.find(".mySwiper")[0], {
        loop: true,
        autoHeight: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        speed: 600,
        autoplay: {
            delay: delay,
            disableOnInteraction: false
        },
        on: {
            slideChangeTransitionStart: function() {
                const index = this.realIndex + 1;
                updateActive(index);
                clearInterval(progressInterval); // stop old interval
            },
            slideChangeTransitionEnd: function() {
                const index = this.realIndex + 1;
                startProgress(index);
            },
        },
    });

    /* $container.hover(
      () => swiper.autoplay.stop(),
      () => swiper.autoplay.start()
    ); */

    function moveSelector($tab) {
        const width = $tab.outerWidth();
        const pos = $tab.position();
        $container
            .find(".selector-style")
            .css({
                left: pos.left + "px",
                width: width + "px"
            });
    }

    function updateActive(tabId) {
        $container.find(".tab-style").removeClass("active-tab-style");
        $container
            .find('.tab-style[data-tab="' + tabId + '"]')
            .addClass("active-tab-style");

        dots.removeClass("active-dot-style passed-dot-style");
        dots.each(function(i) {
            if (i + 1 < tabId) $(this).addClass("passed-dot-style");
        });

        $container
            .find('.dot-style[data-tab="' + tabId + '"]')
            .addClass("active-dot-style");
        moveSelector($container.find('.tab-style[data-tab="' + tabId + '"]'));
    }

    $container.find(".tab-style, .dot-style").click(function() {
        const tabId = $(this).data("tab");
        swiper.slideToLoop(tabId - 1);
    });

    function startProgress(activeIndex) {
        const baseProgress = ((activeIndex - 1) / (totalSlides - 1)) * 100;
        const startTime = Date.now();

        progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            let percentage = Math.min(
                100,
                (elapsed / delay) * (100 / (totalSlides - 1)) + baseProgress
            );
            dotsContainer.style.setProperty("--progress", percentage + "%");
            if (percentage >= (activeIndex / (totalSlides - 1)) * 100) {
                clearInterval(progressInterval);
            }
        }, step);
    }

    // Initialize selector and progress
    moveSelector($container.find(".tab-style.active-tab-style"));
    startProgress(1);

    $(window).resize(() =>
        moveSelector($container.find(".tab-style.active-tab-style"))
    );
}