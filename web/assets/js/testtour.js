

const page_lang = document.querySelector('main').getAttribute('data-lang');
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


const renderPathSvg = async (element) => {
    try {
        if (element) {

            if (element.info.transportation.type == 1) {
                return `<svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9474 19.5778L-4.25759e-07 11.997L-4.96651e-07 8.99936L10.9474 12.7892L10.9474 4.74806L6.84616 2.24823L6.84616 6.46277e-07L13.0039 1.49882L19.1616 2.30736e-07L19.1616 2.24823L15.0604 4.74912L15.0604 12.7871L26 8.99615L26 11.9938L15.0526 19.5778L15.0526 27.7518C15.0526 28.348 14.8365 28.9199 14.452 29.3415C14.0674 29.7631 13.5458 30 13.002 30C12.4581 30 11.9365 29.7631 11.5519 29.3415C11.1674 28.9199 10.9513 28.348 10.9513 27.7518L10.9474 19.5778Z" fill="#FFBD22"/>
</svg>
`
            } else if (element.info.transportation.type == 2) {
                return `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 851.000000 1280.000000" preserveAspectRatio="xMidYMid meet" class="relative">
<g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" stroke="none" fill="#FFBD22">
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

<g transform="translate(0.000000,910.000000) scale(0.100000,-0.100000)" fill="#FFBD22" stroke="none">
<path d="M7184 6486 c-152 -48 -294 -180 -366 -342 -10 -24 -22 -44 -26 -44 -4 0 -81 11 -170 24 -90 14 -249 33 -353 42 -186 18 -189 18 -189 41 0 23 -1 23 -135 23 -118 0 -135 -2 -135 -16 0 -15 -9 -16 -72 -11 -40 4 -264 12 -498 18 -571 16 -1142 6 -1632 -27 -95 -6 -98 -6 -98 15 0 20 -4 21 -135 21 l-135 0 0 -33 0 -32 -212 -23 c-363 -39 -823 -109 -1168 -176 l-125 -24 95 -1 c52 -1 257 4 455 10 198 5 494 13 658 17 l297 7 0 -57 0 -58 -1025 0 -1025 0 -1 -32 c-1 -18 -1 -38 0 -44 1 -7 -5 -14 -13 -17 -18 -7 -51 -115 -67 -216 -10 -68 -8 -112 7 -168 5 -18 -3 -25 -58 -52 -70 -33 -162 -107 -152 -122 3 -5 -23 -78 -59 -162 -82 -194 -158 -397 -192 -512 -32 -110 -172 -764 -217 -1010 -30 -167 -32 -195 -31 -387 0 -171 -2 -208 -13 -208 -12 0 -14 -40 -14 -220 l0 -220 28 0 28 0 21 -352 c12 -193 20 -355 17 -360 -3 -4 -28 -8 -56 -8 -98 0 -166 -62 -176 -160 -7 -73 5 -117 45 -160 46 -52 79 -60 248 -60 135 0 146 -2 275 -40 128 -38 151 -41 435 -65 165 -14 338 -25 385 -25 l85 0 0 -163 c0 -127 4 -177 19 -231 73 -271 257 -501 495 -620 419 -210 922 -94 1201 275 145 193 211 428 189 671 -5 50 -8 93 -6 94 8 8 1453 23 2312 24 915 2 1802 17 2684 46 l144 5 -7 -23 c-37 -138 -33 -362 8 -502 128 -430 529 -717 966 -693 432 24 777 307 887 727 33 125 35 323 5 442 l-19 78 76 0 c42 0 364 5 716 11 352 6 738 11 858 10 l218 -2 29 31 c70 75 64 259 -12 330 -18 16 -35 20 -98 20 l-76 0 3 293 c2 160 6 334 9 385 6 89 7 92 30 92 l24 0 0 165 0 165 -30 0 c-30 0 -30 1 -30 55 0 30 5 55 10 55 6 0 10 45 10 115 0 108 -1 115 -20 115 -14 0 -20 7 -20 23 0 44 -138 288 -342 606 l-93 145 -98 28 c-54 15 -117 38 -140 49 -101 51 -96 43 -328 513 l-217 441 69 3 c38 2 69 5 69 8 0 2 -34 55 -75 117 -81 120 -243 298 -388 426 -79 70 -96 80 -182 109 -133 46 -204 50 -1000 62 -978 14 -1262 14 -1268 -4 -13 -34 -17 -112 -10 -233 6 -104 5 -133 -4 -133 -10 0 -13 44 -13 185 0 149 -3 186 -14 192 -8 4 -16 26 -18 48 l-3 40 -1075 5 -1075 5 -3 58 c-3 54 -2 57 20 57 13 0 221 -9 463 -20 457 -21 1114 -37 1105 -27 -3 3 -134 35 -290 72 -337 78 -323 74 -316 88 2 7 31 75 64 152 32 77 71 163 85 192 37 72 38 70 -29 49z m-1436 -493 l62 -6 0 -63 0 -64 -1147 2 -1148 3 -3 56 -3 57 193 7 c615 21 1865 26 2046 8z m2392 -1085 c0 -35 -4 -69 -8 -76 -7 -10 -293 -12 -1398 -10 l-1389 3 -3 49 c-2 27 -1 60 3 73 l5 23 1395 0 1395 0 0 -62z m-3552 -50 l-3 -73 -1216 -3 -1217 -2 -6 22 c-8 31 -8 113 1 121 3 4 555 7 1225 7 l1219 0 -3 -72z m5312 -368 l0 -350 -545 0 -545 0 0 103 c0 56 -3 213 -7 350 l-6 247 551 0 552 0 0 -350z m394 12 c60 -185 111 -343 114 -349 3 -10 -43 -13 -212 -13 l-216 0 0 350 0 350 103 0 102 0 109 -338z m-2170 222 c23 -9 22 -111 -1 -136 -15 -17 -72 -18 -1388 -18 -1053 0 -1374 3 -1383 12 -7 7 -12 38 -12 70 0 44 4 59 18 67 19 11 2738 16 2766 5z m-3539 -109 l0 -70 -1214 -3 c-965 -2 -1216 0 -1223 10 -9 16 -11 122 -1 131 3 4 554 6 1222 5 l1216 -3 0 -70z m3550 -200 l0 -70 -1397 -3 -1398 -2 0 63 c0 36 5 68 12 75 9 9 328 11 1398 10 l1385 -3 0 -70z m-3550 -40 l0 -70 -1214 -3 c-965 -2 -1216 0 -1223 10 -9 16 -11 122 -1 131 3 4 554 6 1222 5 l1216 -3 0 -70z m3539 -131 c20 -8 23 -123 4 -142 -9 -9 -332 -12 -1394 -12 -1251 0 -1382 1 -1388 16 -3 9 -6 40 -6 69 0 41 4 56 18 64 19 11 2738 16 2766 5z m-3545 -58 c7 -8 11 -37 9 -68 l-3 -53 -1220 0 -1220 0 -3 47 c-2 26 2 56 8 68 11 20 14 20 1214 20 1027 0 1205 -2 1215 -14z"/>
</g>
</svg>`

            } else if (element.info.transportation.type == 4) {
                return `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="relative"  viewBox="0 0 1259.000000 1280.000000" preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#FFBD22" stroke="none">
<path d="M4692 12785 c-117 -33 -219 -119 -274 -233 -31 -63 -33 -73 -33 -177 0 -102 2 -114 31 -175 17 -36 52 -88 77 -116 l47 -52 0 -4428 0 -4429 -2205 -3 -2206 -2 118 -138 c294 -344 529 -598 868 -938 610 -612 1134 -1054 1670 -1409 652 -432 1178 -641 1697 -676 274 -19 728 -4 1093 37 1577 173 3471 893 5410 2057 509 305 1181 752 1544 1026 l55 41 -3755 2 -3754 3 -3 4430 -2 4429 29 31 c119 126 160 289 111 436 -41 120 -113 201 -227 256 -61 29 -87 36 -155 39 -54 3 -101 -1 -136 -11z"/>
<path d="M5452 11888 c452 -2355 623 -3791 605 -5068 -8 -507 -26 -771 -83 -1160 -90 -620 -263 -1182 -498 -1622 l-72 -135 3126 -6 c1718 -3 3127 -4 3129 -1 12 12 -301 700 -520 1139 -654 1315 -1394 2476 -2338 3665 -804 1013 -1851 2099 -2956 3066 -201 176 -433 374 -438 374 -2 0 18 -114 45 -252z"/>
<path d="M4220 9345 c0 -29 -82 -368 -126 -524 -277 -971 -745 -1794 -1468 -2580 -353 -384 -693 -695 -1496 -1366 -567 -474 -836 -707 -1030 -893 l-95 -91 2113 -1 2112 0 0 2735 c0 1504 -2 2735 -5 2735 -3 0 -5 -7 -5 -15z"/>
</g>
</svg>
`
            } else if (element.info.transportation.type == 5) {
                return `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="relative"  viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#FFBD22" stroke="none">
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

            return `<svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.026 0C3.601 0 0 3.601 0 8.027C0 13.663 6.592 19 8.026 19C9.46 19 16.052 13.663 16.052 8.027C16.052 3.601 12.451 0 8.026 0Z" fill="#FFBD22"/>
</svg>
`

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




// updatetd
const renderTransportationName = async (element) => {
    try {
        console.log('111111111111111111111');
        
        if (element) {
            console.log('22222222222');
            
            if (element.info.transportation.id) {
                console.log('3333333333');
                
                return `<div class="flex gap-1 items-center mb-2 min-h-4 transportation__img__details">
                <img src="" width="90"  data-id="${element.info.transportation.id}" 
                class="transportation__img w-[90px]" alt="${element.info.transportation.name}" />
                <span class="mr-2 hidden">${element.info.transportation.name}</span></div>`
            }
        }

    } catch (err) {
        console.error('renderTransportationName=' + err.lineNumber + ',' + err.message);
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



