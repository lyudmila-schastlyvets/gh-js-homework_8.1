window.onload = function() {
    var elem = document.getElementById('box');

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
    elem.style.maxWidth = widthElem + 'px';

};

document.getElementById('box').addEventListener("click", function(event){
    var test = event.target;
    if (test.className == 'delete-item') {
        test
            .parentNode
            .parentNode
            .removeChild(test.parentNode);
    }
}, false);