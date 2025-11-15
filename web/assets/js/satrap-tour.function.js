const page_lang = "fa";
// conver solar to gregorian date
JalaliDate = {
  g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
};

JalaliDate.jalaliToGregorian = function (j_y, j_m, j_d) {
  j_y = parseInt(j_y);
  j_m = parseInt(j_m);
  j_d = parseInt(j_d);
  var jy = j_y - 979;
  var jm = j_m - 1;
  var jd = j_d - 1;

  var j_day_no =
    365 * jy + parseInt(jy / 33) * 8 + parseInt(((jy % 33) + 3) / 4);
  for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

  j_day_no += jd;

  var g_day_no = j_day_no + 79;

  var gy =
    1600 +
    400 *
      parseInt(
        g_day_no / 146097
      ); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
  g_day_no = g_day_no % 146097;

  var leap = true;
  if (g_day_no >= 36525) {
    /* 36525 = 365*100 + 100/4 */ g_day_no--;
    gy +=
      100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
    g_day_no = g_day_no % 36524;

    if (g_day_no >= 365) g_day_no++;
    else leap = false;
  }

  gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
  g_day_no %= 1461;

  if (g_day_no >= 366) {
    leap = false;

    g_day_no--;
    gy += parseInt(g_day_no / 365);
    g_day_no = g_day_no % 365;
  }

  for (
    var i = 0;
    g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
    i++
  )
    g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
  var gm = i + 1;
  var gd = g_day_no + 1;

  gm = gm < 10 ? "0" + gm : gm;
  gd = gd < 10 ? "0" + gd : gd;

  return [gy, gm, gd];
};

const renderedSelectedDate = async (startText, startDate, endText, endDate) => {
  try {
    if (document.querySelector(".origins__start__day")) {
      document.querySelector(".origins__start__day").innerText = startText;
    }
    if (document.querySelector(".destinations__start__day")) {
      document.querySelector(".destinations__start__day").innerText = endText;
    }

    const origins = startDate;
    const destinations = endDate;
    const dateSplittedOrigins = origins.split("-");
    const dateSplittedDestinations = destinations.split("-");
    const jDOrigins = JalaliDate.jalaliToGregorian(
      dateSplittedOrigins[0],
      dateSplittedOrigins[1],
      dateSplittedOrigins[2]
    );
    const jDDestinations = JalaliDate.jalaliToGregorian(
      dateSplittedDestinations[0],
      dateSplittedDestinations[1],
      dateSplittedDestinations[2]
    );
    if (page_lang === "fa") {
      var weekday = [
        "یکشنبه",
        "دوشنبه",
        "سه شنبه",
        "چهارشنبه",
        "پنج شنبه",
        "جمعه",
        "شنبه",
      ];
    } else if (page_lang === "en") {
      var weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
    } else if (page_lang === "ar") {
      var weekday = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ];
    }
    const dOrigins = new Date(
      jDOrigins[0] + "-" + jDOrigins[1] + "-" + jDOrigins[2]
    );
    const dDestinations = new Date(
      jDDestinations[0] + "-" + jDDestinations[1] + "-" + jDDestinations[2]
    );
    if (document.querySelector(".origins__start__weekday")) {
      document.querySelector(".origins__start__weekday").innerText =
        weekday[dOrigins.getDay()];
    }
    if (document.querySelector(".destinations__start__weekday")) {
      document.querySelector(".destinations__start__weekday").innerText =
        weekday[dDestinations.getDay()];
    }
  } catch (err) {
    console.error("renderedSelectedDate=" + err.lineNumber + "," + err.message);
  }
};
const onrenderedDates = async () => {
  try {
    if (document.querySelector(".date__details ul")) {
      renderedSelectedDate(
        document
          .querySelector(".date__details ul")
          .querySelectorAll("li")[0]
          .querySelector(".start__date").innerText,
        document
          .querySelector(".date__details ul")
          .querySelectorAll("li")[0]
          .querySelector(".start__date").dataset.date,
        document
          .querySelector(".date__details ul")
          .querySelectorAll("li")[0]
          .querySelector(".end__date").innerText,
        document
          .querySelector(".date__details ul")
          .querySelectorAll("li")[0]
          .querySelector(".end__date").dataset.date
      );
    }
  } catch (err) {
    console.error("onrenderedDates=" + err.lineNumber + "," + err.message);
  }
};
const renderMonthDate = async (element, type) => {
  try {
    if (element) {
      let dateType = type == "start" ? element.start : element.end;
      const date = dateType.date.split("-");
      let month = "";
      if (page_lang === "fa") {
        switch (parseInt(date[1])) {
          case 1:
            month = "فروردین";
            break;
          case 2:
            month = "اردیبهشت";
            break;
          case 3:
            month = "خرداد";
            break;
          case 4:
            month = "تیر";
            break;
          case 5:
            month = "مرداد";
            break;
          case 6:
            month = "شهریور";
            break;
          case 7:
            month = "مهر";
            break;
          case 8:
            month = "آبان";
            break;
          case 9:
            month = "آذر";
            break;
          case 10:
            month = "دی";
            break;
          case 11:
            month = "بهمن";
            break;
          case 12:
            month = "اسفند";
        }
        return month;
      } else {
        const gDate = JalaliDate.jalaliToGregorian(
          parseInt(date[0]),
          parseInt(date[1]),
          parseInt(date[2])
        );
        switch (parseInt(gDate[1])) {
          case 1:
            month = "January";
            break;
          case 2:
            month = "February";
            break;
          case 3:
            month = "March";
            break;
          case 4:
            month = "April";
            break;
          case 5:
            month = "May";
            break;
          case 6:
            month = "June";
            break;
          case 7:
            month = "July";
            break;
          case 8:
            month = "August";
            break;
          case 9:
            month = "September";
            break;
          case 10:
            month = "October";
            break;
          case 11:
            month = "November";
            break;
          case 12:
            month = "December";
        }
        return month;
      }
    }
  } catch (err) {
    console.error("renderMonthDate=" + err.lineNumber + "," + err.message);
  }
};
const renderWeekDate = async (element, type) => {
  try {
    if (element) {
      let dateType = type == "start" ? element.start : element.end;
      const date = dateType.date.split("-");

      let gDate;
      if (page_lang === "fa") {
        gDate = JalaliDate.jalaliToGregorian(
          parseInt(date[0]),
          parseInt(date[1]),
          parseInt(date[2])
        );
      }

      const jsDate = new Date(gDate[0], gDate[1] - 1, gDate[2]);
      const dayIndex = jsDate.getDay();

      let weekday;
      if (page_lang === "fa") {
        weekday = [
          "یکشنبه",
          "دوشنبه",
          "سه شنبه",
          "چهارشنبه",
          "پنج شنبه",
          "جمعه",
          "شنبه",
        ];
      }

      return `<div>${weekday[dayIndex]}</div>`;
    }
  } catch (err) {
    console.error("renderWeekDate=" + err.lineNumber + "," + err.message);
  }
};
const renderDayDate = async (element, type) => {
  try {
    if (element) {
      let dateType = type == "start" ? element.start : element.end;
      const date = dateType.date.split("-");
      if (page_lang === "fa") {
        return parseInt(date[2]);
      } else {
        const gDate = JalaliDate.jalaliToGregorian(
          parseInt(date[0]),
          parseInt(date[1]),
          parseInt(date[2])
        );
        return gDate[2];
      }
    }
  } catch (err) {
    console.error("renderDayDate=" + err.lineNumber + "," + err.message);
  }
};
const onrenderedExecutionOrigins = async () => {
  try {
    const container = document.querySelector(
      ".tourExecution__container__origins"
    );
    if (!container) return; // if container not found, just exit safely

    const firstPathItem = container.querySelectorAll(
      ".execution__details__path__item"
    )[0];
    if (firstPathItem) {
      const cityEl = container.querySelector(".origins__city");
      const detailsCityEl = firstPathItem.querySelector(".details__city");
      if (cityEl && detailsCityEl) {
        cityEl.textContent = detailsCityEl.textContent;
      }

      let ids = [];
      container.querySelectorAll(".transportation__img").forEach((e) => {
        if (e.dataset.id !== "") {
          ids.push(e.dataset.id);
        }
      });

      if (ids.length > 0) {
        $bc.setSource("db.airlinesOriginsGallery", {
          ids: ids,
          run: true,
        });
      }
    }
  } catch (err) {
    console.error(
      "onrenderedExecutionOrigins=" +
      (err.lineNumber || "?") +
      "," +
      err.message
    );
  }
};
const renderInventoryView = async (element, day, from, to) => {
  try {
    const origins = element.closest("li").querySelector(".start__date")
      .dataset.date;
    const destinations = element.closest("li").querySelector(".end__date")
      .dataset.date;
    const dateSplittedOrigins = origins.split("-");
    const dateSplittedDestinations = destinations.split("-");
    const jDOrigins = JalaliDate.jalaliToGregorian(
      dateSplittedOrigins[0],
      dateSplittedOrigins[1],
      dateSplittedOrigins[2]
    );
    const jDDestinations = JalaliDate.jalaliToGregorian(
      dateSplittedDestinations[0],
      dateSplittedDestinations[1],
      dateSplittedDestinations[2]
    );
    if (page_lang === "fa") {
      var weekday = [
        "یکشنبه",
        "دوشنبه",
        "سه شنبه",
        "چهارشنبه",
        "پنج شنبه",
        "جمعه",
        "شنبه",
      ];
    }
    const dOrigins = new Date(
      jDOrigins[0] + "-" + jDOrigins[1] + "-" + jDOrigins[2]
    );
    const dDestinations = new Date(
      jDDestinations[0] + "-" + jDDestinations[1] + "-" + jDDestinations[2]
    );
    if (document.querySelector(".origins__start__weekday")) {
      document.querySelector(".origins__start__weekday").innerText =
        weekday[dOrigins.getDay()];
    }
    if (document.querySelector(".destinations__start__weekday")) {
      document.querySelector(".destinations__start__weekday").innerText =
        weekday[dDestinations.getDay()];
    }
    element
      .closest("ul")
      .querySelectorAll("li")
      .forEach((e) => {
        e.classList.remove("active");
      });
    $bc.setSource("db.inventoryViewSpecificDate", {
      from: from,
      to: to,
      day: day,
    });
    if (document.querySelector(".tour-pdf-form")) {
      document.querySelector(".tour-pdf-form #form-from").value = from;
      document.querySelector(".tour-pdf-form #form-to").value = to;
      document.querySelector(".tour-pdf-form #form-day").value = day;

      document.querySelector(".tour-pdf-form #fdate").value = element
        .querySelector(".start__date")
        .getAttribute("data-date");

      document.querySelector(".tour-pdf-form #rdate").value = element
        .querySelector(".end__date")
        .getAttribute("data-date");
    }
    element.classList.add("active");
    window.scroll({
      top: document.querySelector(".tourInventory__container").offsetTop,
      behavior: "smooth",
    });

    renderedSelectedDate(
      element.querySelector(".start__date").innerText,
      element.querySelector(".start__date").dataset.date,
      element.querySelector(".end__date").innerText,
      element.querySelector(".end__date").dataset.date
    );
  } catch (err) {
    console.error("renderInventoryView=" + err.lineNumber + "," + err.message);
  }
};
const callbackSourceExecutionPlanTypesView = async (args) => {
  try {
    const resultJson = args.source?.rows;
    let originsSourceArray = [];
    let destinationsSourceArray = [];
    let originsRownumber = 1;
    let destinationsRownumber = 1;

    if (resultJson[0]) {
      document
        .querySelector(".tourExecution__container")
        .classList.remove("hidden");

      const origins = resultJson[0].execution.origins || [];
      const destinations = resultJson[0].execution.destinations || [];

      // --- origins ---
      if (
        origins.length === 1 &&
        !origins[0].origin?.type &&
        !origins[0].origin?.name &&
        !origins[0].origin?.id &&
        !origins[0].destination?.type &&
        !origins[0].destination?.name &&
        !origins[0].destination?.id &&
        !origins[0].transportation?.type &&
        !origins[0].transportation?.name
      ) {
        originsSourceArray = []; // خالی
      } else {
        for (const element of origins) {
          const sourceObj = {};
          sourceObj["rownumber"] = originsRownumber;
          sourceObj["info"] = element;
          sourceObj["len"] = origins.length;
          originsSourceArray.push(sourceObj);
          originsRownumber++;
        }
      }

      // --- destinations ---
      if (
        destinations.length === 1 &&
        !destinations[0].origin?.type &&
        !destinations[0].origin?.name &&
        !destinations[0].origin?.id &&
        !destinations[0].destination?.type &&
        !destinations[0].destination?.name &&
        !destinations[0].destination?.id &&
        !destinations[0].transportation?.type &&
        !destinations[0].transportation?.name
      ) {
        destinationsSourceArray = []; // خالی
      } else {
        for (const element of destinations) {
          const sourceObj = {};
          sourceObj["rownumber"] = destinationsRownumber;
          sourceObj["info"] = element;
          sourceObj["len"] = destinations.length;
          destinationsSourceArray.push(sourceObj);
          destinationsRownumber++;
        }
      }
    }

    setTimeout(() => {
      $bc.setSource("refresh.executionPlanTypesOrigins", originsSourceArray);
      $bc.setSource(
        "refresh.executionPlanTypesDestinations",
        destinationsSourceArray
      );
    }, 10);
  } catch (err) {
    console.error(
      "callbackSourceExecutionPlanTypesView=" +
        err.lineNumber +
        "," +
        err.message
    );
  }
};
const renderRouteType = async (element, type) => {
  try {
    if (element) {
      let dateType =
        type == "origin" ? element.info.origin : element.info.destination;
      if (dateType.id) {
        if (page_lang === "fa") {
          return type == "origin" ? `فرودگاه مبدا` : `فرودگاه مقصد`;
        }
      } else {
        if (page_lang === "fa") {
          return type == "origin" ? `ترمینال مبدا` : `ترمینال مقصد`;
        }
      }
    }
  } catch (err) {
    console.error("renderRouteType=" + err.lineNumber + "," + err.message);
  }
};
const renderRouteClass = async (element) => {
  try {
    if (element && element.info.classes && element.info.classes.length > 0) {
      const validClasses = element.info.classes.filter(
        (item) => item.class && item.class.trim() !== ""
      );

      if (validClasses.length > 0) {
        return `
            <span class="flex gap-1 items-center">
                ${validClasses
                  .map((item) => `<span>${item.class}</span>`)
                  .join(", ")}
            </span>
        `;
      }
    }
    return "";
  } catch (err) {
    console.error("renderRouteClass=" + err.lineNumber + "," + err.message);
    return "";
  }
};
