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

window.onload = function(){
     document.getElementById("PINTEREST").querySelector("img").src="http://www.ccs.neu.edu/home/amirali/include/black-white-metro-github-icon.png";

     addEvent(window, 'resize', setGalleryBoxStyle);
     setGalleryBoxStyle();
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-73770324-1', 'auto');
ga('send', 'pageview');
