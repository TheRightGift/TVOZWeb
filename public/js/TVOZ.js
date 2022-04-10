M.AutoInit();

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
});

var swiperH = new Swiper('.swiper-container-h', {
  spaceBetween: 50,
  pagination: {
    el: '.swiper-pagination-h',
    clickable: true,
  },
});
var swiperV = new Swiper('.swiper-container-v', {
  direction: 'vertical',
  spaceBetween: 50,
  pagination: {
    el: '.swiper-pagination-v',
    clickable: true,
  },
});
