function isValidHex(hex) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

// Document ready function
$(document).ready(function () {
    var root = document.querySelector(":root");

    setColorsFromCookies();

    function addEventListenerToColorInput(id, property) {
        $(id).on("input", function () {
            if (isValidHex($(this).val())) {
                $(this).removeClass("is-invalid");
                setColor(property, $(this).val());
            } else {
                $(this).addClass("is-invalid");
            }
        });
    }

    function saveColorsToCookies() {
        const mainColor = getComputedStyle(root).getPropertyValue("--main-color");
        const textColor = getComputedStyle(root).getPropertyValue("--text-color");
        const accentColor1 = getComputedStyle(root).getPropertyValue("--accent-color-1");
        const accentColor2 = getComputedStyle(root).getPropertyValue("--accent-color-2");
        const accentColor3 = getComputedStyle(root).getPropertyValue("--accent-color-3");

        document.cookie = `mainColor=${mainColor}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        document.cookie = `textColor=${textColor}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        document.cookie = `accentColor1=${accentColor1}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        document.cookie = `accentColor2=${accentColor2}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        document.cookie = `accentColor3=${accentColor3}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }

    function isValidCookie(cookie) {
        return typeof cookie !== "undefined" && isValidHex(cookie);
    }

    function setColorsFromCookies(){
        const cookies = document.cookie.split('; ');
        const cookieObject = {};

        for (const cookie of cookies) {
          const [name, value] = cookie.split('=');
          cookieObject[name] = decodeURIComponent(value);
        }

        if (!(
            isValidCookie(cookieObject.mainColor) &&
            isValidCookie(cookieObject.accentColor1) &&
            isValidCookie(cookieObject.textColor) &&
            isValidCookie(cookieObject.accentColor2) &&
            isValidCookie(cookieObject.accentColor3)
        )) {
            return;
        }

        setColors(cookieObject.mainColor, cookieObject.textColor, cookieObject.accentColor1, cookieObject.accentColor2, cookieObject.accentColor3);
    }

    function setColor(
        property,
        color,
    ) {
        root.style.setProperty(property, color);
        saveColorsToCookies();
    }

    function setColors(
        mainColor,
        textColor,
        accentColor1,
        accentColor2,
        accentColor3,
    ) {
        root.style.setProperty("--main-color", mainColor);
        root.style.setProperty("--text-color", textColor);
        root.style.setProperty("--accent-color-1", accentColor1);
        root.style.setProperty("--accent-color-2", accentColor2);
        root.style.setProperty("--accent-color-3", accentColor3);

        setInputValues();
        saveColorsToCookies();
    }

    function setInputValues() {
        $("#color-input-1").val(
            getComputedStyle(root).getPropertyValue("--main-color"),
        );
        $("#color-input-2").val(
            getComputedStyle(root).getPropertyValue("--text-color"),
        );
        $("#color-input-3").val(
            getComputedStyle(root).getPropertyValue("--accent-color-1"),
        );
        $("#color-input-4").val(
            getComputedStyle(root).getPropertyValue("--accent-color-2"),
        );
        $("#color-input-5").val(
            getComputedStyle(root).getPropertyValue("--accent-color-3"),
        );
    }

    function addEventListeners() {
        $("#colorBlockContainer").on("click", function () {
            $("#colorPicker").addClass("active");
            $("#colorPickerBackground").addClass("active");
        });

        $("#colorPickerBackground").on("click", function () {
            $("#colorPicker").removeClass("active");
            $("#colorPickerBackground").removeClass("active");
        });

        addEventListenerToColorInput("#color-input-1", "--main-color");
        addEventListenerToColorInput("#color-input-2", "--text-color");
        addEventListenerToColorInput("#color-input-3", "--accent-color-1");
        addEventListenerToColorInput("#color-input-4", "--accent-color-2");
        addEventListenerToColorInput("#color-input-5", "--accent-color-3");

        $(".colorPreset:not(#randomButton)").on("click", function () {
            const mainColor = $(this).data("main-color");
            const textColor = $(this).data("text-color");
            const accentColor1 = $(this).data("accent-color-1");
            const accentColor2 = $(this).data("accent-color-2");
            const accentColor3 = $(this).data("accent-color-3");
            
            setColors(mainColor, textColor, accentColor1, accentColor2, accentColor3);
        });

        $("#randomColor").on("click", function () {
                var timesRun = 0;
                var myInterval = setInterval(function() {
                        const mainColor = "#" + Math.floor((Math.random() * 0xEFFFFF) + 0x100000).toString(16);
                        const accentColor1 = "#" + Math.floor((Math.random() * 0xEFFFFF) + 0x100000).toString(16);
                        const textColor = "#" + Math.floor((Math.random() * 0xEFFFFF) + 0x100000).toString(16);
                        const accentColor2 = "#" + Math.floor((Math.random() * 0xEFFFFF) + 0x100000).toString(16);
                        const accentColor3 = "#" + Math.floor((Math.random() * 0xEFFFFF) + 0x100000).toString(16);
                        setColors(mainColor, textColor, accentColor1, accentColor2, accentColor3);

                        setInputValues();

                        timesRun += 1;
                        if(timesRun === 7){
                                clearInterval(myInterval);
                        }
             }, 200);

    

        });
    }

    addEventListeners();
    setInputValues();
});
