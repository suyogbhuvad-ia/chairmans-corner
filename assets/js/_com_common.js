function detectPlatform() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Variables to store detected platform
    var isMac = false;
    var isWindows = false;
    var isMobile = false;

    // Detect macOS
    if (/Mac/i.test(userAgent) && !/iPhone|iPad|iPod/i.test(userAgent)) {
        isMac = true;
    }

    // Detect Windows
    if (/Windows/i.test(userAgent)) {
        isWindows = true;
    }

    // Detect mobile devices (iOS, Android)
    if (/iPhone|iPad|iPod|Android/i.test(userAgent)) {
        isMobile = true;
    }

    // Add classes to the body
    if (isMac) {
        document.body.classList.add("mac");
    }
    if (isWindows) {
        document.body.classList.add("windows");
    }
    if (isMobile) {
        document.body.classList.add("mobile");
    }
}

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function pageSmooth() {

    var winWT = window.innerWidth || document.documentElement.clientWidth;
    var winHT = window.innerHeight || document.documentElement.clientHeight;

    if (winWT >= 1081) {

        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

        ScrollTrigger.defaults({
            toggleActions: "reverse pause",
            invalidateOnRefresh: true,
            scrub: false,
        });

        // create the smooth scroller
        let smoother = ScrollSmoother.create({
            smooth: 2,
            effects: true,
            normalizeScroll: true,
            ignoreMobileResize: false,
        });
    }
}

function fnParllexBar() {
    if ($(".panel").length > 0) {
        if ($(window).width() > 1025) {
            let panels = gsap.utils.toArray(".panel");
            let tops = panels.map((panel) =>
                ScrollTrigger.create({
                    trigger: panel,
                    start: "top 1px"
                })
            );

            panels.forEach((panel, i) => {
                ScrollTrigger.create({
                    trigger: panel,
                    start: () =>
                        panel.offsetHeight < window.innerHeight ?
                        "top top" : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
                    //end:"bottom top",
                    pin: true,
                    pinSpacing: false,

                });
            });

            gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

            ScrollTrigger.defaults({
                toggleActions: "reverse pause",
                invalidateOnRefresh: true,
                scrub: false,
                // markers: { startColor: "red", endColor: "blue", fontSize: "18px", indent: 10 }
            });

            // create the smooth scroller
            let smoother = ScrollSmoother.create({
                smooth: 2,
                effects: true,
                normalizeScroll: true,
                ignoreMobileResize: false,
            });
        }
    }
}

function replaceImageDataSrc() {
    var sources = document.querySelectorAll(".iblur source");
    sources.forEach(function(source) {
        var dataSrcset = source.getAttribute("data-srcset");
        if (dataSrcset) {
            source.setAttribute("srcset", dataSrcset);
        }
    });
}

function replaceVideosDataSrc() {
    var videos = document.querySelectorAll(".vlazy");
    videos.forEach(function(video) {
        var source = video.querySelector("source");
        if (source) {
            var dataSrc = source.getAttribute("data-src");
            //console.log(dataSrc);
            if (dataSrc) {
                source.setAttribute("src", dataSrc);
                video.load(); // Reload the video element with the new source

                // Mute the video to allow autoplay
                video.muted = true;

                video.addEventListener("loadedmetadata", function() {
                    // Once the video metadata is loaded, play the video
                    video.play().catch(function(error) {
                        console.log("Autoplay prevented:", error);
                    });
                });
            }
        }
    });
}

// Call the function on document load
window.addEventListener("load", replaceVideosDataSrc);

function fnredirectToUrl(element) {
    if (element && element.getAttribute) {
        const url = element.getAttribute("data-url");
        if (url) {
            window.location.href = url;
        } else {
            console.log("Invalid URL: data-url attribute is missing or empty");
        }
    } else {
        //console.log('Invalid element: element is undefined or does not have getAttribute method');
    }
}

function fnActivetab() {
    document.addEventListener("DOMContentLoaded", function() {
        // Get the current URL path
        var path = window.location.pathname;
        var menuItems = document.querySelectorAll(".nav-wrap > li");
        menuItems.forEach(function(menuItem) {
            var link = menuItem.querySelector("a");
            if (link) {
                var href = link.getAttribute("href");
                if (path.startsWith(href)) {
                    menuItem.classList.add("active");
                }
            }
        });
    });
}

function anchorScroll() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                var top = target.offset().top;
                $('html, body').animate({
                    scrollTop: top
                }, 1000);
                return false;
            }
        }
    });
}