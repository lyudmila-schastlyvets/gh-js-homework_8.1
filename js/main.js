window.onload = function() {
    var elem = document.getElementById('box');

    var imageSrc = window
        .getComputedStyle(elem, null)
        .getPropertyValue('background-image')
        .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
        .split(',')[0];

    var image = new Image();
    image.src = imageSrc;

    var widthElem = image.width,
        heightElem = image.height;

    elem.style.height = heightElem + 'px';
    elem.style.maxWidth = widthElem + 'px';

};

document.getElementById('box').addEventListener('click', function(event){
    var targetElement = event.target;
    if (targetElement.classList.contains('delete-item')) {
        targetElement
            .parentNode
            .parentNode
            .removeChild(targetElement.parentNode);
    }
    if (!targetElement.parentElement.classList.contains('active')
        && document.getElementsByClassName('active').length > 0) {
        Array.prototype.forEach.call(document.getElementsByClassName('item'), function(el) {
            el.children[1].classList.remove('show');
        });
    }
    if (targetElement.localName == 'ul' && !targetElement.classList.contains('item')) {
        var topPos = event.layerY;
        var leftPos = event.layerX;
        Array.prototype.forEach.call(document.getElementsByClassName('item'), function(el) {
            el.children[1].classList.remove('show');
        });
        mydragg.createItem(targetElement, topPos, leftPos);
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
            divid.children[1].classList.add('show');
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
                if (aX + eWi > cWi) {
                    aX = cWi - eWi;
                    divid.children[1].classList.add('position-left');
                    aX +=23.56;
                } else
                if (divid.children[1].classList.contains('position-left')) {
                    divid.children[1].classList.remove('position-left');
                }
                if (aY + eHe > cHe) aY = cHe - eHe;
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
                if (aX + eWi > cWi) {
                    aX = cWi - eWi;
                    divid.children[1].classList.add('position-left');
                    aX +=23.56;
                } else
                if (divid.children[1].classList.contains('position-left')) {
                    divid.children[1].classList.remove('position-left');
                }
                if (aY + eHe > cHe) aY = cHe - eHe;
                mydragg.move(divid, aX, aY);
            }
        },
        stopMoving : function(container){
            document.getElementById(container).style.cursor = 'default';
            document.onmousemove = function(){};
        },

        createItem : function (elem, topPos, leftPos) {
            var newElement = document.createElement('li'),
                spanTitle = document.createElement('span'),
                spanIcon = document.createElement('span');
            elem.appendChild(newElement);
            newElement.setAttribute('class', 'item');
            newElement.appendChild(spanTitle);
            newElement.appendChild(spanIcon);
            spanTitle.setAttribute('class', 'title');
            var randNumber = Math.floor(Math.random() * 10);
            var text;
            switch (randNumber) {
                case 1:
                    text = 'Lorem Ipsum';
                    break;
                case 2:
                    text = 'Lorem';
                    break;
                case 3:
                    text = 'Lorem Ipsum Dolor';
                    break;
                case 4:
                    text = 'Dolor';
                    break;
                default:
                    text = 'Test';
            }
            spanTitle.innerText = text;
            spanIcon.setAttribute('class', 'delete-item show');
            spanIcon.innerText = 'X';
            var elW = newElement.clientWidth / 2;
            var elH = newElement.clientHeight / 2;
            leftPos = leftPos - elW;
            topPos = topPos - elH;
            newElement.setAttribute('style', 'left: ' + leftPos + 'px; top: ' + topPos +'px;');
        }
    }
}();

document.getElementById('box').addEventListener('mousedown', function(event){
    var targetElement = event.target.parentNode;
    if (targetElement.classList.contains('item')) {
        mydragg.startMoving(targetElement, 'box', event);
    }
}, false);

document.getElementById('box').addEventListener('touchstart', function(event){
    var targetElement = event.target.parentNode;
    if (targetElement.classList.contains('item')) {
        mydragg.startMoving(targetElement, 'box', event);
    }
}, false);

document.getElementById('box').addEventListener('mouseup', function(event){
    var targetElement = event.target.parentNode;
    if (targetElement.classList.contains('item')) {
        mydragg.stopMoving('box', targetElement);
    }
}, false);

document.getElementById('box').addEventListener('touchend', function(event){
    var targetElement = event.target.parentNode;
    if (targetElement.classList.contains('item')) {
        mydragg.stopMoving('box', targetElement);
    }
}, false);