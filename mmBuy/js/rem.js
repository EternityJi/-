window.onload = function () {
    var html = document.documentElement;
    var uiWidth = 640;
    var font = 40;
    var timer = null;
    var screenHeight;
    var bili = uiWidth / font;
    window.onresize = changeSize;

    function changeSize() {
        clearTimeout(timer);
        timer = setTimeout(function () {
            screenHeight = html.offsetWidth;
            if (screenHeight <= 320) {
                html.style.fontSize = 320 / bili + "px";
            } else if (screenHeight >= uiWidth) {
                html.style.fontSize = uiWidth / bili + "px";
            } else {
                html.style.fontSize = screenHeight / bili + "px";
            }
        }, 100);
    }
    changeSize();
}