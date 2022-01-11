var activeContainer = null;
var prevActiveContainer = null;
var activeContainerIndex = 0;

var containerList = [
    "#container0",
    "#container1",
    "#container2",
    "#container3"
];

var containerVisibilityList = [];

for (var i = 0; i < containerList.length; i++) {
    containerVisibilityList.push(0.0);
}


var contHiddenContainer = 0;

$(window).scroll(function (event) {
    
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    contHiddenContainer = 0;

    for (var i = 0; i < containerList.length; i++) {
        var containerTop = $(containerList[i]).offset().top;
        var containerBottom = containerTop + $(containerList[i]).height();
        var containerHeigh = $(containerList[i]).height();

        if (((containerTop > viewportTop) && (containerTop < viewportBottom)) ||
            ((containerBottom > viewportTop) && (containerBottom < viewportBottom) )) {
                // il container è almeno parzialmente visibilie

                if ((containerTop - viewportTop > 0) &&
                    (containerBottom < viewportBottom)) {
                        // container 100% visibile
                        containerVisibilityList[i] = 1.0;
                } else

                if (containerTop - viewportTop > 0) {
                    // il container è in basso
                    containerVisibilityList[i] = (viewportBottom - containerTop) / containerHeigh;
                } else

                if (containerBottom < viewportBottom) {
                    // il container è in alto
                    containerVisibilityList[i] = (containerBottom - viewportTop) / containerHeigh;
                }

        } else {
            // il container non è visibile
            containerVisibilityList[i] = 0.0;
            contHiddenContainer++;
        }
    }

    prevActiveContainer = activeContainer;

    if (contHiddenContainer < containerList.length) {
        var mostVisible = 0;
        for (var i = 0; i < containerList.length; i++) {
            if ((containerVisibilityList[i] > mostVisible) &&
                (containerVisibilityList[i] > .5)) {
                mostVisible = containerVisibilityList[i];
                activeContainerIndex = i;

                activeContainer = containerList[i];

            }
        }    
    } else {
        activeContainer = null;
    }

    if (prevActiveContainer != activeContainer) {
        $(prevActiveContainer).removeClass("active");
        $(activeContainer).addClass("active");
        console.log("Active: " + activeContainer + "; prevActive: " + prevActiveContainer + "; index: " + activeContainerIndex);

    }
});