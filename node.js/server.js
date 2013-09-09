// needs node.js 
// npm socket.io
// npm amqp
// rabbitmq running at localhost 
 
var http = require('http'),
	url = require('url'),
	fs = require('fs'),
    io = require('socket.io'),
    path = require('path'),
	amqp = require('amqp'),
	sys = require(process.binding('natives').util ? 'util' : 'sys');
 
 
send404 = function(res)
{
  res.writeHead(404);
  res.write('404');
  res.end();
};
 
var mimeTypes = { "html": "text/html",
                  "jpeg": "image/jpeg",
                  "jpg": "image/jpeg",
                  "png": "image/png",
                  "js": "text/javascript",
                  "css": "text/css" };
 
server = http.createServer(function(req, res)
{ 
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), unescape(uri));
    var stats;

    try 
    {
        stats = fs.lstatSync(filename); // throws if path doesn't exist
    } 
    catch (e) 
    {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
        return;
    }
    
    if (stats.isFile() && uri != "/server.js") 
    {
        // path exists, is a file
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        res.writeHead(200, {'Content-Type': mimeType} );
        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);
    } 
    else if (stats.isDirectory()) 
    {
        // path exists, is a directory
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Engine Ready\n');
        res.end();
    } 
    else 
    {
        // Symbolic link, other?
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('Uh uh. You didnt say the magic word\n');
        res.end();
    }
});

var sock = io.listen(server); 
server.listen(8080);
 
// ampq
var connection = amqp.createConnection({ host: '127.0.0.1' });
connection.addListener('ready', function()
{
    var exchange = connection.exchange('',{ type: 'direct', passive: false, durable: false, autoDelete: false })
  
    sock.on('connection', function(client)
    {
        client.on('subscribe', function(clt)
        {
            client.join(clt.event_name);
            var client_queue = connection.queue(clt.event_name,{ autoDelete: false, durable: false, exclusive: false });
	  
            console.log('Client subscribe to : ' + clt.event_name);
            client_queue.subscribe(function(mess)
            {
                console.log(mess);
                var messageJson = mess.data.toString();
                sock.sockets.in(clt.event_name).emit(clt.event_name, messageJson);
            });
        });
    }); 
});  

