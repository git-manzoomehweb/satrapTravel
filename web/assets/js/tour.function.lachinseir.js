// Set text color 
function getBrightness(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
}
function adjustTextColor(element) {
    const bgColor = window.getComputedStyle(element).backgroundColor;
    let hexColor;

    if (bgColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)) {
        hexColor = bgColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => {
            return parseInt(n).toString(16).padStart(2, '0');
        }).join('');
        hexColor = `#${hexColor}`;
    } else if (bgColor.match(/^#([0-9a-f]{3}){1,2}$/i)) {
        hexColor = bgColor;
    }

    if (hexColor) {
        const brightness = getBrightness(hexColor);
        element.style.color = brightness > 0.5 ? 'black' : 'white';
    }
}
const boxes = document.querySelectorAll('.check-contrast');
boxes.forEach(box => {
    adjustTextColor(box);
});


function toggleSocialMedia(element){
    element.closest(".share-social-container").querySelector(".drop-share").classList.toggle("hidden");
}






const page_lang = document.querySelector('main').getAttribute('data-lang');
// execution - date inventory
const scrollToTourSection = async (element, type) => {
    try {
        window.scroll({
            top: document.querySelector(`.${type}`).offsetTop,
            behavior: 'smooth'
        });
        document.querySelector(".navBar__container").querySelectorAll("li").forEach(e => {
            e.classList.remove("active");
        })
        element.classList.add("active");
    } catch (err) {
        console.error('scrollToTourSection=' + err.lineNumber + ',' + err.message);
    }

}

// updatetd
const callbackSourceExecutionPlanTypesView = async (args) => {
    try {
        const resultJson = args.source?.rows;
        let originsSourceArray = [];
        let destinationsSourceArray = [];
        let originsRownumber = 1;
        let destinationsRownumber = 1;

        if (resultJson[0]) {
            document.querySelector(".tourExecution__container").classList.remove("hidden");

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
            $bc.setSource("refresh.executionPlanTypesDestinations", destinationsSourceArray);
        }, 10);
    } catch (err) {
        console.error("callbackSourceExecutionPlanTypesView=" + err.lineNumber + "," + err.message);
    }
};

// updatetd
const callbackSourceInventoryView = async (args) => {
    try {
        const resultJson = args.source?.rows;
        let resultSourceArray = [];

        if (
            !(Array.isArray(resultJson) &&
                resultJson.length === 1 &&
                resultJson[0]?.hotelinfo?.[0]?.hotels?.[0]?.hotel?.hotelname === "")
        ) {
            resultSourceArray = resultJson;
        }
        setTimeout(() => {
            $bc.setSource("refresh.inventoryView", resultSourceArray);
        }, "10");


    } catch (err) {
        console.error('callbackSourceInventoryView=' + err.lineNumber + ',' + err.message);
    }
};

const onrenderedExecutionOrigins = async () => {
    try {
        if (document.querySelector(".tourExecution__container__origins").querySelectorAll(".execution__details__path__item")[0]) {
            document.querySelector(".tourExecution__container__origins").querySelector(".origins__city").textContent = document.querySelector(".tourExecution__container__origins").querySelectorAll(".execution__details__path__item")[0].querySelector(".details__city").textContent;
            let ids = [];
            document.querySelector(".tourExecution__container__origins").querySelectorAll(".transportation__img").forEach(e => {
                if (e.dataset.id !== "") {
                    ids.push(e.dataset.id)
                }
            })
            if (ids.length > 0) {
                $bc.setSource("db.airlinesOriginsGallery", {
                    ids: ids,
                    run: true
                });
            }
        }

    } catch (err) {
        console.error('onrenderedExecutionOrigins=' + err.lineNumber + ',' + err.message);
    }
}
const onrenderedExecutionDestinations = async () => {
    try {
        if (document.querySelector(".tourExecution__container__destinations").querySelectorAll(".execution__details__path__item")[0]) {
            document.querySelector(".tourExecution__container__destinations").querySelector(".destinations__city").textContent = document.querySelector(".tourExecution__container__destinations").querySelectorAll(".execution__details__path__item")[0].querySelector(".details__city").textContent;
            let ids = [];
            document.querySelector(".tourExecution__container__destinations").querySelectorAll(".transportation__img").forEach(e => {
                ids.push(e.dataset.id)
            })
            if (ids.length > 0) {
                $bc.setSource("db.airlinesDestinationsGallery", {
                    ids: ids,
                    run: true
                });
            }
        }
    } catch (err) {
        console.error('onrenderedExecutionDestinations=' + err.lineNumber + ',' + err.message);
    }

}
const onrenderedDates = async () => {
    try {
        if (document.querySelector(".date__details ul")) {
            renderedSelectedDate(
                document.querySelector(".date__details ul").querySelectorAll("li")[0].querySelector(".start__date").innerText,
                document.querySelector(".date__details ul").querySelectorAll("li")[0].querySelector(".start__date").dataset.date,
                document.querySelector(".date__details ul").querySelectorAll("li")[0].querySelector(".end__date").innerText,
                document.querySelector(".date__details ul").querySelectorAll("li")[0].querySelector(".end__date").dataset.date
            )
        }

    } catch (err) {
        console.error('onrenderedDates=' + err.lineNumber + ',' + err.message);
    }
}
const renderedSelectedDate = async (startText, startDate, endText, endDate) => {
    try {
        document.querySelector(".origins__start__day").innerText = startText;
        document.querySelector(".destinations__start__day").innerText = endText
        const origins = startDate;
        const destinations = endDate;
        const dateSplittedOrigins = origins.split("-"); const dateSplittedDestinations = destinations.split("-");
        const jDOrigins = JalaliDate.jalaliToGregorian(dateSplittedOrigins[0], dateSplittedOrigins[1], dateSplittedOrigins[2]);
        const jDDestinations = JalaliDate.jalaliToGregorian(dateSplittedDestinations[0], dateSplittedDestinations[1], dateSplittedDestinations[2]);
        if (page_lang === 'fa') {
            var weekday = ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه"];
        } else if (page_lang === 'en') {
            var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        } else if (page_lang === 'ar') {
            var weekday = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
        }
        const dOrigins = new Date(jDOrigins[0] + "-" + jDOrigins[1] + "-" + jDOrigins[2]);
        const dDestinations = new Date(jDDestinations[0] + "-" + jDDestinations[1] + "-" + jDDestinations[2]);
        document.querySelector(".origins__start__weekday").innerText = weekday[dOrigins.getDay()];
        document.querySelector(".destinations__start__weekday").innerText = weekday[dDestinations.getDay()];
    } catch (err) {
        console.error('renderedSelectedDate=' + err.lineNumber + ',' + err.message);
    }
}
// updatetd
const renderPathSvg = async (element) => {
    try {
        if (element) {

            if (element.info.transportation.type == 1) {
                return `<svg width="30" height="30" class="relative" viewBox="0 0 30 30" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_35_1608)">
                                                        <path
                                                            d="M2.8125 10.9348L2.8125 9.37501C2.81255 9.21828 2.8519 9.06407 2.92693 8.92648C3.00196 8.78888 3.1103 8.67229 3.24202 8.58737C3.37374 8.50245 3.52465 8.45191 3.68095 8.44037C3.83725 8.42882 3.99395 8.45665 4.13672 8.5213L12.4717 12.2982L12.5977 6.62696L10.0916 4.5586C9.5959 4.16427 9.375 3.84962 9.375 3.04688L9.375 1.99688C9.36965 1.83064 9.40446 1.66555 9.47647 1.51561C9.54848 1.36567 9.65557 1.23531 9.78867 1.13555C9.97676 0.996101 10.2955 0.858992 10.7502 0.992586L14.9104 2.15391C14.9414 2.1627 14.9725 2.17325 15.0029 2.18497C15.0058 2.18555 15.0088 2.18555 15.0117 2.18497C15.0422 2.17287 15.0733 2.1625 15.1049 2.15391L19.2914 0.991414C19.7373 0.865438 20.049 1.00313 20.2324 1.14141C20.3556 1.23427 20.4553 1.35474 20.5235 1.49314C20.5917 1.63154 20.6265 1.78401 20.625 1.93829L20.625 3.04688C20.625 3.6463 20.3561 4.22813 19.9219 4.57032L17.458 6.59591L17.5424 12.2982L25.8627 8.52247C26.0054 8.45773 26.1621 8.4298 26.3183 8.44122C26.4746 8.45264 26.6256 8.50306 26.7573 8.58786C26.8891 8.67266 26.9975 8.78914 27.0727 8.92665C27.1478 9.06415 27.1873 9.21831 27.1875 9.37501L27.1875 10.9518C27.1831 11.1717 27.1292 11.3879 27.0298 11.5842C26.9303 11.7805 26.788 11.9518 26.6133 12.0856L17.707 19.4127L17.7961 22.7977C17.8096 23.0455 17.8143 23.7322 17.8143 23.891C17.8125 27.1289 16.7613 29.0625 15 29.0625C14.4457 29.0625 13.418 28.841 12.7641 27.3592C12.3773 26.4844 12.1816 25.3172 12.1816 23.8899C12.1816 23.7328 12.1863 23.0479 12.1998 22.7965L12.29 19.4121L3.38379 12.0668C3.20984 11.933 3.06819 11.7617 2.96931 11.5658C2.87043 11.3699 2.81684 11.1542 2.8125 10.9348Z"
                                                            fill="${document.querySelector(".layout__body__container").dataset.primarycolor}" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_35_1608">
                                                            <rect width="30" height="30" fill="white"
                                                                transform="translate(30) rotate(90)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>`
            } else if (element.info.transportation.type == 2) {
                return `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 851.000000 1280.000000" preserveAspectRatio="xMidYMid meet" class="relative">
<g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" stroke="none" fill="${document.querySelector(".layout__body__container").dataset.primarycolor}">
<path d="M3493 12785 c-227 -61 -373 -283 -334 -505 56 -310 389 -472 663 -323 59 32 148 123 178 183 67 131 66 290 -2 424 -29 56 -112 141 -173 176 -99 57 -224 74 -332 45z"/>
<path d="M4700 12789 c-150 -29 -295 -169 -335 -324 -96 -372 283 -684 631 -519 169 80 278 287 247 469 -45 260 -284 425 -543 374z"/>
<path d="M2055 11719 c-101 -12 -297 -60 -396 -98 -537 -207 -928 -685 -1015 -1241 -13 -83 -14 -486 -12 -3170 3 -2913 4 -3079 21 -3150 30 -125 94 -305 142 -402 86 -170 166 -281 303 -421 217 -221 421 -339 725 -419 l47 -13 -935 -1403 -935 -1402 542 2 542 3 110 162 111 163 2932 0 2932 0 3 22 c2 16 35 -26 129 -163 l126 -184 541 -3 542 -2 -935 1402 -935 1403 47 13 c235 62 406 145 578 282 72 58 218 205 274 277 145 185 256 425 318 683 17 71 18 237 21 3150 3 3354 6 3150 -53 3355 -180 626 -732 1085 -1387 1155 -121 13 -4266 11 -4383 -1z m3101 -353 c60 -28 117 -91 138 -154 23 -67 23 -557 0 -624 -21 -63 -78 -126 -138 -154 l-51 -24 -850 0 -850 0 -51 24 c-60 28 -117 91 -138 154 -23 67 -23 557 0 624 21 63 78 126 138 154 l51 24 850 0 850 0 51 -24z m-1116 -1278 c1 -17 50 -2524 50 -2581 l0 -78 -977 3 -978 3 -75 23 c-301 93 -504 322 -550 620 -7 45 -10 293 -8 723 4 647 4 655 27 729 12 41 43 115 69 165 101 196 309 347 533 384 46 7 1909 16 1909 9z m2405 -21 c33 -10 103 -39 155 -65 179 -88 316 -257 381 -472 23 -74 23 -82 27 -729 3 -694 1 -737 -43 -864 -81 -232 -264 -401 -517 -479 l-73 -23 -1072 -3 c-590 -1 -1073 -1 -1074 0 -2 10 -48 2417 -49 2526 l0 133 1103 -4 c1019 -3 1107 -4 1162 -20z m-4012 -5020 c215 -68 387 -239 463 -462 25 -72 28 -94 28 -215 0 -118 -3 -144 -26 -212 -40 -121 -92 -204 -182 -293 -138 -137 -302 -205 -496 -205 -399 0 -710 311 -710 710 0 194 68 358 205 496 107 108 208 164 360 200 89 21 259 12 358 -19z m3985 17 c97 -19 240 -88 312 -150 167 -143 253 -327 254 -544 0 -128 -13 -188 -69 -305 -90 -188 -228 -309 -430 -377 -60 -20 -90 -23 -210 -23 -120 0 -150 3 -210 23 -198 66 -335 185 -425 367 -55 111 -73 189 -73 315 -1 277 148 514 398 635 148 72 296 91 453 59z m-215 -3264 l108 -160 -2056 0 -2056 0 108 160 108 159 1840 0 1840 0 108 -159z m300 -442 c24 -35 83 -120 131 -190 l87 -128 -2466 0 -2466 0 87 128 c48 70 107 155 131 190 l44 62 2204 0 2204 0 44 -62z m458 -671 c60 -87 109 -160 109 -163 0 -2 -1267 -4 -2815 -4 -1548 0 -2815 3 -2815 6 0 3 11 20 23 37 13 18 63 89 111 160 l87 127 2596 -2 2596 -3 108 -158z"/>
<path d="M2065 4791 c-86 -25 -135 -53 -204 -116 -179 -167 -186 -426 -16 -604 95 -100 219 -151 365 -151 145 0 254 45 356 145 173 172 171 432 -5 605 -125 122 -324 171 -496 121z"/>
<path d="M6163 4826 c-186 -43 -334 -196 -366 -380 -38 -222 118 -451 348 -511 68 -17 189 -19 255 -4 180 41 330 199 360 379 36 210 -101 426 -316 500 -77 27 -201 34 -281 16z"/>
</g>
</svg>
`
            } else if (element.info.transportation.type == 3) {
                return `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="relative" viewBox="0 0 1280.000000 910.000000" preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,910.000000) scale(0.100000,-0.100000)" fill="${document.querySelector(".layout__body__container").dataset.primarycolor}" stroke="none">
<path d="M7184 6486 c-152 -48 -294 -180 -366 -342 -10 -24 -22 -44 -26 -44 -4 0 -81 11 -170 24 -90 14 -249 33 -353 42 -186 18 -189 18 -189 41 0 23 -1 23 -135 23 -118 0 -135 -2 -135 -16 0 -15 -9 -16 -72 -11 -40 4 -264 12 -498 18 -571 16 -1142 6 -1632 -27 -95 -6 -98 -6 -98 15 0 20 -4 21 -135 21 l-135 0 0 -33 0 -32 -212 -23 c-363 -39 -823 -109 -1168 -176 l-125 -24 95 -1 c52 -1 257 4 455 10 198 5 494 13 658 17 l297 7 0 -57 0 -58 -1025 0 -1025 0 -1 -32 c-1 -18 -1 -38 0 -44 1 -7 -5 -14 -13 -17 -18 -7 -51 -115 -67 -216 -10 -68 -8 -112 7 -168 5 -18 -3 -25 -58 -52 -70 -33 -162 -107 -152 -122 3 -5 -23 -78 -59 -162 -82 -194 -158 -397 -192 -512 -32 -110 -172 -764 -217 -1010 -30 -167 -32 -195 -31 -387 0 -171 -2 -208 -13 -208 -12 0 -14 -40 -14 -220 l0 -220 28 0 28 0 21 -352 c12 -193 20 -355 17 -360 -3 -4 -28 -8 -56 -8 -98 0 -166 -62 -176 -160 -7 -73 5 -117 45 -160 46 -52 79 -60 248 -60 135 0 146 -2 275 -40 128 -38 151 -41 435 -65 165 -14 338 -25 385 -25 l85 0 0 -163 c0 -127 4 -177 19 -231 73 -271 257 -501 495 -620 419 -210 922 -94 1201 275 145 193 211 428 189 671 -5 50 -8 93 -6 94 8 8 1453 23 2312 24 915 2 1802 17 2684 46 l144 5 -7 -23 c-37 -138 -33 -362 8 -502 128 -430 529 -717 966 -693 432 24 777 307 887 727 33 125 35 323 5 442 l-19 78 76 0 c42 0 364 5 716 11 352 6 738 11 858 10 l218 -2 29 31 c70 75 64 259 -12 330 -18 16 -35 20 -98 20 l-76 0 3 293 c2 160 6 334 9 385 6 89 7 92 30 92 l24 0 0 165 0 165 -30 0 c-30 0 -30 1 -30 55 0 30 5 55 10 55 6 0 10 45 10 115 0 108 -1 115 -20 115 -14 0 -20 7 -20 23 0 44 -138 288 -342 606 l-93 145 -98 28 c-54 15 -117 38 -140 49 -101 51 -96 43 -328 513 l-217 441 69 3 c38 2 69 5 69 8 0 2 -34 55 -75 117 -81 120 -243 298 -388 426 -79 70 -96 80 -182 109 -133 46 -204 50 -1000 62 -978 14 -1262 14 -1268 -4 -13 -34 -17 -112 -10 -233 6 -104 5 -133 -4 -133 -10 0 -13 44 -13 185 0 149 -3 186 -14 192 -8 4 -16 26 -18 48 l-3 40 -1075 5 -1075 5 -3 58 c-3 54 -2 57 20 57 13 0 221 -9 463 -20 457 -21 1114 -37 1105 -27 -3 3 -134 35 -290 72 -337 78 -323 74 -316 88 2 7 31 75 64 152 32 77 71 163 85 192 37 72 38 70 -29 49z m-1436 -493 l62 -6 0 -63 0 -64 -1147 2 -1148 3 -3 56 -3 57 193 7 c615 21 1865 26 2046 8z m2392 -1085 c0 -35 -4 -69 -8 -76 -7 -10 -293 -12 -1398 -10 l-1389 3 -3 49 c-2 27 -1 60 3 73 l5 23 1395 0 1395 0 0 -62z m-3552 -50 l-3 -73 -1216 -3 -1217 -2 -6 22 c-8 31 -8 113 1 121 3 4 555 7 1225 7 l1219 0 -3 -72z m5312 -368 l0 -350 -545 0 -545 0 0 103 c0 56 -3 213 -7 350 l-6 247 551 0 552 0 0 -350z m394 12 c60 -185 111 -343 114 -349 3 -10 -43 -13 -212 -13 l-216 0 0 350 0 350 103 0 102 0 109 -338z m-2170 222 c23 -9 22 -111 -1 -136 -15 -17 -72 -18 -1388 -18 -1053 0 -1374 3 -1383 12 -7 7 -12 38 -12 70 0 44 4 59 18 67 19 11 2738 16 2766 5z m-3539 -109 l0 -70 -1214 -3 c-965 -2 -1216 0 -1223 10 -9 16 -11 122 -1 131 3 4 554 6 1222 5 l1216 -3 0 -70z m3550 -200 l0 -70 -1397 -3 -1398 -2 0 63 c0 36 5 68 12 75 9 9 328 11 1398 10 l1385 -3 0 -70z m-3550 -40 l0 -70 -1214 -3 c-965 -2 -1216 0 -1223 10 -9 16 -11 122 -1 131 3 4 554 6 1222 5 l1216 -3 0 -70z m3539 -131 c20 -8 23 -123 4 -142 -9 -9 -332 -12 -1394 -12 -1251 0 -1382 1 -1388 16 -3 9 -6 40 -6 69 0 41 4 56 18 64 19 11 2738 16 2766 5z m-3545 -58 c7 -8 11 -37 9 -68 l-3 -53 -1220 0 -1220 0 -3 47 c-2 26 2 56 8 68 11 20 14 20 1214 20 1027 0 1205 -2 1215 -14z"/>
</g>
</svg>`

            } else if (element.info.transportation.type == 4) {
                return `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="relative"  viewBox="0 0 1259.000000 1280.000000" preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="${document.querySelector(".layout__body__container").dataset.primarycolor}" stroke="none">
<path d="M4692 12785 c-117 -33 -219 -119 -274 -233 -31 -63 -33 -73 -33 -177 0 -102 2 -114 31 -175 17 -36 52 -88 77 -116 l47 -52 0 -4428 0 -4429 -2205 -3 -2206 -2 118 -138 c294 -344 529 -598 868 -938 610 -612 1134 -1054 1670 -1409 652 -432 1178 -641 1697 -676 274 -19 728 -4 1093 37 1577 173 3471 893 5410 2057 509 305 1181 752 1544 1026 l55 41 -3755 2 -3754 3 -3 4430 -2 4429 29 31 c119 126 160 289 111 436 -41 120 -113 201 -227 256 -61 29 -87 36 -155 39 -54 3 -101 -1 -136 -11z"/>
<path d="M5452 11888 c452 -2355 623 -3791 605 -5068 -8 -507 -26 -771 -83 -1160 -90 -620 -263 -1182 -498 -1622 l-72 -135 3126 -6 c1718 -3 3127 -4 3129 -1 12 12 -301 700 -520 1139 -654 1315 -1394 2476 -2338 3665 -804 1013 -1851 2099 -2956 3066 -201 176 -433 374 -438 374 -2 0 18 -114 45 -252z"/>
<path d="M4220 9345 c0 -29 -82 -368 -126 -524 -277 -971 -745 -1794 -1468 -2580 -353 -384 -693 -695 -1496 -1366 -567 -474 -836 -707 -1030 -893 l-95 -91 2113 -1 2112 0 0 2735 c0 1504 -2 2735 -5 2735 -3 0 -5 -7 -5 -15z"/>
</g>
</svg>
`
            } else if (element.info.transportation.type == 5) {
                return `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="relative"  viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="${document.querySelector(".layout__body__container").dataset.primarycolor}" stroke="none">
<path d="M5584 11053 l-161 -108 -169 -302 -169 -303 -405 0 c-370 0 -412 -2 -488 -20 -344 -82 -645 -385 -906 -910 -179 -360 -341 -829 -451 -1302 l-27 -117 -99 118 -100 119 -97 6 c-164 10 -793 28 -799 23 -2 -3 -26 -63 -53 -134 l-49 -130 33 -131 33 -131 84 -90 83 -91 380 0 381 0 53 -35 c69 -47 69 -65 -2 -65 -29 0 -93 -7 -142 -15 -487 -85 -868 -462 -959 -949 -14 -72 -15 -176 -13 -727 l3 -644 28 -100 c32 -120 126 -314 196 -405 64 -84 199 -214 280 -269 111 -75 237 -131 399 -177 9 -3 12 -72 12 -303 0 -269 2 -305 20 -362 42 -139 148 -250 288 -302 53 -20 79 -22 406 -25 291 -3 361 -1 420 12 179 41 322 189 355 370 6 33 11 177 11 323 l0 263 2628 -2 2627 -3 5 -305 c5 -258 8 -312 23 -350 53 -133 154 -234 285 -283 53 -20 79 -22 402 -25 234 -2 364 0 404 8 168 33 298 144 358 308 21 54 22 79 26 437 l4 380 56 35 c31 19 106 85 167 145 161 161 251 318 313 542 l27 98 0 670 0 670 -26 95 c-61 217 -162 394 -314 545 -186 187 -413 300 -671 336 l-87 12 34 28 34 28 352 1 353 0 77 89 78 90 31 133 31 133 -45 134 -45 134 -171 -6 c-94 -4 -256 -9 -361 -12 -104 -3 -214 -8 -242 -11 l-53 -5 -102 -134 c-57 -73 -104 -132 -106 -131 -1 2 -17 79 -36 172 -103 509 -239 925 -418 1276 -130 255 -260 439 -430 605 -167 164 -320 253 -548 318 -14 4 -198 10 -409 14 l-383 6 -185 341 -185 342 -162 68 -161 67 -330 8 c-181 4 -494 10 -695 14 l-365 6 -161 -108z m916 -410 c57 -153 106 -284 110 -292 5 -9 32 24 84 104 l77 118 -94 141 c-51 78 -102 153 -111 169 l-18 27 86 0 87 0 67 -105 c37 -57 69 -105 72 -104 3 0 34 47 69 104 l64 105 138 0 139 0 -2 -347 -3 -348 -127 -3 -128 -3 -76 118 -76 117 -75 -117 -76 -117 -97 0 -98 0 -30 83 c-16 45 -33 92 -36 105 -7 21 -13 22 -101 22 l-93 0 -37 -105 -38 -105 -74 0 c-56 0 -74 3 -70 13 2 6 62 166 132 355 l129 342 51 0 52 0 103 -277z m-340 192 l0 -75 -105 0 -105 0 0 -275 0 -275 -65 0 -65 0 0 275 0 275 -105 0 -105 0 0 75 0 75 275 0 275 0 0 -75z m-475 -935 c325 -6 995 -12 1490 -16 495 -3 939 -10 987 -15 378 -41 716 -287 974 -709 216 -354 394 -886 479 -1426 14 -87 23 -160 20 -162 -2 -2 -876 1 -1942 8 -1066 6 -2479 15 -3140 19 -661 3 -1204 8 -1206 11 -3 3 4 73 14 155 128 1011 484 1717 1019 2022 184 105 300 133 540 127 96 -3 441 -9 765 -14z m4310 -3005 c205 -43 390 -197 457 -380 26 -73 35 -217 18 -298 -43 -208 -237 -391 -466 -442 -110 -25 -274 -17 -372 18 -242 85 -397 278 -409 512 -9 164 41 289 167 416 155 157 379 221 605 174z m-6855 -121 c133 -31 265 -114 348 -219 248 -313 97 -749 -304 -881 -79 -26 -102 -29 -209 -28 -139 0 -198 15 -319 77 -194 100 -310 289 -309 502 1 141 45 251 146 361 158 173 404 245 647 188z m5690 -209 l0 -75 -2400 0 -2400 0 0 75 0 75 2400 0 2400 0 0 -75z m-37 -307 l-1 -73 -2381 -3 -2381 -2 0 75 0 75 2383 0 2382 0 -2 -72z m77 -353 l0 -115 -2437 2 -2438 3 -3 113 -3 112 2441 0 2440 0 0 -115z m-953 -694 c173 -25 302 -149 333 -318 29 -166 -62 -338 -218 -411 l-57 -27 -1390 0 -1390 0 -58 28 c-74 37 -147 110 -184 184 -25 53 -28 68 -28 163 0 95 3 110 28 163 55 112 168 196 287 216 72 12 2596 13 2677 2z"/>
<path d="M7040 10718 c-47 -72 -86 -136 -88 -143 -1 -6 38 -73 88 -149 l90 -138 0 281 c0 154 -1 281 -2 280 -2 0 -41 -59 -88 -131z"/>
<path d="M6327 10634 c-9 -26 -15 -49 -13 -51 2 -3 17 -3 33 -1 l30 3 -16 48 -16 48 -18 -47z"/>
</g>
</svg>
`
            }





        }
    } catch (err) {
        console.error('renderPathSvg=' + err.lineNumber + ',' + err.message);
    }

}
// updatetd
const renderEndPathSvg = async (element) => {
    try {
        if (element) {

            return `<svg width="30" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 20C6.03023 20 2 15.9698 2 11C2 6.03023 6.03023 2 11 2C15.9698 2 20 6.03023 20 11C20 15.9698 15.9698 20 11 20ZM11 5.14603C13.462 5.14603 15.4578 7.14183 15.4578 9.60387C15.4578 12.0658 11 16.8539 11 16.8539C11 16.8539 6.54217 12.0658 6.54217 9.60387C6.54217 7.14183 8.53797 5.14603 11 5.14603ZM11 7.83271C11.9334 7.83271 12.6904 8.5897 12.6904 9.52322C12.6904 10.4567 11.9334 11.2137 11 11.2137C10.0666 11.2137 9.30956 10.4567 9.30956 9.52322C9.30956 8.5897 10.0666 7.83271 11 7.83271Z" fill="${document.querySelector(".layout__body__container").dataset.primarycolor}"></path>
                                        </svg>`

        }
    } catch (err) {
        console.error('renderEndPathSvg=' + err.lineNumber + ',' + err.message);
    }

}
const renderRouteType = async (element, type) => {
    try {
        if (element) {
            let dateType = type == 'origin' ? element.info.origin : element.info.destination
            if (dateType.id) {
                if (page_lang === 'fa') {
                    return type == 'origin' ? `فرودگاه مبدا` : `فرودگاه مقصد`
                } else if (page_lang === 'en') {
                    return type == 'origin' ? `Airport of origin` : `Destination airport`
                } else if (page_lang === 'ar') {
                    return type == 'origin' ? `مطار المنشأ` : `مطار الوجهة`
                }
            } else {
                if (page_lang === 'fa') {
                    return type == 'origin' ? `ترمینال مبدا` : `ترمینال مقصد`
                } else if (page_lang === 'en') {
                    return type == 'origin' ? `Origin terminal` : `Destination terminal`
                } else if (page_lang === 'ar') {
                    return type == 'origin' ? `محطة الأصل` : `محطة الوجهة`
                }
            }
        }
    } catch (err) {
        console.error('renderRouteType=' + err.lineNumber + ',' + err.message);
    }

}

// updatetd
const getClassLabel = () => {
    if (page_lang === 'fa') {
        return 'کلاس';
    } else if (page_lang === 'en') {
        return 'Class';
    } else if (page_lang === 'ar') {
        return 'الفئة';
    }
    return 'Class';
};
// updatetd
const renderRouteClass = async (element) => {
    try {
        if (element && element.info.classes && element.info.classes.length > 0) {
            const validClasses = element.info.classes.filter(item => item.class && item.class.trim() !== '');

            if (validClasses.length > 0) {
                return `<span class="inline-block">
            <span class="flex gap-1 items-center">
                <span>
                    <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
                        <path d="m5.2088 11.692c0.17283 0.9209 0.9775 1.5888 1.9146 1.5888h5.1999c0.6842 0 1.2396-0.5553 1.2396-1.2396v-1.4166c0-0.5164-0.2055-1.0122-0.571-1.3778-0.3655-0.36479-0.8606-0.57021-1.377-0.57021h-2.9509c-0.08571 0-0.15867-0.06091-0.17425-0.14521l-1.0993-6.047c-0.16859-0.9265-0.97538-1.5994-1.9168-1.5994h-0.79759c-0.36833 0-0.71825 0.16433-0.95341 0.44766-0.23588 0.28404-0.33292 0.65804-0.26492 1.0207l1.751 9.3386z" clip-rule="evenodd" fill="[##cms.host.primaryColor##]" fill-rule="evenodd"/>
                        <path d="m7.9774 12.469s-0.59429 0.9492-1.0937 1.7489c-0.23871 0.3825-0.25146 0.8642-0.03329 1.258 0.21887 0.3945 0.63396 0.6389 1.0845 0.6389h4.743c0.2925 0 0.5312-0.238 0.5312-0.5312 0-0.2933-0.2387-0.5313-0.5312-0.5313h-4.743c-0.06446 0-0.12396-0.0347-0.15513-0.0914-0.03116-0.0559-0.02904-0.1246 0.00496-0.1799l1.0937-1.7496c0.15512-0.2486 0.07933-0.5765-0.16929-0.7317-0.24863-0.1551-0.57659-0.08-0.73171 0.1693z" clip-rule="evenodd" fill="[##cms.host.primaryColor##]" fill-rule="evenodd"/>
                        <path d="m7.7188 6.9062h4.25c0.2925 0 0.5312-0.238 0.5312-0.53125s-0.2387-0.53125-0.5312-0.53125h-4.25c-0.29325 0-0.53125 0.238-0.53125 0.53125s0.238 0.53125 0.53125 0.53125z" clip-rule="evenodd" fill="[##cms.host.primaryColor##]" fill-rule="evenodd"/>
                    </svg>
                </span>
                <span class="ml-1">${getClassLabel()} :</span>
                ${validClasses.map(item => `<span>${item.class}</span>`).join(', ')}
            </span>
        </span>`;
            }
        }
        return '';
    } catch (err) {
        console.error('renderRouteClass=' + err.lineNumber + ',' + err.message);
        return '';
    }
}
// updatetd
const getStopLabel = () => {
    if (page_lang === 'fa') {
        return 'مدت زمان توقف';
    } else if (page_lang === 'en') {
        return 'Stop duration';
    } else if (page_lang === 'ar') {
        return 'مدة التوقف';
    }
    return 'Stop duration';
};
// updatetd
const getMinuteLabel = () => {
    if (page_lang === 'fa') {
        return 'دقیقه';
    } else if (page_lang === 'en') {
        return 'minutes';
    } else if (page_lang === 'ar') {
        return 'دقيقة';
    }
    return 'minutes';
};
// updatetd
const renderRouteStop = async (element) => {
    try {

        if (element && element.info.stop && element.info.stop !== '') {
            return `<div class="my-8 text-sm">${getStopLabel()}<span class="mr-1 ml-1">${element.info.stop}</span><span>${getMinuteLabel()}</span></div>`;
        } else {
            return ``;
        }

    } catch (err) {
        console.error('renderRouteStop=' + err.lineNumber + ',' + err.message);
        return '';
    }
}


const renderMonthDate = async (element, type) => {
    try {
        if (element) {
            let dateType = type == 'start' ? element.start : element.end
            const date = dateType.date.split("-");
            switch (parseInt(date[1])) {
                case 1:
                    if (page_lang === 'fa') {
                        month = "فروردین";
                    } else if (page_lang === 'en') {
                        month = "January";
                    } else if (page_lang === 'ar') {
                        month = "المحرّم";
                    }
                    break;
                case 2:
                    if (page_lang === 'fa') {
                        month = "اردیبهشت";
                    } else if (page_lang === 'en') {
                        month = "February";
                    } else if (page_lang === 'ar') {
                        month = "صفر";
                    }
                    break;
                case 3:
                    if (page_lang === 'fa') {
                        month = "خرداد";
                    } else if (page_lang === 'en') {
                        month = "March";
                    } else if (page_lang === 'ar') {
                        month = "ربيع الأول";
                    }

                    break;
                case 4:
                    if (page_lang === 'fa') {
                        month = "تیر";
                    } else if (page_lang === 'en') {
                        month = "April";
                    } else if (page_lang === 'ar') {
                        month = "ربيع الآخر";
                    }

                    break;
                case 5:
                    if (page_lang === 'fa') {
                        month = "مرداد";
                    } else if (page_lang === 'en') {
                        month = "May";
                    } else if (page_lang === 'ar') {
                        month = "جمادى الأول";
                    }

                    break;
                case 6:
                    if (page_lang === 'fa') {
                        month = "شهریور";
                    } else if (page_lang === 'en') {
                        month = "June";
                    } else if (page_lang === 'ar') {
                        month = "جمادى الآخر";
                    }

                    break;
                case 7:
                    if (page_lang === 'fa') {
                        month = "مهر";
                    } else if (page_lang === 'en') {
                        month = "July";
                    } else if (page_lang === 'ar') {
                        month = "رجب";
                    }

                    break;
                case 8:
                    if (page_lang === 'fa') {
                        month = "آبان";
                    } else if (page_lang === 'en') {
                        month = "August";
                    } else if (page_lang === 'ar') {
                        month = "شعبان";
                    }

                    break;
                case 9:
                    if (page_lang === 'fa') {
                        month = "آذر";
                    } else if (page_lang === 'en') {
                        month = "September";
                    } else if (page_lang === 'ar') {
                        month = "رمضان";
                    }

                    break;
                case 10:
                    if (page_lang === 'fa') {
                        month = "دی";
                    } else if (page_lang === 'en') {
                        month = "October";
                    } else if (page_lang === 'ar') {
                        month = "شوّال";
                    }

                    break;
                case 11:
                    if (page_lang === 'fa') {
                        month = "بهمن";
                    } else if (page_lang === 'en') {
                        month = "November";
                    } else if (page_lang === 'ar') {
                        month = "ذو القعدة";
                    }

                    break;
                case 12:
                    if (page_lang === 'fa') {
                        month = "اسفند";
                    } else if (page_lang === 'en') {
                        month = "December";
                    } else if (page_lang === 'ar') {
                        month = "ذو الحجة";
                    }

            }
            return month
        }

    } catch (err) {
        console.error('renderMonthDate=' + err.lineNumber + ',' + err.message);
    }


}

// updatetd
const renderTransportationName = async (element) => {
    try {
        if (element) {
            if (element.info.transportation.id) {
                return `<div class="flex gap-1 items-center mb-2 min-h-4 transportation__img__details"><img src="" width="50" height="22" data-id="${element.info.transportation.id}" class="transportation__img" alt="${element.info.transportation.name}" />
                        <span class="mr-2">${element.info.transportation.name}</span></div>`
            }
        }

    } catch (err) {
        console.error('renderTransportationName=' + err.lineNumber + ',' + err.message);
    }
}

const renderDayDate = async (element, type) => {
    try {
        if (element) {
            let dateType = type == 'start' ? element.start : element.end;
            const date = dateType.date.split("-");
            return parseInt(date[2]);
        }

    } catch (err) {
        console.error('renderDayDate=' + err.lineNumber + ',' + err.message);
    }


}

const onProcessedAirlinesOriginsImg = async (args) => {
    const response = args.response;
    if (response.status == 200) {
        const responseJson = await response.json();
        if (responseJson) {
            document.querySelector(".tourExecution__container__origins").querySelectorAll(".transportation__img").forEach(e => {
                for (const item of responseJson) {
                    if (parseInt(e.dataset.id) == parseInt(item.usedforid)) {
                        e.setAttribute("src", `/${item.originalImage}`);
                    }
                }
            });

        }
    }
}
const onProcessedAirlinesDestinationsImg = async (args) => {
    const response = args.response;
    if (response.status == 200) {
        const responseJson = await response.json();
        if (responseJson) {
            document.querySelector(".tourExecution__container__destinations").querySelectorAll(".transportation__img").forEach(e => {
                for (const item of responseJson) {
                    if (parseInt(e.dataset.id) == parseInt(item.usedforid)) {
                        e.setAttribute("src", `/${item.originalImage}`);
                    }
                }
            });

        }
    }
}

const onrenderedInventoryView = async () => {
    try {
        let ids = [];
        document.querySelectorAll(".tourInventory__details__item__img").forEach(e => {
            if (e.dataset.id !== "") {
                ids.push(e.dataset.id)
            }

        });
        if (ids.length > 0) {
            $bc.setSource("db.hotelGallery", {
                ids: ids,
                run: true,
            });
        }

    } catch (err) {
        console.error('onrenderedInventoryView=' + err.lineNumber + ',' + err.message);
    }

}
const renderTourDateModal = (element, className) => {
    try {
        document.querySelector(".tour__date__modal__container").classList.remove(`${className}`);
        if (className == 'max-xl:hidden') {
            document.querySelector(".tour__date__modal__container").classList.add('isFixed');
        }
    } catch (err) {
        console.error('renderTourDateModal=' + err.lineNumber + ',' + err.message);
    }

}
// hotel inventory
const renderHotels = async (element, type) => {
    try {
        if (element) {

            let output = "";
            let index = 0;
            for (const item of element.hotelinfo[0].hotels) {

                let img =`/common/images/${document.querySelector(".layout__body__container").dataset.noimgsign}`;

                if(document.querySelector(".layout__body__container").dataset.noimgsign.length>0){
                    img = `/images/${document.querySelector(".layout__body__container").dataset.noimgsign}`
                }

                output += ` <div class="tourInventory__details__item__info md:flex pb-5 pt-5" data-index="${index}">
                                                <div class="md:w-9/12 flex gap-8">
                                                    <figure class="rounded-xl overflow-hidden${index === 0 ? ' lg:mt--16 ' : ''}">
                                                        <img src="${img}" class="rounded-xl tourInventory__details__item__img transition-all hover:scale-105" data-pageName="${document.querySelector(".layout__body__container").dataset.pagenameinventory}" data-id="${item.hotel.hotelname1.hotelid}" width="165"
                                                            height="165" alt="" />
                                                    </figure>
                                                    <figcaption>
                                                        <div class="md:flex">
                                                            <div class="text-module-gray-6 md:min-w-[270px]">
                                                                <h3 class="text-xl lg:mb-7 max-lg:mb-5 hover:text-gray17 showhotel">${item.hotel.hotelname}</h3>
                                                                <div class="tourInventory__details__item__service flex gap-2 text-sm max-lg:mb-2" data-value="${item.hotel.service.vid}">
                                                                    ${await renderServiceHotel(item.hotel, element.booking)}
                                                                </div>
                                                            </div>
                                                            <div class="tourInventory__details__item__rate flex gap-0.5" data-value="${item.hotel.star == '' ? 0 : item.hotel.star}">
                                                                ${await renderHotelRate(item.hotel)}
                                                            </div>
                                                        </div>
        
        
                                                    </figcaption>
        
                                                </div>
                                                ${index === element.hotelinfo[0].hotels.length - 1 ? `<div class="md:w-3/12 flex gap-2">
                                                    <svg class="max-lg:hidden"  width="1" height="106" viewBox="0 0 1 106"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <line x1="0.5" y1="106" x2="0.499995" y2="2.18557e-08" stroke="#CFCFCF"
                                                            stroke-dasharray="5 5" />
                                                    </svg>
                                                    <div class="w-full max-lg:mt-5 max-lg:justify-between max-lg:flex">
                                                        
                                                        <button  onclick="renderTourInstallmentForm(this)"
                                                            class="bg-white text-primary border border-solid border-primary rounded-md text-sm py-3
                                                             block text-center w-full mb-3 hover:bg-primary hover:text-white max-lg:w-49per">
                                                            ${page_lang === 'fa' ? 'شرایط اقساط' :
                            page_lang === 'en' ? 'Phone Consultation' :
                                page_lang === 'ar' ? 'استشارة هاتفية' : 'Phone Consultation'
                        }
                                                            </button>
        
                                                        <button type="button" onclick="renderTourForm(this)"
                                                            class="group bg-black text-white rounded-md text-sm w-full h-11 relative max-lg:w-49per">
                                                            <svg class="transition-all absolute left-3 top-4 group-hover:left-2" width="11" height="12"
                                                                viewBox="0 0 11 12" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M0.46967 5.46967C0.176777 5.76256 0.176777 6.23744 0.46967 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.46967 5.46967ZM11 5.25L1 5.25V6.75L11 6.75V5.25Z"
                                                                    fill="white" />
                                                            </svg><span
                                                                class="bg-primary py-3 px-3 rounded-md md:w-36 absolute top-0 right-0 w-10/12">
                                                                ${page_lang === 'fa' ? 'رزرو آنلاین' :
                            page_lang === 'en' ? 'Online Booking' :
                                page_lang === 'ar' ? 'الحجز عبر الإنترنت' : 'Online Booking'
                        }
                                                                </span></button>
                                                    </div>
        
                                                </div>`: ``}
                                         
                                            </div>`;
                index++;
            }

            return output;

        }

    } catch (err) {
        console.error('renderHotels=' + err.lineNumber + ',' + err.message);
    }



}
const renderPriceInfo = async (element, type) => {
    try {
        if (element) {
            if (type == 'doublecost') {
                let output = "";
                for (const item of element.priceinfo.doublecost) {
                    output += `<div class="tourInventory__details__item__double">
                                <span class="tourInventory__details__item__price sm:text-xl font-bold">${new Intl.NumberFormat().format(item.doublecost.doublecostf)}</span>
                                ${item.doublecost.doubleunit.length == 0 ? `` : `<span class="tourInventory__details__item__unit sm:text-base max-sm:text-sm mr-1">${item.doublecost.doubleunit}</span>`}</div>`
                }


                return output;
            } else if (type == 'singlecost') {
                let output = "";
                for (const item of element.priceinfo.singlecost) {
                    console.log(item.singlecost.singleunit)
                    output += `<div class="tourInventory__details__item__single">
                                <span class="tourInventory__details__item__price sm:text-xl font-bold">${new Intl.NumberFormat().format(item.singlecost.singlecostf)}</span>
                                ${item.singlecost.singleunit.length == 0 ? `` : `<span class="tourInventory__details__item__unit sm:text-base max-sm:text-sm mr-1">${item.singlecost.singleunit}</span>`}</div>`
                }


                return output;
            } else if (type == 'childwithbed') {
                let output = "";
                for (const item of element.priceinfo.childwithbed) {
                    output += `<div class="tourInventory__details__item__wBed">
                                <span class="tourInventory__details__item__price sm:text-xl font-bold">${new Intl.NumberFormat().format(item.childwithbed.childwithbedf)}</span>
                                ${item.childwithbed.childwithbedunit.length == 0 ? `` : `<span class="tourInventory__details__item__unit sm:text-base max-sm:text-sm mr-1">${item.childwithbed.childwithbedunit}</span>`}</div>`

                }


                return output;
            } else if (type == 'childwithoutbed') {
                let output = "";
                for (const item of element.priceinfo.childwithoutbed) {
                    output += `<div class="tourInventory__details__item__woBed">
                                <span class="tourInventory__details__item__price sm:text-xl font-bold">${new Intl.NumberFormat().format(item.childwithoutbed.childwithoutbedf)}</span>
                                ${item.childwithoutbed.childwithoutbedunit.length == 0 ? `` : `<span class="tourInventory__details__item__unit sm:text-base max-sm:text-sm mr-1">${item.childwithoutbed.childwithoutbedunit}</span>`}</div>`
                }


                return output;
            }



        }

    } catch (err) {
        console.error('renderPriceInfo=' + err.lineNumber + ',' + err.message);
    }



}
const renderHotelRate = async (element) => {
    try {
        if (element) {
            let output = "";
            let i = 0;
            for (; i < element.star == '' ? 0 : element.star;) {
                output += `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M17.5999 14.79C17.5409 14.434 17.6599 14.071 17.9189 13.82L21.6589 10.28C21.9669 9.991 22.0799 9.551 21.9489 9.15C21.8099 8.75 21.4589 8.46 21.0389 8.4L16.0689 7.679C15.7099 7.624 15.3989 7.397 15.2389 7.07L13.0199 2.6C12.8469 2.264 12.5159 2.039 12.1399 2H11.7189L11.5489 2.07L11.4399 2.11C11.3799 2.145 11.3259 2.188 11.2789 2.24L11.1889 2.31C11.1079 2.388 11.0409 2.48 10.9889 2.58L8.79888 7.07C8.62888 7.41 8.29688 7.64 7.91888 7.679L2.94888 8.4C2.53588 8.465 2.19388 8.754 2.05988 9.15C1.92188 9.547 2.02688 9.987 2.32888 10.28L5.93988 13.78C6.19888 14.035 6.31788 14.4 6.25888 14.759L5.36888 19.679C5.27188 20.274 5.66688 20.838 6.25888 20.95C6.50188 20.989 6.74988 20.95 6.96888 20.84L11.3989 18.519C11.4829 18.473 11.5749 18.443 11.6689 18.429H11.9399C12.1149 18.434 12.2859 18.478 12.4399 18.56L16.8689 20.87C17.2419 21.07 17.6969 21.04 18.0389 20.79C18.3879 20.549 18.5639 20.127 18.4889 19.71L17.5999 14.79Z"
                                                                        fill="#FFBF1C" />
                                                                </svg>`
                i++;
            }
            let j = 0;
            for (; j < 5 - parseInt(element.star == '' ? 0 : element.star);) {
                output += `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M17.5999 14.79C17.5409 14.434 17.6599 14.071 17.9189 13.82L21.6589 10.28C21.9669 9.991 22.0799 9.551 21.9489 9.15C21.8099 8.75 21.4589 8.46 21.0389 8.4L16.0689 7.679C15.7099 7.624 15.3989 7.397 15.2389 7.07L13.0199 2.6C12.8469 2.264 12.5159 2.039 12.1399 2H11.7189L11.5489 2.07L11.4399 2.11C11.3799 2.145 11.3259 2.188 11.2789 2.24L11.1889 2.31C11.1079 2.388 11.0409 2.48 10.9889 2.58L8.79888 7.07C8.62888 7.41 8.29688 7.64 7.91888 7.679L2.94888 8.4C2.53588 8.465 2.19388 8.754 2.05988 9.15C1.92188 9.547 2.02688 9.987 2.32888 10.28L5.93988 13.78C6.19888 14.035 6.31788 14.4 6.25888 14.759L5.36888 19.679C5.27188 20.274 5.66688 20.838 6.25888 20.95C6.50188 20.989 6.74988 20.95 6.96888 20.84L11.3989 18.519C11.4829 18.473 11.5749 18.443 11.6689 18.429H11.9399C12.1149 18.434 12.2859 18.478 12.4399 18.56L16.8689 20.87C17.2419 21.07 17.6969 21.04 18.0389 20.79C18.3879 20.549 18.5639 20.127 18.4889 19.71L17.5999 14.79Z"
                                                                        fill="#E2E2E2" />
                                                                </svg>`
                j++;
            }
            return output
        }
    } catch (err) {
        console.error('renderHotelRate=' + err.lineNumber + ',' + err.message);
    }
}
// const renderHotelBooking = async (element) => {
//     try {
//         if (element) {
//             return `<span class="min-w-8"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" class="inline-block ml-1" viewBox="0 0 3.036 3.037"><path d="M1.113 2.524h-.51v-.61c0-.13.05-.2.162-.214h.35a.38.38 0 0 1 .41.411c0 .26-.157.415-.41.415zM.602.875v-.16c0-.14.06-.208.19-.216h.262c.224 0 .36.134.36.36 0 .17-.092.37-.35.37h-.46zm1.164.61l-.092-.052.08-.07c.094-.08.25-.262.25-.575 0-.48-.372-.79-.947-.79h-.73a.32.32 0 0 0-.309.317v2.72H1.07c.64 0 1.052-.348 1.052-.888 0-.29-.133-.54-.358-.665" fill="#273b7d"/><path d="M2.288 2.67c0-.203.163-.367.365-.367s.367.164.367.367-.164.367-.367.367-.365-.164-.365-.367" fill="#499fdd"/></svg>
//             <span>${element}</span></span>`

//         }
//     } catch (err) {
//         console.error('renderHotelBooking=' + err.lineNumber + ',' + err.message);
//     }
// }
// const renderServiceHotel = async (element, booking) => {
//     try {

//         if (element) {
//             switch (parseInt(element.service.vid)) {
//                 case 0:
//                     sevice = "-";
//                     title = "";
//                     img = "";
//                     break;
//                 case 1654:
//                     sevice = "O.R";
//                     if (page_lang === 'fa') {
//                         title = "بدون وعده غذایی";
//                     } else if (page_lang === 'en') {
//                         title = "No meal";
//                     } else if (page_lang === 'ar') {
//                         title = "لا وجبة";
//                     }

//                     img = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M4.23498 10.6181H7.32728C7.42925 10.6181 7.51163 10.5354 7.51004 10.4335C7.5045 10.0774 7.49625 9.7038 7.63651 9.3765C7.83682 8.90758 8.26513 8.53927 8.80975 8.36481C9.12821 8.2725 9.45316 8.2725 10.1002 8.2725H12.3092C12.9562 8.2725 13.2812 8.2725 13.5876 8.36112C14.1461 8.54019 14.5735 8.9085 14.7729 9.37835C14.913 9.70463 14.9042 10.0782 14.8984 10.4335C14.8968 10.5354 14.9792 10.6181 15.0812 10.6181H18.1753C18.4301 10.6181 18.6369 10.4113 18.6369 10.1565V7.13712C18.6369 6.41158 18.6369 6.04881 18.5122 5.70819C18.3036 5.12296 17.8439 4.65865 17.2375 4.42881C16.895 4.3125 16.5322 4.3125 15.8085 4.3125H6.60175C5.87713 4.3125 5.51436 4.3125 5.15805 4.43435C4.56636 4.65865 4.10759 5.12204 3.89713 5.70635C3.77344 6.04881 3.77344 6.4125 3.77344 7.13712V10.1565C3.77344 10.4113 3.98021 10.6181 4.23498 10.6181Z" fill="black"/>
// <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8537 12.8387C19.6562 12.2876 19.2306 11.8593 18.6796 11.6627C18.3639 11.5547 18.0353 11.5547 17.3799 11.5547H5.018C4.36353 11.5547 4.034 11.5547 3.71276 11.6655C3.16907 11.8584 2.74261 12.2858 2.54415 12.8368C2.42969 13.1535 2.42969 13.483 2.42969 14.1393V15.4233C2.42969 16.0851 2.42969 16.4175 2.54415 16.7341C2.74076 17.2796 3.16723 17.7042 3.70261 17.8935C3.86692 17.9553 4.034 17.9867 4.24353 18.0015V18.9947C4.24353 19.3768 4.55369 19.687 4.93584 19.687C5.318 19.687 5.62815 19.3768 5.62815 18.9947V18.0162H16.7706V18.9947C16.7706 19.3768 17.0808 19.687 17.4629 19.687C17.8451 19.687 18.1553 19.3768 18.1553 18.9947V18.0015C18.3629 17.9867 18.5273 17.9571 18.6851 17.8962C19.2325 17.7033 19.658 17.2787 19.8528 16.735C19.9682 16.4175 19.9682 16.0851 19.9682 15.4233V14.1393C19.9682 13.4821 19.9682 13.1535 19.8537 12.8387Z" fill="black"/>
// </svg>`;
//                     break;
//                 case 1655:
//                     sevice = "B.B";
//                     if (page_lang === 'fa') {
//                         title = "همراه یک وعده صبحانه در روز";
//                     } else if (page_lang === 'en') {
//                         title = "No meal";
//                     } else if (page_lang === 'ar') {
//                         title = "مع وجبة إفطار واحدة في اليوم";
//                     }

//                     img = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M7.85145 3.1977C8.12544 2.92371 8.12544 2.47949 7.85145 2.20549C7.57746 1.9315 7.13323 1.9315 6.85925 2.20549C6.05734 3.00739 6.05734 4.30619 6.85925 5.10809C7.11226 5.36062 7.11343 5.77208 6.85925 6.02626C6.58525 6.30025 6.58525 6.74448 6.85925 7.01847C7.13323 7.29246 7.57746 7.29246 7.85145 7.01847C8.65293 6.21699 8.65377 4.91717 7.85145 4.11588C7.59777 3.86194 7.59761 3.45154 7.85145 3.1977Z" fill="black"/>
// <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0167 6.95312C10.9047 6.95312 10.0054 7.85416 10.0054 8.96439C10.0054 9.2702 10.0736 9.56014 10.1958 9.81975C8.81665 10.1922 7.60023 11.0085 6.71972 12.1018L6.72541 12.1096C6.50607 12.3912 6.24818 12.7972 6.0095 13.2938C5.65049 14.0406 5.33494 14.9922 5.25934 16.0327C5.22768 16.4686 5.23812 16.9201 5.30511 17.3786L5.3194 17.4016C5.38058 17.7931 5.47538 18.1737 5.60076 18.5403C5.61978 18.5917 5.63964 18.6431 5.66036 18.6945C5.66325 18.7017 5.66616 18.7089 5.66909 18.7161C5.71254 18.8226 5.7512 18.9237 5.78533 19.0195C6.14257 19.8511 6.66146 20.5978 7.30231 21.2185C7.8317 21.7302 8.53963 22.0022 9.26139 22.0022H14.7792C15.4886 22.0022 16.1946 21.7408 16.7231 21.2315C17.4273 20.5534 17.9859 19.7236 18.3458 18.795C19.4484 18.3829 20.4518 17.5437 21.101 16.5265C21.8226 15.3958 22.1596 13.9521 21.5843 12.5626C21.0846 11.3563 20.0273 10.7414 18.9343 10.6056C18.06 10.497 17.1272 10.6863 16.3495 11.1382C15.623 10.5363 14.7691 10.0833 13.835 9.82492C13.9587 9.56402 14.0279 9.27226 14.0279 8.96439C14.0279 7.85381 13.1272 6.95312 12.0167 6.95312ZM7.45377 13.4842C8.20711 12.2892 9.43202 11.4036 10.8407 11.1074C12.7435 10.7077 14.5221 11.3063 15.7454 12.4781C15.7774 12.517 15.8127 12.5515 15.8506 12.5817C16.121 12.8553 16.3621 13.1578 16.5689 13.4842H7.45377ZM18.8009 16.3522C18.8009 14.7812 18.2678 13.3394 17.3742 12.1936C17.811 12.0125 18.3008 11.9409 18.7614 11.9981C19.4495 12.0836 20.0159 12.4431 20.2879 13.0995C20.6409 13.9522 20.4678 14.9104 19.9182 15.7715C19.6159 16.2452 19.2157 16.6614 18.7719 16.9821C18.7911 16.7747 18.8009 16.5646 18.8009 16.3522ZM11.4086 8.96439C11.4086 8.62841 11.6804 8.35633 12.0167 8.35633C12.3523 8.35633 12.6247 8.62877 12.6247 8.96439C12.6247 9.29999 12.3523 9.57243 12.0167 9.57243C11.6804 9.57243 11.4086 9.30034 11.4086 8.96439Z" fill="black"/>
// <path d="M4.2771 15.7161C4.39856 14.6335 4.743 13.643 5.09624 12.8656C5.21297 12.6087 5.33066 12.375 5.44159 12.169L4.15319 11.4981C4.08649 11.4634 4.01239 11.4453 3.93718 11.4453H2.46773C2.29797 11.4453 2.14154 11.5373 2.059 11.6856C1.97647 11.834 1.98079 12.0154 2.0703 12.1596L4.2771 15.7161Z" fill="black"/>
// <path d="M4.43209 6.0258C4.15809 5.75181 3.71387 5.75181 3.43987 6.0258C3.16588 6.2998 3.16588 6.74402 3.43987 7.01801C3.69379 7.27193 3.69379 7.68227 3.43987 7.93619C3.16588 8.21018 3.16588 8.65442 3.43987 8.92841C3.71387 9.2024 4.15809 9.2024 4.43209 8.92841C5.23399 8.12651 5.23399 6.82771 4.43209 6.0258Z" fill="black"/>
// </svg>`;
//                     break;
//                 case 1656:
//                     sevice = "H.B";
//                     if (page_lang === 'fa') {
//                         title = "همراه دو وعده غذایی صبحانه و شام ";
//                     } else if (page_lang === 'en') {
//                         title = "with two meals, breakfast and dinner";
//                     } else if (page_lang === 'ar') {
//                         title = "مع وجبتين، الإفطار والعشاء";
//                     }

//                     img = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M6.15667 3.03914C6.17828 2.48728 5.74844 2.02239 5.19658 2.00078C4.64472 1.97917 4.17983 2.40903 4.15822 2.96089L3.95389 8.17889C3.95338 8.19192 3.95312 8.20497 3.95312 8.21801C3.95312 10.2194 5.33799 11.8969 7.20095 12.3464L7.20171 21.0001C7.20177 21.5524 7.64953 22.0001 8.20181 22C8.7541 22 9.20176 21.5522 9.20171 20.9999L9.20096 12.3465C11.0644 11.8969 12.4486 10.2193 12.4486 8.21801C12.4486 8.20503 12.4483 8.19205 12.4478 8.17907L12.2445 2.96107C12.223 2.40921 11.7582 1.97927 11.2063 2.00077C10.6544 2.02228 10.2245 2.48709 10.246 3.03896L10.4485 8.23573C10.439 9.46827 9.43701 10.4648 8.20088 10.4648C6.96555 10.4648 5.96276 9.46812 5.9532 8.23582L6.15667 3.03914Z" fill="black"/>
// <path d="M9.20312 3C9.20312 2.44772 8.75541 2 8.20312 2C7.65084 2 7.20312 2.44772 7.20312 3V7.78893C7.20312 8.34121 7.65084 8.78893 8.20312 8.78893C8.75541 8.78893 9.20312 8.34121 9.20312 7.78893V3Z" fill="black"/>
// <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0407 3.02381C20.0401 2.49876 19.6348 2.06874 19.1203 2.02823C19.0906 2.02506 19.0603 2.02344 19.0297 2.02344C18.9574 2.02344 18.8872 2.03249 18.8202 2.04951C18.3735 2.15006 18.0401 2.54946 18.0407 3.0264C18.0415 3.62889 18.0422 4.6085 18.0427 5.80408C18.0427 5.80408 18.0509 6.11794 18.0429 6.2748C18.0345 6.43906 17.996 6.52596 17.9476 6.5886C17.8521 6.65404 17.7557 6.71799 17.6591 6.78179C17.4323 6.93166 17.1345 7.12576 16.8333 7.32126C16.6276 7.4548 16.4146 7.59262 16.2221 7.71723L16.213 7.72312C15.8767 7.94072 15.6045 8.1169 15.5451 8.15757L15.543 8.15899C14.7008 8.74097 14.1762 9.55956 14.0886 10.6948L14.0882 10.7004C14.0878 10.7056 14.0875 10.7107 14.0872 10.7159C14.0871 10.7184 14.0869 10.7209 14.0868 10.7234C13.8886 14.8133 14.6362 17.5181 15.5393 19.2492C15.9895 20.1122 16.4738 20.7241 16.8862 21.1379C17.0917 21.344 17.2813 21.5029 17.4423 21.6199C17.5665 21.7101 17.759 21.8391 17.9587 21.9027C18.5183 22.0811 19.1062 21.953 19.5224 21.539C19.8999 21.1635 20.0397 20.6542 20.0407 20.1947C20.0445 18.8117 20.0448 11.1035 20.0429 6.28688C20.0445 6.22546 20.0444 6.16413 20.0428 6.10299C20.0423 4.77075 20.0416 3.67618 20.0407 3.02381ZM18.0427 5.80408C18.0427 5.80408 18.0509 6.11794 18.0429 6.2748L18.0427 5.80408Z" fill="black"/>
// </svg>`;
//                     break;
//                 case 1657:
//                     sevice = "F.B";
//                     if (page_lang === 'fa') {
//                         title = "همراه سه وعده غذایی صبحانه و ناهار و شام";
//                     } else if (page_lang === 'en') {
//                         title = "With three meals, breakfast, lunch and dinner";
//                     } else if (page_lang === 'ar') {
//                         title = "مع ثلاث وجبات، الإفطار والغداء والعشاء";
//                     }

//                     img = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M6.15667 3.03914C6.17828 2.48728 5.74844 2.02239 5.19658 2.00078C4.64472 1.97917 4.17983 2.40903 4.15822 2.96089L3.95389 8.17889C3.95338 8.19192 3.95312 8.20497 3.95312 8.21801C3.95312 10.2194 5.33799 11.8969 7.20095 12.3464L7.20171 21.0001C7.20177 21.5524 7.64953 22.0001 8.20181 22C8.7541 22 9.20176 21.5522 9.20171 20.9999L9.20096 12.3465C11.0644 11.8969 12.4486 10.2193 12.4486 8.21801C12.4486 8.20503 12.4483 8.19205 12.4478 8.17907L12.2445 2.96107C12.223 2.40921 11.7582 1.97927 11.2063 2.00077C10.6544 2.02228 10.2245 2.48709 10.246 3.03896L10.4485 8.23573C10.439 9.46827 9.43701 10.4648 8.20088 10.4648C6.96555 10.4648 5.96276 9.46812 5.9532 8.23582L6.15667 3.03914Z" fill="black"/>
//                     <path d="M9.20312 3C9.20312 2.44772 8.75541 2 8.20312 2C7.65084 2 7.20312 2.44772 7.20312 3V7.78893C7.20312 8.34121 7.65084 8.78893 8.20312 8.78893C8.75541 8.78893 9.20312 8.34121 9.20312 7.78893V3Z" fill="black"/>
//                     <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0407 3.02381C20.0401 2.49876 19.6348 2.06874 19.1203 2.02823C19.0906 2.02506 19.0603 2.02344 19.0297 2.02344C18.9574 2.02344 18.8872 2.03249 18.8202 2.04951C18.3735 2.15006 18.0401 2.54946 18.0407 3.0264C18.0415 3.62889 18.0422 4.6085 18.0427 5.80408C18.0427 5.80408 18.0509 6.11794 18.0429 6.2748C18.0345 6.43906 17.996 6.52596 17.9476 6.5886C17.8521 6.65404 17.7557 6.71799 17.6591 6.78179C17.4323 6.93166 17.1345 7.12576 16.8333 7.32126C16.6276 7.4548 16.4146 7.59262 16.2221 7.71723L16.213 7.72312C15.8767 7.94072 15.6045 8.1169 15.5451 8.15757L15.543 8.15899C14.7008 8.74097 14.1762 9.55956 14.0886 10.6948L14.0882 10.7004C14.0878 10.7056 14.0875 10.7107 14.0872 10.7159C14.0871 10.7184 14.0869 10.7209 14.0868 10.7234C13.8886 14.8133 14.6362 17.5181 15.5393 19.2492C15.9895 20.1122 16.4738 20.7241 16.8862 21.1379C17.0917 21.344 17.2813 21.5029 17.4423 21.6199C17.5665 21.7101 17.759 21.8391 17.9587 21.9027C18.5183 22.0811 19.1062 21.953 19.5224 21.539C19.8999 21.1635 20.0397 20.6542 20.0407 20.1947C20.0445 18.8117 20.0448 11.1035 20.0429 6.28688C20.0445 6.22546 20.0444 6.16413 20.0428 6.10299C20.0423 4.77075 20.0416 3.67618 20.0407 3.02381ZM18.0427 5.80408C18.0427 5.80408 18.0509 6.11794 18.0429 6.2748L18.0427 5.80408Z" fill="black"/>
//                     </svg>`;
//                     break;
//                 case 1658:
//                     sevice = "ALL";
//                     if (page_lang === 'fa') {
//                         title = "تمام وعده های غذایی و امکانات هتل";
//                     } else if (page_lang === 'en') {
//                         title = "All meals and hotel facilities";
//                     } else if (page_lang === 'ar') {
//                         title = "جميع الوجبات ومرافق الفندق";
//                     }

//                     img = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M6.15667 3.03914C6.17828 2.48728 5.74844 2.02239 5.19658 2.00078C4.64472 1.97917 4.17983 2.40903 4.15822 2.96089L3.95389 8.17889C3.95338 8.19192 3.95312 8.20497 3.95312 8.21801C3.95312 10.2194 5.33799 11.8969 7.20095 12.3464L7.20171 21.0001C7.20177 21.5524 7.64953 22.0001 8.20181 22C8.7541 22 9.20176 21.5522 9.20171 20.9999L9.20096 12.3465C11.0644 11.8969 12.4486 10.2193 12.4486 8.21801C12.4486 8.20503 12.4483 8.19205 12.4478 8.17907L12.2445 2.96107C12.223 2.40921 11.7582 1.97927 11.2063 2.00077C10.6544 2.02228 10.2245 2.48709 10.246 3.03896L10.4485 8.23573C10.439 9.46827 9.43701 10.4648 8.20088 10.4648C6.96555 10.4648 5.96276 9.46812 5.9532 8.23582L6.15667 3.03914Z" fill="black"/>
//                     <path d="M9.20312 3C9.20312 2.44772 8.75541 2 8.20312 2C7.65084 2 7.20312 2.44772 7.20312 3V7.78893C7.20312 8.34121 7.65084 8.78893 8.20312 8.78893C8.75541 8.78893 9.20312 8.34121 9.20312 7.78893V3Z" fill="black"/>
//                     <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0407 3.02381C20.0401 2.49876 19.6348 2.06874 19.1203 2.02823C19.0906 2.02506 19.0603 2.02344 19.0297 2.02344C18.9574 2.02344 18.8872 2.03249 18.8202 2.04951C18.3735 2.15006 18.0401 2.54946 18.0407 3.0264C18.0415 3.62889 18.0422 4.6085 18.0427 5.80408C18.0427 5.80408 18.0509 6.11794 18.0429 6.2748C18.0345 6.43906 17.996 6.52596 17.9476 6.5886C17.8521 6.65404 17.7557 6.71799 17.6591 6.78179C17.4323 6.93166 17.1345 7.12576 16.8333 7.32126C16.6276 7.4548 16.4146 7.59262 16.2221 7.71723L16.213 7.72312C15.8767 7.94072 15.6045 8.1169 15.5451 8.15757L15.543 8.15899C14.7008 8.74097 14.1762 9.55956 14.0886 10.6948L14.0882 10.7004C14.0878 10.7056 14.0875 10.7107 14.0872 10.7159C14.0871 10.7184 14.0869 10.7209 14.0868 10.7234C13.8886 14.8133 14.6362 17.5181 15.5393 19.2492C15.9895 20.1122 16.4738 20.7241 16.8862 21.1379C17.0917 21.344 17.2813 21.5029 17.4423 21.6199C17.5665 21.7101 17.759 21.8391 17.9587 21.9027C18.5183 22.0811 19.1062 21.953 19.5224 21.539C19.8999 21.1635 20.0397 20.6542 20.0407 20.1947C20.0445 18.8117 20.0448 11.1035 20.0429 6.28688C20.0445 6.22546 20.0444 6.16413 20.0428 6.10299C20.0423 4.77075 20.0416 3.67618 20.0407 3.02381ZM18.0427 5.80408C18.0427 5.80408 18.0509 6.11794 18.0429 6.2748L18.0427 5.80408Z" fill="black"/>
//                     </svg>`;
//                     break;
//                 case 1659:
//                     sevice = "U.ALL";
//                     if (page_lang === 'fa') {
//                         title = "تمام وعده های غذایی و امکانات هتل در هر زمان از اقامت بدون محدودیت";
//                     } else if (page_lang === 'en') {
//                         title = "All meals and hotel facilities at any time of the stay without restrictions";
//                     } else if (page_lang === 'ar') {
//                         title = "جميع الوجبات ومرافق الفندق في أي وقت من فترة الإقامة دون قيود";
//                     }

//                     img = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M8.66941 2.51654C8.37651 2.22365 7.90164 2.22365 7.60875 2.51654C7.31585 2.80944 7.31585 3.28431 7.60875 3.57721C7.78321 3.75167 7.78241 4.03337 7.6093 4.20612C6.84966 4.96576 6.84831 6.19862 7.6093 6.95802C7.9025 7.25061 8.37737 7.25011 8.66996 6.95691C8.96255 6.66371 8.96205 6.18884 8.66885 5.89625C8.49574 5.7235 8.49494 5.4418 8.66941 5.26734C9.42984 4.50789 9.42886 3.276 8.66941 2.51654Z" fill="black"/>
// <path d="M18.5525 5.8897C18.8454 5.59681 18.8454 5.12194 18.5525 4.82904C18.2596 4.53615 17.7848 4.53615 17.4919 4.82904C16.7322 5.58868 16.7314 6.82099 17.4924 7.58039C17.7856 7.87298 18.2605 7.87248 18.5531 7.57928C18.8457 7.28608 18.8452 6.81121 18.552 6.51862C18.3789 6.34587 18.3781 6.06417 18.5525 5.8897Z" fill="black"/>
// <path d="M4.2022 6.51654C3.90931 6.22365 3.43443 6.22365 3.14154 6.51654C2.84865 6.80944 2.84865 7.28431 3.14154 7.57721C3.316 7.75167 3.31521 8.03337 3.14209 8.20612C2.8489 8.49871 2.8484 8.97358 3.14099 9.26678C3.43358 9.55998 3.90845 9.56048 4.20165 9.26789C4.96263 8.50849 4.96184 7.27618 4.2022 6.51654Z" fill="black"/>
// <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9998 6.26562C10.8542 6.26562 9.92752 7.19468 9.92752 8.33887V9.02028C6.1404 9.82322 3.29742 12.7751 3.51132 16.3344C3.52719 16.5984 3.74593 16.8044 4.01042 16.8044H19.9901C20.2546 16.8044 20.4734 16.5984 20.4892 16.3343C20.7022 12.7749 17.8589 9.82294 14.0721 9.02016V8.33887C14.0721 7.19432 13.1441 6.26562 11.9998 6.26562ZM12.5721 8.82055V8.33887C12.5721 8.02203 12.315 7.76562 11.9998 7.76562C11.6841 7.76562 11.4276 8.02167 11.4276 8.33887V8.82059C11.617 8.80987 11.808 8.80443 12.0003 8.80443C12.1922 8.80443 12.3829 8.80986 12.5721 8.82055Z" fill="black"/>
// <path d="M2.80133 18.0844C3.00334 17.9222 3.25079 17.8594 3.50324 17.8594H20.5032C20.7557 17.8594 21.0031 17.9222 21.2052 18.0844C21.4075 18.2468 21.5092 18.4647 21.5535 18.6706C21.6361 19.0548 21.5406 19.4911 21.4256 19.8366C21.1035 20.8027 20.1981 21.4553 19.1794 21.4553H4.82711C3.80834 21.4553 2.90303 20.803 2.58099 19.8368C2.46599 19.4913 2.37035 19.0548 2.45296 18.6706C2.49723 18.4647 2.599 18.2468 2.80133 18.0844Z" fill="black"/>
// </svg>`;
//                     break;
//                 case 1660:
//                     sevice = "Maximum All Inclusive";
//                     if (page_lang === 'fa') {
//                         title = "تمام وعده های غذایی و امکانات هتل در هر زمان از اقامت بدون محدودیت";
//                     } else if (page_lang === 'en') {
//                         title = "All meals and hotel facilities at any time of the stay without restrictions";
//                     } else if (page_lang === 'ar') {
//                         title = "جميع الوجبات ومرافق الفندق في أي وقت من فترة الإقامة دون قيود";
//                     }

//                     img = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M8.66941 2.51654C8.37651 2.22365 7.90164 2.22365 7.60875 2.51654C7.31585 2.80944 7.31585 3.28431 7.60875 3.57721C7.78321 3.75167 7.78241 4.03337 7.6093 4.20612C6.84966 4.96576 6.84831 6.19862 7.6093 6.95802C7.9025 7.25061 8.37737 7.25011 8.66996 6.95691C8.96255 6.66371 8.96205 6.18884 8.66885 5.89625C8.49574 5.7235 8.49494 5.4418 8.66941 5.26734C9.42984 4.50789 9.42886 3.276 8.66941 2.51654Z" fill="black"/>
// <path d="M18.5525 5.8897C18.8454 5.59681 18.8454 5.12194 18.5525 4.82904C18.2596 4.53615 17.7848 4.53615 17.4919 4.82904C16.7322 5.58868 16.7314 6.82099 17.4924 7.58039C17.7856 7.87298 18.2605 7.87248 18.5531 7.57928C18.8457 7.28608 18.8452 6.81121 18.552 6.51862C18.3789 6.34587 18.3781 6.06417 18.5525 5.8897Z" fill="black"/>
// <path d="M4.2022 6.51654C3.90931 6.22365 3.43443 6.22365 3.14154 6.51654C2.84865 6.80944 2.84865 7.28431 3.14154 7.57721C3.316 7.75167 3.31521 8.03337 3.14209 8.20612C2.8489 8.49871 2.8484 8.97358 3.14099 9.26678C3.43358 9.55998 3.90845 9.56048 4.20165 9.26789C4.96263 8.50849 4.96184 7.27618 4.2022 6.51654Z" fill="black"/>
// <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9998 6.26562C10.8542 6.26562 9.92752 7.19468 9.92752 8.33887V9.02028C6.1404 9.82322 3.29742 12.7751 3.51132 16.3344C3.52719 16.5984 3.74593 16.8044 4.01042 16.8044H19.9901C20.2546 16.8044 20.4734 16.5984 20.4892 16.3343C20.7022 12.7749 17.8589 9.82294 14.0721 9.02016V8.33887C14.0721 7.19432 13.1441 6.26562 11.9998 6.26562ZM12.5721 8.82055V8.33887C12.5721 8.02203 12.315 7.76562 11.9998 7.76562C11.6841 7.76562 11.4276 8.02167 11.4276 8.33887V8.82059C11.617 8.80987 11.808 8.80443 12.0003 8.80443C12.1922 8.80443 12.3829 8.80986 12.5721 8.82055Z" fill="black"/>
// <path d="M2.80133 18.0844C3.00334 17.9222 3.25079 17.8594 3.50324 17.8594H20.5032C20.7557 17.8594 21.0031 17.9222 21.2052 18.0844C21.4075 18.2468 21.5092 18.4647 21.5535 18.6706C21.6361 19.0548 21.5406 19.4911 21.4256 19.8366C21.1035 20.8027 20.1981 21.4553 19.1794 21.4553H4.82711C3.80834 21.4553 2.90303 20.803 2.58099 19.8368C2.46599 19.4913 2.37035 19.0548 2.45296 18.6706C2.49723 18.4647 2.599 18.2468 2.80133 18.0844Z" fill="black"/>
// </svg>`;

//                     break;

//             }
//             return `${img}<span>${sevice}</span><span>${title}</span>${await renderHotelBooking(booking)}`
//         }
//     } catch (err) {
//         console.error('renderServiceHotel=' + err.lineNumber + ',' + err.message);
//     }
// }
// const renderInventoryView = async (element, day, from, to) => {
//     try {
//         element.closest("ul").querySelectorAll("li").forEach(e => {
//             e.classList.remove("active")
//         });
//         $bc.setSource("db.inventoryViewSpecificDate", {
//             from: from,
//             to: to,
//             day: day,
//         });
//         element.classList.add("active");
//         window.scroll({
//             top: document.querySelector(".tourInventory__container").offsetTop,
//             behavior: 'smooth'
//         });
//         if (element.closest(".isFixed")) {
//             element.closest(".tour__date__modal__container").classList.add('max-xl:hidden');
//             element.closest(".tour__date__modal__container").classList.remove('isFixed');
//         }

//         renderedSelectedDate(
//             element.querySelector(".start__date").innerText,
//             element.querySelector(".start__date").dataset.date,
//             element.querySelector(".end__date").innerText,
//             element.querySelector(".end__date").dataset.date
//         )

//         if(innerWidth < 1024){
//             let closeelement = document.querySelector(".tour__date__modal__container .tourDate__container > svg");
//             closeModalContainer(closeelement,event,'tour__date__modal__container','hidden')
//         }
        

//     } catch (err) {
//         console.error('renderInventoryView=' + err.lineNumber + ',' + err.message);
//     }
// }
// const onProcessedHotelsImg = async (args) => {
//     try {
//         const response = args.response;
//         if (response.status == 200) {
//             const responseJson = await response.json();
//             if (responseJson) {
//                 document.querySelectorAll(".tourInventory__details__item__img").forEach(e => {
//                     const pageName = e.dataset.pagename;
//                     for (const item of responseJson) {
//                         if (parseInt(e.dataset.id) == parseInt(item.usedforid)) {
//                             e.setAttribute("src", `/${item.originalImage}`);
//                             const htmlImg = e.closest("figure").innerHTML;
//                             e.closest("figure").innerHTML = `<a href="/${pageName}?id=${e.dataset.id}">${htmlImg}</a>`
//                         }
//                     }



//                 });

//             }
//         }
//     } catch (err) {
//         console.error('onProcessedHotelsImg=' + err.lineNumber + ',' + err.message);
//     }
// }
// booking tour form




// updatetd
const renderHotelBooking = async (element) => {
    try {
        if (element) {
            return `<span class="mt-2"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" class="inline-block ml-1" viewBox="0 0 3.036 3.037"><path d="M1.113 2.524h-.51v-.61c0-.13.05-.2.162-.214h.35a.38.38 0 0 1 .41.411c0 .26-.157.415-.41.415zM.602.875v-.16c0-.14.06-.208.19-.216h.262c.224 0 .36.134.36.36 0 .17-.092.37-.35.37h-.46zm1.164.61l-.092-.052.08-.07c.094-.08.25-.262.25-.575 0-.48-.372-.79-.947-.79h-.73a.32.32 0 0 0-.309.317v2.72H1.07c.64 0 1.052-.348 1.052-.888 0-.29-.133-.54-.358-.665" fill="#273b7d"/><path d="M2.288 2.67c0-.203.163-.367.365-.367s.367.164.367.367-.164.367-.367.367-.365-.164-.365-.367" fill="#499fdd"/></svg>
    <span>${element}</span></span>`

        } else {
            return ``
        }
    } catch (err) {
        console.error('renderHotelBooking=' + err.lineNumber + ',' + err.message);
    }
}
// updatetd
const renderServiceHotel = async (element) => {
    try {

        if (element) {
            switch (parseInt(element.service.vid)) {
                case 0:
                    sevice = "-";
                    title = "";
                    img = "";
                    break;
                case 1654:
                    sevice = "O.R";
                    if (page_lang === 'fa') {
                        title = "بدون وعده غذایی";
                    } else if (page_lang === 'en') {
                        title = "No meal";
                    } else if (page_lang === 'ar') {
                        title = "لا وجبة";
                    }

                    img = `<svg class="shrink-0" width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.23498 10.6181H7.32728C7.42925 10.6181 7.51163 10.5354 7.51004 10.4335C7.5045 10.0774 7.49625 9.7038 7.63651 9.3765C7.83682 8.90758 8.26513 8.53927 8.80975 8.36481C9.12821 8.2725 9.45316 8.2725 10.1002 8.2725H12.3092C12.9562 8.2725 13.2812 8.2725 13.5876 8.36112C14.1461 8.54019 14.5735 8.9085 14.7729 9.37835C14.913 9.70463 14.9042 10.0782 14.8984 10.4335C14.8968 10.5354 14.9792 10.6181 15.0812 10.6181H18.1753C18.4301 10.6181 18.6369 10.4113 18.6369 10.1565V7.13712C18.6369 6.41158 18.6369 6.04881 18.5122 5.70819C18.3036 5.12296 17.8439 4.65865 17.2375 4.42881C16.895 4.3125 16.5322 4.3125 15.8085 4.3125H6.60175C5.87713 4.3125 5.51436 4.3125 5.15805 4.43435C4.56636 4.65865 4.10759 5.12204 3.89713 5.70635C3.77344 6.04881 3.77344 6.4125 3.77344 7.13712V10.1565C3.77344 10.4113 3.98021 10.6181 4.23498 10.6181Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.8537 12.8387C19.6562 12.2876 19.2306 11.8593 18.6796 11.6627C18.3639 11.5547 18.0353 11.5547 17.3799 11.5547H5.018C4.36353 11.5547 4.034 11.5547 3.71276 11.6655C3.16907 11.8584 2.74261 12.2858 2.54415 12.8368C2.42969 13.1535 2.42969 13.483 2.42969 14.1393V15.4233C2.42969 16.0851 2.42969 16.4175 2.54415 16.7341C2.74076 17.2796 3.16723 17.7042 3.70261 17.8935C3.86692 17.9553 4.034 17.9867 4.24353 18.0015V18.9947C4.24353 19.3768 4.55369 19.687 4.93584 19.687C5.318 19.687 5.62815 19.3768 5.62815 18.9947V18.0162H16.7706V18.9947C16.7706 19.3768 17.0808 19.687 17.4629 19.687C17.8451 19.687 18.1553 19.3768 18.1553 18.9947V18.0015C18.3629 17.9867 18.5273 17.9571 18.6851 17.8962C19.2325 17.7033 19.658 17.2787 19.8528 16.735C19.9682 16.4175 19.9682 16.0851 19.9682 15.4233V14.1393C19.9682 13.4821 19.9682 13.1535 19.8537 12.8387Z" fill="black"/>
</svg>`;
                    break;
                case 1655:
                    sevice = "B.B";
                    if (page_lang === 'fa') {
                        title = "همراه با صبحانه";
                    } else if (page_lang === 'en') {
                        title = "with breakfast";
                    } else if (page_lang === 'ar') {
                        title = "مع وجبة إفطار";
                    }

                    img = `<svg  class="shrink-0" width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.85145 3.1977C8.12544 2.92371 8.12544 2.47949 7.85145 2.20549C7.57746 1.9315 7.13323 1.9315 6.85925 2.20549C6.05734 3.00739 6.05734 4.30619 6.85925 5.10809C7.11226 5.36062 7.11343 5.77208 6.85925 6.02626C6.58525 6.30025 6.58525 6.74448 6.85925 7.01847C7.13323 7.29246 7.57746 7.29246 7.85145 7.01847C8.65293 6.21699 8.65377 4.91717 7.85145 4.11588C7.59777 3.86194 7.59761 3.45154 7.85145 3.1977Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0167 6.95312C10.9047 6.95312 10.0054 7.85416 10.0054 8.96439C10.0054 9.2702 10.0736 9.56014 10.1958 9.81975C8.81665 10.1922 7.60023 11.0085 6.71972 12.1018L6.72541 12.1096C6.50607 12.3912 6.24818 12.7972 6.0095 13.2938C5.65049 14.0406 5.33494 14.9922 5.25934 16.0327C5.22768 16.4686 5.23812 16.9201 5.30511 17.3786L5.3194 17.4016C5.38058 17.7931 5.47538 18.1737 5.60076 18.5403C5.61978 18.5917 5.63964 18.6431 5.66036 18.6945C5.66325 18.7017 5.66616 18.7089 5.66909 18.7161C5.71254 18.8226 5.7512 18.9237 5.78533 19.0195C6.14257 19.8511 6.66146 20.5978 7.30231 21.2185C7.8317 21.7302 8.53963 22.0022 9.26139 22.0022H14.7792C15.4886 22.0022 16.1946 21.7408 16.7231 21.2315C17.4273 20.5534 17.9859 19.7236 18.3458 18.795C19.4484 18.3829 20.4518 17.5437 21.101 16.5265C21.8226 15.3958 22.1596 13.9521 21.5843 12.5626C21.0846 11.3563 20.0273 10.7414 18.9343 10.6056C18.06 10.497 17.1272 10.6863 16.3495 11.1382C15.623 10.5363 14.7691 10.0833 13.835 9.82492C13.9587 9.56402 14.0279 9.27226 14.0279 8.96439C14.0279 7.85381 13.1272 6.95312 12.0167 6.95312ZM7.45377 13.4842C8.20711 12.2892 9.43202 11.4036 10.8407 11.1074C12.7435 10.7077 14.5221 11.3063 15.7454 12.4781C15.7774 12.517 15.8127 12.5515 15.8506 12.5817C16.121 12.8553 16.3621 13.1578 16.5689 13.4842H7.45377ZM18.8009 16.3522C18.8009 14.7812 18.2678 13.3394 17.3742 12.1936C17.811 12.0125 18.3008 11.9409 18.7614 11.9981C19.4495 12.0836 20.0159 12.4431 20.2879 13.0995C20.6409 13.9522 20.4678 14.9104 19.9182 15.7715C19.6159 16.2452 19.2157 16.6614 18.7719 16.9821C18.7911 16.7747 18.8009 16.5646 18.8009 16.3522ZM11.4086 8.96439C11.4086 8.62841 11.6804 8.35633 12.0167 8.35633C12.3523 8.35633 12.6247 8.62877 12.6247 8.96439C12.6247 9.29999 12.3523 9.57243 12.0167 9.57243C11.6804 9.57243 11.4086 9.30034 11.4086 8.96439Z" fill="black"/>
<path d="M4.2771 15.7161C4.39856 14.6335 4.743 13.643 5.09624 12.8656C5.21297 12.6087 5.33066 12.375 5.44159 12.169L4.15319 11.4981C4.08649 11.4634 4.01239 11.4453 3.93718 11.4453H2.46773C2.29797 11.4453 2.14154 11.5373 2.059 11.6856C1.97647 11.834 1.98079 12.0154 2.0703 12.1596L4.2771 15.7161Z" fill="black"/>
<path d="M4.43209 6.0258C4.15809 5.75181 3.71387 5.75181 3.43987 6.0258C3.16588 6.2998 3.16588 6.74402 3.43987 7.01801C3.69379 7.27193 3.69379 7.68227 3.43987 7.93619C3.16588 8.21018 3.16588 8.65442 3.43987 8.92841C3.71387 9.2024 4.15809 9.2024 4.43209 8.92841C5.23399 8.12651 5.23399 6.82771 4.43209 6.0258Z" fill="black"/>
</svg>`;
                    break;
                case 1656:
                    sevice = "H.B";
                    if (page_lang === 'fa') {
                        title = "همراه با صبحانه + ناهار و یا شام";
                    } else if (page_lang === 'en') {
                        title = "with two meals, breakfast and dinner";
                    } else if (page_lang === 'ar') {
                        title = "مع وجبتين، الإفطار والعشاء";
                    }

                    img = `<svg  class="shrink-0" width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.15667 3.03914C6.17828 2.48728 5.74844 2.02239 5.19658 2.00078C4.64472 1.97917 4.17983 2.40903 4.15822 2.96089L3.95389 8.17889C3.95338 8.19192 3.95312 8.20497 3.95312 8.21801C3.95312 10.2194 5.33799 11.8969 7.20095 12.3464L7.20171 21.0001C7.20177 21.5524 7.64953 22.0001 8.20181 22C8.7541 22 9.20176 21.5522 9.20171 20.9999L9.20096 12.3465C11.0644 11.8969 12.4486 10.2193 12.4486 8.21801C12.4486 8.20503 12.4483 8.19205 12.4478 8.17907L12.2445 2.96107C12.223 2.40921 11.7582 1.97927 11.2063 2.00077C10.6544 2.02228 10.2245 2.48709 10.246 3.03896L10.4485 8.23573C10.439 9.46827 9.43701 10.4648 8.20088 10.4648C6.96555 10.4648 5.96276 9.46812 5.9532 8.23582L6.15667 3.03914Z" fill="black"/>
<path d="M9.20312 3C9.20312 2.44772 8.75541 2 8.20312 2C7.65084 2 7.20312 2.44772 7.20312 3V7.78893C7.20312 8.34121 7.65084 8.78893 8.20312 8.78893C8.75541 8.78893 9.20312 8.34121 9.20312 7.78893V3Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.0407 3.02381C20.0401 2.49876 19.6348 2.06874 19.1203 2.02823C19.0906 2.02506 19.0603 2.02344 19.0297 2.02344C18.9574 2.02344 18.8872 2.03249 18.8202 2.04951C18.3735 2.15006 18.0401 2.54946 18.0407 3.0264C18.0415 3.62889 18.0422 4.6085 18.0427 5.80408C18.0427 5.80408 18.0509 6.11794 18.0429 6.2748C18.0345 6.43906 17.996 6.52596 17.9476 6.5886C17.8521 6.65404 17.7557 6.71799 17.6591 6.78179C17.4323 6.93166 17.1345 7.12576 16.8333 7.32126C16.6276 7.4548 16.4146 7.59262 16.2221 7.71723L16.213 7.72312C15.8767 7.94072 15.6045 8.1169 15.5451 8.15757L15.543 8.15899C14.7008 8.74097 14.1762 9.55956 14.0886 10.6948L14.0882 10.7004C14.0878 10.7056 14.0875 10.7107 14.0872 10.7159C14.0871 10.7184 14.0869 10.7209 14.0868 10.7234C13.8886 14.8133 14.6362 17.5181 15.5393 19.2492C15.9895 20.1122 16.4738 20.7241 16.8862 21.1379C17.0917 21.344 17.2813 21.5029 17.4423 21.6199C17.5665 21.7101 17.759 21.8391 17.9587 21.9027C18.5183 22.0811 19.1062 21.953 19.5224 21.539C19.8999 21.1635 20.0397 20.6542 20.0407 20.1947C20.0445 18.8117 20.0448 11.1035 20.0429 6.28688C20.0445 6.22546 20.0444 6.16413 20.0428 6.10299C20.0423 4.77075 20.0416 3.67618 20.0407 3.02381ZM18.0427 5.80408C18.0427 5.80408 18.0509 6.11794 18.0429 6.2748L18.0427 5.80408Z" fill="black"/>
</svg>`;
                    break;
                case 1657:
                    sevice = "F.B";
                    if (page_lang === 'fa') {
                        title = "همراه با صبحانه، ناهار و شام";
                    } else if (page_lang === 'en') {
                        title = "With three meals, breakfast, lunch and dinner";
                    } else if (page_lang === 'ar') {
                        title = "مع ثلاث وجبات، الإفطار والغداء والعشاء";
                    }

                    img = `<svg  class="shrink-0" width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.15667 3.03914C6.17828 2.48728 5.74844 2.02239 5.19658 2.00078C4.64472 1.97917 4.17983 2.40903 4.15822 2.96089L3.95389 8.17889C3.95338 8.19192 3.95312 8.20497 3.95312 8.21801C3.95312 10.2194 5.33799 11.8969 7.20095 12.3464L7.20171 21.0001C7.20177 21.5524 7.64953 22.0001 8.20181 22C8.7541 22 9.20176 21.5522 9.20171 20.9999L9.20096 12.3465C11.0644 11.8969 12.4486 10.2193 12.4486 8.21801C12.4486 8.20503 12.4483 8.19205 12.4478 8.17907L12.2445 2.96107C12.223 2.40921 11.7582 1.97927 11.2063 2.00077C10.6544 2.02228 10.2245 2.48709 10.246 3.03896L10.4485 8.23573C10.439 9.46827 9.43701 10.4648 8.20088 10.4648C6.96555 10.4648 5.96276 9.46812 5.9532 8.23582L6.15667 3.03914Z" fill="black"/>
            <path d="M9.20312 3C9.20312 2.44772 8.75541 2 8.20312 2C7.65084 2 7.20312 2.44772 7.20312 3V7.78893C7.20312 8.34121 7.65084 8.78893 8.20312 8.78893C8.75541 8.78893 9.20312 8.34121 9.20312 7.78893V3Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0407 3.02381C20.0401 2.49876 19.6348 2.06874 19.1203 2.02823C19.0906 2.02506 19.0603 2.02344 19.0297 2.02344C18.9574 2.02344 18.8872 2.03249 18.8202 2.04951C18.3735 2.15006 18.0401 2.54946 18.0407 3.0264C18.0415 3.62889 18.0422 4.6085 18.0427 5.80408C18.0427 5.80408 18.0509 6.11794 18.0429 6.2748C18.0345 6.43906 17.996 6.52596 17.9476 6.5886C17.8521 6.65404 17.7557 6.71799 17.6591 6.78179C17.4323 6.93166 17.1345 7.12576 16.8333 7.32126C16.6276 7.4548 16.4146 7.59262 16.2221 7.71723L16.213 7.72312C15.8767 7.94072 15.6045 8.1169 15.5451 8.15757L15.543 8.15899C14.7008 8.74097 14.1762 9.55956 14.0886 10.6948L14.0882 10.7004C14.0878 10.7056 14.0875 10.7107 14.0872 10.7159C14.0871 10.7184 14.0869 10.7209 14.0868 10.7234C13.8886 14.8133 14.6362 17.5181 15.5393 19.2492C15.9895 20.1122 16.4738 20.7241 16.8862 21.1379C17.0917 21.344 17.2813 21.5029 17.4423 21.6199C17.5665 21.7101 17.759 21.8391 17.9587 21.9027C18.5183 22.0811 19.1062 21.953 19.5224 21.539C19.8999 21.1635 20.0397 20.6542 20.0407 20.1947C20.0445 18.8117 20.0448 11.1035 20.0429 6.28688C20.0445 6.22546 20.0444 6.16413 20.0428 6.10299C20.0423 4.77075 20.0416 3.67618 20.0407 3.02381ZM18.0427 5.80408C18.0427 5.80408 18.0509 6.11794 18.0429 6.2748L18.0427 5.80408Z" fill="black"/>
            </svg>`;
                    break;
                case 1658:
                    sevice = "ALL";
                    if (page_lang === 'fa') {
                        title = "تمام وعده های غذایی + امکانات هتل";
                    } else if (page_lang === 'en') {
                        title = "All meals and hotel facilities";
                    } else if (page_lang === 'ar') {
                        title = "جميع الوجبات ومرافق الفندق";
                    }

                    img = `<svg  class="shrink-0" width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.15667 3.03914C6.17828 2.48728 5.74844 2.02239 5.19658 2.00078C4.64472 1.97917 4.17983 2.40903 4.15822 2.96089L3.95389 8.17889C3.95338 8.19192 3.95312 8.20497 3.95312 8.21801C3.95312 10.2194 5.33799 11.8969 7.20095 12.3464L7.20171 21.0001C7.20177 21.5524 7.64953 22.0001 8.20181 22C8.7541 22 9.20176 21.5522 9.20171 20.9999L9.20096 12.3465C11.0644 11.8969 12.4486 10.2193 12.4486 8.21801C12.4486 8.20503 12.4483 8.19205 12.4478 8.17907L12.2445 2.96107C12.223 2.40921 11.7582 1.97927 11.2063 2.00077C10.6544 2.02228 10.2245 2.48709 10.246 3.03896L10.4485 8.23573C10.439 9.46827 9.43701 10.4648 8.20088 10.4648C6.96555 10.4648 5.96276 9.46812 5.9532 8.23582L6.15667 3.03914Z" fill="black"/>
            <path d="M9.20312 3C9.20312 2.44772 8.75541 2 8.20312 2C7.65084 2 7.20312 2.44772 7.20312 3V7.78893C7.20312 8.34121 7.65084 8.78893 8.20312 8.78893C8.75541 8.78893 9.20312 8.34121 9.20312 7.78893V3Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0407 3.02381C20.0401 2.49876 19.6348 2.06874 19.1203 2.02823C19.0906 2.02506 19.0603 2.02344 19.0297 2.02344C18.9574 2.02344 18.8872 2.03249 18.8202 2.04951C18.3735 2.15006 18.0401 2.54946 18.0407 3.0264C18.0415 3.62889 18.0422 4.6085 18.0427 5.80408C18.0427 5.80408 18.0509 6.11794 18.0429 6.2748C18.0345 6.43906 17.996 6.52596 17.9476 6.5886C17.8521 6.65404 17.7557 6.71799 17.6591 6.78179C17.4323 6.93166 17.1345 7.12576 16.8333 7.32126C16.6276 7.4548 16.4146 7.59262 16.2221 7.71723L16.213 7.72312C15.8767 7.94072 15.6045 8.1169 15.5451 8.15757L15.543 8.15899C14.7008 8.74097 14.1762 9.55956 14.0886 10.6948L14.0882 10.7004C14.0878 10.7056 14.0875 10.7107 14.0872 10.7159C14.0871 10.7184 14.0869 10.7209 14.0868 10.7234C13.8886 14.8133 14.6362 17.5181 15.5393 19.2492C15.9895 20.1122 16.4738 20.7241 16.8862 21.1379C17.0917 21.344 17.2813 21.5029 17.4423 21.6199C17.5665 21.7101 17.759 21.8391 17.9587 21.9027C18.5183 22.0811 19.1062 21.953 19.5224 21.539C19.8999 21.1635 20.0397 20.6542 20.0407 20.1947C20.0445 18.8117 20.0448 11.1035 20.0429 6.28688C20.0445 6.22546 20.0444 6.16413 20.0428 6.10299C20.0423 4.77075 20.0416 3.67618 20.0407 3.02381ZM18.0427 5.80408C18.0427 5.80408 18.0509 6.11794 18.0429 6.2748L18.0427 5.80408Z" fill="black"/>
            </svg>`;
                    break;
                case 1659:
                    sevice = "U.ALL";
                    if (page_lang === 'fa') {
                        title = "Ultra All Inclusive";
                    } else if (page_lang === 'en') {
                        title = "Ultra All Inclusive";
                    } else if (page_lang === 'ar') {
                        title = "Ultra All Inclusive";
                    }

                    img = `<svg  class="shrink-0" width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.66941 2.51654C8.37651 2.22365 7.90164 2.22365 7.60875 2.51654C7.31585 2.80944 7.31585 3.28431 7.60875 3.57721C7.78321 3.75167 7.78241 4.03337 7.6093 4.20612C6.84966 4.96576 6.84831 6.19862 7.6093 6.95802C7.9025 7.25061 8.37737 7.25011 8.66996 6.95691C8.96255 6.66371 8.96205 6.18884 8.66885 5.89625C8.49574 5.7235 8.49494 5.4418 8.66941 5.26734C9.42984 4.50789 9.42886 3.276 8.66941 2.51654Z" fill="black"/>
<path d="M18.5525 5.8897C18.8454 5.59681 18.8454 5.12194 18.5525 4.82904C18.2596 4.53615 17.7848 4.53615 17.4919 4.82904C16.7322 5.58868 16.7314 6.82099 17.4924 7.58039C17.7856 7.87298 18.2605 7.87248 18.5531 7.57928C18.8457 7.28608 18.8452 6.81121 18.552 6.51862C18.3789 6.34587 18.3781 6.06417 18.5525 5.8897Z" fill="black"/>
<path d="M4.2022 6.51654C3.90931 6.22365 3.43443 6.22365 3.14154 6.51654C2.84865 6.80944 2.84865 7.28431 3.14154 7.57721C3.316 7.75167 3.31521 8.03337 3.14209 8.20612C2.8489 8.49871 2.8484 8.97358 3.14099 9.26678C3.43358 9.55998 3.90845 9.56048 4.20165 9.26789C4.96263 8.50849 4.96184 7.27618 4.2022 6.51654Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9998 6.26562C10.8542 6.26562 9.92752 7.19468 9.92752 8.33887V9.02028C6.1404 9.82322 3.29742 12.7751 3.51132 16.3344C3.52719 16.5984 3.74593 16.8044 4.01042 16.8044H19.9901C20.2546 16.8044 20.4734 16.5984 20.4892 16.3343C20.7022 12.7749 17.8589 9.82294 14.0721 9.02016V8.33887C14.0721 7.19432 13.1441 6.26562 11.9998 6.26562ZM12.5721 8.82055V8.33887C12.5721 8.02203 12.315 7.76562 11.9998 7.76562C11.6841 7.76562 11.4276 8.02167 11.4276 8.33887V8.82059C11.617 8.80987 11.808 8.80443 12.0003 8.80443C12.1922 8.80443 12.3829 8.80986 12.5721 8.82055Z" fill="black"/>
<path d="M2.80133 18.0844C3.00334 17.9222 3.25079 17.8594 3.50324 17.8594H20.5032C20.7557 17.8594 21.0031 17.9222 21.2052 18.0844C21.4075 18.2468 21.5092 18.4647 21.5535 18.6706C21.6361 19.0548 21.5406 19.4911 21.4256 19.8366C21.1035 20.8027 20.1981 21.4553 19.1794 21.4553H4.82711C3.80834 21.4553 2.90303 20.803 2.58099 19.8368C2.46599 19.4913 2.37035 19.0548 2.45296 18.6706C2.49723 18.4647 2.599 18.2468 2.80133 18.0844Z" fill="black"/>
</svg>`;
                    break;
                case 1660:
                    sevice = "Maximum All Inclusive";
                    if (page_lang === 'fa') {
                        title = "";
                    } else if (page_lang === 'en') {
                        title = "";
                    } else if (page_lang === 'ar') {
                        title = "";
                    }

                    img = `<svg  class="shrink-0" width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.66941 2.51654C8.37651 2.22365 7.90164 2.22365 7.60875 2.51654C7.31585 2.80944 7.31585 3.28431 7.60875 3.57721C7.78321 3.75167 7.78241 4.03337 7.6093 4.20612C6.84966 4.96576 6.84831 6.19862 7.6093 6.95802C7.9025 7.25061 8.37737 7.25011 8.66996 6.95691C8.96255 6.66371 8.96205 6.18884 8.66885 5.89625C8.49574 5.7235 8.49494 5.4418 8.66941 5.26734C9.42984 4.50789 9.42886 3.276 8.66941 2.51654Z" fill="black"/>
<path d="M18.5525 5.8897C18.8454 5.59681 18.8454 5.12194 18.5525 4.82904C18.2596 4.53615 17.7848 4.53615 17.4919 4.82904C16.7322 5.58868 16.7314 6.82099 17.4924 7.58039C17.7856 7.87298 18.2605 7.87248 18.5531 7.57928C18.8457 7.28608 18.8452 6.81121 18.552 6.51862C18.3789 6.34587 18.3781 6.06417 18.5525 5.8897Z" fill="black"/>
<path d="M4.2022 6.51654C3.90931 6.22365 3.43443 6.22365 3.14154 6.51654C2.84865 6.80944 2.84865 7.28431 3.14154 7.57721C3.316 7.75167 3.31521 8.03337 3.14209 8.20612C2.8489 8.49871 2.8484 8.97358 3.14099 9.26678C3.43358 9.55998 3.90845 9.56048 4.20165 9.26789C4.96263 8.50849 4.96184 7.27618 4.2022 6.51654Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9998 6.26562C10.8542 6.26562 9.92752 7.19468 9.92752 8.33887V9.02028C6.1404 9.82322 3.29742 12.7751 3.51132 16.3344C3.52719 16.5984 3.74593 16.8044 4.01042 16.8044H19.9901C20.2546 16.8044 20.4734 16.5984 20.4892 16.3343C20.7022 12.7749 17.8589 9.82294 14.0721 9.02016V8.33887C14.0721 7.19432 13.1441 6.26562 11.9998 6.26562ZM12.5721 8.82055V8.33887C12.5721 8.02203 12.315 7.76562 11.9998 7.76562C11.6841 7.76562 11.4276 8.02167 11.4276 8.33887V8.82059C11.617 8.80987 11.808 8.80443 12.0003 8.80443C12.1922 8.80443 12.3829 8.80986 12.5721 8.82055Z" fill="black"/>
<path d="M2.80133 18.0844C3.00334 17.9222 3.25079 17.8594 3.50324 17.8594H20.5032C20.7557 17.8594 21.0031 17.9222 21.2052 18.0844C21.4075 18.2468 21.5092 18.4647 21.5535 18.6706C21.6361 19.0548 21.5406 19.4911 21.4256 19.8366C21.1035 20.8027 20.1981 21.4553 19.1794 21.4553H4.82711C3.80834 21.4553 2.90303 20.803 2.58099 19.8368C2.46599 19.4913 2.37035 19.0548 2.45296 18.6706C2.49723 18.4647 2.599 18.2468 2.80133 18.0844Z" fill="black"/>
</svg>`;

                    break;

            }
            return `${img}<span>${sevice}</span><span>${title}</span>`
        }
    } catch (err) {
        console.error('renderServiceHotel=' + err.lineNumber + ',' + err.message);
    }
}
// updatetd
const renderInventoryView = async (element, day, from, to) => {
    try {
        const origins = element.closest("li").querySelector(".start__date").dataset.date;
        const destinations = element.closest("li").querySelector(".end__date").dataset.date;
        const dateSplittedOrigins = origins.split("-"); const dateSplittedDestinations = destinations.split("-");
        const jDOrigins = JalaliDate.jalaliToGregorian(dateSplittedOrigins[0], dateSplittedOrigins[1], dateSplittedOrigins[2]);
        const jDDestinations = JalaliDate.jalaliToGregorian(dateSplittedDestinations[0], dateSplittedDestinations[1], dateSplittedDestinations[2]);
        if (page_lang === 'fa') {
            var weekday = ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه"];
        } else if (page_lang === 'en') {
            var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        } else if (page_lang === 'ar') {
            var weekday = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
        }
        const dOrigins = new Date(jDOrigins[0] + "-" + jDOrigins[1] + "-" + jDOrigins[2]);
        const dDestinations = new Date(jDDestinations[0] + "-" + jDDestinations[1] + "-" + jDDestinations[2]);
        document.querySelector(".origins__start__weekday").innerText = weekday[dOrigins.getDay()];
        document.querySelector(".destinations__start__weekday").innerText = weekday[dDestinations.getDay()];
        element.closest("ul").querySelectorAll("li").forEach(e => {
            e.classList.remove("active")
        });
        $bc.setSource("db.inventoryViewSpecificDate", {
            from: from,
            to: to,
            day: day,
        });
        element.classList.add("active");
        window.scroll({
            top: document.querySelector(".tourInventory__container").offsetTop,
            behavior: 'smooth'
        });
        if (element.closest(".isFixed")) {
            element.closest(".tour__date__modal__container").classList.add('max-xl:hidden');
            element.closest(".tour__date__modal__container").classList.remove('isFixed');
        }

        renderedSelectedDate(
            element.querySelector(".start__date").innerText,
            element.querySelector(".start__date").dataset.date,
            element.querySelector(".end__date").innerText,
            element.querySelector(".end__date").dataset.date
        )

        if (innerWidth < 1024) {
            let closeelement = document.querySelector(".tour__date__modal__container .tourDate__container > svg");
            closeModalContainer(closeelement, event, 'tour__date__modal__container', 'hidden')
        }

    } catch (err) {
        console.error('renderInventoryView=' + err.lineNumber + ',' + err.message);
    }
}
// updatetd
const onProcessedHotelsImg = async (args) => {
    try {
        const response = args.response;
        if (response.status == 200) {
            const responseJson = await response.json();
            if (responseJson) {
                document.querySelectorAll(".tourInventory__details__item__img").forEach(e => {
                    const pageName = e.dataset.pagename;
                    if (e.dataset.id) {
                        let foundMatch = false;
                        for (const item of responseJson) {
                            if (parseInt(e.dataset.id) == parseInt(item.usedforid)) {
                                e.setAttribute("src", `/${item.originalImage}`);
                                foundMatch = true;
                                break;
                            }
                        }

                        const figure = e.closest("figure");
                        if (figure && !figure.querySelector("a")) {
                            const htmlImg = figure.innerHTML;
                            figure.innerHTML = `<a target="_blank" href="/${pageName}?id=${e.dataset.id}">${htmlImg}</a>`;
                        }
                    }
                    else if (e.dataset.basiscoreid && e.dataset.basiscoreid.trim() !== "") {
                        const figure = e.closest("figure");
                        if (figure) {
                            const htmlImg = figure.innerHTML;
                            if (!figure.querySelector("a")) {
                                figure.innerHTML = `<a target="_blank" href="/article.bc?id=${e.dataset.basiscoreid}">${htmlImg}</a>`;
                            }
                        }
                    }
                });
            }
        }
    } catch (err) {
        console.error('onProcessedHotelsImg=' + err?.lineNumber + ',' + err?.message);
    }
}


const onsubmitTourForm = async (element, event) => {
    try {
        event.preventDefault();
        element.querySelector("button").classList.add("button--loading");
        fetch(`${element.getAttribute("action")}`, {
            method: `${element.getAttribute("method")}`,
            body: `usedforid=${element.querySelector(".usedforid").value}&mid=${element.querySelector(".mid").value}&title=${element.querySelector(".title").value}&comment=${element.querySelector(".comment").value}&captchaid=${element.querySelector(".captchaid").value}&captcha=${element.querySelector(".captcha").value}&jsoninfo={"phone":"${element.querySelector(".phone").value}"}`
        }).then(response => response.text()).then(text => {
            element.querySelector("button").classList.remove("button--loading");
            element.querySelector(".message__action__container").innerHTML = text;
            setTimeout(function () {
                element.querySelector(".message__action__container").innerHTML = "";
            }, 3000);

        }).catch(error => console.error(error))

    } catch (err) {
        console.error('onsubmitTourForm=' + err.lineNumber + ',' + err.message);
    }
}

const renderTourForm = async (element) => {
    switch (parseInt(element.closest(".tourInventory__details__item__info").querySelector(".tourInventory__details__item__service").dataset.value)) {
        case 0:
            sevice = "-";
            break;
        case 1654:
            sevice = "O.R";
            break;
        case 1655:
            sevice = "B.B";
            break;
        case 1656:
            sevice = "H.B";
            break;
        case 1657:
            sevice = "F.B";
            break;
        case 1658:
            sevice = "ALL";
            break;
        case 1659:
            sevice = "U.ALL";
            break;
        case 1660:
            sevice = "Maximum All Inclusive";
            break;

    }
    $bc.setSource("db.tourBookingForm", {
        run: false,
    });

    function normalizeText(text) {
        return text.replace(/ي/g, "ی").replace(/ك/g, "ک");
    }
    
    // دریافت تاریخ و نرمال‌سازی
    let ed, sd;
    if (document.querySelector(".date__details .active .start__date")) {
        sd = document.querySelector(".date__details .active .start__date").textContent;
        sd = normalizeText(sd); // نرمال‌سازی متن
    } else {
        sd = '';
    }

    if(document.querySelector(".date__details .active .end__date")){
        // destinations__start__day
     ed= document.querySelector(".date__details .active .end__date").textContent;
     ed = normalizeText(ed); // نرمال‌سازی متن
    }else{
        ed= '';
    }

    $bc.setSource("db.tourForm", {
        hotelName: element.closest(".tourInventory__details__item__info").querySelector(".showhotel").textContent,
        hotelRate: element.closest(".tourInventory__details__item__info").querySelector(".tourInventory__details__item__rate").dataset.value,
        hotelService: sevice,
        tourName: document.querySelector(".tour__name__container").textContent,
        doubleP: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__double")[0].querySelector(".tourInventory__details__item__price").textContent,
        singleP: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__single")[0].querySelector(".tourInventory__details__item__price").textContent,
        wBedP: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__wBed")[0].querySelector(".tourInventory__details__item__price").textContent,
        woBedP: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__woBed")[0].querySelector(".tourInventory__details__item__price").textContent,
        doubleU: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__double")[0].querySelector(".tourInventory__details__item__unit") ? element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__double")[0].querySelector(".tourInventory__details__item__unit").textContent : ` `,
        singleU: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__single")[0].querySelector(".tourInventory__details__item__unit") ? element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__single")[0].querySelector(".tourInventory__details__item__unit").textContent : ` `,
        wBedU: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__wBed")[0].querySelector(".tourInventory__details__item__unit") ? element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__wBed")[0].querySelector(".tourInventory__details__item__unit").textContent : ` `,
        woBedU: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__woBed")[0].querySelector(".tourInventory__details__item__unit") ? element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__woBed")[0].querySelector(".tourInventory__details__item__unit").textContent : ` `,
        //origins__start__day
        startDate: sd,
        // destinations__start__day
        endDate: ed,
        
        // origins__start__weekday
        weekdayStartDate:document.querySelector(".tourExecution__container__origins").querySelector(".origins__start__weekday").textContent,
        // destinations__start__weekday
        weekdayEndDate:document.querySelector(".tourExecution__container__destinations").querySelector(".destinations__start__weekday").textContent,
        
        departureName:document.querySelector(".tourExecution__container__origins").querySelector(".origins__city").textContent,
        destinationName:document.querySelector(".tourExecution__container__destinations").querySelector(".destinations__city").textContent,
       
        // __times__start
        startTime:document.querySelector(".execution__details__path__origins").querySelectorAll(".execution__details__path__item")[0].querySelector(".__times__start").textContent,
        // __times__start
        endTime:document.querySelector(".execution__details__path__destinations").querySelectorAll(".execution__details__path__item")[0].querySelector(".__times__start").textContent,

        run: true,
    });

}




let FormhotelName ;
let FormhotelRate ;
let FormhotelService ;
let FormtourName ;
let FormdoubleP ;
let FormsingleP ;
let FormwBedP ;
let FormwoBedP ;
let FormdoubleU ;
let FormsingleU ;
let FormwBedU ;
let FormwoBedU ;
// let adultCount;
// let childCount;
// let infantCount;



const renderTourInstallmentForm = async (element) => {


    switch (parseInt(element.closest(".tourInventory__details__item__info").querySelector(".tourInventory__details__item__service").dataset.value)) {
        case 0:
            sevice = "-";
            break;
        case 1654:
            sevice = "O.R";
            break;
        case 1655:
            sevice = "B.B";
            break;
        case 1656:
            sevice = "H.B";
            break;
        case 1657:
            sevice = "F.B";
            break;
        case 1658:
            sevice = "ALL";
            break;
        case 1659:
            sevice = "U.ALL";
            break;
        case 1660:
            sevice = "Maximum All Inclusive";
            break;

    }
    $bc.setSource("db.tourBookingFormIns", {
        run: false,
    });

    $bc.setSource("db.tourFormInstallmentplan", {
        hotelName: element.closest(".tourInventory__details__item__info").querySelector(".showhotel").textContent,
        hotelRate: element.closest(".tourInventory__details__item__info").querySelector(".tourInventory__details__item__rate").dataset.value,
        hotelService: sevice,
        tourName: document.querySelector(".tour__name__container").textContent,
        doubleP: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__double")[0].querySelector(".tourInventory__details__item__price").textContent,
        singleP: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__single")[0].querySelector(".tourInventory__details__item__price").textContent,
        wBedP: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__wBed")[0].querySelector(".tourInventory__details__item__price").textContent,
        woBedP: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__woBed")[0].querySelector(".tourInventory__details__item__price").textContent,
        doubleU: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__double")[0].querySelector(".tourInventory__details__item__unit") ? element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__double")[0].querySelector(".tourInventory__details__item__unit").textContent : ` `,
        singleU: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__single")[0].querySelector(".tourInventory__details__item__unit") ? element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__single")[0].querySelector(".tourInventory__details__item__unit").textContent : ` `,
        wBedU: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__wBed")[0].querySelector(".tourInventory__details__item__unit") ? element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__wBed")[0].querySelector(".tourInventory__details__item__unit").textContent : ` `,
        woBedU: element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__woBed")[0].querySelector(".tourInventory__details__item__unit") ? element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__woBed")[0].querySelector(".tourInventory__details__item__unit").textContent : ` `,
        run: true,
    });


    FormhotelName = element.closest(".tourInventory__details__item__info").querySelector(".showhotel").textContent,
    FormhotelRate = element.closest(".tourInventory__details__item__info").querySelector(".tourInventory__details__item__rate").dataset.value,
    FormhotelService = sevice,
    FormtourName = document.querySelector(".tour__name__container").textContent,
    FormdoubleP = element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__double")[0].querySelector(".tourInventory__details__item__price").textContent,
    FormsingleP = element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__single")[0].querySelector(".tourInventory__details__item__price").textContent,
    FormwBedP = element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__wBed")[0].querySelector(".tourInventory__details__item__price").textContent,
    FormwoBedP = element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__woBed")[0].querySelector(".tourInventory__details__item__price").textContent,
    FormdoubleU = element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__double")[0].querySelector(".tourInventory__details__item__unit") ? element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__double")[0].querySelector(".tourInventory__details__item__unit").textContent : ` `,
    FormsingleU = element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__single")[0].querySelector(".tourInventory__details__item__unit") ? element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__single")[0].querySelector(".tourInventory__details__item__unit").textContent : ` `,
    FormwBedU = element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__wBed")[0].querySelector(".tourInventory__details__item__unit") ? element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__wBed")[0].querySelector(".tourInventory__details__item__unit").textContent : ` `,
    FormwoBedU = element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__woBed")[0].querySelector(".tourInventory__details__item__unit") ? element.closest(".tourInventory__details").querySelectorAll(".tourInventory__details__item__woBed")[0].querySelector(".tourInventory__details__item__unit").textContent : ` `;

    // adultCount:adultCountF,
    // childCount:childbedCountF,
    // infantCount:infantCountF,
   
} 
const renderReserveTourInstallmentForm = async (element) => {
    document.getElementById("white-modal").classList.add("hidden");

    $bc.setSource("db.tourBookingFormIns", {
        run: false,
    });

    let   ed2 ;
    let   sd2 ;
    if(document.querySelector(".date__details .active .start__date")){
        //origins__start__day
        sd2 = document.querySelector(".date__details .active .start__date").textContent;
    }else{
        sd2 = '';
    }

    if(document.querySelector(".date__details .active .end__date")){
        // destinations__start__day
     ed2= document.querySelector(".date__details .active .end__date").textContent;
    }else{
        ed2= '';
    }

    $bc.setSource("db.tourFormInstallment", {
        hotelName:FormhotelName,
        hotelRate:FormhotelRate,
        hotelService:FormhotelService,
        tourName:FormtourName,
        doubleP:FormdoubleP,
        singleP:FormsingleP,
        wBedP:FormwBedP,
        woBedP:FormwoBedP,
        doubleU:FormdoubleU,
        singleU:FormsingleU,
        wBedU:FormwBedU,
        woBedU:FormwoBedU,

        adultCount:parseInt(document.getElementById("adult-installment").value),
        childCount:parseInt(document.getElementById("child-bed-installment").value),
        infantCount: parseInt(document.getElementById("child-installment").value) + parseInt(document.getElementById("infant-installment").value),
    

        //origins__start__day
        startDate: sd2,
        // destinations__start__day
        endDate: ed2,
        
        // origins__start__weekday
        weekdayStartDate:document.querySelector(".tourExecution__container__origins").querySelector(".origins__start__weekday").textContent,
        // destinations__start__weekday
        weekdayEndDate:document.querySelector(".tourExecution__container__destinations").querySelector(".destinations__start__weekday").textContent,
        
        departureName:document.querySelector(".tourExecution__container__origins").querySelector(".origins__city").textContent,
        destinationName:document.querySelector(".tourExecution__container__destinations").querySelector(".destinations__city").textContent,
       
        // __times__start
        startTime:document.querySelector(".execution__details__path__origins").querySelectorAll(".execution__details__path__item")[0].querySelector(".__times__start").textContent,
        // __times__start
        endTime:document.querySelector(".execution__details__path__destinations").querySelectorAll(".execution__details__path__item")[0].querySelector(".__times__start").textContent,


        totalAmountINS:document.getElementById("white-modal").querySelector(".total-amount").innerText,
        totalAmountFacilityINS:document.getElementById("white-modal").querySelector(".Total-amount-facilities").innerText,
        totalAdvancePaymentINS:document.getElementById("white-modal").querySelector(".Total-advance-payment").innerText,
        amountEachInstallmentINS:document.getElementById("white-modal").querySelector(".amount-each-installment").innerText,
       
       
        run: true,
    });


} 

const renderCaptchaCode = async (element, event) => {
    try {
        fetch(`tour-captcha.bc`, {
            method: `get`,
        }).then(response => response.text()).then(text => {
            element.closest("form").querySelector(".captcha__content").innerHTML = text;
        }).catch(error => console.error(error))
    } catch (err) {
        console.error('renderCaptchaCode=' + err.lineNumber + ',' + err.message);
    }
}
const onrenderedFormSchema = async () => {
    try {

    } catch (err) {
        console.error('onrenderedFormSchema=' + err.lineNumber + ',' + err.message);
    }
}
const toggleCount = (element, type, limit, passenger) => {
    try {
        let currentCount = parseInt(element.closest("li").querySelector(".count__container").textContent);
        type == 'plus' ? currentCount++ : currentCount--;
        if (currentCount < limit) return false;;
        element.closest("li").querySelector(".count__container").textContent = currentCount;
        document.querySelector(".tour__booking__form__modal__container").querySelector(`.${passenger}-count`).querySelector("input").value = currentCount;
    } catch (err) {
        console.error('toggleCount=' + err.lineNumber + ',' + err.message);
    }
}
const onrenderedSchmaTourBookingForm = async (args) => {
    try {
        document.querySelector(".tour__booking__form__modal__container").querySelector(".adult-count").querySelector("input").value = document.querySelector(".tour__booking__form__modal__container").querySelector(".adult__count__container").textContent;
        document.querySelector(".tour__booking__form__modal__container").querySelector(".child-count").querySelector("input").value = document.querySelector(".tour__booking__form__modal__container").querySelector(".child__count__container").textContent;
        document.querySelector(".tour__booking__form__modal__container").querySelector(".infant-count").querySelector("input").value = document.querySelector(".tour__booking__form__modal__container").querySelector(".infant__count__container").textContent;
        document.querySelector(".tour__booking__form__modal__container").querySelector(".hotel-name").querySelector("input").value = document.querySelector(".tour__booking__form__modal__container").querySelector(".hotel__name__container").textContent;
        document.querySelector(".tour__booking__form__modal__container").querySelector(".hotel-service").querySelector("input").value = document.querySelector(".tour__booking__form__modal__container").querySelector(".hotel__service__container").textContent;
        document.querySelector(".tour__booking__form__modal__container").querySelector(".hotel-rate").querySelector("input").value = document.querySelector(".tour__booking__form__modal__container").querySelector(".hotel__rate__container").textContent;
        document.querySelector(".tour__booking__form__modal__container").querySelector(".tour-name").querySelector("input").value = document.querySelector(".tour__booking__form__modal__container").querySelector(".tour__name__container").textContent;
   
        document.querySelector(".tour__booking__form__modal__container").querySelector(".first-last-name input").placeholder="نام و نام خانوادگی";
        document.querySelector(".tour__booking__form__modal__container").querySelector(".phone input").placeholder="شماره تماس";
        document.querySelector(".tour__booking__form__modal__container").querySelector(".message input").placeholder="توضیحات";

    } catch (err) {
        console.error('onrenderedSchmaTourBookingForm=' + err.lineNumber + ',' + err.message);
    }
};
const callbackSourceTourBookingForm = async (args) => {
    try {
        document.querySelector(".tour__booking__form__modal__container").querySelector("button").classList.add("button--loading");
        $bc.setSource("db.tourBookingForm", {
            value: JSON.stringify(args.source?.rows[0]),
            captcha: document.querySelector(".tour__booking__form__modal__container").querySelector("input[name='captcha']").value,
            captchaid: document.querySelector(".tour__booking__form__modal__container").querySelector("input[name='captchaid']").value,
            run: true
        });
    } catch (err) {
        console.error('callbackSourceTourBookingForm=' + err.lineNumber + ',' + err.message);
    }
};
const OnProcessedTourBookingForm = async (args) => {
    try {
        var response = args.response;
        var json = await response.json();
        var errorid = json.errorid;
        document.querySelector(".tour__booking__form__modal__container").querySelector("button").classList.remove("button--loading");
        if (errorid == "6") {
            if (page_lang === 'fa') {
                document.querySelector(".tour__booking__form__modal__container").querySelector(".message__action__container").innerHTML = "درخواست شما با موفقیت ثبت شد";
            } else if (page_lang === 'en') {
                document.querySelector(".tour__booking__form__modal__container").querySelector(".message__action__container").innerHTML = "Your request has been successfully registered";
            } else if (page_lang === 'ar') {
                document.querySelector(".tour__booking__form__modal__container").querySelector(".message__action__container").innerHTML = "لقد تم تسجيل طلبك بنجاح";
            }

        } else {
            if (page_lang === 'fa') {
                document.querySelector(".tour__booking__form__modal__container").querySelector(".message__action__container").innerHTML = "خطایی رخ داده, لطفا مجدد اقدام کنید";
            } else if (page_lang === 'en') {
                document.querySelector(".tour__booking__form__modal__container").querySelector(".message__action__container").innerHTML = "An error occurred, please try again";
            } else if (page_lang === 'ar') {
                document.querySelector(".tour__booking__form__modal__container").querySelector(".message__action__container").innerHTML = "حدث خطأ، يرجى المحاولة مرة أخرى";
            }

        }
        setTimeout(function () {
            document.querySelector(".tour__booking__form__modal__container").querySelector(".message__action__container").innerHTML = "";
            setTimeout(function () {
                document.querySelector(".tour__booking__form__modal__container").classList.add('hidden');
            }, 2000);
        }, 3000);
    } catch (err) {
        console.error('OnProcessedTourBookingForm=' + err.lineNumber + ',' + err.message);
    }
}

// conver solar to gregorian date
JalaliDate = {
    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
};

JalaliDate.jalaliToGregorian = function (j_y, j_m, j_d) {
    j_y = parseInt(j_y);
    j_m = parseInt(j_m);
    j_d = parseInt(j_d);
    var jy = j_y - 979;
    var jm = j_m - 1;
    var jd = j_d - 1;

    var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
    for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

    j_day_no += jd;

    var g_day_no = j_day_no + 79;

    var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
    g_day_no = g_day_no % 146097;

    var leap = true;
    if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
        g_day_no--;
        gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
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

    for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
        g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
    var gm = i + 1;
    var gd = g_day_no + 1;

    gm = gm < 10 ? "0" + gm : gm;
    gd = gd < 10 ? "0" + gd : gd;

    return [gy, gm, gd];
}
// common & onload functions
window.onload = function() {
    document.querySelectorAll('.tourItinerary__item__content').forEach((content, index) => {
        content.classList.add('hidden'); 
        content.closest('.tourItinerary__item').querySelector('svg').classList.remove('rotate-180');
    });
    const firstItemContent = document.querySelector('.tourItinerary__item__content');
    if (firstItemContent) {
        firstItemContent.classList.remove('hidden'); 
        firstItemContent.closest('.tourItinerary__item').querySelector('svg').classList.add('rotate-180');
    }
};

const toggleContentDay = async (element, parent, style, toggleDrop) => {    
    try {
        if (toggleDrop) {
            const listItem = element.closest("li");
            // document.querySelectorAll(".tourItinerary__item").forEach(item => {
            //     if (item !== listItem) {
            //         item.querySelector(".tourItinerary__item__path svg").classList.remove('rotate-180');
            //         item.querySelector(".tourItinerary__item__content").classList.add('hidden');
            //     }
            // });
            const contentElement = listItem.querySelector(".tourItinerary__item__content");
            contentElement.classList.toggle('hidden');  
            listItem.querySelector(".tourItinerary__item__path svg").classList.toggle('rotate-180'); 
        }
    } catch (err) {
        console.error('toggleContentDay=' + err.message);
    }
}
const toggleContent = async (element, parent, style, toggleDrop) => {    
    try {
        if (toggleDrop == "toggleDrop" && style == "tourItinerary__item__content") {
            const listItem = element.closest("li");
            // document.querySelectorAll(".tourItinerary__item").forEach(item => {
            //     if (item !== listItem) {
            //         item.querySelector("svg").classList.remove('rotate-180');
            //         item.querySelector(".tourItinerary__item__content").classList.add('hidden');
            //     }
            // });
            
            const contentElement = listItem.querySelector(".tourItinerary__item__content");
            contentElement.classList.toggle('hidden');
            element.classList.toggle('rotate-180');  
        }else if (toggleDrop == "toggleDrop" && style == "execution__details") { 
            element.closest(`${parent}`).querySelector(`.${style}`).classList.toggle('hidden');
            element.classList.toggle('rotate-180');
        }else {
            const toggleElement = element.closest(`${parent}`).querySelector(".toggle__content");
            toggleElement.classList.toggle(`${style}`);
            toggleElement.classList.toggle("overflow-hidden");
            let txt = element.innerText;
            if (page_lang === 'fa') {
                element.innerText = txt == 'مشاهده بیشتر' ? 'مشاهده کمتر' : 'مشاهده بیشتر';
            } else if (page_lang === 'en') {
                element.innerText = txt == 'View more' ? 'View less' : 'View more';
            } else if (page_lang === 'ar') {
                element.innerText = txt == 'عرض المزيد' ? 'عرض أقل' : 'عرض المزيد';
            }
        }
    } catch (err) {
        console.error('toggleContent=' + err.message);
    }
}





const closeModalContainer = (element, event, closed, className, type) => {
    try {
        if (type == 'parent') {
            if (!event.target.closest('.modal__content')) {
                element.closest(`.${closed}`).classList.add(`${className}`);
            }
        } else {
            element.closest(`.${closed}`).classList.add(`${className}`);
        }
    } catch (err) {
        console.error('closeModalContainer=' + err.lineNumber + ',' + err.message);
    }

}
if (document.querySelectorAll(".tourItinerary__item")[0]) {
    var itineraryDayIndex = 1;
    if (document.querySelectorAll(".tourItinerary__item")[0].querySelector(".tourItinerary__path")) {
        document.querySelectorAll(".tourItinerary__item")[0].querySelector(".tourItinerary__path").innerHTML = `<svg class="relative z-10" width="18" height="45" viewBox="0 0 18 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M2.67406 3.21461C6.1063 -0.217624 11.6893 -0.199393 15.1215 3.23284C17.3146 5.4259 18.2065 8.61919 17.4542 11.628L9.11047 45L0.386072 11.6538C-0.40399 8.63401 0.466898 5.42177 2.67406 3.21461Z"
        fill="${document.querySelector(".layout__body__container").dataset.primarycolor}" />
</svg>`;
    }

    if (document.querySelectorAll(".tourItinerary__end__path")[0]) {
        document.querySelectorAll(".tourItinerary__item")[document.querySelectorAll(".tourItinerary__item").length - 1].querySelector(".tourItinerary__end__path").innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="9" cy="9" r="9" fill="#F2F2F2"></circle>
</svg>`;
    }

    document.querySelectorAll(".tourItinerary__item").forEach(e => {
        var day = "";
        switch (itineraryDayIndex) {
            case 1:
                if (page_lang === 'fa') {
                    day = "اول";
                } else if (page_lang === 'en') {
                    day = "First";
                } else if (page_lang === 'ar') {
                    day = "أولاً";
                }

                break;
            case 2:
                if (page_lang === 'fa') {
                    day = "دوم";
                } else if (page_lang === 'en') {
                    day = "Second";
                } else if (page_lang === 'ar') {
                    day = "ثانية";
                }

                break;
            case 3:
                if (page_lang === 'fa') {
                    day = "سوم";
                } else if (page_lang === 'en') {
                    day = "Third";
                } else if (page_lang === 'ar') {
                    day = "ثالث";
                }

                break;
            case 4:
                if (page_lang === 'fa') {
                    day = "چهارم";
                } else if (page_lang === 'en') {
                    day = "Fourth";
                } else if (page_lang === 'ar') {
                    day = "الرابع";
                }

                break;
            case 5:
                if (page_lang === 'fa') {
                    day = "پنجم";
                } else if (page_lang === 'en') {
                    day = "Fifth";
                } else if (page_lang === 'ar') {
                    day = "الخامس";
                }

                break;
            case 6:
                if (page_lang === 'fa') {
                    day = "ششم";
                } else if (page_lang === 'en') {
                    day = "Sixth";
                } else if (page_lang === 'ar') {
                    day = "السادس";
                }

                break;
            case 7:
                if (page_lang === 'fa') {
                    day = "هفتم";
                } else if (page_lang === 'en') {
                    day = "Seventh";
                } else if (page_lang === 'ar') {
                    day = "السابع";
                }

                break;
            case 8:
                if (page_lang === 'fa') {
                    day = "هشتم";
                } else if (page_lang === 'en') {
                    day = "Eighth";
                } else if (page_lang === 'ar') {
                    day = "الثامن";
                }

                break;
            case 9:
                if (page_lang === 'fa') {
                    day = "نهم";
                } else if (page_lang === 'en') {
                    day = "Ninth";
                } else if (page_lang === 'ar') {
                    day = "التاسع";
                }

                break;
            case 10:
                if (page_lang === 'fa') {
                    day = "دهم";
                } else if (page_lang === 'en') {
                    day = "Tenth";
                } else if (page_lang === 'ar') {
                    day = "العاشر";
                }

                break;
            case 11:
                if (page_lang === 'fa') {
                    day = "یازدهم";
                } else if (page_lang === 'en') {
                    day = "Eleventh";
                } else if (page_lang === 'ar') {
                    day = "الحادي عشر";
                }

                break;
            case 12:
                if (page_lang === 'fa') {
                    day = "دوازدهم";
                } else if (page_lang === 'en') {
                    day = "Twelfth";
                } else if (page_lang === 'ar') {
                    day = "الثاني عشر";
                }

        }
        itineraryDayIndex++;
        e.querySelector(".tourItinerary__day").innerText = day

    })



}
document.querySelectorAll(".tour__price").forEach(e => {
    const price = e.dataset.answer.split(" ");
    price[0] = price[0].replace(/\./g, '')
    e.innerText = new Intl.NumberFormat().format(price[0])
    if (e.closest(".tourRelated__container")) {
        if (price[1]) {
            e.closest("article").querySelector(".tour__unit").innerText = price[1];
        }
    }
})

document.querySelectorAll(".tour__specific__prp").forEach(e => {
    if (e.innerHTML.length > 2) {
        e.classList.remove("hidden")
    }
})
if (document.querySelectorAll(".tourItinerary__item__largetext")[0]) {
    document.querySelectorAll(".tourItinerary__item__largetext").forEach(e => {
        if (e.textContent.length > 320) {
            e.closest(".tourItinerary__item__path").querySelector(".tourItinerary__item__more__link").classList.remove("hidden")
        }
    })
}

// swiper
var swiper = new Swiper(".commentSwiper", {
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
        nextEl: ".swiper-button-next-comment",
        prevEl: ".swiper-button-prev-comment",
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 2,
        },
        1280: {
            slidesPerView: 3,
        },
    },
})
var swiper = new Swiper(".tourSwiper", {
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
        nextEl: ".swiper-button-next-tour",
        prevEl: ".swiper-button-prev-tour",
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 2,
        },
        1280: {
            slidesPerView: 3,
        },
    },
})
var swiper = new Swiper(".articleSwiper", {
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
        nextEl: ".swiper-button-next-article",
        prevEl: ".swiper-button-prev-article",
    },
    pagination: {
        el: ".swiper-pagination-article",
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 2,
        },
        1280: {
            slidesPerView: 3,
        },
    },
})

var swiper = new Swiper(".main-slide-carousel", {
    slidesPerView: 4,
    centeredSlides: true,
    loop: true,
    speed: 1000,
    spaceBetween: 10,
    grabCursor: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            centeredSlides: true,
            slidesPerView: 1,
        },
        320: {
            centeredSlides: true,
            slidesPerView: 1.5,
        },
        980: {
            centeredSlides: true,
            slidesPerView: 2,
        },
        1280: {
            centeredSlides: true,
            slidesPerView: 2.4,
        },
        1370: {
            centeredSlides: true,
            slidesPerView: 2.5,
        },
        1454: {
            centeredSlides: true,
            slidesPerView: 2.9,
        },
        1470: {
            centeredSlides: true,
            slidesPerView: 3,
        },
        1810: {
            centeredSlides: true,
            slidesPerView: 3.7,
        },
        1960: {
            centeredSlides: true,
            slidesPerView: 4,
        },
    },
})

// Get references to elements
const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeButton = document.getElementById('close');
if (gallery) {
    // Add event listener to each image
    gallery.addEventListener('click', e => {
        if (e.target.classList.contains('gallery-image')) {
            const imageSrc = e.target.src;
            lightboxImage.src = imageSrc;
            lightbox.classList.remove("hidden")
        }
    });
}

const onrenderedSchmaTourBookingFormIns = async (args) => {
    try {

        document.querySelector(".first-last-name input").placeholder="نام و نام خانوادگی";
        document.querySelector(".phone input").placeholder="شماره تماس";
        document.querySelector(".message input").placeholder="توضیحات";

        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".adult-count").querySelector("input").value = adultCountF,
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".child-count").querySelector("input").value = childbedCountF,
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".infant-count").querySelector("input").value = infantCountF + childwobedCountF


        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".hotel-name").querySelector("input").value = document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".hotel__name__container").textContent;
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".hotel-service").querySelector("input").value = document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".hotel__service__container").textContent;
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".hotel-rate").querySelector("input").value = document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".hotel__rate__container").textContent;
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".tour-name").querySelector("input").value = document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".tour__name__container").textContent;
       
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".total-amountF").querySelector("input").value = document.querySelector("#white-modal").querySelector(".total-amount").innerText;
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".total-advanceF").querySelector("input").value = document.querySelector("#white-modal").querySelector(".Total-amount-facilities").innerText;
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".amount-facilitiesF").querySelector("input").value = document.querySelector("#white-modal").querySelector(".Total-advance-payment").innerText;
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".amount-eachF").querySelector("input").value = document.querySelector("#white-modal").querySelector(".amount-each-installment").innerText;


        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".first-last-name input").placeholder="نام و نام خانوادگی";
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".phone input").placeholder="شماره تماس";
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".message input").placeholder="توضیحات";

    
    } catch (err) {
        console.error('onrenderedSchmatourBookingFormIns=' + err.lineNumber + ',' + err.message);
    }
};
const callbackSourceTourBookingFormIns = async (args) => {
    try {
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector("button").classList.add("button--loading");
        $bc.setSource("db.tourBookingFormIns", {
            value: JSON.stringify(args.source?.rows[0]),
            captcha: document.querySelector(".tour__booking__form__modal__container_Ins").querySelector("input[name='captcha']").value,
            captchaid: document.querySelector(".tour__booking__form__modal__container_Ins").querySelector("input[name='captchaid']").value,
            run: true
        });
    } catch (err) {
        console.error('callbackSourcetourBookingFormIns=' + err.lineNumber + ',' + err.message);
    }
};
const OnProcessedTourBookingFormIns = async (args) => {
    try {
        var response = args.response;
        var json = await response.json();
        var errorid = json.errorid;
        document.querySelector(".tour__booking__form__modal__container_Ins").querySelector("button").classList.remove("button--loading");
        if (errorid == "6") {
            if (page_lang === 'fa') {
                document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".message__action__container").innerHTML = "درخواست شما با موفقیت ثبت شد";
            } else if (page_lang === 'en') {
                document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".message__action__container").innerHTML = "Your request has been successfully registered";
            } else if (page_lang === 'ar') {
                document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".message__action__container").innerHTML = "لقد تم تسجيل طلبك بنجاح";
            }

        } else {
            if (page_lang === 'fa') {
                document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".message__action__container").innerHTML = "خطایی رخ داده, لطفا مجدد اقدام کنید";
            } else if (page_lang === 'en') {
                document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".message__action__container").innerHTML = "An error occurred, please try again";
            } else if (page_lang === 'ar') {
                document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".message__action__container").innerHTML = "حدث خطأ، يرجى المحاولة مرة أخرى";
            }

        }
        setTimeout(function () {
            document.querySelector(".tour__booking__form__modal__container_Ins").querySelector(".message__action__container").innerHTML = "";
            setTimeout(function () {
                document.querySelector(".tour__booking__form__modal__container_Ins").classList.add('hidden');
            }, 2000);
        }, 3000);
    } catch (err) {
        console.error('OnProcessedtourBookingFormIns=' + err.lineNumber + ',' + err.message);
    }
}



// window.onload = function() {
//     const listItems = document.querySelectorAll('.tourItinerary__item');
//     const toggleButton = listItems[0].querySelector('svg[onclick]');
//     if (toggleButton) {
//         toggleButton.onclick();
//     }
// };


function closeModalForm(element , container ){
document.getElementById(container).classList.add("hidden");
}

