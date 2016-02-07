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
window.onload = function(){
     document.getElementById("PINTEREST").querySelector("img").src="http://www.ccs.neu.edu/home/amirali/include/black-white-metro-github-icon.png";

     addEvent(window, 'resize', function(e){
          var elem = document.getElementByClass("gallery-box").getElementByClass("helper-div");
          if (window.width > 1280) {
               elem.className = elem.className.replace( /(?:^|\s)middle-center(?!\S)/g , '' ) + " middle-left";
          } else {
               elem.className = elem.className.replace( /(?:^|\s)middle-left(?!\S)/g , '' ) + " middle-center";
          }
     });
}
