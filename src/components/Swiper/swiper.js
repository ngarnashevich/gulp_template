if ($('.slider')) {
    new Swiper('.slider', {
      observer: true,
      observeParents: true,
      spaceBetween: 24,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },



    //   // Responsive breakpoints
     breakpoints: {
          1200: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
          320: {
              slidesPerView: 1,
              spaceBetween: 24,
          },
          320: {
              slidesPerView: 1,
              spaceBetween: 24,
          },
      }
    });
}