const net = require('net');
const http = require('http');

/*
function pisi(stacu, poslije){
	console.log(stacu);
	poslije('odavde');
}


function druga() 
{
	console.log('Druga');
}


function treca()
{
	console.log('Treca');
}

pisi('djesi', druga);
pisi('djesi', treca);

pisi('inline', (staovdje) =>{
	console.log(staovdje);
});
*/

const server = net.createServer((socket) => {
	socket.write("Hello, Strucni seminar!\n");
	socket.setTimeout(3000);
	
	socket.on('timeout', () =>{
		socket.write("Hello, Strucni seminar!\n");
	});

	//socket.end('goodbye\n');
});

server.on('error', (err) => {
  // handle errors here
  throw err;
}).on('connection', (err)=>
{
	console.log("Dosla");
});


server.listen({
	port:8124, host:'localhost'
	}, () => {
  console.log('opened server on', server.address());
});



/*
const client = net.createConnection({ port: 80, host:'www.pmf.unsa.ba'}, () => {
  //'connect' listener
  console.log('connected to server!');
  client.write('world!\r\n');
});*/
// grab an arbitrary unused port.

//var socket_client = new net.Socket({port:80, host:'localhost'});
	//Ovo je za upis u server i ispis na konzoli iz servera
//console.log("WASAAAP");

const client = net.createConnection({port:8124, host:'localhost'}, () => {
  //'connect' listener
  console.log('connected to server!');
  client.write("Djezzba");
});

server.on('data', (data) =>{
	console.log(data.toString());
});

client.on('data', (data) =>{
	console.log(data.toString());
	//client.end();
});

client.on('end', () =>{
	console.log("Disconnected from server.");
});








/*
console.log(process.versions);
console.log("Hello");*/