'use strict';

hyperApp.controller('MatplotController',function($scope, socket) {

  init();
  function init(){

    // Load the classic theme
    Galleria.loadTheme('lib/galleria/galleria.classic.js');
    // Initialize Galleria
    Galleria.run('#galleria', { transition: 'fade',
                                showInfo: false,
                                imageMargin: 0 });

    socket.on('matplot', function(data) {
        console.log(data);
    });

    socket.emit('subscribe', {event_name:'matplot'});
  }

});

hyperApp.controller('GraphController',function($scope) {

});


