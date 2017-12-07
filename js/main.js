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
    var targetElement = event.target;
    if (targetElement.classList.contains('delete-item')) {
        targetElement
            .parentNode
            .parentNode
            .removeChild(targetElement.parentNode);
    }
    console.log(document.getElementsByClassName('active').length)
    if (!targetElement.parentElement.classList.contains('active') && document.getElementsByClassName('active').length > 0) {
        Array.prototype.forEach.call(document.getElementsByClassName('item'), function(el) {
            el.children[1].classList.remove('show');
        });
    }
}, false);

var mydragg = function(){
    return {
        move: function(divid, xpos, ypos){
            divid.style.left = xpos + 'px';
            divid.style.top = ypos + 'px';
        },
        startMoving: function(divid, container, evt){
            evt = evt || window.event;
            var posX = evt.clientX || evt.touches[0].clientX,
                posY = evt.clientY || evt.touches[0].clientY,
                divTop = divid.style.top,
                divLeft = divid.style.left,
                eWi = parseInt(divid.clientWidth),
                eHe = parseInt(divid.clientHeight),
                cWi = parseInt(document.getElementById(container).clientWidth),
                cHe = parseInt(document.getElementById(container).clientHeight);
            document.getElementById(container).style.cursor = 'move';
            Array.prototype.forEach.call(document.getElementsByClassName('item'), function (el) {
                el.classList.remove('active');
                el.children[1].classList.remove('show');
            });
            divid.classList.add('active');
            divid.children[1].className = 'delete-item show';
            divTop = divTop.replace('px','');
            divLeft = divLeft.replace('px','');
            var diffX = posX - divLeft,
                diffY = posY - divTop;
            document.onmousemove = function(evt){
                evt = evt || window.event;
                var posX = evt.clientX,
                    posY = evt.clientY,
                    aX = posX - diffX,
                    aY = posY - diffY;
                if (aX < 0) aX = 0;
                if (aY < 0) aY = 0;
                if (aX + eWi > cWi) aX = cWi - eWi;
                if (aY + eHe > cHe) aY = cHe -eHe;
                mydragg.move(divid, aX, aY);
            };
            document.ontouchmove = function(evt){
                evt = evt || window.event;
                var posX = evt.touches[0].clientX,
                    posY = evt.touches[0].clientY,
                    aX = posX - diffX,
                    aY = posY - diffY;
                if (aX < 0) aX = 0;
                if (aY < 0) aY = 0;
                if (aX + eWi > cWi) aX = cWi - eWi;
                if (aY + eHe > cHe) aY = cHe - eHe;
                mydragg.move(divid,aX,aY);
            }
        },
        stopMoving : function(container){
            document.getElementById(container).style.cursor = 'default';
            document.onmousemove = function(){};
        }
    }
}();

Array.prototype.forEach.call(document.getElementsByClassName('item'), function(el) {
    el.addEventListener('mousedown', function(event) {
        mydragg.startMoving(this, 'box', event);
    });
    el.addEventListener('touchstart', function(event) {
        mydragg.startMoving(this, 'box', event);
    });
});

Array.prototype.forEach.call(document.getElementsByClassName('item'), function(el) {
    el.addEventListener('mouseup', function() {
        mydragg.stopMoving('box', el);
    });
    el.addEventListener('touchend', function() {
        mydragg.stopMoving('box', el);
    });
});