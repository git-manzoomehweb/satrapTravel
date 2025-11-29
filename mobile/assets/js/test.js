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
      const fetchWrapper = section.querySelector(".fetch-content-tour-mob");
      const listItems = Array.from(section.querySelectorAll(".tour-li-mob"));

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
            section.querySelector(".tourSwiperMob") ||
            section.querySelector("#tour-list-container-mob") ||
            fetchWrapper.closest(".tourSwiperMob") ||
            fetchWrapper;
          const swiperEl =
            container instanceof Element ? container : fetchWrapper;

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
                "#tour-list-container-mob",
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