const net = require('net');


var brojac = 0;

const server = net.createServer((socket) => {
	//FAZON, ne moze ici server.on('data') KONJU
  socket.on('data', (data) => {
	  console.log(data.toString());
	  brojac++;
	  
	  if(brojac >= 3)
	  {
		  console.log("Zatvaram socket!");
		  socket.end("Gotovo primanje!");
		  server.close(()=>{
			  console.log("Zatvaram server!");
		  });
	  }//end if
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

server.on('error', (err)=>{
	console.log("Greska za greskom!");
});

/*
const client = net.createConnection({host:'localhost', port:8080}, () =>{
	console.log("Connected to server");
	client.write("Hello Majmune");
	
	client.setTimeout(1000);
	
	client.on('timeout', ()=>{
		client.write("Anes, Said");
	});
});

*/


//client.on('data', (data) => {
//	console.log(data.toString());
//});






// grab an arbitrary unused port.
//server.listen({host: 'localhost', port: 8080} => {
  //console.log('opened server on', server.address());
//});
