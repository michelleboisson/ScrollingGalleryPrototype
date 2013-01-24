if (typeof(Site) == 'undefined'){
	Local = {}
}


var Site = {
	setupPanels : function(){
		//create panels
		var panelHTML = "<div class='panel'></div>";
		var wholeStr = "";
		var numPanels = 30;
		for (var i = 0; i<numPanels; i++){
			(i == 4) ?
				  wholeStr = wholeStr + "<div section='intro' class='panel'></div>": wholeStr = wholeStr + panelHTML ;
		}
		$("#panelContainer").html(wholeStr);
		
		var marg = $(".panel").css("margin-right");
		marg = parseInt(marg.slice(0, marg.indexOf("p")));
	
		//calculate width of panelContainer
		var width = $(".panel").length * ($(".panel").width() + marg);
		
		//set the width
		$('#panelContainer').css('width', width);
	}
}


$(document).ready(function(){

	Site.setupPanels();

	//scrolling event listener
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
		} 
		
	})
});

/* 
        
//Slider Functions - http://jqueryui.com/slider/#side-scroll
 $(function() {
    //scrollpane parts
    var scrollPane = $( window ),
      scrollContent = $( "#panelContainer" );
  
 var slideHandler = function( event, ui ) {
 
 		console.log(event, ui);
        if ( scrollContent.width() > scrollPane.width() ) {
          scrollContent.css( "margin-left", Math.round(
            ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
          ) + "px" );
        } else {
          scrollContent.css( "margin-left", 0 );
        }
       	//scrolling event listener
	var toggleIsUp = false;
	var panelNeedsMenu = $(".panel[section=intro]");
	var toggleUp = panelNeedsMenu.offset().left
	var toggleDown = panelNeedsMenu.offset().left + panelNeedsMenu.width();
	
	$("#maincontent").scroll(function(){
		console.log("scrolling");
		//panel with menu is in view
		if($("#maincontent").scrollLeft() + $("#maincontent").width() >= toggleUp && $("#maincontent").scrollLeft() <= toggleDown && !toggleIsUp){
			console.log("toggle UP");
			$("footer").animate({ height: '5em' }, 500 );
			toggleIsUp = true;
		} 
		if((toggleUp > $("#maincontent").scrollLeft() + $("#maincontent").width() && toggleIsUp) || ($("#maincontent").scrollLeft() >= toggleDown && toggleIsUp)){
			console.log("toggle DOWN");
			$("footer").animate({ height: '3em' }, 500 );
			toggleIsUp = false;
		} 
		
	})
        
     
        
        
      }
    //build slider
    var scrollbar = $( "#scroller" ).slider({
      slide: slideHandler 
    });

    
    //append icon to handle
    var handleHelper = scrollbar.find( ".ui-slider-handle" )
    .mousedown(function() {
      scrollbar.width( handleHelper.width() );
    })
    .mouseup(function() {
      scrollbar.width( "100%" );
    })
    .append( "<span class='ui-icon ui-icon-grip-dotted-vertical'></span>" )
    .wrap( "<div class='ui-handle-helper-parent'></div>" ).parent();
 
    //change overflow to hidden now that slider handles the scrolling
    scrollPane.css( "overflow", "hidden" );
 
    //size scrollbar and handle proportionally to scroll distance
    function sizeScrollbar() {
      var remainder = scrollContent.width() - scrollPane.width();
      var proportion = remainder / scrollContent.width();
      var handleSize = scrollPane.width() - ( proportion * scrollPane.width() );
      scrollbar.find( ".ui-slider-handle" ).css({
        width: handleSize,
        "margin-left": -handleSize / 2
      });
      handleHelper.width( "" ).width( (scrollbar.width() - handleSize)  );
    }
 
    //reset slider value based on scroll content position
    function resetValue() {
      var remainder = scrollPane.width() - scrollContent.width();
      var leftVal = scrollContent.css( "margin-left" ) === "auto" ? 0 :
        parseInt( scrollContent.css( "margin-left" ) );
      var percentage = Math.round( leftVal / remainder * 100 );
      scrollbar.slider( "value", percentage );
    }
 
    //if the slider is 100% and window gets larger, reveal content
    function reflowContent() {
        var showing = scrollContent.width() + parseInt( scrollContent.css( "margin-left" ), 10 );
        var gap = scrollPane.width() - showing;
        if ( gap > 0 ) {
          scrollContent.css( "margin-left", parseInt( scrollContent.css( "margin-left" ), 10 ) + gap );
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
    
    
    
  });
  
  
   */   
       
    

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
