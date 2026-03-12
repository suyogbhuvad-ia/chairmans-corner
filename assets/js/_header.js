function fnsearchBar() {
  if ($(".search-bar-wrapper").length > 0) {
    $(".search-bar").on("click", function () {
      $(".search-bar-wrapper").addClass("active");
      $("body").css("overflow", "hidden");
      $("#GlobalSearchInput").focus();
    });
  }
}

function fnsearchBarClose() {
  if ($(".search-bar-wrapper").length > 0) {
    $(".close-search-bar").on("click", function () {
      $(".search-bar-wrapper").removeClass("active");
      $("body").css("overflow", "inherit");
    });
  }
}

function fnsearchdropDown() {
  $("#GlobalSearchInput").keyup(function () {
    var globalSearch = document.getElementById("showSearchDiv");
    if ($(this).val() == "") {
      globalSearch.style.display = "none";
    } else {
      globalSearch.style.display = "block";
    }
  });
}

// function fnDisablities(){
//   $('.wheelchair a').on('click', function(){
//     $(".disability-dropdown").slideToggle(300);
//   })
// }

function fnBiggerfont() {
  $("#bigger-font").change(function () {
    // Get the current font size of the html element
    let htmlFonts = $("html");
    let currentFontSize = parseFloat(htmlFonts.css("font-size"));

    if ($(this).is(":checked")) {
      // Calculate the new font size (increase by 10%)
      let newFontSize = currentFontSize * 6.7;

      // Set the new font size
      htmlFonts.css("font-size", newFontSize + "%");
    } else {
      // Reset the font size to the default value (16px, for example)
      htmlFonts.css("font-size", "62.5%");
    }
  });
}

//   function fnColorTheme() {
//     // Handle the click event for the color theme button
//     $(".color-theme").on('click', function() {
//         $('.color-theme-list').toggleClass('active');
//         $(this).find('span').toggleClass('active');
//         $('li.font-increase').find('span').removeClass('active');
//         $('.language-button').removeClass('active');
//     });

//     // Load the saved theme from local storage
//     let savedTheme = localStorage.getItem('themeColor');
//     if (savedTheme) {
//         $('html').addClass(savedTheme);
//         let savedImgSrc = localStorage.getItem('themeIcon');
//         $('.color-theme > span > a > img').attr('src', savedImgSrc);
//     } else {
//         // If no saved theme, set the default theme to light mode
//         $('html').addClass('light-mode');
//     }

//     // Handle the click event for the theme options
//     $(".color-theme-list > li").on('click', function() {
//         let themeColor = $(this).attr('data-theme');
//         let newImgSrc = $(this).find('img').attr('src');
//         let previousTheme = $('html').attr('class').split(' ').find(c => c.endsWith('-mode'));

//         // Remove the previous theme class
//         if (previousTheme) {
//             $('html').removeClass(previousTheme);
//         }

//         // Add the new theme class
//         $('html').addClass(themeColor);

//         // Save the new theme and icon to local storage
//         localStorage.setItem('themeColor', themeColor);
//         localStorage.setItem('themeIcon', newImgSrc);

//         // Update the theme icon
//         $('.color-theme > span > a > img').attr('src', newImgSrc);
//         $('.color-theme > span > a').attr('data-theme', themeColor);
//     });

//     // Close the theme list when clicking outside
//     $(document).on('click', function(event) {
//         if (!$(event.target).closest('.color-theme, .color-theme-list').length) {
//             $('.color-theme-list').removeClass('active');
//         }
//     });
// }

function fnFontIncrease() {
  function applyFont(fontValue) {
    let htmlElement = $("html");

    // Get current classes
    let existingClasses = htmlElement.attr("class")?.split(/\s+/) || [];
    let fontClassSet = new Set(existingClasses);
    let preservedClasses = existingClasses.filter(
      (c) =>
        ![
          "font-increase",
          "double-increase",
          "font-decrease",
          "double-decrease",
          "font-default",
        ].includes(c)
    );

    // Check if both font-increase + double-increase already present and clicked again
    if (
      fontValue === "font-increase" &&
      fontClassSet.has("font-increase") &&
      fontClassSet.has("double-increase")
    ) {
      return; // do nothing
    }

    // Check if both font-decrease + double-decrease already present and clicked again
    if (
      fontValue === "font-decrease" &&
      fontClassSet.has("font-decrease") &&
      fontClassSet.has("double-decrease")
    ) {
      return; // do nothing
    }

    // Remove old font classes
    let cleanedClasses = preservedClasses.filter(
      (c) =>
        ![
          "font-increase",
          "double-increase",
          "font-decrease",
          "double-decrease",
          "font-default",
        ].includes(c)
    );

    if (fontValue === "font-increase") {
      if (fontClassSet.has("font-increase")) {
        cleanedClasses.push("font-increase", "double-increase");
      } else {
        cleanedClasses.push("font-increase");
      }
    } else if (fontValue === "font-decrease") {
      if (fontClassSet.has("font-decrease")) {
        cleanedClasses.push("font-decrease", "double-decrease");
      } else {
        cleanedClasses.push("font-decrease");
      }
    } else if (fontValue === "font-default") {
      cleanedClasses.push("font-default");
    }

    htmlElement.attr("class", cleanedClasses.join(" ").trim());

    // Store only font-related classes
    let fontOnlyClasses = cleanedClasses.filter((c) =>
      [
        "font-increase",
        "double-increase",
        "font-decrease",
        "double-decrease",
        "font-default",
      ].includes(c)
    );
    localStorage.setItem("selectedFont", fontValue);
    localStorage.setItem("bodyClasses", fontOnlyClasses.join(" "));

    // Update display label
    $(".font-increase > span > a")
      .text($('.font-list li[data-font="' + fontValue + '"]').text())
      .attr("data-font", fontValue);
  }

  // Apply stored font classes
  let storedClasses = localStorage.getItem("bodyClasses");
  if (storedClasses) {
    let currentClasses = $("html").attr("class")?.split(/\s+/) || [];
    let nonFontClasses = currentClasses.filter(
      (c) =>
        ![
          "font-increase",
          "double-increase",
          "font-decrease",
          "double-decrease",
          "font-default",
        ].includes(c)
    );
    $("html").attr(
      "class",
      nonFontClasses.concat(storedClasses.split(/\s+/)).join(" ").trim()
    );
  }

  let storedFontValue = localStorage.getItem("selectedFont");
  let activeFontTab = localStorage.getItem("activeFontTab");

  if (activeFontTab) {
    $('.font-list li[data-font="' + activeFontTab + '"]').addClass("active");
  } else if (storedFontValue) {
    $('.font-list li[data-font="' + storedFontValue + '"]').addClass("active");
  }

  if (storedFontValue && storedFontValue !== "font-default") {
    $('.font-list li[data-font="font-default"]').removeClass("active");
  }

  // Click event for font change
  $(".font-list").on("click", "li", function (e) {
    e.stopPropagation();
    let fontValue = $(this).attr("data-font");

    applyFont(fontValue);

    $(".font-list li.active").removeClass("active");
    $(this).addClass("active");

    localStorage.setItem("activeFontTab", fontValue);

    // location.reload(); // Optional — remove if you want live change without refresh
  });

  $(document).on("click", function () {
    $(".font-list").removeClass("active");
  });
}

/*
  
function fnFontIncrease() {
  function applyFont(fontValue) {
      if (fontValue) {
          $('html').removeClass('font-increase font-decrease font-default').addClass(fontValue);
          $('.font-increase > span > a').text($('.font-list li[data-font="' + fontValue + '"]').text()).attr('data-font', fontValue);
      }
  }


  let storedFontValue = localStorage.getItem('selectedFont');
  let activeFontTab = localStorage.getItem('activeFontTab');

  applyFont(storedFontValue);

  if (activeFontTab) {
      $('.font-list li[data-font="' + activeFontTab + '"]').addClass('active');
  } else if (storedFontValue) {
      $('.font-list li[data-font="' + storedFontValue + '"]').addClass('active');
  }


  if (storedFontValue && storedFontValue !== 'font-default') {
    $('.font-list li[data-font="font-default"]').removeClass('active');
}


  $(".font-list").on('click', 'li', function(e) {
      e.stopPropagation();
      location.reload();
      let fontValue = $(this).attr('data-font');
      $('.font-increase > span > a').text($(this).text()).attr('data-font', fontValue);
      $('html').removeClass('font-increase font-decrease font-default').addClass(fontValue);

      $('.font-list li.active').removeClass('active');
      $(this).addClass('active');

    
      localStorage.setItem('selectedFont', fontValue);
      localStorage.setItem('activeFontTab', fontValue);

    
      $('.font-list').removeClass('active');
      $('.font-increase span').removeClass('active');
     
  });

 
  $(document).on('click', function(eFont) {
      $('.font-list').removeClass('active');
  });
}

*/
// If default tab is active & user changes to another tab & refreshes the page, then only the selected tab needs to be active, not the default tab.

function fnaccesbilityTab() {
  // Handle the click event for the color theme button
  $(".accessibility-tab > span").on("click", function () {
    $(".disability-dropdown").slideToggle("active");
    $(this).find("span").toggleClass("active");
    $("li.font-increase").removeClass("active");
    $(".language-button").removeClass("active");
  });

  // Load the saved theme from local storage
  let savedTheme = localStorage.getItem("themeColor");
  let savedThemeLi = localStorage.getItem("activeThemeLi");
  let activeThemeLi = localStorage.getItem("activeThemeLi");
  if (savedTheme) {
    $("html").addClass(savedTheme);
    if (savedThemeLi) {
      $(".color-theme-tab > li").removeClass("active");
      $(`.color-theme-tab > li[data-theme='${savedThemeLi}']`).addClass(
        "active"
      );
    }
  } else {
    // If no saved theme, set the default theme to light mode
    /*  $('html').addClass('light-mode');
          $('.color-theme-tab > li[data-theme="light-mode"]').addClass('active'); */
    $("html").addClass("dark-mode");
    $('.color-theme-tab > li[data-theme="dark-mode"]').addClass("active");
  }

  // Handle the click event for the theme options
  $(".color-theme-tab > li").on("click", function () {
    location.reload();
    $(".color-theme-tab > li").removeClass("active");
    $(this).addClass("active");
    let themeColor = $(this).attr("data-theme");
    //let newImgSrc = $(this).find('img').attr('src');
    let previousTheme = $("html")
      .attr("class")
      .split(" ")
      .find((c) => c.endsWith("-mode"));

    // Remove the previous theme class
    if (previousTheme) {
      $("html").removeClass(previousTheme);
    }

    // Add the new theme class
    $("html").addClass(themeColor);

    // Save the new theme and icon to local storage
    localStorage.setItem("themeColor", themeColor);
    //$('.color-theme-tab > li').attr('data-theme', themeColor);
    localStorage.setItem("activeThemeLi", themeColor);
    setTimeout(function () {
      homeRunAnimation();
    }, 300);
  });

  // Close the theme list when clicking outside
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".accessibility-tab, .disability-dropdown")
        .length
    ) {
      $(".disability-dropdown").slideUp("active");
    }
  });

  // Click event for the reset button
  $("#resetButton").on("click", function () {
    location.reload();
    $(".font-list li, .color-theme-tab > li").removeClass("active");
    $('.color-theme-tab > li[data-theme="light-mode"]').addClass("active");
    $('.font-list > li[data-font="font-default"]').addClass("active");
    $("html")
      .removeClass(
        "font-increase font-decrease double-increase double-decrease font-default dark-mode"
      )
      .addClass("light-mode");

    // Save the reset theme and font to local storage
    localStorage.setItem("themeColor", "light-mode");
    localStorage.setItem("selectedFont", "font-default");
    localStorage.removeItem("fontSize");
    localStorage.removeItem("activeThemeLi", activeThemeLi);
    localStorage.removeItem("selectedFont");
    localStorage.removeItem("activeFontTab");
    setTimeout(function () {
      homeRunAnimation();
    }, 300);
  });
}
