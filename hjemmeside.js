// add event cross browser
function addEvent(elem, event, fn) {
    // avoid memory overhead of new anonymous functions for every event handler that's installed
    // by using local functions
    function listenHandler(e) {
        var ret = fn.apply(this, arguments);
        if (ret === false) {
            e.stopPropagation();
            e.preventDefault();
        }
        return(ret);
    }

    function attachHandler() {
        // set the this pointer same as addEventListener when fn is called
        // and make sure the event is passed to the fn also so that works the same too
        var ret = fn.call(elem, window.event);   
        if (ret === false) {
            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }
        return(ret);
    }

    if (elem.addEventListener) {
        elem.addEventListener(event, listenHandler, false);
    } else {
        elem.attachEvent("on" + event, attachHandler);
    }
}

function setGalleryBoxStyle(){
    if (document.querySelector(".master.container").getAttribute("data-itemname") != "personal") return;
    var elemGB = document.querySelector(".gallery-box")
    elemHD = elemGB.querySelector(".helper-div");
    if (window.innerWidth > 1024) {
       elemHD.className = elemHD.className.replace( /(?:^|\s)middle-center(?!\S)/g , '' ) + " middle-left";
    } else {
       elemHD.className = elemHD.className.replace( /(?:^|\s)middle-left(?!\S)/g , '' ) + " middle-center";
    }
    if ( ! elemGB.className.match(/(?:^|\s)MyClass(?!\S)/) ) elemGB.className = elemGB.className + " visible";
}

$(document).ready(function(){
     document.getElementById("PINTEREST").querySelector("img").src="http://www.ccs.neu.edu/home/amirali/include/black-white-metro-github-icon.png";

     addEvent(window, 'resize', setGalleryBoxStyle);
     setGalleryBoxStyle();
});
