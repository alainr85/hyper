(function( OPF, $ ) {

    //Public Property
    OPF.public_stuff = "";

    var NODEHOST = 'spacetime.alainrichardt.info';
    var NODEPORT = '8080';
    var socket;
    
    var subscribe_endpoint;
    
    if( typeof window.io == 'undefined' )
    {
        console.log("OPF Error: Unable to load socket.io, make sure this dependency gets loaded before nupic-opf.js");    
    }
    else
    {
        socket = io.connect('http://'+NODEHOST+':'+NODEPORT);        
    }
    
    if( typeof window.JSON == 'undefined' )
    {
        console.log("OPF Error: window.JSON doesn't exist : this browser can't nativly decode json. @TODO: Fix this"); 
    }

    OPF.didGetEvent = function(data)
    {
    	var eventObject = JSON.parse( data.toString() );
        subscribe_endpoint( eventObject );
    }

    OPF.subscribe = function( event_name, callback_f ) {
        socket.emit('subscribe', { event_name: event_name });
        subscribe_endpoint = callback_f;
        socket.on(event_name, OPF.didGetEvent);
    };
    
    OPF.debugMessage = function( message )
    {
        if( debug )
        {
            console.log(message);
        }
    }
    
}( window.OPF = window.OPF || {}, jQuery ));

