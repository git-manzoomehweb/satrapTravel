document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-tour"),
    t = document.querySelectorAll(".tour-li");

  if (e) {
    async function n(t = 217951) {
      e.innerHTML =
        '<div class="w-full flex justify-center p-6"><span class="loader"></span></div>';
      try {
        let n = await fetch(`/tour-load-items.bc?catid=${t}`);
        if (!n.ok) throw Error(`HTTP error! Status: ${n.status}`);
        let o = await n.text();
        (e.innerHTML = o),
          window.tourSwiper && window.tourSwiper.destroy(!0, !0),
          (window.tourSwiper = new Swiper("#tour-list-container", {
            slidesPerView: 4,
            speed: 500,
            centeredSlides: !1,
            spaceBetween: 11,
            grabCursor: !0,
            autoplay: { delay: 9500, disableOnInteraction: !1 },
            pagination: { el: ".swiper-pagination", clickable: !0 },
            navigation: {
              nextEl: ".swiper-button-next-ft",
              prevEl: ".swiper-button-prev-ft",
            },
            breakpoints: {
              640: { slidesPerView: 4, spaceBetween: 11 },
              768: { slidesPerView: 4, spaceBetween: 11 },
              1024: { slidesPerView: 4, spaceBetween: 11 },
            },
          }));
      } catch (t) {
        console.error("Fetch failed:", t),
          (e.innerHTML = `<p>Error loading data: ${t.message}</p>`);
      }
    }
    n(),
      t.forEach((e) => {
        e.addEventListener("click", function () {
          t.forEach((e) => {
            (e.style.backgroundColor = ""), (e.style.color = "");
          }),
            n(e.getAttribute("data-id"));
        });
      });
  }
});