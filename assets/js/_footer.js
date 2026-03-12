
function footeraccord() {
    var $window = $(window);
    var windowsize = $window.width();
    if (windowsize <= 1024) {
        if($(".footer-wrapper").length > 0){
        $('.has-child').click(function(e){
        e.preventDefault();
        var $footerContent = $(this).next('.footer-sub-link');
        $('.footer-sub-link').not($footerContent).removeClass('active').slideUp();
        $footerContent.toggleClass('active').slideToggle();
    });
 
    }
}
}