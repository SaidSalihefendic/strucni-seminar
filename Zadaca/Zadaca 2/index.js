const net = require('net');
//const rl = require('readline');

var klijenti = [];
var brojac = 0;

const server = net.createServer((socket)=>{
	socket.on('error', ()=>{
		console.log("Problem kod klijenta!");
	});
	
	socket.on('close', ()=>{
		console.log(socket.name +" se diskonektovao!");
		
		for(let i = 0; i < klijenti.length; i++)
		{
			if(klijenti[i].id == socket.id)
			{
				klijenti.splice(i, 1);
			}//end if
		}//end for
	});

		//Moramo sada svim klijentima, osim posiljaoca, da saljemo podatke
	socket.on('data', (data) =>{
		
			//Moramo dodijeliti ime klijentu
		if(!socket.hasName)
		{
			socket.name = data.toString();
			socket.hasName = true;
		}
		
			//Trebaju svi ostali klijenti da dobiju podatke od klijenta koji salje
		else{
			for(let i = 0; i < klijenti.length; i++)
			{
					//Ne zelimo slati senderu informacije koje je on poslao
				if(klijenti[i].id != socket.id)
				{
					klijenti[i].write(socket.name + ": " + data.toString());
				}//end if
			}//end for
		}
	});
	
}).on('error', (err)=>{
	console.log("Nije bilo moguce kreirati server!");
}).on('connection', (socket)=>{
	
	socket.hasName = false;
	socket.id = brojac;
	//socket.name = "";
		
		//SADA PUSHAMO U NIZ KLIJENATA
	klijenti.push(socket);
	brojac++;
	//console.log("Klijent " + socket.id + " se konektovao!");
	
	console.log("----------------------------------");
		//ISPISUJEMO SVE KLIJENTE
	console.log("Klijenti: ");
	for(let i = 0; i < klijenti.length; i++)
	{
		console.log("	 Klijent " + klijenti[i].id);
	}//end for
	console.log("----------------------------------");

});


server.listen({port:8080, host:"localhost"}, ()=>{
	console.log("opened server on", server.address());
});