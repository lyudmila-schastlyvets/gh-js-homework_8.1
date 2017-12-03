window.onload = function() {
    var elem = document.getElementById('hello');

    var imageSrc = window
        .getComputedStyle(elem, null)
        .getPropertyValue("background-image")
        .replace(/url\((['"])?(.*?)\1\)/gi, '    $2')
        .split(',')[0];

    var image = new Image();
    image.src = imageSrc;

    var widthElem = image.width,
        heightElem = image.height;

    elem.style.height = heightElem + 'px';
    elem.style.width = widthElem + 'px';

};