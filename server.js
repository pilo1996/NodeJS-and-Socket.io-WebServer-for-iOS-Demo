const app = require("express")();
const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require("socket.io")(httpServer, options);

connections = [];

httpServer.listen(3000);
console.log('Server is running...');

io.on('connection', function(socket){
    connections.push(socket);
    console.log('CONNECT - %s sockets are connected', connections.length);
    
    //Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('DISCONNECT - %s sockets are connected', connections.length);
    });
    
    socket.on('WelcomeMsg', function(data){
        console.log(data);
        io.emit('WelcomeiOSMsg', {msg: 'Ciao iOStronzo'});
        
    });

    socket.on('Authenticate', function(data){
        console.log(data)
        if(data['user'] === 'admin' && data['pwd'] === 'admin')
            io.emit('Authenticated', {
                statusCode: 200,
                username: 'Administrator'
            });
    })
});
