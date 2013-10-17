'use strict';

hyperApp.controller('MatplotController',function($scope) {

  init();
  function init(){

    // Load the classic theme
    //Galleria.loadTheme('lib/galleria/galleria.classic.js');
    // Initialize Galleria
    //Galleria.run('#galleria', { transition: 'fade',
    //                            showInfo: false,
    //                            imageMargin: 0 });

    //socket.on('matplot', function(data) {
    //    console.log(data);
    //});

    //socket.emit('subscribe', {event_name:'matplot'});

    var container = document.getElementById( 'st-container' ),
			buttons = Array.prototype.slice.call( document.querySelectorAll( '#st-trigger-effects > button' ) ),
			// event type (if mobile use touch events)
			eventtype = mobilecheck() ? 'touchstart' : 'click',
			resetMenu = function() {
				classie.remove( container, 'st-menu-open' );
			},
			bodyClickFn = function(evt) {
				if( !hasParentClass( evt.target, 'st-menu' ) ) {
					resetMenu();
					document.removeEventListener( eventtype, bodyClickFn );
				}
			};

		buttons.forEach( function( el, i ) {
			var effect = el.getAttribute( 'data-effect' );

			el.addEventListener( eventtype, function( ev ) {
				ev.stopPropagation();
				ev.preventDefault();
				container.className = 'st-container'; // clear
				classie.add( container, effect );
				setTimeout( function() {
					classie.add( container, 'st-menu-open' );
				}, 25 );
				document.addEventListener( eventtype, bodyClickFn );
			});
		} );


  }



});

hyperApp.controller('GraphController',function($scope) {

});


