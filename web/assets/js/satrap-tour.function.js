const page_lang = "fa";
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
