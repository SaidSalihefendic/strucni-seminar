const net = require('net');


const client = net.createConnection({host:'localhost', port:8080}, () =>{
	console.log("Connected to server");
	client.write("Hello, Sake");
	
	client.setTimeout(1000);
	
	client.on('timeout', ()=>{
		client.write("Kumara, Pasa");
	});
});


client.on("error", (err)=>{
	console.log("Ovo je pravo dobro");
});

client.on('close', ()=>{
	console.log("Izbacen!");
});