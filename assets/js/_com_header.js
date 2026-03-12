function headerLanguage() {
if($(".nav-main").length > 0){
$('.language-button').on('click', function(){
	$(this).toggleClass('active');
	$('.language-list').toggleClass('active');
	$('li.font-increase').find('span').removeClass('active');
	$('li.accessibility-tab').find('span').removeClass('active');
	
});

$('.language-item').on('click', function(){
	var itemValue = $(this).data('value');
	console.log(itemValue);
	$('.language-button span').text($(this).text()).parent().attr('data-value', itemValue);
	$('.language-list').toggleClass('active');
	$(".language-button").removeClass('active');
});

}
$(document).on('click', function(elang) {
    if (!$(elang.target).closest('.language-dropdown, .language-list').length) {
      $('.language-list').removeClass('active');
    }
  }); 
}

if($(window).width < 1025){
function mobileheader() {
    if($(".nav-main").length > 0){
	var $window = $(window);
	var windowsize = $window.width();
	if (windowsize <= 1024) {
	$('#nav-icon3').on('click', function(){
	$(this).toggleClass('open');
	$(".left-menu").toggleClass('open');
	$("body, header, html").toggleClass('overflow');
	});

	$(".has-child").click(function(){
	if ($(this).hasClass('subActive')==true){
	$(".has-child").removeClass('subActive');
	$(this).next(".sub-menu").slideUp();
	return false;	
		}
	$(".sub-menu").slideUp();
	$(".has-child").removeClass('subActive');
	$(this).addClass('subActive');
	$(this).next(".sub-menu").slideDown();
	$(".font-increase").find('span').removeClass('active');
	$(".accessibility-tab").find('span').removeClass('active');
	$(".language-button").removeClass('active');
	
		});

		$(".accessibility-tab, .font-increase, .language-button").click(function(){
			if($('.has-child').hasClass('subActive')==true){
			   $(".has-child").removeClass('active');
			   $(".has-child").next(".sub-menu").slideUp();
			   $(".has-child").removeClass('subActive');
	            return false;	
			}
			
		   })

	}
}
}
}
