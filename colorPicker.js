function isValidHex(hex) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

// Document ready function
$(document).ready(function () {
    var root = document.querySelector(":root");

    function addEventListenerToColorInput(id, property) {
        $(id).on("input", function () {
            if (isValidHex($(this).val())) {
                $(this).removeClass("is-invalid");
                root.style.setProperty(property, $(this).val());
            } else {
                $(this).addClass("is-invalid");
            }
        });
    }

    function setInputValues() {
        $("#color-input-1").val(
            getComputedStyle(root).getPropertyValue("--main-color"),
        );
        $("#color-input-2").val(
            getComputedStyle(root).getPropertyValue("--secondary-color"),
        );
        $("#color-input-3").val(
            getComputedStyle(root).getPropertyValue("--main-text-color"),
        );
        $("#color-input-4").val(
            getComputedStyle(root).getPropertyValue("--link-color"),
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
        addEventListenerToColorInput("#color-input-2", "--secondary-color");
        addEventListenerToColorInput("#color-input-3", "--main-text-color");
        addEventListenerToColorInput("#color-input-4", "--link-color");

        $(".colorPreset").on("click", function () {
            const mainColor = $(this).data("main-color");
            const secondaryColor = $(this).data("secondary-color");
            const mainTextColor = $(this).data("main-text-color");
            const linkColor = $(this).data("link-color");

            root.style.setProperty("--main-color", mainColor);
            root.style.setProperty("--secondary-color", secondaryColor);
            root.style.setProperty("--main-text-color", mainTextColor);
            root.style.setProperty("--link-color", linkColor);
        });

        $("#randomColor").on("click", function () {
                var timesRun = 0;
                var myInterval = setInterval(function() {
                        const mainColor = "#" + Math.floor((Math.random() * 0xEFFFFF) + 0x100000).toString(16);$(this).data("main-color");
                        const secondaryColor = "#" + Math.floor((Math.random() * 0xEFFFFF) + 0x100000).toString(16);$(this).data("secondary-color");
                        const mainTextColor = "#" + Math.floor((Math.random() * 0xEFFFFF) + 0x100000).toString(16);$(this).data("main-text-color");
                        const linkColor = "#" + Math.floor((Math.random() * 0xEFFFFF) + 0x100000).toString(16);
                        root.style.setProperty("--main-color", mainColor);
                        root.style.setProperty("--secondary-color", secondaryColor);
                        root.style.setProperty("--main-text-color", mainTextColor);
                        root.style.setProperty("--link-color", linkColor);

                        setInputValues();

                        timesRun += 1;
                        if(timesRun === 10){
                                clearInterval(myInterval);
                        }
             }, 200);

    

        });
    }

    addEventListeners();
    setInputValues();
});
