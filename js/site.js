if (typeof(Site) == 'undefined'){
	Site = {}
}


var Site = {
	//scrollpane parts
	scrollPane : $("#maincontent"), //window
	scrollContent : $("#panelContainer"),
	scrollbarElem : $("#scroller"),
	scrollbar : new Object(),
	
	setupPanels : function(){
		//create panels
		var panelHTML = "<div class='panel'></div>";
		var wholeStr = "";
		var numPanels = 30;
		for (var i = 0; i<numPanels; i++){
			
			switch (i) {
			case  0 :
				  wholeStr = wholeStr + "<div section='opening' class='panel'><button>ENTER</button></div>";
				  break;			
			case 4 :
				  wholeStr = wholeStr + "<div section='intro' class='panel'></div>"		
				  break;
			default :
				wholeStr = wholeStr +"<div class='panel'>"+i+"</div>";
				break;
			}
		}
		//add to DOM
		$("#panelContainer").html(wholeStr);
		
		var marg = $(".panel").css("margin-right");
		marg = parseInt(marg.slice(0, marg.indexOf("p")));
	
		//calculate width of panelContainer, adding the marg(margin)
		var width = $(".panel").length * ($(".panel").width() + marg);
		
		//set the width
		$('#panelContainer').css('width', width);
	},
	
	createCustomSlider : function (){

	    //build slider
	    Site.scrollbar = Site.scrollbarElem.slider({
	      slide: function( event, ui ) {
	      	Site.calcDist();
	        if ( Site.scrollContent.width() > Site.scrollPane.width() ) {
	          Site.scrollContent.css( "margin-left", Math.round(
	            ui.value / 100 * ( Site.scrollPane.width() - Site.scrollContent.width() )
	          ) + "px" );
	        } else {
	          Site.scrollContent.css( "margin-left", 0 );
	        }
	      },
	      animate: true,
	      step: 1
	    });
	 
	    //append icon to handle
	    var handleHelper = Site.scrollbar.find( ".ui-slider-handle" )
	    .mousedown(function() {
	      Site.scrollbar.width( handleHelper.width() );
	    })
	    .mouseup(function() {
	      Site.scrollbar.width( handleHelper.width() );
	      //Site.scrollbar.width( "100%");
	    })
	    .append( "<span class='ui-icon ui-icon-grip-dotted-vertical'></span>" )
	    .wrap( "<div class='ui-handle-helper-parent'></div>" ).parent();
	 
	    //change overflow to hidden now that slider handles the scrolling
	    Site.scrollPane.css( "overflow", "hidden" );
	 
	    //size scrollbar and handle proportionally to scroll distance
	    function sizeScrollbar() {
	      var remainder = Site.scrollContent.width() - Site.scrollPane.width();
	      var proportion = remainder / Site.scrollContent.width();
	      var handleSize = Site.scrollPane.width() - ( proportion * Site.scrollPane.width() );
	      Site.scrollbar.find( ".ui-slider-handle" ).css({
	        width: handleSize,
	        "margin-left": -handleSize / 2
	      });
	      //handleHelper.width( "" ).width( Site.scrollbar.width() - handleSize );
	    }
	 
	    //reset slider value based on scroll content position
	    function resetValue() {
	      var remainder = Site.scrollPane.width() - Site.scrollContent.width();
	      var leftVal = Site.scrollContent.css( "margin-left" ) === "auto" ? 0 :
	        parseInt( Site.scrollContent.css( "margin-left" ) );
	      var percentage = Math.round( leftVal / remainder * 100 );
	      Site.scrollbar.slider( "value", percentage );
	    }
	 
	    //if the slider is 100% and window gets larger, reveal content
	    function reflowContent() {
	        var showing = Site.scrollContent.width() + parseInt( Site.scrollContent.css( "margin-left" ), 10 );
	        var gap = Site.scrollPane.width() - showing;
	        if ( gap > 0 ) {
	          Site.scrollContent.css( "margin-left", parseInt( Site.scrollContent.css( "margin-left" ), 10 ) + gap );
	        }
	    }
	 
	    //change handle position on window resize
	    $( window ).resize(function() {
	      resetValue();
	      sizeScrollbar();
	      reflowContent();
	    });
	    //init scrollbar size
	    setTimeout( sizeScrollbar, 10 );//safari wants a timeout
   },
   toggleIsUp : false,
   calcDist : function(){
	
	var panelNeedsMenu = $(".panel[section=intro]");
	//var toggleUp = panelNeedsMenu.offset().left;
	//var toggleDown =  panelNeedsMenu.offset().left + panelNeedsMenu.width();
	
	var toggleStart = panelNeedsMenu.position().left + parseInt(Site.scrollContent.css("margin-left"), 10);
	var toggleEnd =panelNeedsMenu.position().left + parseInt(Site.scrollContent.css("margin-left"), 10) + panelNeedsMenu.width();
	
	if ((toggleStart < $(window).width() && toggleEnd > 0 ) && Site.toggleIsUp == false){ 
		console.log("Toggle UP");
		$("footer").animate({ height: '5em' }, 500 );
		Site.toggleIsUp = true;
	}
	if ((toggleStart > $(window).width() || toggleEnd < 0 ) && Site.toggleIsUp == true){ 
		console.log("Toggle DOWN");
		$("footer").animate({ height: '3em' }, 500 );
		Site.toggleIsUp = false;
	}
	//console.log("toggle end", toggleEnd);
	
//------------------------------------------------------	
/*scrolling event listener
	var toggleIsUp = false;
	var panelNeedsMenu = $(".panel[section=intro]");
	var toggleUp = panelNeedsMenu.offset().left
	var toggleDown = panelNeedsMenu.offset().left + panelNeedsMenu.width();
	
	var scrollPane = window; // or  "#panelContainer" or "#maincontent"
	
	$(scrollPane).scroll(function(){
		//console.log("scrolling");
		//panel with menu is in view
		if($(scrollPane).scrollLeft() + $(scrollPane).width() >= toggleUp && $(scrollPane).scrollLeft() <= toggleDown && !toggleIsUp){
			console.log("toggle UP");
			$("footer").animate({ height: '5em' }, 500 );
			toggleIsUp = true;
		} 
		if((toggleUp > $(scrollPane).scrollLeft() + $(scrollPane).width() && toggleIsUp) || ($(scrollPane).scrollLeft() >= toggleDown && toggleIsUp)){
			console.log("toggle DOWN");
			$("footer").animate({ height: '3em' }, 500 );
			toggleIsUp = false;
*/	
   }
}


$(document).ready(function(){

	Site.setupPanels();
	Site.createCustomSlider();
	
	//scrolling event listener
	
	$("#panelContainer").css("margin-left"); // -8800px
	
	
	
	var scrollPane = window; // or  "#panelContainer" or "#maincontent"
	
	$(Site.scrollContent).scroll(function(){
		//console.log("scrolling");
		//panel with menu is in view
		if($(scrollPane).scrollLeft() + $(scrollPane).width() >= toggleUp && $(scrollPane).scrollLeft() <= toggleDown && !toggleIsUp){
			console.log("toggle UP");
			$("footer").animate({ height: '5em' }, 500 );
			toggleIsUp = true;
		} 
		if((toggleUp > $(scrollPane).scrollLeft() + $(scrollPane).width() && toggleIsUp) || ($(scrollPane).scrollLeft() >= toggleDown && toggleIsUp)){
			console.log("toggle DOWN");
			$("footer").animate({ height: '3em' }, 500 );
			toggleIsUp = false;
		} 
		
	})
});



/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);
