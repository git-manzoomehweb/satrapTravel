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

document.addEventListener("DOMContentLoaded", () => {
  const officeItems = document.querySelectorAll(".office-item");

  if (officeItems.length) {
    officeItems.forEach((item) => {
      const cardHeader = item.querySelector(
        ".flex.items-center.cursor-pointer"
      );
      const showInfo = item.querySelector(".show-info");
      const icon = item.querySelector("svg");

      if (cardHeader && showInfo) {
        showInfo.style.transition = "height 0.6s ease, opacity 0.2s ease";
        showInfo.style.height = "0";
        showInfo.style.opacity = "0";

        cardHeader.addEventListener("click", () => {
          const isOpen = showInfo.classList.contains("open");

          officeItems.forEach((other) => {
            const otherInfo = other.querySelector(".show-info");
            const otherIcon = other.querySelector("svg");
            if (otherInfo && otherInfo !== showInfo) {
              otherInfo.classList.remove("open");
              otherInfo.style.height = "0";
              otherInfo.style.opacity = "0";
              otherIcon.style.transform = "rotate(0deg)";
            }
          });

          if (!isOpen) {
            showInfo.classList.add("open");
            const fullHeight = showInfo.scrollHeight + "px";
            showInfo.style.height = fullHeight;
            showInfo.style.opacity = "1";
            icon.style.transition = "transform 0.3s ease";
            icon.style.transform = "rotate(45deg)";
          } else {
            showInfo.classList.remove("open");
            showInfo.style.height = "0";
            showInfo.style.opacity = "0";
            icon.style.transform = "rotate(0deg)";
          }
        });
      }
    });
  }
});

window.addEventListener("scroll", () => {
  if (window.innerWidth <= 968) {
    const header = document.querySelector("header");
    if (header) {
      if (window.scrollY > 250) {
        header.style.backdropFilter = "blur(5px)";
        header.style.backgroundColor = "#8e8e8e59";
      } else {
        header.style.backdropFilter = "none";
        header.style.backgroundColor = "transparent";
      }
    }
  } else {
    const header = document.querySelector("header");
    if (header) {
      header.style.backdropFilter = "none";
      header.style.backgroundColor = "transparent";
    }
  }
});

window.addEventListener("resize", () => {
  const header = document.querySelector("header");
  if (!header) return;

  if (window.innerWidth > 968) {
    header.style.backdropFilter = "none";
    header.style.backgroundColor = "transparent";
  } else {
    if (window.scrollY > 250) {
      header.style.backdropFilter = "blur(5px)";
      header.style.backgroundColor = "#8e8e8e59";
    } else {
      header.style.backdropFilter = "none";
      header.style.backgroundColor = "transparent";
    }
  }
});
