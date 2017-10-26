const net = require('net');


var niz_klijenata = [];
var id = 0;

const server = net.createServer((socket) => {
	//FAZON, ne moze ici server.on('data') KONJU
  socket.on('data', (data) => {
	  console.log(data.toString());
	   
	   for(var i = 0; i < niz_klijenata.length; i++)
	   {
				//Pisemo sada u socketima
			niz_klijenata[i].write(data.toString());
			console.log(niz_klijenata[i].address());
	   }//end for
  });
	
	socket.on('close', ()=>{
		for(let j = 0; j < niz_klijenata.length; j++){
			if(niz_klijenata[j].name == socket.name){
				niz_klijenata.splice(j, 1);
				break;
			}
		}//end for
		
		for(let j = 0; j < niz_klijenata.length; j++){
			console.log(niz_klijenata[j].address());
		}//end for
	});
  //socket.end('goodbye\n');
}).on('error', (err) => {
  // handle errors here
  console.log("Greska");
  throw (err);
}).on('connection', (socket) => {
	socket.name = id;
	id++;
	niz_klijenata.push(socket);
}).on('close', ()=>{
	console.log("Zavrsavam sa serverom!");
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
