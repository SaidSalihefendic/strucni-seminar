const net = require('net');
const readline = require('readline');

// ZA unos podataka sa tastature
const rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout,
	crlfDelay: Infinity,
	prompt: '>>'
});

rl.prompt();

const client = net.createConnection({port:8080, host:"localhost"}, ()=>{
	console.log("Uspjesno konektovani na serveru.");
	
	
}).on('error', ()=>{
	console.log("Server pao!");
	rl.close();
});


client.on('connect', ()=>{
	//console.log("Ovo je za connect event");
		rl.question("Unesite ime: ", (ans)=>{
			rl.prompt();
			client.write(ans);
		
		//console.log("Uspjesno ste unijeli ime!");
	});
	rl.prompt();
});

	//Treba klijent, ukoliko dobiva podatke, da mu se ispise
client.on('data', (data)=>{
	console.log("\n" + data.toString());
	rl.prompt();
});

	//ESTETIKE RADI, DA KLIJENT ZNA STA JE UNOS
rl.prompt();

rl.on('line', (input)=>{
	rl.prompt();
	if(input === "exit")
	{
		//client.write("Klijent se diskonektovao!");
		client.end();
		rl.close();
		return;
	}
	
	client.write(input);
});