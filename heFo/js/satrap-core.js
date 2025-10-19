// ___________________________________

if (document.querySelectorAll(".swiper-4").length > 0)
  swiper = new Swiper(".swiper-4", {
    slidesPerView: 4,
    speed: 900,
    centeredSlides: !1,
    spaceBetween: 16,
    grabCursor: !0,
    autoplay: { delay: 2500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 4, spaceBetween: 16 },
      768: { slidesPerView: 4, spaceBetween: 16 },
      1024: { slidesPerView: 4, spaceBetween: 16 },
    },
  });

// ___________________________________

const headerMenu = document.querySelector(".header-menu");
const headerMenuClose = document.querySelector(".header-menu-close");
const bars3 = document.querySelector(".bars3");

if (window.innerWidth >= 1034) {
  headerMenuClose?.addEventListener("click", function () {
    headerMenu.style.visibility = "hidden";
    headerMenu.style.opacity = "0";
  });
  bars3?.addEventListener("click", function () {
    headerMenu.style.visibility = "visible";
    headerMenu.style.opacity = "1";
  });
} else {
  headerMenuClose?.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(1024px)";
    document.querySelector("body").style.overflow = "";
  });
  bars3?.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(0)";
    document.querySelector("body").style.overflow = "hidden";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
  const dropdownIcons = document.querySelectorAll(".dropdown-icon");

  toggleDropdowns?.forEach((toggle, index) => {
    const submenu = toggle.nextElementSibling;
    const dropdownIcon = dropdownIcons[index];

    toggle.addEventListener("click", function () {
      dropdownIcon.classList.toggle("rotate-180");

      if (submenu.style.maxHeight) {
        submenu.style.maxHeight = null;
        submenu.style.opacity = "0";
      } else {
        submenu.style.maxHeight = submenu.scrollHeight * 30 + "px";
        submenu.style.opacity = "1";
      }
    });
  });
});

const DropDownInFooter = document.querySelectorAll(".footer-dropDown");
DropDownInFooter?.forEach((el) => {
  el.addEventListener("click", () => {
    el.querySelector("button").classList.toggle("rotate-180");
    el.querySelector(".drop-down-list").classList.toggle("h-0");
    el.querySelector(".drop-down-list").classList.toggle("opacity-0");
    el.querySelector(".drop-down-list").classList.toggle("overflow-hidden");
  });
});
// ________
document.addEventListener("DOMContentLoaded", function () {
  const headerB = document.querySelector("header div.fixed");

  if (!headerB) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 200) {
      headerB.classList.add("shadow");
    } else {
      headerB.classList.remove("shadow");
    }
  });
});
