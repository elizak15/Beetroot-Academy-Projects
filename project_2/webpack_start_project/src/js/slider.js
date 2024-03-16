/* SLIDER */
const config = {
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 1000,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  mobileFirst: true,
  centerMode: true,
  responsive: [
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        centerMode: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        dots: false,
      },
    },
    {
      breakpoint: 1000,
      settings: "unslick",
    },
  ],
};

const sl = $(".slider").slick(config);

$(window).on("resize", function () {
  if ($(window).width() > 600 && !sl.hasClass("slick-initialized")) {
    $(".slider").slick(config);
  }
});

const config1 = {
  autoplay: false,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  // prevArrow: '<span class="mybuttons__item mybuttons__item_prev">Vorheriges </span>',
  // nextArrow: '<span class="mybuttons__item mybuttons__item_next">Nächstes</span>',
  mobileFirst: true,
  centerMode: true,
  responsive: [
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: true,
      },
    },
  ],
};

const s1 = $(".slider1").slick(config1);

$(window).on("resize", function () {
  if ($(window).width() > 300 && !s1.hasClass("slick-initialized")) {
    $(".slider1").slick(config1);
  }
});
