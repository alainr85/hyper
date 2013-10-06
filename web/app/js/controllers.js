'use strict';

hyperApp.controller('MatplotController',function($scope, socket) {

  socket.on('init', function (data) {

    console.log(data);
  });

  init();
  function init(){
    socket.on('matplot', function(data){
        console.log(data);
    });
    socket.emit('subscribe', {event_name:'matplot'});
  }

});

hyperApp.controller('GraphController',function($scope) {

});


