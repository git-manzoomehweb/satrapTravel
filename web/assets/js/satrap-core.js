function placeHolders() {
  const depRoutes = document.querySelectorAll("departure-route .text-value");
  depRoutes.forEach((input) => {
    input.placeholder = "شهر مبدا";
  });

  const desRoutes = document.querySelectorAll("destination-route .text-value");
  desRoutes.forEach((input) => {
    input.placeholder = "شهر مقصد";
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const requiredFiles = ["satrap.ui.min.css"];

  function checkAllResourcesLoaded() {
    const resources = performance.getEntriesByType("resource");
    const loadedFiles = resources
      .map((res) => res.name.split("/").pop())
      .filter((name) => requiredFiles.includes(name));
    // console.log(resources);

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
            placeHolders();
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
    slidesPerView: 5,
    speed: 800,
    centeredSlides: !1,
    loop: 1,
    autoplay: { delay: 7000, disableOnInteraction: !1 },
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
function refreshCaptchaFooter(e) {
  $bc.setSource("captcha.refreshFooter", !0);
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

  seeMoreBtn.addEventListener("click", () => {
    if (!expanded) {
      aidContent.style.maxHeight = aidContent.scrollHeight + "px";
      seeMoreBtn.querySelector("span").textContent = "مشاهده کمتر";
      expanded = true;
    } else {
      aidContent.style.maxHeight = "900px";
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
if (document.querySelector("hotel-list")) {
  (function () {
    // ----- تنظیمات: اگر سلکتورهای صفحه‌ت متفاوت‌اند همین‌جا تغییر بده -----
    const SELECTORS = {
      hotelCard: ".hotel_card",
      hotelName: ".hotelName",
      hotelStar: ".hotelStar",
      hotelNameInput: ".hotel-name-filter",
      starFilterContainer: ".star-filter", // کانتینر کلیِ بخش ستاره
      starToggleBtn: ".star-filter .flex.cursor-pointer", // دیوی که کلیک میشه برای باز/بسته
      starBox: ".star-box", // جعبه چک‌باکس‌ها
      starCheckboxSelector: '.star-box input[type="checkbox"]',
      resultsContainerSelector: null, // اگر میخوای پیام "هتلی یافت نشد" داخل المنت خاصی باشد، سلکتورش را اینجا بذار
    };

    // ---------- کمک‌فانکشن‌ها ----------
    function $(sel, root = document) {
      return root.querySelector(sel);
    }
    function $$(sel, root = document) {
      return Array.from(root.querySelectorAll(sel));
    }

    // تبدیل ارقام فارسی/عربی به انگلیسی
    function persianToEnglishDigits(s = "") {
      s = String(s);
      const persian = "۰۱۲۳۴۵۶۷۸۹";
      const arabic = "٠١٢٣٤٥٦٧٨٩";
      for (let i = 0; i < 10; i++) {
        s = s.split(persian[i]).join(String(i));
        s = s.split(arabic[i]).join(String(i));
      }
      return s;
    }

    // نرمال‌سازی متن برای مقایسه
    function normalizeText(s = "") {
      return String(s || "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
    }

    // خواندن مقدار ستاره از متن داخل یک المنت (پشتیبانی از '3' یا '4.8' یا '۴.۸')
    function parseStarValueFromText(text) {
      if (text == null) return NaN;
      const cleaned = persianToEnglishDigits(String(text))
        .replace(/,/g, ".")
        .replace(/[^\d.]/g, "");
      if (cleaned === "") return NaN;
      // اگر عدد صحیح (مثلاً "3") یا اعشاری "4.8"
      const n = parseFloat(cleaned);
      return Number.isFinite(n) ? n : NaN;
    }

    // بازگشت به لیست به‌روز کارت‌ها (برای موارد داینامیک)
    function getHotelCards() {
      return $$(SELECTORS.hotelCard);
    }

    // debounce کوچک
    function debounce(fn, wait = 250) {
      let t;
      return function (...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
      };
    }

    // پیام "هتلی یافت نشد"
    const noResultEl = document.createElement("div");
    noResultEl.className = "no-results";
    noResultEl.textContent = "هتلی یافت نشد";

    // محلی که پیام قرار می‌گیرد
    function getResultsAnchor() {
      if (SELECTORS.resultsContainerSelector) {
        return $(SELECTORS.resultsContainerSelector) || document.body;
      }
      // پیش‌فرض: کانتینر والد اولین کارت یا خود body
      const cards = getHotelCards();
      return cards && cards[0] && cards[0].parentNode
        ? cards[0].parentNode
        : document.body;
    }

    // ----- انیمیشن باز/بسته کردن star-box (محاسبه scrollHeight برای transition smooth) -----
    function attachStarToggle(toggleEl, boxEl) {
      if (!toggleEl || !boxEl) return;
      // آماده‌سازی CSS inline برای transition پویا
      boxEl.style.overflow = "hidden";
      boxEl.style.maxHeight = "0px";
      boxEl.style.transition =
        "max-height 320ms cubic-bezier(.2,.9,.3,1), opacity 220ms linear";
      boxEl.style.opacity = "0";

      toggleEl.addEventListener("click", function () {
        const isOpen = boxEl.classList.contains("open");
        if (!isOpen) {
          // باز کردن: تنظیم maxHeight برابر scrollHeight و opacity=1
          boxEl.classList.add("open");
          const sh = boxEl.scrollHeight;
          boxEl.style.maxHeight = sh + "px";
          boxEl.style.opacity = "1";
          // اگر آیکون چگ دارید می‌چرخونیم
          toggleEl.querySelector(".chev")?.classList.add("open");
        } else {
          // بستن
          boxEl.classList.remove("open");
          boxEl.style.maxHeight = "0px";
          boxEl.style.opacity = "0";
          toggleEl.querySelector(".chev")?.classList.remove("open");
        }
      });

      // وقتی انتقال تمام شد و باز است، maxHeight را حذف کن (تا اگر محتوا تغییر کرد، اندازه تطبیق کند)
      boxEl.addEventListener("transitionend", function (e) {
        if (e.propertyName !== "max-height") return;
        if (boxEl.classList.contains("open")) {
          boxEl.style.maxHeight = ""; // آزاد کردن محدودیت تا اگر محتوا تغییر کرد اتوماتیک شود
        }
      });
    }

    // ----- مقداردهی ایمن به چک‌باکس‌ها (اگر value ندارند) -----
    function ensureCheckboxValues(boxEl) {
      if (!boxEl) return;
      const cbs = $$(SELECTORS.starCheckboxSelector, boxEl);
      cbs.forEach((cb) => {
        if (!cb.value || cb.value.trim() === "") {
          // سعی کن از data-star یا id ارقام را استخراج کنی
          let v = cb.getAttribute("data-star") || cb.id || cb.name || "";
          // استخراج ارقام
          const digits = (v + "").replace(/[^0-9۰-۹]/g, "");
          if (digits) {
            cb.value = persianToEnglishDigits(digits);
          } else {
            // fallback: اگر label نزدیک هست، تلاش برای گرفتن متن label
            const lbl = boxEl.querySelector(`label[for="${cb.id}"]`);
            if (lbl) {
              const t = lbl.textContent || "";
              const digits2 = (t + "").replace(/[^0-9۰-۹]/g, "");
              if (digits2) cb.value = persianToEnglishDigits(digits2);
            }
          }
        }
      });
    }

    // ----- تابع اصلی فیلتر -----
    function applyFilters() {
      const cards = getHotelCards();
      const nameInput = $(SELECTORS.hotelNameInput);
      const nameFilter = nameInput ? normalizeText(nameInput.value) : "";

      // کدام ستاره‌ها انتخاب شده‌اند
      const starBoxEl = $(SELECTORS.starBox);
      const checkedStars = starBoxEl
        ? $$(SELECTORS.starCheckboxSelector, starBoxEl)
            .filter((ch) => ch.checked)
            .map((ch) => {
              const v = ch.value ? persianToEnglishDigits(ch.value) : "";
              return v === "" ? null : parseInt(v, 10);
            })
            .filter((n) => Number.isInteger(n))
        : [];

      const starFilterActive = checkedStars.length > 0;

      let visibleCount = 0;
      cards.forEach((card) => {
        const nameEl = $(SELECTORS.hotelName, card);
        const starEl = $(SELECTORS.hotelStar, card);
        const nameText = nameEl ? normalizeText(nameEl.textContent) : "";
        const starVal = starEl
          ? parseStarValueFromText(starEl.textContent)
          : NaN;

        // بررسی نام
        const nameMatch = !nameFilter ? true : nameText.includes(nameFilter);

        // بررسی ستاره
        let starMatch = true;
        if (starFilterActive) {
          starMatch = checkedStars.some((st) => {
            if (!Number.isFinite(starVal)) return false;
            const min = st;
            const max = st + 0.999999;
            return starVal >= min && starVal <= max;
          });
        }

        const show = nameMatch && starMatch;
        if (show) {
          // نشان ده
          card.classList.remove("hidden-by-filter");
          card.style.display = ""; // برگرداندن به حالت اصلی (flex / block بسته به CSS)
          visibleCount++;
        } else {
          card.classList.add("hidden-by-filter");
          card.style.display = "none";
        }
      });

      // مدیریت پیام "هتلی یافت نشد"
      const anchor = getResultsAnchor();
      const existing = anchor.querySelector(".no-results");
      if (visibleCount === 0) {
        if (!existing) anchor.appendChild(noResultEl);
      } else {
        if (existing) existing.remove();
      }
    }

    // ----- یکپارچه‌سازی رویدادها و پشتیبانی از داینامیک بودن -----
    function init() {
      const starToggle = $(SELECTORS.starToggleBtn);
      const starBox = $(SELECTORS.starBox);
      const nameInput = $(SELECTORS.hotelNameInput);

      // اگر starBox هست مقداردهی ایمن چک‌باکس‌ها
      ensureCheckboxValues(starBox);

      // انیمیشن باز/بسته
      attachStarToggle(starToggle, starBox);

      // delegated listener برای چک‌باکس‌ها (برای پشتیبانی از اضافه/حذف داینامیک)
      if (starBox) {
        starBox.addEventListener(
          "change",
          function (e) {
            const target = e.target;
            if (
              target &&
              target.matches &&
              target.matches('input[type="checkbox"]')
            ) {
              // اگر لازم شد مقدار value رو ست کن (حتی اگر بعداً اضافه شده)
              if (!target.value || target.value.trim() === "") {
                const id = target.id || "";
                const digits = (id + "").replace(/[^0-9۰-۹]/g, "");
                if (digits) target.value = persianToEnglishDigits(digits);
              }
              applyFilters();
            }
          },
          true
        );
      }

      // ورودی نام هتل با debounce
      if (nameInput) {
        nameInput.addEventListener("input", debounce(applyFilters, 220));
        nameInput.addEventListener("keydown", function (e) {
          if (e.key === "Enter") applyFilters();
        });
      }

      // اگر کارت‌ها به‌صورت داینامیک اضافه میشوند: MutationObserver روی والد کارت‌ها
      const firstCards = getHotelCards();
      const anchor =
        firstCards && firstCards[0] ? firstCards[0].parentNode : document.body;
      if (anchor) {
        const mo = new MutationObserver((mutList) => {
          let shouldReapply = false;
          for (const m of mutList) {
            if (m.addedNodes && m.addedNodes.length) shouldReapply = true;
            if (m.removedNodes && m.removedNodes.length) shouldReapply = true;
          }
          if (shouldReapply) {
            // دوباره مقداردهی چک‌باکس‌ها (حالت خاص) و اعمال فیلتر
            ensureCheckboxValues($(SELECTORS.starBox));
            applyFilters();
          }
        });
        mo.observe(anchor, { childList: true, subtree: false });
      }

      // اجرای اولیه
      applyFilters();
    }

    // ایمن اجرا کن (اگر المان‌ها اصلاً نیستند، خطا نده)
    try {
      init();
    } catch (err) {
      console.error("Filter init error:", err);
    }
  })();
}
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
  const YTPlayers = {};

  function updateNavButtons() {
    prevBtn.style.opacity = currentStoryIndex === 0 ? "0" : "1";
    nextBtn.style.opacity =
      currentStoryIndex === stories.length - 1 ? "0" : "1";
    prevBtn.style.pointerEvents = currentStoryIndex === 0 ? "none" : "auto";
    nextBtn.style.pointerEvents =
      currentStoryIndex === stories.length - 1 ? "none" : "auto";
  }

  function stopAllVideos() {
    fetchContainer.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });
    Object.values(YTPlayers).forEach((player) => player?.pauseVideo?.());
  }

  async function loadStoryItems(index) {
    currentStoryIndex = index;
    updateNavButtons();

    const catid = stories[index].getAttribute("catid");
    if (!catid) return;

    fetchContainer.innerHTML =
      '<div dir="ltr" class="w-full flex items-center h-[700px] justify-center"><span class="loader"></span></div>';

    try {
      const response = await fetch(`/story-load-items.bc?catid=${catid}`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const html = await response.text();
      fetchContainer.innerHTML = html;

      fetchContainer.querySelectorAll(".story-item").forEach((item, idx) => {
        const url = item.getAttribute("data-video")?.trim();
        if (!url) return;

        item.innerHTML = "";

        if (url.includes("aparat.com")) {
          const hashMatch = url.match(
            /(?:embed\/|video\/|v\/)([a-zA-Z0-9_-]+)/
          );
          if (hashMatch && hashMatch[1]) {
            const hash = hashMatch[1];
            const iframe = document.createElement("iframe");
            iframe.setAttribute(
              "src",
              `https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame`
            );
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", "700px");
            iframe.setAttribute("allowfullscreen", "true");
            iframe.className = "w-full h-full rounded-lg";
            item.appendChild(iframe);
          }
        } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
          let videoId = null;
          if (url.includes("youtu.be/"))
            videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
          else if (url.includes("v="))
            videoId = url.split("v=")[1].split("&")[0];
          else {
            const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
            if (match) videoId = match[1];
          }
          if (videoId) {
            const iframe = document.createElement("iframe");
            iframe.setAttribute("id", `ytplayer-${idx}`);
            iframe.setAttribute(
              "src",
              `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`
            );
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", "700px");
            iframe.setAttribute("allowfullscreen", "true");
            iframe.className = "w-full h-full rounded-lg";
            item.appendChild(iframe);
            YTPlayers[`ytplayer-${idx}`] = null;
          }
        } else if (url.endsWith(".mp4") || url.endsWith(".webm")) {
          const videoEl = document.createElement("video");
          videoEl.setAttribute("src", url);
          videoEl.setAttribute("controls", "true");
          videoEl.className = "w-full h-full rounded-lg";
          item.appendChild(videoEl);
        }
      });

      stopAllVideos();

      if (Object.keys(YTPlayers).length > 0) {
        if (typeof YT === "undefined") {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          document.body.appendChild(tag);
        }
        window.onYouTubeIframeAPIReady = function () {
          Object.keys(YTPlayers).forEach((id) => {
            const iframe = document.getElementById(id);
            YTPlayers[id] = new YT.Player(iframe, {});
          });
        };
      }
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
    stopAllVideos();
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

  document
    .querySelectorAll(".clicker-list")
    .forEach((clickerList, sectionIndex) => {
      const section =
        clickerList.parentElement ||
        clickerList.closest(".section") ||
        document;
      const fetchWrapper = section.querySelector(".fetch-content-tour");
      const listItems = Array.from(section.querySelectorAll(".tour-li"));

      if (!fetchWrapper || listItems.length === 0) return;

      section._tourState = section._tourState || {
        swiper: null,
        currentCat: null,
        loading: false,
      };

      const firstId = listItems[0].getAttribute("data-id");
      section._tourState.currentCat = firstId ? firstId : null;

      function setActiveItem(targetItem) {
        listItems.forEach((li) => li.classList.remove("active"));
        if (targetItem) targetItem.classList.add("active");
      }

      async function loadCategory(catid) {
        if (
          section._tourState.loading &&
          section._tourState.currentCat === catid
        )
          return;
        section._tourState.loading = true;
        fetchWrapper.innerHTML = loaderHTML;

        try {
          const res = await fetch(
            `/tour-load-items.bc?catid=${encodeURIComponent(catid)}`
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const html = await res.text();

          fetchWrapper.innerHTML = html;

          if (
            section._tourState.swiper &&
            typeof section._tourState.swiper.destroy === "function"
          ) {
            try {
              section._tourState.swiper.destroy(true, true);
            } catch (err) {
              /* ignore */
            }
            section._tourState.swiper = null;
          }

          const container =
            section.querySelector(".tourSwiper") ||
            section.querySelector("#tour-list-container") ||
            fetchWrapper.closest(".tourSwiper") ||
            fetchWrapper;
          const swiperEl =
            container instanceof Element ? container : fetchWrapper;

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
              640: { slidesPerView: 4, spaceBetween: 11 },
              768: { slidesPerView: 4, spaceBetween: 11 },
              1024: { slidesPerView: 4, spaceBetween: 11 },
            },
          };

          if (
            document.documentElement &&
            document.documentElement.dir === "rtl"
          ) {
            params.rtl = true;
          }

          try {
            section._tourState.swiper = new Swiper(swiperEl, params);
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

          section._tourState.currentCat = catid;
        } catch (err) {
          console.error("Fetch failed:", err);
          fetchWrapper.innerHTML = `<p class="text-red-500 p-4">Error loading data: ${err.message}</p>`;
        } finally {
          section._tourState.loading = false;
        }
      }

      setActiveItem(listItems[0]);
      if (section._tourState.currentCat)
        loadCategory(section._tourState.currentCat);

      listItems.forEach((li) => {
        li.addEventListener("click", (ev) => {
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
