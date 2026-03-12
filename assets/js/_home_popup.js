function fnPopup() {
  const $overlay = $(".popup-overlay");

  // Open popup
  $(".open-popup")
    .off("click")
    .on("click", function (e) {
      e.preventDefault();

      const targetSelector = $(this).data("target");
      const $popup = $(targetSelector);

      if ($popup.length) {
        $overlay.addClass("active"); // Show overlay
        $popup.fadeIn(200).appendTo($overlay); // Move popup inside overlay
        $(".carousel-container-style").each(function () {
          fnTabSlider($(this));
        });
        $("body").css("overflow", "hidden"); // Prevent background scroll
      }
    });

  // Close popup
  $(document)
    .off("click.fnPopup")
    .on("click.fnPopup", ".close-sec, .popup-overlay", function (e) {
      if ($(e.target).is(".popup-overlay, .close-sec, .close-sec *")) {
        const $popup = $(".popup:visible");
        $popup.fadeOut(200, function () {
          $("body").css("overflow", "");
          $("body").append($popup); // Move popup back to body
        });
        $overlay.removeClass("active"); // Hide overlay
      }
    });

  // Close popup on ESC
  $(document)
    .off("keydown.fnPopup")
    .on("keydown.fnPopup", function (e) {
      if (e.key === "Escape") {
        const $popup = $(".popup:visible");
        $popup.fadeOut(200, function () {
          $("body").css("overflow", "");
          $("body").append($popup);
        });
        $overlay.removeClass("active");
      }
    });
}
