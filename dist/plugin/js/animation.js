let Htmlelement = document.querySelector('html');
var colorCode;



function colorDecide() {
    if (Htmlelement.classList.contains('dark-mode')) {
        colorCode = "#ffffff";
    } else {
        colorCode = "#393939";
    }
}

/* function homeRunAnimation() {
    colorDecide(); // Update the colorCode based on the current class
    gsap.registerPlugin(SplitText);

    const split = new SplitText(".growth-subtext", {
        type: "words,chars"
    });

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".growth-section",
                start: "top 80%",
                end: "+=75%",
                scrub: true,
                pin: false,
                markers: false,
            },
        })
        .set(
            split.chars, {
                color: colorCode,
                stagger: 0.1
            },
            0.3
        );
} */

// Initial run

let currentURL = window.location.href;
if (currentURL.includes("hi-in") || currentURL.includes("gu-in")) {
    console.log("The URL contains 'hi-in' or 'gu-in'.");
} else {
    //homeRunAnimation();
}





/*
 //animation2
 TweenMax.set(["#section-business.panel .com-heading" ], { alpha: 0, y:"50px" });
 //gsap.set(["#section-business.panel .business-list-wrap" ], { alpha: 0, y:"50px" });
 TweenMax.set(["#section-business.panel .business-list-wrap .business-listing" ], { alpha: 0, y:"50px"});
 TweenMax.set(["#section-business.panel .bussiness-slider-wrap" ], { alpha: 0, x:"36%" });
 //gsap.set(["#section-business.panel .business-list-wrap > li" ], { alpha: 0, y:"50px" });
 TweenMax.set(["#section-business.panel .business-list-wrap > li:nth-child(2)" ], { alpha: 0, y:"50px" });
 TweenMax.set(["#section-business.panel .business-list-wrap > li:nth-child(3)" ], { alpha: 0, y:"75px" });
 TweenMax.set(["#section-business.panel .business-list-wrap > li:nth-child(4)" ], { alpha: 0, y:"100px" });
 TweenMax.set(["#section-business.panel .business-list-wrap > li:nth-child(5)" ], { alpha: 0, y:"125px" });
 TweenMax.set(["#section-business.panel .business-list-wrap > li:nth-child(6)" ], { alpha: 0, y:"150px" });
 TweenMax.set(["#section-business.panel .business-list-wrap > li:nth-child(7)" ], { alpha: 0, y:"175px" });
 TweenMax.set(["#section-business.panel .mCSB_scrollTools" ], { alpha: 0,});
 TweenMax.set(["#section-business.panel .vscroll" ], { alpha: 0,});
/*const ani2 = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#section-business.panel",
      start: "30% 80%",
      end: "80% 80%",
      scrub: true,
      toggleClass:  "title-selected",
      //markers:false, 
      onEnter: () => {
        console.log("on onEnter");
        setTimeout(function(){
          $(".scrollOverLay").hide();
         
        },3000)
      },
      onEnterBack: () => {
        console.log("on onEnterBack");
        setTimeout(function(){
          $(".scrollOverLay").hide();
         
        },1000)
      },
      onLeave: () => {
        console.log("on leave");
        setTimeout(function(){
          $(".scrollOverLay").show();
         
        },500)

      },

      onLeaveBack: () => {
        console.log("on leave back");
        setTimeout(function(){
          $(".scrollOverLay").show();
         
        },500)

      },
     
     
    },
  }).add([

    TweenMax.to("#section-business.panel .com-heading", { y: 0, alpha: 1, duration: 4,  }),
    //TweenMax.to("#section-business.panel .business-list-wrap", { y: 0, opacity: 1, duration: 1.4 }),
    TweenMax.to("#section-business.panel .bussiness-slider-wrap", 10, {  opacity: 1, x: 0, duration: 10, ease: "power1.inOut", delay: 0.5 }),
    TweenMax.to("#section-business.panel .business-list-wrap .business-listing", 4, { y: 0, opacity: 1,  ease: "power1.inOut", delay: 0.5 }),
    TweenMax.to("#section-business.panel .business-list-wrap > li:nth-child(2)", 5.7, {opacity: 1, y:0,  ease: "power1.inOut", delay: 4 }),
    TweenMax.to("#section-business.panel .business-list-wrap > li:nth-child(3)", 5.7, {opacity: 1, y:0,  ease: "power1.inOut", delay: 4.5}),
    TweenMax.to("#section-business.panel .business-list-wrap > li:nth-child(4)", 5.7,{opacity: 1, y:0,  ease: "power1.inOut", delay: 5.0 }),
    TweenMax.to("#section-business.panel .business-list-wrap > li:nth-child(5)", 5.7,{opacity: 1, y:0,  ease: "power1.inOut", delay: 5.5}),
    TweenMax.to("#section-business.panel .business-list-wrap > li:nth-child(6)", 5.2,{opacity: 1, y:0,  ease: "power1.inOut", delay: 6 }),
    TweenMax.to("#section-business.panel .business-list-wrap > li:nth-child(7)", 5.2,{opacity: 1, y:0,  ease: "power1.inOut", delay: 6.5}),
    TweenMax.to("#section-growth.panel", {alpha: 0, duration: 4,  }),
    TweenMax.to("#section-business.panel .vscroll", 8, {alpha: 1, delay: 10}),
    
    
   
    

  ])

*/

//animation3
//TweenMax.set(["#section-sustainability.panel .Sustainability-wrapper .com-heading" ], { alpha: 0, y:"50px" });
//  gsap.set(["#section-sustainability.panel .com-threeImageSlider" ], { alpha: 0, x:"-200px" });
//TweenMax.set(["#section-sustainability.panel .com-threeImageSlider .three-imgeSlideBox" ], { alpha: 0, y:"100px" });
// gsap.set(["#section-sustainability.panel .com-threeImageSlider" ], { alpha: 0, y:"50px" });
//TweenMax.set(["#section-sustainability.panel .com-threeImageSlider .slide-text-box" ], { alpha: 0, x:"150px" });

// const ani3 = gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: "#section-sustainability.panel",
//       start: "25% 80%",
//       end: "80% 80%",
//       scrub: true,
//       markers: false,
//     },
//   }).add([

//TweenMax.to("#section-sustainability.panel .Sustainability-wrapper .com-heading", 4,  { y: 0, alpha: 1, delay:0}),
//   .to("#section-sustainability.panel .com-threeImageSlider", { x: 0, opacity: 1, duration: 1.4 }),
// .to("#section-sustainability.panel .com-threeImageSlider", { y: 0, opacity: 1, duration: 1.4 }),
// TweenMax.to("#section-sustainability.panel .com-threeImageSlider .three-imgeSlideBox:nth-child(1)", 5,  { y: 0, alpha: 1,  delay: .75 }),
// TweenMax.to("#section-sustainability.panel .com-threeImageSlider .three-imgeSlideBox:nth-child(2)", 6, { y: 0, alpha: 1,  delay: 1.75 }),
// TweenMax.to("#section-sustainability.panel .com-threeImageSlider .three-imgeSlideBox:nth-child(3)", 7, { y: 0, alpha: 1, delay: 2.75 }),
// TweenMax.to("#section-sustainability.panel .com-threeImageSlider .three-imgeSlideBox:nth-child(1) .slide-text-box", 6, { x: 0, alpha: 1,  delay: .75 }),
// TweenMax.to("#section-sustainability.panel .com-threeImageSlider .three-imgeSlideBox:nth-child(2) .slide-text-box", 6, { x: 0, alpha: 1,   delay: .75  }),
// TweenMax.to("#section-sustainability.panel .com-threeImageSlider .three-imgeSlideBox:nth-child(3) .slide-text-box", 6, { x: 0, alpha: 1,  delay: .75 }),
// TweenMax.to("#section-business.panel", {alpha: 0, duration: 4,  }),

//])

/*

//animation 4
TweenMax.set(["#section-newsroom.panel .newsroom-wrapper .com-heading" ], { alpha: 0, y:"50px" });
TweenMax.set(["#section-newsroom.panel .right-btn " ], { alpha: 0, x:"50px" });
//TweenMax.set(["#section-newsroom.panel .com-twoImageSlider .image-box" ], { alpha: 0, y:"100px" });
TweenMax.set([
  "#section-newsroom .two-imgeSlideBox:nth-child(1) .image-box", "#section-newsroom .two-imgeSlideBox:nth-child(1) .slide-text-box",
  "#section-newsroom .two-imgeSlideBox:nth-child(2) .image-box", "#section-newsroom .two-imgeSlideBox:nth-child(2) .slide-text-box",
], { alpha: 0, y:"100px" });
 //gsap.set(["#section-newsroom.panel .com-twoImageSlider .slide-text-box" ], { alpha: 0, y:"50px" });

const ani4 = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#section-newsroom.panel",
      start: "30% 75%",
      end: "90% 90%",
      scrub: 1,
      markers:false,

    },
  }).add([
    TweenMax.to("#section-newsroom.panel .newsroom-wrapper .com-heading", 3, { y: 0, alpha: 1}),

    TweenMax.to("#section-newsroom .two-imgeSlideBox:nth-child(1) .image-box",         4,      {alpha:   1.0, y:0, delay:2.0 }),
    TweenMax.to("#section-newsroom .two-imgeSlideBox:nth-child(1) .slide-text-box",         4,      {alpha:   1.0, y:0, delay:2.0 }),
  
    TweenMax.to("#section-newsroom .two-imgeSlideBox:nth-child(2) .image-box",        6,      {alpha:   1.0, y:0, delay:3.0}),
    TweenMax.to("#section-newsroom .two-imgeSlideBox:nth-child(2) .slide-text-box",         6,      {alpha:   1.0, y:0, delay:3.0}),
    TweenMax.to("#section-newsroom.panel .right-btn", 3, { x: 0, alpha: 1,  delay:3.5 }),
   // TweenMax.to("#section-sustainability.panel", {alpha: 0, duration: 4,  }),

    //.to("#section-newsroom.panel .com-twoImageSlider .slide-text-box", { y: 0, opacity: 1, duration: 2 }),
    
  ])


//animation 5
TweenMax.set(["#section-videos.panel .video-text" ], { alpha: 0, y:"50px" });
TweenMax.set(["#section-videos.panel .btns-wrap" ], { alpha: 0, y:"50px" });


const ani5 = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#section-videos.panel",
      start: "50% 80%",
      end: "80% 80%",
      scrub: true,
      markers:false,
    },
  }).add([
    TweenMax.to("#section-videos.panel .video-text", 2, { y: 0, alpha: 1,  ease: "power1.inOut", delay: 0.25 }),
    TweenMax.to("#section-videos.panel .btns-wrap", 3, { y: 0, alpha: 1,  ease: "power1.inOut", delay: 0.35}),
    TweenMax.to("#section-newsroom.panel", {alpha: 0, duration: 4,  }),
  ])


//animation 6
TweenMax.set(["#section-career.panel .career-left-sec .com-heading h2" ], { alpha: 0, y:"50px" });
TweenMax.set(["#section-career.panel .career-left-sec .com-heading span" ], { alpha: 0, y:"50px" });
TweenMax.set(["#section-career.panel .career-btn" ], { alpha: 0, y:"50px" });
TweenMax.set(["#section-career.panel .career-right-sec" ], { alpha: 0, x:"150px" });


const ani6 = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#section-career.panel",
      start: "30% 85%",
      end:"80% 95%",
      scrub: true,
      markers:false,
    },
  })
  .add([
    TweenMax.to("#section-career.panel .career-left-sec .com-heading h2", 4, { y: 0, opacity: 1,  ease: "power1.inOut", delay: 4 }),
    TweenMax.to("#section-career.panel .career-left-sec .com-heading span",5, { y: 0, opacity: 1,  ease: "power1.inOut", delay: 4.5 }),
    TweenMax.to("#section-career.panel .career-btn", 6, { y: 0, opacity: 1,  ease: "power1.inOut", delay: 5}),
    TweenMax.to("#section-career.panel .career-right-sec", 8, { x: 0, opacity: 1, ease: "power1.inOut", delay: 3 }),
    //TweenMax.to("#section-videos.panel", {alpha: 0, duration: 4,  }),
    
  ])




//animation 7
TweenMax.set(["#section-last.panel .foundation-image-wrap" ], { alpha: 0, y:"0px" });
TweenMax.set(["#section-last.panel .foundation-text-wrap .com-heading h4" ], { alpha: 0, y:"50px" });
TweenMax.set(["#section-last.panel .foundation-text-wrap .foundation-about-info .quote-img" ], { alpha: 0, y:"50px" });
TweenMax.set(["#section-last.panel .foundation-text-wrap .foundation-about-info p" ], { alpha: 0, y:"50px" });
TweenMax.set(["#section-last.panel .foundation-text-wrap .foundation-about-info .name-info" ], { alpha: 0, y:"50px" });
TweenMax.set(["#section-last.panel .foundation-text-wrap .foundation-about-info .desination-info" ], { alpha: 0, y:"50px" });
TweenMax.set(["#section-last.panel .foundation-text-wrap .foundation-about-info .btns-wrap" ], { alpha: 0, y:"50px" });
TweenMax.set(["#section-last.panel .foundation-image-wrap" ], { alpha: 0, x:"-36%" })
// gsap.set(["#section-last.panel .foundation-about-info" ], { alpha: 0, y:"50px" });
// gsap.set(["#section-career.panel .career-right-sec" ], { alpha: 0, x:"86%" });


const ani7 = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#section-last.panel",
      start: "30% 100%",
      end:"55% 95%",
      scrub: 1,
      markers:false,
    },
  }).add([
    // TweenMax.to("#section-last.panel .foundation-image-wrap",1.2,  { y: 0, opacity: 1, delay:0 }),
//TweenMax.to("#section-last.panel .foundation-image-wrap img", 3, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", alpha: 1,ease: Back.easeOut,  delay: 0.5 }),
TweenMax.to("#section-last.panel .foundation-image-wrap", 10, {  alpha: 1, x: 0, ease: "power1.inOut", delay: 0.5 }),
TweenMax.to("#section-last.panel .foundation-text-wrap .com-heading h4",3, { y: 0, opacity: 1,  delay:2}),
TweenMax.to("#section-last.panel .foundation-text-wrap .foundation-about-info .quote-img", 3, {opacity: 1, y:0, delay:3 }),
TweenMax.to("#section-last.panel .foundation-text-wrap .foundation-about-info p",3, { y: 0, opacity: 1, delay:3 }),
TweenMax.to("#section-last.panel .foundation-text-wrap .foundation-about-info .name-info", 3, { y: 0, opacity: 1,delay:4 }),
TweenMax.to("#section-last.panel .foundation-text-wrap .foundation-about-info .desination-info", 3,{ y: 0, opacity: 1, delay:4 }),
TweenMax.to("#section-last.panel .foundation-text-wrap .foundation-about-info .btns-wrap", 3, { y: 0, opacity: 1, delay:4  }),
TweenMax.to("#section-career.panel", {alpha: 0, duration: 3,  }),
// .to("#section-foundation.panel .foundation-about-info", { y: 0, opacity: 1, duration: 1.6 })
// .to("#section-career.panel .career-right-sec", { x: 0, opacity: 1, duration: 5 })


  ])


//set previous section opacity 
// document.addEventListener("DOMContentLoaded", function() {
//   const sections = document.querySelectorAll("section.panel");
//   sections.forEach((section, index) => {
    
//     if (index === 0) return;

//     ScrollTrigger.create({
//       trigger: section,
//       start: "top 50%", 
//       onEnter: () => {
//         gsap.to(sections[index - 1], { alpha: 0, duration: 3 });
//       },
//       onLeaveBack: () => {
//         gsap.to(sections[index - 1], { alpha: 1, duration: 3 });
//       },
     
//       markers: false
//     });

//   });
  
// });


// const ani4 = gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: "#section5",
//       start: "top 220%",
//       end: "+=210%",
//       //scrub: 1,
//     },
//   })
//   .to("#section4 .whiteBgSection img", { right: "10%", opacity: 1, duration: 0.5 })
  
// // .to("#section5 .highlight-main", {y: 0, opacity:1, duration: 1.2})

// const ani5 = gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: "#section6",
//       start: "top center",
//       end: "+=40%",
//       scrub: 1,
//     },
//   })
//   .to("#section6 .timeline-heading", { y: 0, opacity: 1, duration: 0.5 })
//   .to("#section6 .timeline-right-info", { y: 0, opacity: 1, duration: 0.5 });

// const ani6 = gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: "#section7",
//       start: "top center",
//       end: "+=40%",
//       scrub: 1,
//     },
//   })
//   .to("#section7 .teamImg1", { scale: 1, opacity: 1, duration: 0.8 })
//   .to("#section7 .teamImg2", { scale: 1, opacity: 1, duration: 1 })
//   .to("#section7 .teamImg3", { scale: 1, opacity: 1, duration: 1.2 })
//   .to("#section7 .sec-info-content", { y: 0, opacity: 1, duration: 0.5 });
// //   .to("#section7 .sec-info-content p", {y:0, opacity:1, duration: 0.8})
// //   .to("#section7 .sec-info-content .readmore-height-btn", {y:0, opacity:1, duration: 1})

// const ani7 = gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: "#section3",
//       start: "top center",
//       end: "+=40%",
//       scrub: 1,
//     },
//   })
//   .to("#section3 .banner-text .left-sec-text", { y: 0, opacity: 1, duration: 1})
//   .to("#section3 .banner-text .right-sec-text", { y: 0, opacity: 1, duration: 1.5});
  

// // const ani8 = gsap
// //   .timeline({
// //     scrollTrigger: {
// //       trigger: ".commonTxtAnimation",
// //       start: "top center",
// //       end: "+=40%",
// //       scrub: 1,
// //     },
// //   })
// //   .to(".commonTxtAnimation .banner-text p", {
// //     y: 0,
// //     opacity: 1,
// //     duration: 1.5,
// //   });

// //   const ani9 = gsap
// //   .timeline({
// //     scrollTrigger: {
// //       trigger: "#section2",
// //       start: "top center",
// //       end: "+=40%",
// //       scrub: 1,
// //     },
// //   })
// //   .to("#section2 .commonTxtAnimation .banner-text p", {
// //     y: 500,
// //     opacity: 0,
// //     duration: 1.5,
// //   });


// const split = new SplitText(".growth-subtext", {
//   type: "chars"
// });

// const animation2 = gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: "#section-growth",
//       start: "top top",
//       end: "+=150%",
//       pin: true,
//       scrub: 0.75,
//       markers: true
//     }
//   })
//   .set(
//     split.chars,
//     {
//       color: "#ffcc66",
//       stagger: 0.1
//     },
//     0.1
//   )
//   .set(
//     split.chars,
//     {
//       color: "#ff00ff",
//       stagger: 0.1
//     },
//     0.3
//   );


*/