document.addEventListener("DOMContentLoaded", function () {
  const isMobileSatrap = window.innerWidth <= 968;
  const requiredFiles = [
    isMobileSatrap ? "satrap.mob.ui.min.css" : "satrap.ui.min.css",
  ];

  function checkAllResourcesLoaded() {
    const resources = performance.getEntriesByType("resource");
    const loadedFiles = resources
      .map((res) => res.name.split("/").pop())
      .filter((name) => requiredFiles.includes(name));

    return requiredFiles.every((file) => loadedFiles.includes(file));
  }

  if (document.getElementById("search-box")) {
    function fetchEngine() {
      try {
        const xhrobj = new XMLHttpRequest();
        xhrobj.open("GET", "search-engine.bc");
        xhrobj.send();

        xhrobj.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            const container = document.getElementById("search-box");
            container.innerHTML = xhrobj.responseText;
            // placeHolders();

            const scripts = container.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
              const scriptTag = document.createElement("script");
              if (scripts[i].src) {
                scriptTag.src = scripts[i].src;
                scriptTag.async = false;
              } else {
                scriptTag.text = scripts[i].textContent;
              }
              document.head
                .appendChild(scriptTag)
                .parentNode.removeChild(scriptTag);
            }
          }
        };
      } catch (error) {
        console.error("مشکلی پیش آمده است. لطفا صبور باشید", error);
      }
    }

    function waitForFiles() {
      if (checkAllResourcesLoaded()) {
        fetchEngine();
      } else {
        setTimeout(waitForFiles, 500);
      }
    }

    waitForFiles();
  }
});

// ___________________________________

// const stories = document.querySelectorAll(".story");

// stories.forEach((story) => {
//   const closeP = story.querySelector(".close-popup");
//   const videoPopup = story.querySelector(".video-popup");
//   const body = document.querySelector("body");
//   const container = document.querySelector(".stories-container");

//   let swiper = null;

//   // باز کردن پاپ‌آپ
//   story.addEventListener("click", () => {
//     videoPopup.classList.remove("hidden");
//     videoPopup.classList.add("flex");
//     body.classList.add("overflow-hidden");
//     container.classList.add("z-40");

//     // ساخت سوایپر اگر هنوز ساخته نشده
//     if (!swiper && videoPopup.querySelector(".swiper-story")) {
//       swiper = new Swiper(videoPopup.querySelector(".swiper-story"), {
//         slidesPerView: 1,
//         speed: 700,
//         spaceBetween: 50,
//         grabCursor: true,
//         loop: true,
//         navigation: {
//           nextEl: videoPopup.querySelector(".swiper-button-next-s"),
//           prevEl: videoPopup.querySelector(".swiper-button-prev-s"),
//         },
//         breakpoints: {
//           640: { slidesPerView: 1, spaceBetween: 50 },
//           768: { slidesPerView: 1, spaceBetween: 50 },
//           1024: { slidesPerView: 1, spaceBetween: 50 },
//         },
//         on: {
//           slideChange: function () {
//             // توقف همه ویدیوها
//             Array.from(this.slides).forEach((slide) => {
//               const video = slide.querySelector("video");
//               if (video) {
//                 video.pause();
//                 video.currentTime = 0;
//               }
//             });

//             // پخش ویدیوی اسلاید فعال
//             const activeSlide = this.slides[this.activeIndex];
//             if (activeSlide) {
//               const activeVideo = activeSlide.querySelector("video");
//               if (activeVideo) activeVideo.play();
//             }
//           },
//         },
//       });

//       // پخش اولین ویدیو وقتی پاپ‌آپ باز شد
//       const firstVideo =
//         swiper.slides[swiper.activeIndex].querySelector("video");
//       if (firstVideo) firstVideo.play();
//     }
//   });

//   // بستن پاپ‌آپ
//   closeP.addEventListener("click", (e) => {
//     e.stopPropagation(); // جلوگیری از باز شدن دوباره
//     videoPopup.classList.add("hidden");
//     videoPopup.classList.remove("flex");
//     body.classList.remove("overflow-hidden");
//     container.classList.remove("z-40");

//     // توقف همه ویدیوها
//     if (swiper) {
//       Array.from(swiper.slides).forEach((slide) => {
//         const video = slide.querySelector("video");
//         if (video) {
//           video.pause();
//           video.currentTime = 0;
//         }
//       });
//     }
//   });
// });

// ____________________________
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

if (document.querySelectorAll(".swiper-2").length > 0)
  swiper = new Swiper(".swiper-2", {
    slidesPerView: 2,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 14,
    grabCursor: !0,
    autoplay: { delay: 3500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 14 },
      768: { slidesPerView: 2, spaceBetween: 14 },
      1024: { slidesPerView: 2, spaceBetween: 14 },
    },
  });
// ___________________________________
if (document.querySelectorAll(".swiper-tour").length > 0)
  swiper = new Swiper(".swiper-tour", {
    slidesPerView: 4,
    speed: 800,
    centeredSlides: !1,
    spaceBetween: 11,
    grabCursor: !0,
    autoplay: { delay: 5500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 4, spaceBetween: 11 },
      768: { slidesPerView: 4, spaceBetween: 11 },
      1024: { slidesPerView: 4, spaceBetween: 11 },
    },
  });
// ___________________________________
if (document.querySelectorAll(".swiper-tourtype").length > 0)
  swiper = new Swiper(".swiper-tourtype", {
    slidesPerView: 1,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 11,
    grabCursor: !0,
    autoplay: { delay: 4500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 1, spaceBetween: 11 },
      768: { slidesPerView: 1, spaceBetween: 11 },
      1024: { slidesPerView: 1, spaceBetween: 11 },
    },
  });

// ___________________________________

if (document.querySelectorAll(".swiper-5").length > 0)
  swiper = new Swiper(".swiper-5", {
    slidesPerView: 5,
    speed: 800,
    centeredSlides: !1,
    spaceBetween: 24,
    grabCursor: !0,
    autoplay: { delay: 4500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 5, spaceBetween: 24 },
      768: { slidesPerView: 5, spaceBetween: 24 },
      1024: { slidesPerView: 5, spaceBetween: 24 },
    },
  });
// ___________________________________
if (document.querySelectorAll(".swiper-ver").length > 0) {
  const swiper = new Swiper(".swiper-ver", {
    direction: "vertical",
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: true,
    },
    slidesPerView: 5,
    speed: 750,
    centeredSlides: !1,
    loop: 1,
    autoplay: { delay: 4000, disableOnInteraction: !1 },
    spaceBetween: 8,
    grabCursor: !0,
    touchReleaseOnEdges: true,
    pagination: { el: ".swiper-pagination-first-mob", clickable: !0 },
    breakpoints: {
      640: { slidesPerView: 5, spaceBetween: 8 },
      768: { slidesPerView: 5, spaceBetween: 8 },
      1024: { slidesPerView: 5, spaceBetween: 8 },
    },
  });
}
// ___________________________________

document.addEventListener("DOMContentLoaded", () => {
  const swiperContainer = document.querySelector(".swiper-comments");
  const nextBtn = document.querySelector(".next-btn-sw");
  const prevBtn = document.querySelector(".prev-btn-sw");

  // بررسی وجود سوییپر و دکمه‌ها
  if (swiperContainer && typeof Swiper !== "undefined") {
    try {
      const swiper = new Swiper(swiperContainer, {
        slidesPerView: 3,
        speed: 700,
        centeredSlides: false,
        spaceBetween: 34,
        grabCursor: true,
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: nextBtn || ".swiper-button-next-comments",
          prevEl: prevBtn || ".swiper-button-prev-comments",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 34,
          },
        },
      });

      if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => swiper.slideNext());
        prevBtn.addEventListener("click", () => swiper.slidePrev());
      }
    } catch (err) {
      console.warn("Swiper initialization failed:", err);
    }
  } else {
    // console.log("No .swiper-comments found on this page — Swiper skipped.");
  }
});

// ___________________________________
document.addEventListener("DOMContentLoaded", () => {
  const swiperContainer = document.querySelector(".swiper-comments-mob");
  const nextBtn = document.querySelector(".next-btn-sw");
  const prevBtn = document.querySelector(".prev-btn-sw");

  // بررسی وجود سوییپر و دکمه‌ها
  if (swiperContainer && typeof Swiper !== "undefined") {
    try {
      const swiper = new Swiper(swiperContainer, {
        slidesPerView: 1,
        speed: 700,
        centeredSlides: false,
        spaceBetween: 34,
        grabCursor: true,
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: nextBtn || ".swiper-button-next-comments",
          prevEl: prevBtn || ".swiper-button-prev-comments",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 14,
          },
        },
      });

      if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => swiper.slideNext());
        prevBtn.addEventListener("click", () => swiper.slidePrev());
      }
    } catch (err) {
      console.warn("Swiper initialization failed:", err);
    }
  } else {
    // console.log("No .swiper-comments found on this page — Swiper skipped.");
  }
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
// document.addEventListener("DOMContentLoaded", function () {
//   const headerB = document.querySelector("header div.fixed");

//   if (!headerB) return;

//   window.addEventListener("scroll", function () {
//     if (window.scrollY >= 200) {
//       if (window.innerWidth > 968) {
//         headerB.classList.add("shadow");
//       }
//     } else {
//       headerB.classList.remove("shadow");
//     }
//   });
// });

// ____________________________
// ____________________________
// ____________________________

document.addEventListener("DOMContentLoaded", () => {
  const timerSection = document.querySelector(".timer-section");
  const deadlineElement = document.querySelector(".deadline");

  if (!deadlineElement || !deadlineElement.textContent.trim()) {
    timerSection?.style.setProperty("display", "none", "important");
    return;
  }

  // تابع تبدیل تاریخ شمسی به میلادی
  function jalaliToGregorian(jy, jm, jd) {
    let gy;
    if (jy > 979) {
      gy = 1600;
      jy -= 979;
    } else {
      gy = 621;
    }
    let days =
      365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);

    const monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    for (let i = 0; i < jm - 1; i++) {
      days += monthDays[i];
    }
    days += jd - 1;

    let gDayNo = days + 79;

    let gy2 = gy + 400 * Math.floor(gDayNo / 146097);
    gDayNo = gDayNo % 146097;

    let leap = true;
    if (gDayNo >= 36525) {
      gDayNo--;
      gy2 += 100 * Math.floor(gDayNo / 36524);
      gDayNo = gDayNo % 36524;

      if (gDayNo >= 365) gDayNo++;
      else leap = false;
    }

    gy2 += 4 * Math.floor(gDayNo / 1461);
    gDayNo %= 1461;

    if (gDayNo >= 366) {
      leap = false;
      gDayNo--;
      gy2 += Math.floor(gDayNo / 365);
      gDayNo = gDayNo % 365;
    }

    const gdMonth = [
      0,
      31,
      leap ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    let gm = 0;
    for (let i = 1; i <= 12; i++) {
      if (gDayNo < gdMonth[i]) {
        gm = i;
        break;
      }
      gDayNo -= gdMonth[i];
    }

    const gd = gDayNo + 1;

    return [gy2, gm, gd];
  }

  const [jy, jm, jd] = deadlineElement.textContent
    .trim()
    .split("/")
    .map((v) => parseInt(v, 10));

  if (isNaN(jy) || isNaN(jm) || isNaN(jd)) {
    timerSection.style.setProperty("display", "none", "important");
    return;
  }

  const [gy, gm, gd] = jalaliToGregorian(jy, jm, jd);
  const endTime = new Date(gy, gm - 1, gd, 0, 0, 0).getTime(); // ساعت رو صفر می‌گیریم
  const now = new Date().getTime();

  // اگر تاریخ ارسال شده قبل از حال حاضر بود، کل سکشن حذف شود
  if (endTime < now) {
    timerSection.remove();
    return;
  }

  const dayEl = timerSection.querySelector(".day p");
  const hourEl = timerSection.querySelector(".hour p");
  const minEl = timerSection.querySelector(".minut p");
  const secEl = timerSection.querySelector(".seconds p");

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      clearInterval(interval);
      dayEl.textContent = "0";
      hourEl.textContent = "0";
      minEl.textContent = "0";
      secEl.textContent = "0";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    dayEl.textContent = days;
    hourEl.textContent = hours < 10 ? "0" + hours : hours;
    minEl.textContent = minutes < 10 ? "0" + minutes : minutes;
    secEl.textContent = seconds < 10 ? "0" + seconds : seconds;
  };

  updateTimer();
  const interval = setInterval(updateTimer, 1000);
});

// ____________________________
// ____________________________
function uploadDocumentFooter(e) {
  document.querySelector("#contact-form-resize .Loading_Form").style.display =
    "block";
  let t = document
      .querySelector("#contact-form-resize")
      .querySelector("#captchaContainer input[name='captcha']").value,
    n = document
      .querySelector("#contact-form-resize")
      .querySelector("#captchaContainer input[name='captchaid']").value,
    o = JSON.stringify(e.source?.rows[0]);
  $bc.setSource("cms.uploadFooter", {
    value: o,
    captcha: t,
    captchaid: n,
    run: !0,
  });
}
function refreshCaptchaFooter() {
  $bc.setSource("captcha.refreshFooter", Date.now());
}
function captchaRenderedFooter() {
  document.querySelector("#contact-form-resize .contactUsInput").placeholder =
    "کد امنیتی";
}
async function OnProcessedEditObjectFooter(e) {
  const nameInput = document
    .querySelector("#contact-form-resize .name-ans input")
    .value.trim();
  const phoneInput = document
    .querySelector("#contact-form-resize .phone-ans input")
    .value.trim();

  // const currentTime = new Date().getTime();
  // const currentData = JSON.stringify({
  //   name: nameInput,
  //   phone: phoneInput,
  // });

  "6" == (await e.response.json()).errorid
    ? ((document.querySelector(
        "#contact-form-resize .Loading_Form"
      ).style.display = "none"),
      (document.querySelector("#contact-form-resize .message-api").innerHTML =
        "درخواست شما با موفقیت ثبت شد."))
    : (refreshCaptchaFooter(),
      setTimeout(() => {
        (document.querySelector(
          "#contact-form-resize .Loading_Form"
        ).style.display = "none"),
          (document.querySelector(
            "#contact-form-resize .message-api"
          ).innerHTML = "خطایی رخ داده, لطفا مجدد اقدام کنید.");
      }, 2e3));
}
async function RenderFormFooter() {
  document
    .querySelector("#contact-form-resize .phone-ans input[data-bc-text-input]")
    .setAttribute("placeholder", "شماره تماس"),
    document
      .querySelector("#contact-form-resize .name-ans input[data-bc-text-input]")
      .setAttribute("placeholder", "نام و نام خانوادگی");
}
// ____________________________
const titleWrapper = document.querySelectorAll(".title-wrapper");
if (titleWrapper.length) {
  titleWrapper.forEach((title) => {
    if (title.innerText.trim() === "") {
      title.style.display = "none";
    }
  });
}
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________

const PLAY_SELECTORS = document.querySelectorAll(".video-player");
const POPUP = document.querySelector(".list-video-popup");
const CLOSE_BTN = document.querySelector(".close-popup");
const MUSIC_POPUP = document.querySelector(".list-music-popup");
const SET_FETCH_CLASS = "set-fetch";

function ensureSetFetchContainer(parent) {
  let el = parent.querySelector("." + SET_FETCH_CLASS);
  if (!el) {
    el = document.createElement("div");
    el.className = SET_FETCH_CLASS;
    parent.appendChild(el);
  }
  return el;
}

function extractAparatHash(url) {
  try {
    const u = new URL(url, window.location.href);
    if (u.hostname.includes("aparat.com")) {
      const parts = u.pathname.split("/").filter(Boolean);
      return parts[parts.length - 1];
    }
  } catch (e) {
    console.error("extractAparatHash error", e);
  }
  return null;
}

function createAparatIframe(hash) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame`;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.frameBorder = "0";
  iframe.allowFullscreen = true;
  iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
  return iframe;
}

async function fetchAndInsert(id) {
  if (!POPUP) return;
  const setFetch = ensureSetFetchContainer(POPUP);
  setFetch.innerHTML =
    '<div dir="ltr" class="w-full flex h-full justify-center items-center"><span class="loader"></span><div>';

  try {
    const url = id
      ? `/video-items-load.bc?id=${encodeURIComponent(id)}`
      : `/video-items-load.bc`;
    const res = await fetch(url, { method: "GET", credentials: "same-origin" });
    const text = await res.text();

    if (!res.ok) {
      setFetch.innerHTML = `<div class="error">خطا در بارگذاری (server ${res.status})</div>`;
      return;
    }

    setFetch.innerHTML = text;
    const videoCode = setFetch.querySelector(".video-code");
    if (!videoCode) {
      setFetch.innerHTML = '<div class="error">کد امبد پیدا نشد</div>';
      return;
    }

    const dataVideo = videoCode.dataset.video?.trim();
    if (!dataVideo) {
      setFetch.innerHTML = '<div class="error">data-video خالی است</div>';
      return;
    }

    const hash = extractAparatHash(dataVideo);
    if (!hash) {
      setFetch.innerHTML = '<div class="error">hash ویدیو معتبر یافت نشد</div>';
      return;
    }

    videoCode.innerHTML = "";
    const iframe = createAparatIframe(hash);
    videoCode.appendChild(iframe);
  } catch (err) {
    console.error("fetchAndInsert error", err);
    setFetch.innerHTML = '<div class="error">خطا در بارگذاری ویدیو</div>';
  }
}

function openPopup() {
  if (!POPUP) return;

  const musicPopup = document.querySelector(".list-music-popup");
  const audioEl = musicPopup?.querySelector("audio");
  POPUP.classList.remove("hidden");
  POPUP.classList.add("flex");
  if (MUSIC_POPUP) {
    audioEl.pause();
    audioEl.currentTime = 0;
    MUSIC_POPUP.classList.remove("active");
    MUSIC_POPUP.style.height = "0";
  }
}

function closePopup() {
  if (!POPUP) return;
  POPUP.classList.remove("flex");
  POPUP.classList.add("hidden");
  const setFetch = POPUP.querySelector("." + SET_FETCH_CLASS);
  if (setFetch) setFetch.innerHTML = "";
  const existingIframe = POPUP.querySelector("iframe");
  if (existingIframe) existingIframe.src = "about:blank";
}

PLAY_SELECTORS.forEach((el) => {
  el.addEventListener("click", async function (e) {
    e.stopPropagation();
    const id = this.dataset.id || null;
    openPopup();
    await fetchAndInsert(id);
  });
});

if (CLOSE_BTN) {
  CLOSE_BTN.addEventListener("click", function (e) {
    e.stopPropagation();
    closePopup();
  });
}

document.addEventListener("click", function (e) {
  if (!POPUP) return;
  const inside = POPUP.contains(e.target);
  const onButton = Array.from(PLAY_SELECTORS).some((x) => x.contains(e.target));
  if (!inside && !onButton) closePopup();
});

window.addEventListener("beforeunload", function () {
  closePopup();
});

// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________

document.addEventListener("DOMContentLoaded", () => {
  const musicPlayer = document.querySelector(".music-player");
  const musicPopup = document.querySelector(".list-music-popup");
  const closeMusicBtn = document.querySelector(".close-popup-music");
  const audioEl = musicPopup?.querySelector("audio");

  if (!musicPlayer || !musicPopup || !closeMusicBtn || !audioEl) return;

  musicPlayer.addEventListener("click", (e) => {
    e.stopPropagation();

    musicPopup.classList.add("active");
    musicPopup.style.height = "165px";
    musicPopup.style.transition =
      "height 0.4s ease, background-color 0.4s ease";
    musicPopup.style.backgroundColor = "rgba(0,0,0,0.5)";

    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});
  });

  function closeMusicPopup() {
    musicPopup.style.height = "0";
    musicPopup.style.backgroundColor = "rgba(0,0,0,0)";
    setTimeout(() => {
      musicPopup.classList.remove("active");
    }, 400);

    audioEl.pause();
    audioEl.currentTime = 0;
  }

  closeMusicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMusicPopup();
  });

  document.addEventListener("click", (e) => {
    const isClickInside = musicPopup.contains(e.target);
    const isClickOnPlayer = musicPlayer.contains(e.target);
    if (
      !isClickInside &&
      !isClickOnPlayer &&
      musicPopup.classList.contains("active")
    ) {
      closeMusicPopup();
    }
  });
});

// ____________________________
// ____________________________
document.addEventListener("DOMContentLoaded", () => {
  const seeMoreBtn = document.querySelector("#see-more");
  const aidContent = document.querySelector(".aid-content");

  if (!seeMoreBtn || !aidContent) return;

  let expanded = false;
  aidContent.style.transition = "max-height 0.4s ease";

  if (aidContent.scrollHeight <= 500) {
    seeMoreBtn.style.setProperty("display", "none", "important");
    aidContent.style.maxHeight = "none";
    return;
  } else {
    aidContent.style.maxHeight = "500px";
  }

  seeMoreBtn.addEventListener("click", () => {
    if (!expanded) {
      aidContent.style.maxHeight = aidContent.scrollHeight + "px";
      seeMoreBtn.querySelector("span").textContent = "مشاهده کمتر";
      expanded = true;
    } else {
      aidContent.style.maxHeight = "500px";
      seeMoreBtn.querySelector("span").textContent = "مشاهده بیشتر";
      expanded = false;
    }
  });
});

// ____________________________
// ____________________________
// ____________________________
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const faqContainers = document.querySelectorAll(".common-questions");
    if (!faqContainers || faqContainers.length === 0) return;

    faqContainers.forEach((container) => {
      const boxes = container.querySelectorAll(".questions-box");
      if (!boxes || boxes.length === 0) return;

      boxes.forEach((box, index) => {
        const title = box.querySelector(
          "p.font-bold.text-zinc-900.whitespace-nowrap"
        );
        if (title) {
          const questionNumber = index + 1;
          title.textContent = `سوال ${questionNumber}`;
        }

        const answer = box.querySelector(".answer");
        const arrowSvg = box.querySelector(".arrow svg");

        if (!answer) return;

        // === تنظیمات اولیه ===
        answer.style.overflow = "hidden";
        answer.style.height = "0px";
        answer.style.opacity = "0";
        answer.style.transition =
          "height 0.38s cubic-bezier(.2,.9,.2,1), opacity 0.28s ease";
        box.dataset.faqOpen = "false";

        if (arrowSvg) {
          arrowSvg.style.transition =
            "transform 0.38s cubic-bezier(.2,.9,.2,1)";
          arrowSvg.style.transformOrigin = "center";
        }

        // === باز کردن باکس ===
        const openBox = () => {
          if (box.dataset.faqOpen === "true") return;

          boxes.forEach((otherBox) => {
            if (otherBox === box) return;
            closeBoxImmediate(otherBox);
          });

          const fullH = answer.scrollHeight;

          answer.style.height = fullH + "px";
          answer.style.opacity = "1";
          box.dataset.faqOpen = "true";
          box.classList.add("faq-open");

          if (arrowSvg) {
            arrowSvg.classList.add("faq-arrow-active");
            arrowSvg.style.transform = "rotate(180deg)";
          }

          const onTransitionEnd = (e) => {
            if (e.propertyName === "height") {
              answer.style.height = "auto";
              answer.removeEventListener("transitionend", onTransitionEnd);
            }
          };
          answer.addEventListener("transitionend", onTransitionEnd);
        };

        // === بستن باکس ===
        const closeBox = (cb) => {
          if (box.dataset.faqOpen !== "true") {
            if (typeof cb === "function") cb();
            return;
          }

          if (answer.style.height === "auto") {
            const curH = answer.scrollHeight;
            answer.style.height = curH + "px";
            answer.offsetHeight;
          }

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              answer.style.height = "0px";
              answer.style.opacity = "0";
              box.dataset.faqOpen = "false";
              box.classList.remove("faq-open");
              if (arrowSvg) {
                arrowSvg.classList.remove("faq-arrow-active");
                arrowSvg.style.transform = "rotate(0deg)";
              }
              if (typeof cb === "function") {
                cb();
              }
            });
          });
        };

        // === بستن فوری باکس‌های دیگر ===
        const closeBoxImmediate = (otherBox) => {
          const otherAnswer = otherBox.querySelector(".answer");
          const otherArrow = otherBox.querySelector(".arrow svg");
          if (!otherAnswer) return;
          if (otherAnswer.style.height === "auto") {
            otherAnswer.style.height = otherAnswer.scrollHeight + "px";
            otherAnswer.offsetHeight;
          }
          otherAnswer.style.height = "0px";
          otherAnswer.style.opacity = "0";
          otherBox.dataset.faqOpen = "false";
          otherBox.classList.remove("faq-open");
          if (otherArrow) {
            otherArrow.classList.remove("faq-arrow-active");
            otherArrow.style.transform = "rotate(0deg)";
          }
        };

        // === رویداد کلیک روی باکس ===
        box.addEventListener("click", (e) => {
          const tag =
            e.target && e.target.tagName
              ? e.target.tagName.toLowerCase()
              : null;
          if (tag === "a" || tag === "button") return;

          const isOpen = box.dataset.faqOpen === "true";
          if (isOpen) {
            closeBox();
          } else {
            openBox();
          }
        });

        // === ریسایز صفحه ===
        window.addEventListener("resize", () => {
          if (box.dataset.faqOpen === "true") {
            if (answer.style.height !== "auto") {
              const h = answer.scrollHeight;
              answer.style.height = h + "px";
            }
          }
        });
      });
    });
  });
})();

// ____________________________
// ____________________________
document.addEventListener("DOMContentLoaded", () => {
  const bannerList = document.querySelector(".banner-list");
  const landingItems = document.querySelectorAll(".landing-item");
  let isShown = false;
  if (!bannerList) return;
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const triggerPoint = bannerList.offsetTop + 40;

    if (scrollY > triggerPoint && !isShown) {
      isShown = true;
      landingItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("show");
          item.classList.remove("hide");
        }, index * 400);
      });
    }

    if (scrollY <= triggerPoint && isShown) {
      isShown = false;
      landingItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove("show");
          item.classList.add("hide");
        }, index * 200); // خروج سریع‌تر از ورود
      });
    }
  });
});
// ____________________________
// ____________________________

document.addEventListener("DOMContentLoaded", () => {
  const priceSections = document.querySelectorAll(".price-section");

  priceSections.forEach((section) => {
    try {
      const priceElement = section.querySelector(".price-element");
      const priceSeprator = section.querySelector(".price-seprator");

      if (priceElement && priceSeprator) {
        const text = priceSeprator.textContent.trim();

        // پشتیبانی از عدد اعشاری (فارسی و انگلیسی)
        const match = text.match(/([\d۰-۹.,٫]+)/);

        if (match) {
          const priceNumber = match[0].trim();
          const unit = text.replace(priceNumber, "").trim();

          // اگر کاربر از ممیز فارسی استفاده کرده باشد، آن را به "." تبدیل کن
          const normalizedPrice = priceNumber.replace("٫", ".");

          priceElement.textContent = normalizedPrice;
          priceSeprator.textContent = unit;
        }
      }
    } catch (err) {
      console.warn("Price parsing error:", err);
    }
  });
});

// ____________________________
// ____________________________
var FetchPageNumPrev = async (e) => {
    let t = document.querySelector(".hotels-cont"),
      n = t.getAttribute("data-catid"),
      o = await fetch(`/hotel-load-items.bc?catid=${n}&pagenum=${e}`),
      r = await o.text();
    t.innerHTML = r;
  },
  FetchPageNumNext = async (e) => {
    let t = document.querySelector(".hotels-cont"),
      n = t.getAttribute("data-catid"),
      o = await fetch(`/hotel-load-items.bc?catid=${n}&pagenum=${e}`),
      r = await o.text();
    t.innerHTML = r;
  },
  FetchWithPageNum = async (e) => {
    let t = document.querySelector(".hotels-cont"),
      n = t.getAttribute("data-catid"),
      o = await fetch(`/hotel-load-items.bc?catid=${n}&pagenum=${e}`),
      r = await o.text();
    t.innerHTML = r;
  };

(function () {
  const loadContainer = document.querySelector(".load-hotel-section");
  if (!loadContainer) return;

  const cache = new Map();
  let controller = null;

  const fetchCategory = async (catId) => {
    if (!catId) return;

    if (controller) controller.abort();
    controller = new AbortController();

    if (cache.has(catId)) {
      loadContainer.innerHTML = cache.get(catId);
      initHotelFilters();
      return;
    }

    try {
      const res = await fetch(`hotel-load-items.bc?catid=${catId}`, {
        signal: controller.signal,
      });
      if (!res.ok) return;
      const html = await res.text();
      cache.set(catId, html);
      loadContainer.innerHTML = html;
      initHotelFilters();
    } catch (e) {}
  };

  const initRadios = () => {
    document.querySelectorAll("li[data-id]").forEach((li) => {
      const radio = li.querySelector('input[type="radio"]');
      if (!radio) return;
      radio.addEventListener("change", () => {
        fetchCategory(li.getAttribute("data-id"));
      });
    });
  };

  fetchCategory(loadContainer.getAttribute("data-cat"));
  initRadios();

  function hookPagination(fn) {
    return async function (...args) {
      await fn.apply(this, args);
      initHotelFilters();
    };
  }

  if (typeof FetchPageNumPrev === "function")
    FetchPageNumPrev = hookPagination(FetchPageNumPrev);

  if (typeof FetchPageNumNext === "function")
    FetchPageNumNext = hookPagination(FetchPageNumNext);

  if (typeof FetchWithPageNum === "function")
    FetchWithPageNum = hookPagination(FetchWithPageNum);

  function initHotelFilters() {
    if (!document.querySelector(".hotel-list")) return;

    (function () {
      const SELECTORS = {
        hotelCard: ".hotel_card",
        hotelName: ".hotelName",
        hotelStar: ".hotelStar",
        hotelNameInput: ".hotel-name-filter",
        starToggleBtn: ".star-filter .flex.cursor-pointer",
        starBox: ".star-box",
        starCheckboxSelector: '.star-box input[type="checkbox"]',
      };

      function $(s, r = document) {
        return r.querySelector(s);
      }
      function $$(s, r = document) {
        return Array.from(r.querySelectorAll(s));
      }

      function persianToEnglishDigits(s = "") {
        const p = "۰۱۲۳۴۵۶۷۸۹";
        const a = "٠١٢٣٤٥٦٧٨٩";
        s = String(s);
        for (let i = 0; i < 10; i++) {
          s = s.split(p[i]).join(i).split(a[i]).join(i);
        }
        return s;
      }

      function normalizeText(s = "") {
        return String(s).replace(/\s+/g, " ").trim().toLowerCase();
      }

      function parseStarValueFromText(text) {
        if (!text) return NaN;
        const cleaned = persianToEnglishDigits(text)
          .replace(/,/g, ".")
          .replace(/[^\d.]/g, "");
        return cleaned ? parseFloat(cleaned) : NaN;
      }

      function debounce(fn, t = 250) {
        let id;
        return (...a) => {
          clearTimeout(id);
          id = setTimeout(() => fn(...a), t);
        };
      }

      function applyFilters() {
        const cards = $$(SELECTORS.hotelCard);
        const nameVal = normalizeText($(SELECTORS.hotelNameInput)?.value || "");

        const starBox = $(SELECTORS.starBox);
        const stars = starBox
          ? $$(SELECTORS.starCheckboxSelector, starBox)
              .filter((c) => c.checked)
              .map((c) => parseInt(persianToEnglishDigits(c.value)))
          : [];

        let visible = 0;

        cards.forEach((card) => {
          const name = normalizeText(
            $(SELECTORS.hotelName, card)?.textContent || ""
          );
          const star = parseStarValueFromText(
            $(SELECTORS.hotelStar, card)?.textContent
          );

          const show =
            (!nameVal || name.includes(nameVal)) &&
            (!stars.length || stars.some((s) => star >= s && star < s + 1));

          card.style.display = show ? "" : "none";
          if (show) visible++;
        });
      }

      function init() {
        const starBox = $(SELECTORS.starBox);
        starBox?.addEventListener("change", applyFilters, true);

        const nameInput = $(SELECTORS.hotelNameInput);
        nameInput?.addEventListener("input", debounce(applyFilters, 220));

        applyFilters();
      }

      try {
        init();
      } catch (e) {}
    })();
  }
})();

// ____________________________
// ____________________________
(function () {
  const container = document.querySelector(".all-countries");
  if (!container) return;

  const toggle = container.querySelector(".flex.cursor-pointer");
  const list = container.querySelector("ul");
  if (!toggle || !list) return;

  let isOpen = false;

  list.style.overflow = "hidden";
  list.style.height = "0px";
  list.style.opacity = "0";
  list.style.transition =
    "height 360ms cubic-bezier(.22,.9,.3,1), opacity 220ms ease";

  toggle.addEventListener("click", () => {
    if (isOpen) {
      const h = list.scrollHeight;
      list.style.height = h + "px";
      requestAnimationFrame(() => {
        list.style.height = "0px";
        list.style.opacity = "0";
      });
      isOpen = false;
    } else {
      const h = list.scrollHeight;
      list.style.height = h + "px";
      list.style.opacity = "1";
      isOpen = true;
    }
  });

  list.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "height") return;
    if (isOpen) {
      list.style.height = "auto";
    }
  });
})();

// ____________________________
// ____________________________
document.querySelector(".fiter-box-handler")?.addEventListener("click", () => {
  const filterBx = document.querySelector(".marked-filter");
  document
    .querySelector(".fiter-box-handler")
    .querySelector(".chevron-down")
    .classList.toggle("rotate-180");
  filterBx.classList.toggle("h-0");
  filterBx.classList.toggle("overflow-hidden");
  filterBx.classList.toggle("!p-0");
  filterBx.classList.toggle("!border-none");
  filterBx.classList.toggle("opacity-0");
});
// ____________________________
// ____________________________

document.addEventListener("DOMContentLoaded", function () {
  const stories = Array.from(document.querySelectorAll(".story"));
  const videoPopup = document.querySelector(".video-popup");
  const fetchContainer = videoPopup?.querySelector(".fetch-story");
  const closeBtn = videoPopup?.querySelector(".close-popup");

  if (!stories.length || !videoPopup || !fetchContainer) return;

  const navContainer = videoPopup.querySelector(".flex.justify-end");

  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");

  prevBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`;
  nextBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>`;

  prevBtn.className =
    "popup-nav p-2 bg-white rounded-full shadow-lg ml-2 opacity-0 transition-opacity duration-300 hover:opacity-100";
  nextBtn.className =
    "popup-nav p-2 bg-white rounded-full shadow-lg ml-2 opacity-0 transition-opacity duration-300 hover:opacity-100";

  navContainer.appendChild(prevBtn);
  navContainer.appendChild(nextBtn);

  let currentStoryIndex = 0;
  const storyCache = {};

  function updateNavButtons() {
    prevBtn.style.opacity = currentStoryIndex === 0 ? "0" : "1";
    nextBtn.style.opacity =
      currentStoryIndex === stories.length - 1 ? "0" : "1";
    prevBtn.style.pointerEvents = currentStoryIndex === 0 ? "none" : "auto";
    nextBtn.style.pointerEvents =
      currentStoryIndex === stories.length - 1 ? "none" : "auto";
  }

  async function loadStoryItems(index) {
    currentStoryIndex = index;
    updateNavButtons();

    const catid = stories[index].getAttribute("catid");
    if (!catid) return;

    fetchContainer.innerHTML =
      '<div dir="ltr" class="w-full flex items-center h-[700px] justify-center"><span class="loader"></span></div>';

    try {
      let html;

      if (storyCache[catid]) {
        html = storyCache[catid];
      } else {
        const response = await fetch(`/story-load-items.bc?catid=${catid}`);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        html = await response.text();
        storyCache[catid] = html;
      }

      fetchContainer.innerHTML = html;
    } catch (err) {
      fetchContainer.innerHTML = `<p class="text-white">خطا در بارگذاری محتوا: ${err.message}</p>`;
    }
  }

  stories.forEach((story, index) => {
    story.addEventListener("click", () => {
      videoPopup.classList.remove("hidden");
      videoPopup.classList.add("flex");
      loadStoryItems(index);
      document.body.style.overflow = "hidden";
    });
  });

  prevBtn.addEventListener("click", () => {
    if (currentStoryIndex > 0) loadStoryItems(currentStoryIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentStoryIndex < stories.length - 1)
      loadStoryItems(currentStoryIndex + 1);
  });

  closeBtn?.addEventListener("click", () => {
    fetchContainer.innerHTML = "";
    videoPopup.classList.add("hidden");
    videoPopup.classList.remove("flex");
    document.body.style.overflow = "";
  });

  videoPopup.addEventListener("click", (e) => {
    if (e.target === videoPopup) closeBtn.click();
  });
});

// ____________________________
// ____________________________
const tCard = document.querySelectorAll(".scroll-to-search-box-card");

tCard.forEach((card) => {
  card.addEventListener("click", () => {
    const dpCity = card.querySelector(".dep-name").innerText,
      dpId = card.querySelector(".dep-id").innerText,
      rtCity = card.querySelector(".des-name").innerText,
      rtId = card.querySelector(".des-id").innerText;
    const liBtns = document.querySelectorAll(".reservation-item li");
    const banner = document.querySelector(".module-banner-background");
    liBtns.forEach((li) => {
      if (!li.classList.contains("flight-btn")) {
        li.classList.remove("active-module");
        li.classList.remove("active-landing");
        document.querySelector("#r-hotel").classList.add("hidden");
        document.querySelector("#r-flight").classList.remove("hidden");
        document.querySelector("#r-flighthotel").classList.add("hidden");
        document.querySelector("#r-tour").classList.add("hidden");
        document.querySelector("#r-insurance").classList.add("hidden");
        if (banner.classList.contains("insurance-banner-background")) {
          banner.classList.remove("insurance-banner-background");
        }
        if (banner.classList.contains("hotel-banner-background")) {
          banner.classList.remove("hotel-banner-background");
        }
        if (banner.classList.contains("flighthotel-banner-background")) {
          banner.classList.remove("flighthotel-banner-background");
        }
        if (banner.classList.contains("tour-banner-background")) {
          banner.classList.remove("tour-banner-background");
        }
      } else {
        li.classList.add("active-module");
        li.classList.add("active-landing");
        document.querySelector("#r-flight").classList.remove("hidden");
        document.querySelector("#r-hotel").classList.add("hidden");
        document.querySelector("#r-flighthotel").classList.add("hidden");
        document.querySelector("#r-tour").classList.add("hidden");
        document.querySelector("#r-insurance").classList.add("hidden");
        if (banner.classList.contains("insurance-banner-background")) {
          banner.classList.remove("insurance-banner-background");
        }
        if (banner.classList.contains("hotel-banner-background")) {
          banner.classList.remove("hotel-banner-background");
        }
        if (banner.classList.contains("flighthotel-banner-background")) {
          banner.classList.remove("flighthotel-banner-background");
        }
        if (banner.classList.contains("tour-banner-background")) {
          banner.classList.remove("tour-banner-background");
        }
      }
    });
    document.querySelector("#r-hotel").classList.add("hidden");
    document.querySelector("#r-flight").classList.remove("hidden");
    document.querySelector("#r-flighthotel").classList.add("hidden");
    document.querySelector(
      ".r-flight .flight-routes .departure.text-value"
    ).value = dpCity;
    document.querySelector(".r-flight .flight-routes .locationId.from").value =
      dpId;
    document.querySelector(
      ".r-flight .flight-routes .destination.text-value"
    ).value = rtCity;
    document.querySelector(".r-flight .flight-routes .locationId.to").value =
      rtId;
    var main = document.querySelector("main");
    main && window.scrollTo({ top: main.offsetTop + 180, behavior: "smooth" });
  });
});

// ____________________________
// ____________________________
const clickerUl = document.querySelectorAll("ul.clicker-list");
clickerUl?.forEach((el) => {
  const liItem = el.querySelectorAll("li");
  liItem[0].classList.add("active");
  liItem.forEach((li) => {
    li.addEventListener("click", () => {
      liItem.forEach((element) => {
        element.classList.remove("active");
      });
      li.classList.add("active");
    });
  });
});
// ____________________________
// ____________________________

document.addEventListener("DOMContentLoaded", () => {
  const loaderHTML =
    '<div dir="ltr" class="w-full flex justify-center p-6"><span class="loader"></span></div>';

  document.querySelectorAll(".clicker-list").forEach((clickerList) => {
    const section = clickerList.closest("section") || document;
    const fetchWrapper = section.querySelector(".fetch-content-tour");
    const listItems = Array.from(clickerList.querySelectorAll(".tour-li"));
    const seeAllLink = section.querySelector(".see-all-cats");

    if (!fetchWrapper || listItems.length === 0) return;

    /* ------------------ STATE: cache برای جلوگیری از fetch دوباره ------------------ */
    section._tourState = section._tourState || {
      swiper: null,
      currentCat: null,
      loading: false,
      cache: {}, // ← اینجا HTML کش می‌شود: cache[catid] = { html }
    };
    /* ----------------------------------------------------------------------------- */

    const firstId = listItems[0].getAttribute("data-id");
    section._tourState.currentCat = firstId ? firstId : null;

    function setActiveItem(targetItem) {
      listItems.forEach((li) => li.classList.remove("active"));
      if (targetItem) targetItem.classList.add("active");
    }

    /* ---------------------------- قیمت‌فرمت‌کن حرفه ای ---------------------------- */
    function formatPrices(wrapper) {
      const priceElements = wrapper.querySelectorAll(".price-element");

      priceElements.forEach((priceEl) => {
        let raw = priceEl.textContent.trim();

        const match = raw.match(/([\d.,]+)/);
        let unit = raw.replace(/[\d.,\s]/g, "").trim();

        if (!match) return;

        let numberPart = match[1].replace(/[,]/g, "");
        const formatted = Number(numberPart).toLocaleString("en-US");
        const finalText = unit ? `${formatted} ${unit}` : formatted;

        priceEl.textContent = finalText;
      });
    }
    /* ------------------------------------------------------------------------------ */

    /* --------------------- هندل سازی کامل برای لود با کش ------------------------ */
    async function loadCategory(catid) {
      const cache = section._tourState.cache;

      // اگر قبلاً فچ شده → از کش استفاده کن
      if (cache[catid]) {
        fetchWrapper.innerHTML = cache[catid].html;

        // فرمت قیمت برای محض اطمینان
        formatPrices(fetchWrapper);

        // Swiper قبلی را destroy کن
        if (section._tourState.swiper) {
          try {
            section._tourState.swiper.destroy(true, true);
          } catch {}
        }

        initSwiper();
        section._tourState.currentCat = catid;
        return;
      }

      // اگر در حال لود همان دسته است → ادامه نده
      if (section._tourState.loading && section._tourState.currentCat === catid)
        return;

      section._tourState.loading = true;
      fetchWrapper.innerHTML = loaderHTML;

      try {
        const res = await fetch(
          `/tour-load-items.bc?catid=${encodeURIComponent(catid)}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const html = await res.text();

        // وارد کردن HTML تازه
        fetchWrapper.innerHTML = html;

        // فرمت قیمت‌ها
        formatPrices(fetchWrapper);

        // ذخیره‌سازی در CACHE
        cache[catid] = { html: fetchWrapper.innerHTML };

        // حذف swiper قبلی
        if (section._tourState.swiper) {
          try {
            section._tourState.swiper.destroy(true, true);
          } catch {}
        }

        // اجرای مجدد Swiper
        initSwiper();

        section._tourState.currentCat = catid;
      } catch (err) {
        console.error("Fetch failed:", err);
        fetchWrapper.innerHTML = `<p class="text-red-500 p-4">Error loading data: ${err.message}</p>`;
      } finally {
        section._tourState.loading = false;
      }
    }

    /* --------------------- Swiper Init در یک تابع جدا ------------------------- */
    function initSwiper() {
      const swiperContainer =
        section.querySelector(".tourSwiper") ||
        section.querySelector("#tour-list-container") ||
        fetchWrapper.closest(".tourSwiper") ||
        fetchWrapper;

      const params = {
        slidesPerView: 4,
        speed: 500,
        centeredSlides: false,
        spaceBetween: 11,
        grabCursor: true,
        autoplay: { delay: 9500, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: {
          nextEl: ".swiper-button-next-ft",
          prevEl: ".swiper-button-prev-ft",
        },
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 8 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 4, spaceBetween: 11 },
        },
      };

      if (document.documentElement.dir === "rtl") params.rtl = true;

      try {
        section._tourState.swiper = new Swiper(swiperContainer, params);
      } catch (err) {
        try {
          section._tourState.swiper = new Swiper(
            "#tour-list-container",
            params
          );
        } catch (e) {
          console.warn("Swiper init failed:", e);
        }
      }
    }
    /* -------------------------------------------------------------------------- */

    setActiveItem(listItems[0] || null);
    if (listItems[0] && seeAllLink) {
      const link = listItems[0].getAttribute("data-link");
      if (link) seeAllLink.setAttribute("href", link);
    }

    if (section._tourState.currentCat)
      loadCategory(section._tourState.currentCat);

    listItems.forEach((li) => {
      li.addEventListener("click", () => {
        const catid = li.getAttribute("data-id");
        const datalink = li.getAttribute("data-link");

        if (seeAllLink && datalink) seeAllLink.setAttribute("href", datalink);

        if (!catid) return;

        if (section._tourState.currentCat === catid) {
          setActiveItem(li);
          return;
        }

        setActiveItem(li);
        loadCategory(catid);
      });
    });
  });
});

// ____________________________
// ____________________________
const target = document.querySelector("main");
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".footer-landing-items")) {
    const homePaths = [
      "/",
      "/flight",
      "/hotel",
      "/flighthotel",
      "/tour",
      "/insurance",
    ];

    const currentPath = window.location.pathname;
    const isHomePage = homePaths.includes(currentPath);
    const isNotHome = !isHomePage;

    const flightItem = document.querySelectorAll('li[data-id="flight"]');
    const hotelItem = document.querySelectorAll('li[data-id="hotel"]');
    const flightHotelItem = document.querySelectorAll(
      'li[data-id="flighthotel"]'
    );
    const tourItem = document.querySelectorAll('li[data-id="tour"]');
    const trainItem = document.querySelectorAll('li[data-id="train"]');
    const insuranceItem = document.querySelectorAll('li[data-id="insurance"]');
    if (isNotHome) {
      if (flightItem) {
        flightItem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/flight";
          });
        });
      }
      if (tourItem) {
        tourItem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/tour";
          });
        });
      }
      if (trainItem) {
        trainItem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/train";
          });
        });
      }
      if (insuranceItem) {
        insuranceItem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/insurance";
          });
        });
      }
      if (flightHotelItem) {
        flightHotelItem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/flighthotel";
          });
        });
      }

      if (hotelItem) {
        hotelItem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/hotel";
          });
        });
      }
    } else {
      if (flightItem) {
        flightItem.forEach((item) => {
          item.addEventListener("click", function () {
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            check_searchHistory("flight");
            check_landing("flight");
          });
        });
      }
      if (tourItem) {
        tourItem.forEach((item) => {
          item.addEventListener("click", function () {
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            check_searchHistory("tour");
            check_landing("tour");
          });
        });
      }
      if (trainItem) {
        trainItem.forEach((item) => {
          item.addEventListener("click", function () {
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            check_searchHistory("train");
            check_landing("train");
          });
        });
      }
      if (insuranceItem) {
        insuranceItem.forEach((item) => {
          item.addEventListener("click", function () {
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            check_searchHistory("insurance");
            check_landing("insurance");
          });
        });
      }
      if (flightHotelItem) {
        flightHotelItem.forEach((item) => {
          item.addEventListener("click", function () {
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            check_searchHistory("flighthotel");
            check_landing("flighthotel");
          });
        });
      }
      if (hotelItem) {
        hotelItem.forEach((item) => {
          item.addEventListener("click", function () {
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            check_searchHistory("hotel");
            check_landing("hotel");
          });
        });
      }
    }
  }
});
// ____________________________
document.addEventListener("DOMContentLoaded", function () {
  const flightItem = document.querySelector(
    'header .header-menu li[data-id="flight"]'
  );
  const hotelItem = document.querySelector(
    'header .header-menu li[data-id="hotel"]'
  );
  if (flightItem) {
    flightItem.addEventListener("click", () => {
      document.querySelector("header  .header-menu ").style.transform =
        "translateX(1024px)";
    });
  }

  if (hotelItem) {
    hotelItem.addEventListener("click", () => {
      document.querySelector("header  .header-menu ").style.transform =
        "translateX(1024px)";
    });
  }
});
// ____________________________
if (document.getElementById("search-content-article")) {
  var input = document.getElementById("search-content-name"),
    isItemSelected = !1;
  if (input) {
    function contentSearched(e, t) {
      (input.value = e),
        (document.getElementById("catidsearched").value = t),
        document.querySelector(".search-content ul").classList.add("hidden"),
        document.querySelector(".search-content ul").classList.remove("flex"),
        (isItemSelected = !0);
    }

    // ایجاد یا گرفتن پاراگراف "هیچ موردی یافت نشد"
    const dropdown = document.querySelector(".search-content ul");
    let noResultMsg = dropdown.querySelector(".no-result-msg");
    if (!noResultMsg) {
      noResultMsg = document.createElement("p");
      noResultMsg.className =
        "no-result-msg text-center text-zinc-500 w-full py-2 hidden";
      noResultMsg.textContent = "هیچ موردی یافت نشد";
      dropdown.appendChild(noResultMsg);
    }

    input.onkeyup = function () {
      const items = document
        .querySelector(".search-content")
        .getElementsByTagName("li");

      const filter = this.value.trim().toUpperCase();
      isItemSelected = !1;

      let visibleCount = 0; // شمارش آیتم‌های قابل‌نمایش

      if (filter.length > 0) {
        dropdown.classList.remove("hidden");
        dropdown.classList.add("flex");

        for (let i = 0; i < items.length; i++) {
          if (items[i].innerHTML.toUpperCase().includes(filter)) {
            items[i].style.display = "list-item";
            visibleCount++;
          } else {
            items[i].style.display = "none";
          }
        }

        // نمایش یا پنهان کردن پیام "هیچ موردی یافت نشد"
        if (visibleCount === 0) {
          noResultMsg.classList.remove("hidden");
        } else {
          noResultMsg.classList.add("hidden");
        }
      } else {
        dropdown.classList.add("hidden");
        dropdown.classList.remove("flex");

        for (let i = 0; i < items.length; i++) {
          items[i].style.display = "list-item";
        }

        noResultMsg.classList.add("hidden"); // پنهان‌کردن پیام هنگام خالی بودن فیلتر
      }
    };

    document
      .getElementById("search-content-article")
      .addEventListener("submit", function (e) {
        if (!isItemSelected) {
          e.preventDefault(),
            (document.getElementById("catidsearched").value = 0);
          for (
            var t = document
                .querySelector(".search-content")
                .getElementsByTagName("li"),
              n = 0;
            n < t.length;
            n++
          )
            t[n].style.display = "list-item";
          document
            .querySelector(".search-content ul")
            .classList.remove("hidden"),
            document.querySelector(".search-content ul").classList.add("flex");
        }
      });

    document.querySelectorAll(".search-drop-down li").forEach((e) => {
      const t = e.querySelector("span").innerText;
      e.addEventListener("click", () => {
        document.querySelector("#search-content-article").action = t;
      });
    });

    // همگام‌سازی href تگ a داخل فرم با مقدار action
    const form = document.getElementById("search-content-article");
    const linkInForm = form.querySelector("a");

    function updateLinkHref() {
      if (form && linkInForm) {
        const action = form.getAttribute("action");
        if (action && action.trim() !== "") {
          linkInForm.setAttribute("href", action);
        } else {
          linkInForm.removeAttribute("href");
        }
      }
    }

    updateLinkHref();

    document.querySelectorAll(".search-drop-down li").forEach((e) => {
      const t = e.querySelector("span").innerText;
      e.addEventListener("click", () => {
        document.querySelector("#search-content-article").action = t;
        updateLinkHref();
      });
    });
  }
}

// ____________________________
// ____________________________
function Set_Offset_Item(element) {
  var hrefValue = element.getAttribute("data-id");
  var HEADER_HEIGHT = 0;
  if (document.querySelector(".will-fixed")) {
    var HEADER_HEIGHT = document.querySelector(".will-fixed").offsetHeight;
  }
  const targetElement = document.getElementById(hrefValue);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      const offsetTop =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        HEADER_HEIGHT -
        85;

      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }, 1);
  }
}
// ____________________________
// ____________________________
function refresh_captcha(element, event) {
  var form = element.closest("form");
  var captchaElement = form.querySelector(".load-captcha");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/Client_Captcha.bc", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      captchaElement.innerHTML = xhr.responseText;
    }
  };
  xhr.send();
}

async function Reply_Comment(element) {
  const responsereply = await fetch("Client_CheckAuthentication.inc");
  if (!responsereply.ok) {
    throw new Error(
      "متاسفانه مشکلی به وجود آمده است لطفا بعدا مجددا تلاش فرمایید."
    );
  } else {
    let CheckAuthentication = await responsereply.text();
    if (CheckAuthentication === "true") {
      var firstname = document.querySelector(
        ".user-profile-content .default-name"
      ).innerText;
      var lastname = document.querySelector(
        ".user-profile-content .default-family"
      ).innerText;
      element.closest(".opinionRow").querySelector(".reply-title").value =
        firstname + " " + lastname;
      element
        .closest(".opinionRow")
        .querySelector(".replyCommentForm")
        .classList.toggle("hidden");
    } else {
      showLoginContainer(this);
    }
  }
}

async function SubmitOpinionForm(element, event) {
  event.preventDefault();
  const response = await fetch("Client_CheckAuthentication.inc");
  if (!response.ok) {
    throw new Error(
      "متاسفانه مشکلی به وجود آمده است لطفا بعدا مجددا تلاش فرمایید."
    );
  } else {
    let CheckAuthentication = await response.text();
    if (CheckAuthentication === "false") {
      var form = new FormData(element.closest("form"));
      var xhr = new XMLHttpRequest();
      xhr.open("POST", element.closest("form").action, true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          document.getElementById("popupMessage").innerHTML = xhr.responseText;
          document.getElementById("popuparticle").classList.remove("hidden");
        } else {
          document.getElementById("popupMessage").innerHTML = xhr.responseText;
          document.getElementById("popuparticle").classList.remove("hidden");
        }
      };
      xhr.send(form);
      // window.location.reload();
    } else {
      showLoginContainer(this);
    }
  }
}

async function send_Reply(element, event) {
  event.preventDefault();
  var form = new FormData(element.closest("form"));
  var xhr = new XMLHttpRequest();
  xhr.open("POST", element.closest("form").action, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("popupMessage").innerHTML = xhr.responseText;
      document.getElementById("popuparticle").classList.remove("hidden");
    } else {
      document.getElementById("popupMessage").innerHTML = xhr.responseText;
      document.getElementById("popuparticle").classList.remove("hidden");
    }
  };
  xhr.send(form);
}

// ____________________________
document.querySelector("#closePopuparticle")?.addEventListener("click", () => {
  document.querySelector("#popuparticle").classList.add("hidden");
});
// ____________________________
// ____________________________
const shareBox = document.querySelector(".share-box");
if (shareBox) {
  const shareIconContainer = document.querySelector(".shareIcon-container");
  const shareIcon = document.querySelectorAll(".shareIcon");

  shareBox.addEventListener("click", () => {
    const isHidden = shareIconContainer.classList.contains("hidden");

    shareIconContainer.classList.toggle("flex");
    shareIconContainer.classList.toggle("hidden");

    if (isHidden) {
      shareIcon.forEach((icon, index) => {
        setTimeout(() => {
          icon.classList.add("active");

          icon.classList.remove("opacity-0");
        }, index * 260);
        setTimeout(() => {
          shareIconContainer.classList.add("active");
        }, 1300);
      });
    } else {
      shareIcon.forEach((icon) => {
        icon.classList.remove("active");
        icon.classList.add("opacity-0");
        shareIconContainer.classList.remove("active");
      });
    }
  });
}

// ____________________________
function setElementHeight() {
  const calcEl = document.querySelector(".calculate-h");
  const setEl = document.querySelector(".set-h");

  if (calcEl && setEl) {
    const height = calcEl.offsetHeight;
    setEl.style.height = height + "px";
  }
}

window.addEventListener("load", setElementHeight);

// ____________________________
// ____________________________
// gallery swiper
if (document.querySelector(".nav-for-slider")) {
  var swiper_thumbs = new Swiper(".nav-for-slider", {
    loop: true,
    spaceBetween: 4,
    slidesPerView: 2,
    navigation: {
      nextEl: ".swiper-button-next-thumbs",
      prevEl: ".swiper-button-prev-thumbs",
    },
  });
  var swiper = new Swiper(".main-slide-carousel", {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-gallery",
      prevEl: ".swiper-button-prev-gallery",
    },
    effect: "fade",
    thumbs: {
      swiper: swiper_thumbs,
    },
  });
}
// ____________________________
document.addEventListener("DOMContentLoaded", () => {
  const travelItems = document.querySelectorAll(".travelouge-item");
  if (!travelItems.length) return;

  travelItems.forEach((item) => {
    item.addEventListener("click", () => {
      const content = item.querySelector(".show-content");

      travelItems.forEach((el) => {
        if (el !== item) {
          el.classList.remove("active");
          const otherContent = el.querySelector(".show-content");
          if (otherContent) {
            otherContent.style.height = "0";
            otherContent.style.opacity = "0";
          }
          const plus = el.querySelector("svg");
          if (plus) plus.style.transform = "rotate(0deg)";
        }
      });

      if (item.classList.contains("active")) {
        item.classList.remove("active");
        content.style.height = "0";
        content.style.opacity = "0";
        const plus = item.querySelector("svg");
        if (plus) plus.style.transform = "rotate(0deg)";
      } else {
        item.classList.add("active");
        const contentHeight = content.scrollHeight + "px";
        content.style.height = contentHeight;
        content.style.opacity = "1";
        const plus = item.querySelector("svg");
        if (plus) plus.style.transform = "rotate(45deg)";
      }
    });
  });
});

// ____________________________

document.addEventListener("DOMContentLoaded", () => {
  const navbarItems = document.querySelectorAll(".tour-detail .navbar-el");
  const sections = document.querySelectorAll(".tour-detail h2[data-id]");

  navbarItems?.forEach((item) => {
    item.addEventListener("click", () => {
      const section = document.querySelector(`h2[data-id="${item.id}"]`);
      if (section) {
        const offset = 80;
        const top =
          section.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  const activateOnScroll = () => {
    let currentId = null;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 230;
      if (window.scrollY >= sectionTop) {
        currentId = section.dataset.id;
      }
    });

    navbarItems?.forEach((item) => {
      item.classList.toggle("active", item.id === currentId);
    });
  };

  window.addEventListener("scroll", activateOnScroll);
  activateOnScroll();
});
// ____________________________
// ____________________________

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  if (counters.length) {
    counters.forEach((counter) => {
      const target = parseInt(counter.textContent.trim(), 10);
      let count = 0;
      const duration = 1200;
      const step = Math.ceil(target / (duration / 16));

      counter.textContent = "0";

      const updateCounter = () => {
        count += step;
        if (count >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = count;
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  }
});

// ____________________________
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

// ____________________________
document.addEventListener("DOMContentLoaded", () => {
  const currentURL = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`,
    twitt: `https://twitter.com/intent/tweet?url=${currentURL}&text=${pageTitle}`,
    whatapp: `https://api.whatsapp.com/send?text=${pageTitle}%20${currentURL}`,
    telegram: `https://t.me/share/url?url=${currentURL}&text=${pageTitle}`,
    mail: `mailto:?subject=${pageTitle}&body=${currentURL}`,
  };

  document.querySelectorAll(".shareIcon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      const classes = icon.classList;
      let network = null;

      for (let key in shareLinks) {
        if (classes.contains(key)) {
          network = key;
          break;
        }
      }

      if (network && shareLinks[network]) {
        window.open(shareLinks[network], "_blank");
      }
    });
  });
});

// ____________________________
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".visa-form-cn");
  const grid = document.querySelector(".grid.visa-container");
  const input = form ? form.querySelector('input[type="text"]') : null;
  const NOT_FOUND_ID = "visa-not-found-message";

  if (!form || !grid || !input) return;

  const removeNotFound = () => {
    const msg = document.getElementById(NOT_FOUND_ID);
    if (msg) msg.remove();
  };

  const showNotFoundMessage = () => {
    removeNotFound();
    const msg = document.createElement("div");
    msg.id = NOT_FOUND_ID;
    msg.className =
      "col-span-4 text-center py-5 font-semibold text-[#444] bg-[#FFF8E1] rounded-xl";
    msg.textContent = "هیچ موردی یافت نشد.";
    grid.insertAdjacentElement("afterend", msg);
  };

  const getCardTitle = (card) => {
    const title = card.querySelector(".title-el")?.textContent?.trim();
    const country = card.querySelector(".county-name")?.textContent?.trim();
    return (title || country || "").toLowerCase();
  };

  const filterCards = (query) => {
    const cards = grid.querySelectorAll(".visa_card");
    const q = query.trim().toLowerCase();
    let visibleCount = 0;
    removeNotFound();

    cards.forEach((card) => {
      const title = getCardTitle(card);
      if (!q || title.includes(q)) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (visibleCount === 0) showNotFoundMessage();
  };

  input.addEventListener("input", (e) => filterCards(e.target.value));

  form.addEventListener("submit", (e) => e.preventDefault());
});

// ____________________________
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".mobile-tour-guide");
  if (!section) return;

  const grid = section.querySelector("div.grid");
  const toggleBtn = section.querySelector(".show-more-card");
  if (!grid || !toggleBtn) return;

  let isOpen = false;

  const collapsedHeight = 236;

  grid.style.transition =
    "height 0.45s cubic-bezier(0.25, 1, 0.30, 1), opacity 0.35s ease";
  grid.style.overflow = "hidden";

  const updateHeight = () => {
    if (isOpen) {
      const fullHeight = [...grid.children].reduce(
        (total, el) =>
          total + el.offsetHeight + parseInt(getComputedStyle(grid).gap),
        0
      );
      grid.style.height = fullHeight + "px";
      grid.style.opacity = "1";
      toggleBtn.classList.remove("h-[200px]");
    } else {
      grid.style.height = collapsedHeight + "px";
      grid.style.opacity = "1";
      toggleBtn.classList.add("h-[200px]");
    }
  };

  updateHeight();

  toggleBtn.addEventListener("click", () => {
    isOpen = !isOpen;

    updateHeight();

    toggleBtn.textContent = isOpen ? "بستن" : "مشاهده بیشتر";
  });

  window.addEventListener("resize", () => {
    if (isOpen) updateHeight();
  });
});

// ____________________________
document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.querySelector(".mobile-common-questions");
  if (!faqContainer) return;

  const questions = faqContainer.querySelectorAll(".question-box");

  questions.forEach((box) => {
    const qs = box.querySelector(".qs");
    const answer = box.querySelector(".answer");
    const arrow = box.querySelector(".arrow svg");

    if (!qs || !answer || !arrow) return;

    // آماده‌سازی انیمیشن
    answer.style.transition =
      "height 0.7s cubic-bezier(0.25, 1, 0.30, 1), opacity 0.65s ease";
    answer.style.opacity = "0";
    answer.style.overflow = "hidden";

    arrow.style.transition = "transform 0.35s ease";

    let isOpen = false;

    qs.addEventListener("click", () => {
      isOpen = !isOpen;

      if (isOpen) {
        const fullHeight = answer.scrollHeight;
        answer.style.height = fullHeight + "px";
        answer.style.opacity = "1";
        arrow.style.transform = "rotate(180deg)";
      } else {
        answer.style.height = "0px";
        answer.style.opacity = "0";
        arrow.style.transform = "rotate(0deg)";
      }
    });
  });
});

// ____________________________
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".modals-container");
  if (!container) return;

  const style = document.createElement("style");
  style.textContent = `
    .image-modal-overlay {
      position: fixed;
      inset: 0;
      backdrop-filter: blur(5px);
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 0;
      opacity: 0;
      display:none;
      transition: opacity 0.3s ease, z-index 0s linear 0.3s;
    }
    .image-modal-overlay.show {
      opacity: 1;
      z-index: 9999;
      display:flex;
      transition: opacity 0.3s ease;
    }
    .image-modal {
      max-width: 85%;
      max-height: 85%;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
      transform: scale(0.8);
      transition: transform 0.3s ease;
    }
    .image-modal.show {
      transform: scale(1);
    }
    .image-modal img {
      width: 500px;
      object-fit: contain;
      background: #fff;
      display: block;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.className = "image-modal-overlay";
  overlay.innerHTML = `<div class="image-modal"><img src="" alt=""></div>`;
  document.body.appendChild(overlay);

  const modal = overlay.querySelector(".image-modal");
  const modalImg = modal.querySelector("img");

  const openModal = (src, alt) => {
    modalImg.setAttribute("src", src);
    modalImg.setAttribute("alt", alt || "");
    overlay.classList.add("show");
    modal.classList.add("show");
  };

  const closeModal = () => {
    modal.classList.remove("show");
    overlay.classList.remove("show");
    setTimeout(() => {
      modalImg.removeAttribute("src");
    }, 300);
  };

  const slides = container.querySelectorAll(".swiper-slide img");
  slides.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt") || "";
      openModal(src, alt);
    });
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("show")) closeModal();
  });
});

// ____________________________
// ____________________________
window.addEventListener("scroll", () => {
  if (window.innerWidth <= 968) {
    const header = document.querySelector("header  div.px-4.fixed");
    if (header) {
      if (window.scrollY > 50) {
        header.style.backdropFilter = "blur(5px)";
        if (document.querySelector(".white-header")) {
          header.style.backgroundColor = "var(--primary-600)";
        } else {
          header.style.backgroundColor = "#fff";
          // header.classList.add("shadow");
        }
      } else {
        header.style.backdropFilter = "none";
        header.style.backgroundColor = "transparent";
        // header.classList.remove("shadow");
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
  const header = document.querySelector("header div.px-4.fixed");
  if (!header) return;

  if (window.innerWidth > 968) {
    header.style.backdropFilter = "none";
    header.style.backgroundColor = "transparent";
  } else {
    if (window.scrollY > 50) {
      header.style.backdropFilter = "blur(5px)";
      header.style.backgroundColor = "#4d819f76";
    } else {
      header.style.backdropFilter = "none";
      header.style.backgroundColor = "transparent";
    }
  }
});

// ____________________________
// ____________________________

if (document.querySelectorAll(".swiper-one-el").length > 0)
  swiper = new Swiper(".swiper-one-el", {
    slidesPerView: 1,
    speed: 900,
    centeredSlides: !1,
    spaceBetween: 16,
    grabCursor: !0,
    autoplay: { delay: 4500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 1, spaceBetween: 16 },
      768: { slidesPerView: 1, spaceBetween: 16 },
      1024: { slidesPerView: 1, spaceBetween: 16 },
    },
  });
// ____________________________
// ____________________________

if (document.querySelectorAll(".swiper-mobile-c").length > 0)
  swiper = new Swiper(".swiper-mobile-c", {
    slidesPerView: 1.3,
    speed: 900,
    centeredSlides: !1,
    spaceBetween: 11,
    grabCursor: !0,
    autoplay: { delay: 4500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 1.3, spaceBetween: 11 },
      768: { slidesPerView: 1.3, spaceBetween: 11 },
      1024: { slidesPerView: 1.3, spaceBetween: 11 },
    },
  });
// ____________________________
if (document.querySelectorAll(".swiper-mobile-c2").length > 0)
  swiper = new Swiper(".swiper-mobile-c2", {
    slidesPerView: 1.66,
    speed: 900,
    centeredSlides: !1,
    spaceBetween: 12,
    grabCursor: !0,
    autoplay: { delay: 4500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 1.66, spaceBetween: 12 },
      768: { slidesPerView: 1.66, spaceBetween: 12 },
      1024: { slidesPerView: 1.66, spaceBetween: 12 },
    },
  });
// ____________________________

if (document.querySelectorAll(".swiper-mobile-c3").length > 0)
  swiper = new Swiper(".swiper-mobile-c3", {
    slidesPerView: 1.39,
    speed: 900,
    centeredSlides: !1,
    spaceBetween: 11,
    grabCursor: !0,
    autoplay: { delay: 4500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 1.39, spaceBetween: 11 },
      768: { slidesPerView: 1.39, spaceBetween: 11 },
      1024: { slidesPerView: 1.39, spaceBetween: 11 },
    },
  });
// ____________________________
// ____________________________
document.addEventListener("DOMContentLoaded", () => {
  const loaderHTML =
    '<div dir="ltr" class="w-full flex justify-center p-6"><span class="loader"></span></div>';

  document.querySelectorAll(".clicker-list").forEach((clickerList) => {
    const section = clickerList.closest("section");
    const fetchWrapper = section.querySelector(".fetch-content-tour-mob");
    const listItems = Array.from(section.querySelectorAll(".tour-li-mob"));

    if (!fetchWrapper || listItems.length === 0) return;

    section._tourState = section._tourState || {
      swiper: null,
      currentCat: null,
      loading: false,
      cache: {},
    };

    const firstId = listItems[0].getAttribute("data-id");
    section._tourState.currentCat = firstId ? firstId : null;

    function setActiveItem(targetItem) {
      listItems.forEach((li) => li.classList.remove("active"));
      if (targetItem) targetItem.classList.add("active");
    }

    // 🔵🔵🔵  تابع فرمت قیمت  🔵🔵🔵
    function formatPrices(wrapper) {
      const priceElements = wrapper.querySelectorAll(".price-element");
      priceElements.forEach((el) => {
        let text = el.textContent.trim();

        // جداسازی عدد از واحد
        const match = text.match(/^(\d+)\s*(.*)$/);
        if (!match) return;

        let number = match[1];
        let unit = match[2] || "";

        // سه‌رقم سه‌رقم کردن
        const formatted = Number(number).toLocaleString("en-US");

        // بازگردانی به المنت
        el.textContent = `${formatted} ${unit}`.trim();
      });
    }

    async function loadCategory(catid) {
      // --- اگر در کش باشد: بدون فچ ---
      if (section._tourState.cache[catid]) {
        fetchWrapper.innerHTML = section._tourState.cache[catid];

        // 🔵 بعد از رندر → فرمت قیمت‌ها
        // formatPrices(fetchWrapper);

        if (section._tourState.swiper?.destroy) {
          try {
            section._tourState.swiper.destroy(true, true);
          } catch (e) {}
        }

        initSwiper();
        section._tourState.currentCat = catid;
        return;
      }

      // --- اگر نبود → فچ جدید ---
      section._tourState.loading = true;
      fetchWrapper.innerHTML = loaderHTML;

      try {
        const res = await fetch(
          `/tour-load-items.bc?catid=${encodeURIComponent(catid)}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const html = await res.text();

        // ذخیره در کش
        section._tourState.cache[catid] = html;

        // رندر
        fetchWrapper.innerHTML = html;

        // 🔵 بعد از رندر → فرمت قیمت‌ها
        // formatPrices(fetchWrapper);

        // Destroy swiper قبلی
        if (section._tourState.swiper?.destroy) {
          try {
            section._tourState.swiper.destroy(true, true);
          } catch (err) {}
        }

        initSwiper();
        section._tourState.currentCat = catid;
      } catch (err) {
        console.error("Fetch failed:", err);
        fetchWrapper.innerHTML = `<p class="text-red-500 p-4">Error loading data: ${err.message}</p>`;
      } finally {
        section._tourState.loading = false;
      }
    }

    function initSwiper() {
      const container =
        section.querySelector(".tourSwiperMob") ||
        section.querySelector("#tour-list-container-mob") ||
        fetchWrapper.closest(".tourSwiperMob") ||
        fetchWrapper;

      const swiperEl = container instanceof Element ? container : fetchWrapper;

      const params = {
        slidesPerView: 1.3,
        speed: 500,
        centeredSlides: false,
        spaceBetween: 11,
        grabCursor: true,
        autoplay: { delay: 9500, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: {
          nextEl: ".swiper-button-next-ft",
          prevEl: ".swiper-button-prev-ft",
        },
        breakpoints: {
          640: { slidesPerView: 1.3, spaceBetween: 11 },
          768: { slidesPerView: 1.3, spaceBetween: 11 },
          1024: { slidesPerView: 1.3, spaceBetween: 11 },
        },
      };

      if (document.documentElement?.dir === "rtl") params.rtl = true;

      try {
        section._tourState.swiper = new Swiper(swiperEl, params);
      } catch (err) {
        try {
          section._tourState.swiper = new Swiper(
            "#tour-list-container-mob",
            params
          );
        } catch (e) {
          console.warn("Swiper init failed:", e);
        }
      }
    }

    setActiveItem(listItems[0]);
    if (section._tourState.currentCat)
      loadCategory(section._tourState.currentCat);

    listItems.forEach((li) => {
      li.addEventListener("click", () => {
        const catid = li.getAttribute("data-id");
        if (!catid) return;

        if (section._tourState.currentCat === catid) {
          setActiveItem(li);
          return;
        }

        setActiveItem(li);
        loadCategory(catid);
      });
    });
  });
});

// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
const useFullInfo = document.querySelector(".useful-information");

if (useFullInfo) {
  const ul = useFullInfo.querySelector("ul");

  useFullInfo.addEventListener("click", (e) => {
    e.stopPropagation();
    ul.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!useFullInfo.contains(e.target)) {
      ul.classList.remove("active");
    }
  });
}

// ____________________________
// ____________________________
// ____________________________
// ____________________________
// calendar
const weekDaysFa = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];
const weekDaysEn = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getWeekDay(gy, gm, gd) {
  let date = new Date(gy, gm - 1, gd);
  return [weekDaysEn[date.getDay()], weekDaysFa[date.getDay()]];
}
const monthsFa = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const monthsEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// تابع تشخیص کبیسه بودن برای شمسی و میلادی
function isLeap(year, type) {
  if (type === "grg")
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return (
    year % 33 === 1 ||
    year % 33 === 5 ||
    year % 33 === 9 ||
    year % 33 === 13 ||
    year % 33 === 17 ||
    year % 33 === 22 ||
    year % 33 === 26 ||
    year % 33 === 30
  );
}

function toShamsi(gy, gm, gd) {
  let g_d_m = [
    0,
    31,
    isLeap(gy, "grg") ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  let gy_day_no =
    (gy - 1600) * 365 +
    Math.floor((gy - 1600 + 3) / 4) -
    Math.floor((gy - 1600 + 99) / 100) +
    Math.floor((gy - 1600 + 399) / 400);
  for (let i = 1; i < gm; i++) gy_day_no += g_d_m[i];
  gy_day_no += gd - 1;

  let j_day_no = gy_day_no - 79;
  let j_np = Math.floor(j_day_no / 12053);
  j_day_no %= 12053;

  let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
  j_day_no %= 1461;

  if (j_day_no >= 366) {
    jy += Math.floor((j_day_no - 1) / 365);
    j_day_no = (j_day_no - 1) % 365;
  }

  let jm =
    j_day_no < 186
      ? 1 + Math.floor(j_day_no / 31)
      : 7 + Math.floor((j_day_no - 186) / 30);
  let jd = j_day_no < 186 ? 1 + (j_day_no % 31) : 1 + ((j_day_no - 186) % 30);

  return [jy, jm, jd, monthsFa[jm - 1]];
}

function toGregorian(jy, jm, jd) {
  jy -= 979;
  let days = jm <= 6 ? (jm - 1) * 31 + jd - 1 : 186 + (jm - 7) * 30 + jd - 1;
  let g_day_no =
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    days +
    79;

  let gy = 1600 + 400 * Math.floor(g_day_no / 146097);
  g_day_no %= 146097;

  if (g_day_no >= 36525) {
    g_day_no--;
    gy += 100 * Math.floor(g_day_no / 36524);
    g_day_no %= 36524;
    if (g_day_no >= 365) g_day_no++;
  }

  gy += 4 * Math.floor(g_day_no / 1461);
  g_day_no %= 1461;

  if (g_day_no >= 366) {
    gy += Math.floor((g_day_no - 1) / 365);
    g_day_no = (g_day_no - 1) % 365;
  }

  let gm = 0,
    gd = g_day_no + 1;
  let g_days_in_month = [
    31,
    isLeap(gy, "grg") ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  while (gm < 12 && gd > g_days_in_month[gm]) gd -= g_days_in_month[gm++];

  return [gy, gm + 1, gd, monthsEn[gm]];
}

function convert() {
  let type = document.querySelector('input[name="calendar"]:checked').value;
  let year = parseInt(document.getElementById("year").value);
  let month = parseInt(document.getElementById("month").value);
  let day = parseInt(document.getElementById("day").value);

  if (!year || !month || !day) {
    alert("لطفاً تمام فیلدها را پر کنید.");
    return;
  }

  let resultGrg, resultShm, weekDayGrg, weekDayShm;

  if (type === "shamsi") {
    resultGrg = toGregorian(year, month, day);
    weekDayGrg = getWeekDay(resultGrg[0], resultGrg[1], resultGrg[2])[0];
    resultShm = [year, month, day, monthsFa[month - 1]];
    weekDayShm = getWeekDay(resultGrg[0], resultGrg[1], resultGrg[2])[1];
  } else {
    resultShm = toShamsi(year, month, day);
    weekDayShm = getWeekDay(year, month, day)[1];
    resultGrg = [year, month, day, monthsEn[month - 1]];
    weekDayGrg = getWeekDay(year, month, day)[0];
  }

  if (window.innerWidth > 1024) {
    document.getElementById("result").innerHTML = `
          <div class="text-primary-900 font-yekanbakhsemiboldFA text-base">${weekDayGrg} , ${resultGrg[3]} (${resultGrg[1]}) , ${resultGrg[2]}  , ${resultGrg[0]}</div>
          <hr class="border-neutralcolor-800 block w-full  
          
          relative
          after:content-[''] 
          after:w-1 after:h-1 after:rounded-full after:bg-neutralcolor-800 after:inline-block 
          after:absolute after:top-0 after:left-0 after:bottom-0 after:-mt-[2.5px] before:content-[''] 
          before:w-1 before:h-1 before:rounded-full before:bg-neutralcolor-800 
          before:inline-block before:absolute before:top-0 before:right-0 before:bottom-0 
          before:-mt-[2.5px]
          
          ">
          <div class="text-primary-900 font-yekanbakhsemiboldFA text-base">${weekDayShm} , ${resultShm[2]} , ${resultShm[3]} (${resultShm[1]}) , ${resultShm[0]}</div>
        `;
  } else {
    document.getElementById("result").innerHTML = `
          <div class="text-primary-900 font-yekanbakhsemiboldFA text-xs">${weekDayGrg} , ${resultGrg[3]} (${resultGrg[1]}) , ${resultGrg[2]}  , ${resultGrg[0]}</div>
          <hr class="border-neutralcolor-800 block w-full  
          
          relative
          after:content-[''] 
          after:w-1 after:h-1 after:rounded-full after:bg-neutralcolor-800 after:inline-block 
          after:absolute after:top-0 after:left-0 after:bottom-0 after:-mt-[2.5px] before:content-[''] 
          before:w-1 before:h-1 before:rounded-full before:bg-neutralcolor-800 
          before:inline-block before:absolute before:top-0 before:right-0 before:bottom-0 
          before:-mt-[2.5px]
          
          ">
          <div class="text-primary-900 font-yekanbakhsemiboldFA text-xs">${weekDayShm} , ${resultShm[2]} , ${resultShm[3]} (${resultShm[1]}) , ${resultShm[0]}</div>
        `;
  }
}

function fillOptions(select, start, end) {
  select.innerHTML = "";
  for (let i = start; i >= end; i--) {
    select.innerHTML += `<option>${i}</option>`;
  }
}

function updateYears() {
  let type = document.querySelector('input[name="calendar"]:checked').value;
  let yearSelect = document.getElementById("year");
  fillOptions(
    yearSelect,
    type === "shamsi" ? 1500 : 2100,
    type === "shamsi" ? 1300 : 1900
  );
}

function updateMonths() {
  let type = document.querySelector('input[name="calendar"]:checked').value;
  let monthSelect = document.getElementById("month");
  let months = type === "shamsi" ? monthsFa : monthsEn; // بررسی نوع تقویم
  monthSelect.innerHTML = months
    .map((m, i) => `<option value="${i + 1}">${m}</option>`)
    .join("");
}

function updateDays() {
  let daySelect = document.getElementById("day");
  let month = parseInt(document.getElementById("month").value);
  let year = parseInt(document.getElementById("year").value);
  let type = document.querySelector('input[name="calendar"]:checked').value;

  let days =
    month <= 6
      ? 31
      : month <= 11
      ? 30
      : type === "shamsi"
      ? isLeap(year, "hsh")
        ? 30
        : 29
      : isLeap(year, "grg")
      ? 29
      : 28;
  fillOptions(daySelect, days, 1);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("date-convertor")) {
    updateYears();
    updateMonths();
    updateDays();
  }
});

// date-convertor

if (document.getElementById("date-convertor")) {
  const labels = document.querySelectorAll('label[name="calendar-label"]');

  labels.forEach((label) => {
    label.addEventListener("click", () => {
      labels.forEach((l) =>
        l.classList.remove("bg-secondary", "bg-white", "text-white")
      );
      label.classList.add("bg-secondary", "text-white");
      labels.forEach((l) => {
        if (l !== label) {
          l.classList.add("bg-white");
        }
      });
    });
  });
}

// calendar
// ____________________________
// ____________________________
// ____________________________
function renderDestinationCards() {
  const titleElements = document.querySelectorAll(".title-cnt");

  if (!titleElements.length) return;

  titleElements.forEach((titleEl) => {
    try {
      const card = titleEl.closest("a, .destination-card, .stanbul-card");
      if (!card) return;

      const raw = titleEl.textContent.trim();
      if (!raw) return;

      const [travelPart, airlinePart] = raw.split("/").map((x) => x?.trim());

      if (!travelPart || !travelPart.includes("-")) return;

      const [departure, destination] = travelPart
        .split("-")
        .map((x) => x?.trim());

      const depEl = card.querySelector(".departure-name");
      const desEl = card.querySelector(".destination-name");

      if (depEl) depEl.textContent = departure || "";
      if (desEl) desEl.textContent = destination || "";

      if (airlinePart) {
        const airlineImg = card.querySelector("img.airline");
        if (airlineImg) airlineImg.src = airlinePart;
      }
    } catch (err) {
      console.warn("Skipped one card due to format mismatch:", err);
    }
  });
}

document.addEventListener("DOMContentLoaded", renderDestinationCards);

// ____________________________
// ____________________________

const toggleTourDateMenu = (button, tourId) => {
  const card = button.closest(".tourL-tour-card");
  const dateMenu = document.querySelector(".tourL-tour-date-menu");
  const listContainer = dateMenu.querySelector(".tour-date-list");

  document.querySelectorAll(".tourL-tour-date-menu").forEach((menu) => {
    if (menu !== dateMenu)
      menu.classList.add("opacity-0", "invisible", "scale-95");
  });

  if (dateMenu.classList.contains("opacity-0")) {
    listContainer.innerHTML =
      '<div class="loading py-4 text-sm text-gray-500">در حال بارگذاری...</div>';
    window.currentDateContainer = listContainer;
    window.currentTourId = tourId;
    window.currentTourCard = card;
    $bc.setSource("db.tourDatesRequest", tourId);
    dateMenu.classList.remove("opacity-0", "invisible", "scale-95");
  } else {
    dateMenu.classList.add("opacity-0", "invisible", "scale-95");
  }
};

document.addEventListener("click", (e) => {
  if (e.target.closest(".close-tourL-tour-date-menu")) {
    const menu = document.querySelector(".tourL-tour-date-menu");
    menu.classList.add("opacity-0", "invisible", "scale-95");
  }
});

function isMobileSatrapScreen() {
  return window.innerWidth < 1024;
}

function buildTourDateRow({ start, end, day }, tourId, card) {
  const mobile = isMobileSatrapScreen();
  const wrap = document.createElement("div");
  wrap.className = [
    "flex",
    "gap-3",
    "border",
    "border-primary-200",
    "rounded-xl",
    "transition-all",
    "duration-300",
    "box-hover1",
    mobile ? "flex-col" : "items-center",
    mobile ? "p-3" : "px-4 h-20",
  ].join(" ");

  const airlineSpan = card.querySelector(".tourL-tour-airline");
  const airlineImg = airlineSpan?.dataset?.airlineImg || "";
  const airlineAlt = (airlineSpan?.textContent || "").trim() || "Airline";

  const daySpan = card.querySelector(".tourL-tour-day");
  const dayText =
    (daySpan?.textContent || "").trim() || `${day} شب - ${day + 1} روز`;

  const priceSpan = card.querySelector(".tourL-tour-price");
  const priceText = (priceSpan?.textContent || "").trim() || "—";

  const left = document.createElement("div");
  left.className = ["flex", "items-center", mobile ? "gap-3" : "gap-4"].join(
    " "
  );
  left.innerHTML = `
    <div class="flex items-center gap-2">
      <img loading="lazy" src="/images/Calendar.svg" alt="Calendar">
      <span class="start__date" data-date="${start.date}">${start.date}</span>
    </div>
    <div class="flex items-center gap-2 ">
      <img loading="lazy" src="/images/Calendar.svg" alt="Calendar">
      <span class="end__date" data-date="${end.date}">${end.date}</span>
    </div>
  `;

  const mid = document.createElement("div");
  mid.className = [
    "flex",
    mobile ? "flex-col" : "items-center",
    mobile ? "" : "gap-4",
    mobile ? "" : "flex-1",
  ].join(" ");
  mid.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-1 text-sm text-primary-500 font-extrabold">
     <img loading="lazy" src="/images/Time Circle.svg" alt="time circle">
        <span class="tourL-tour-day">${dayText}</span>
      </div>
      ${
        airlineImg
          ? `<img src="${airlineImg}" class="h-auto" alt="${airlineAlt}" width="74" height="30" loading="lazy">`
          : ""
      }
    </div>
    <div class="${mobile ? "mt-2" : ""}">
      <span class="inline-flex items-center gap-2 items-center">
        از
        <span class="inline-flex ${
          mobile ? "text-lg" : "text-2xl"
        } text-primary-500 font-extrabold">
          ${priceText}
        </span>
      </span>
    </div>
  `;

  const right = document.createElement("div");
  right.className = [
    "flex",
    "items-center",
    "gap-2",
    mobile ? "w-full" : "",
  ].join(" ");

  const tourLink = `/tour.bc?id=${tourId}&day=${day}&from=${start.dateid}&to=${end.dateid}`;
  const a = document.createElement("a");
  a.href = tourLink;
  a.className = [
    "flex",
    "gap-4",
    mobile ? "flex-col" : "items-center",
    mobile ? "" : "w-full",
    "h-full",
    "transition-all",
    "duration-300",
    "cursor-pointer",
  ].join(" ");
  a.appendChild(left);
  a.appendChild(mid);

  const contactLink = document.createElement("a");
  contactLink.href = "tel:02122221422";
  contactLink.className =
    "flex items-center justify-center gap-2 w-28 h-12 font-extrabold rounded-xl bg-secondary-700 text-white transition-all duration-300 hover:shadow-btn-shadow";
  contactLink.innerHTML = `
    تماس
    
  `;

  const form = document.createElement("form");
  form.className = mobile ? "flex-1 mb-0" : "mb-0";
  form.action = `/tours/package/pdf?id=${tourId}`;
  form.method = "POST";
  form.target = "_blank";
  form.innerHTML = `
    <input type="hidden" name="id" value="${tourId}">
    <input type="hidden" name="from" value="${start.dateid}">
    <input type="hidden" name="to" value="${end.dateid}">
    <input type="hidden" name="day" value="${day}">
    <input type="hidden" name="fdate" value="${start.date}">
    <input type="hidden" name="rdate" value="${end.date}">
    <button type="submit"
      class="group flex cursor-pointer items-center justify-center gap-2 ${
        mobile ? "w-full" : "w-28"
      } h-12 text-zinc-900 font-extrabold rounded-xl transition-all duration-300 bg-primary hover:shadow-btn-shadow">
      دانلود پکیج
    </button>
  `;

  right.appendChild(contactLink);
  right.appendChild(form);

  wrap.appendChild(a);
  wrap.appendChild(right);

  return wrap;
}

const onTourDatesLoaded = async (apiResponse) => {
  if (!window.currentDateContainer) return;

  try {
    const response = apiResponse.response;
    const jsonData = await response.json();

    let data = [];
    if (jsonData?.sources?.length > 0) {
      data = jsonData.sources[0].data || [];
    }

    if (!Array.isArray(data) || data.length === 0) {
      window.currentDateContainer.innerHTML =
        '<div class="no-dates py-4 text-sm text-gray-500">تاریخی موجود نیست</div>';
      return;
    }

    const card = window.currentTourCard;
    window.currentDateContainer.innerHTML = "";
    data.forEach((dateItem) => {
      const row = buildTourDateRow(dateItem, window.currentTourId, card);
      window.currentDateContainer.appendChild(row);
    });
  } catch (error) {
    console.error("خطا در پردازش response:", error);
    window.currentDateContainer.innerHTML =
      '<div class="error py-4 text-sm text-red-500">خطا در بارگذاری تاریخ‌ها</div>';
  }
};

const renderInventoryList = async (element, day, from, to) => {
  try {
    const mobile = isMobileSatrap();
    const selector = mobile ? ".swiper-slide" : ".date-li";

    document.querySelectorAll(selector).forEach((e) => {
      const group = e.querySelector(".group, .group\\/leveltwo");
      const dates = e.querySelector(".tour-dates, span");
      if (group) group.classList.remove("border-primary-400");
      if (dates) dates.classList.remove("text-primary-500");
    });

    $bc.setSource("db.inventoryViewSpecificDate", { from, to, day });

    const group = element.querySelector(".group, .group\\/leveltwo");
    const dates = element.querySelector(".tour-dates, span");
    if (group) group.classList.add("border-primary-400");
    if (dates) dates.classList.add("text-primary-500");
  } catch (err) {
    console.error("خطا در renderInventoryList:", err);
  }
};

// ____________________________
// ____________________________
document.addEventListener("DOMContentLoaded", () => {
  const parents = document.querySelectorAll("#parent-p");
  if (!parents.length) return;

  parents.forEach((parent) => {
    const triggers = parent.querySelectorAll(".phone-popup-container");
    const popup = parent.querySelector(".popup-tel");
    const closeBtn = parent.querySelector(".close-popup");

    if (!popup || triggers.length === 0 || !closeBtn) return;

    const openPopup = () => {
      popup.classList.remove("hidden");
      popup.classList.add("flex");
      popup.style.opacity = "0";
      popup.style.transition = "opacity 0.25s ease";
      requestAnimationFrame(() => {
        popup.style.opacity = "1";
      });
    };

    const closePopup = () => {
      popup.style.opacity = "0";
      popup.addEventListener(
        "transitionend",
        () => {
          popup.classList.add("hidden");
          popup.classList.remove("flex");
        },
        { once: true }
      );
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", openPopup);
    });

    closeBtn.addEventListener("click", closePopup);

    popup.addEventListener("click", (e) => {
      if (e.target === popup) closePopup();
    });
  });
});

// ____________________________
// ____________________________
document.addEventListener("DOMContentLoaded", () => {
  const megaMenus = document.querySelectorAll(".has-megaMenu");
  if (!megaMenus.length) return;

  const cache = new Map();

  const fetchCategory = async (catId, target) => {
    if (cache.has(catId)) {
      target.innerHTML = cache.get(catId);
      return;
    }

    const res = await fetch(`/menu-load-items.bc?catid=${catId}`);
    if (!res.ok) return;
    const html = await res.text();
    cache.set(catId, html);
    target.innerHTML = html;
  };

  megaMenus.forEach((menu) => {
    const catContainer = menu.querySelector(".cat-container");
    const itemsContainer = menu.querySelector(".load-mega-menu-items");
    if (!catContainer || !itemsContainer) return;

    const cats = catContainer.querySelectorAll("li[data-id]");
    if (!cats.length) return;

    const activate = (li) => {
      cats.forEach((i) => i.classList.remove("active"));
      li.classList.add("active");
    };

    const handleClick = (li) => {
      const catId = li.dataset.id;
      if (!catId) return;
      activate(li);
      fetchCategory(catId, itemsContainer);
    };

    cats.forEach((li) => {
      li.addEventListener("click", () => handleClick(li));
    });

    handleClick(cats[0]);
  });
});
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
// ____________________________
if (
  document.querySelector(".about-counter-list") &&
  document.querySelector(".about-counter")
) {
  const counters = document.querySelectorAll(".about-counter");
  const duration = 2000;

  const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * target);
      counter.innerText = current;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        counter.innerText = target;
      }
    };
    window.requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          if (!counter.dataset.started) {
            counter.dataset.started = "true";
            startCounter(counter);
          }
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}
