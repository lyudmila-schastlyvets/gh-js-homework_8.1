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

var mydragg = function(){
    return {
        move : function(divid,xpos,ypos){
            divid.style.left = xpos + 'px';
            divid.style.top = ypos + 'px';
        },
        startMoving : function(divid,container,evt){
            evt = evt || window.event;
            console.log(divid.style.top);
            var posX = evt.clientX,
                posY = evt.clientY,
                divTop = divid.style.top,
                divLeft = divid.style.left,
                eWi = parseInt(divid.style.width),
                eHe = parseInt(divid.style.height),
                cWi = parseInt(document.getElementById(container).style.width),
                cHe = parseInt(document.getElementById(container).style.height);
            console.log(divid.style.top);
            document.getElementById(container).style.cursor='move';
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
                mydragg.move(divid,aX,aY);
            }
        },
        stopMoving : function(container){
            var a = document.createElement('script');
            document.getElementById(container).style.cursor='default';
            document.onmousemove = function(){}
        },
    }
}();

document.getElementById('item').addEventListener('mousedown', function(event) {
    mydragg.startMoving(this,"box",event);
});

document.getElementById('item').addEventListener('mouseup', function() {
    mydragg.stopMoving("box");
});

console.dir(document.getElementById('box'));

