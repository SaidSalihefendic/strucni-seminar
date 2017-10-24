const net = require('net');

const server = net.createServer((socket) => {
	//FAZON, ne moze ici server.on('data')
  socket.on('data', (data) => {
	  console.log(data.toString());
  });
  
  //socket.end('goodbye\n');
}).on('error', (err) => {
  // handle errors here
  console.log("Greska");
  throw err;
});


server.listen({
  host: 'localhost',
  port: 8080
}, () =>{
	console.log('opened server on', server.address());
});



const client = net.createConnection({host:'localhost', port:8080}, () =>{
	console.log("Connected to server");
	client.write("Connecting to you!");
	
	client.setTimeout(1000);
	
	client.on('timeout', ()=>{
		client.write("I want to talk with you!");
	});
});
