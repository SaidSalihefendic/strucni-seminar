const net = require('net');
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

/*
rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(answer);

  rl.close();
});*/


const client1 = net.createConnection({host:'localhost', port:8080}, () =>{
	console.log("Connected to server");
	//client1.write("Ja sam klijent 1");
	
	rl.question("", (ans) =>{
		client1.write("Klijent 3: " + ans.toString());
		answer = ans.toString();
	});
	
	rl.on('line', (line)=>{
		if(line.toString() == "exit"){
			rl.close();
			client1.end("Izasli ste iz chatroom-a!");
		}
		
		client1.write("Klijent 3: " + line.toString());
	});
	
});


client1.on("error", (err)=>{
	console.log("Ovo je pravo dobro");
});

client1.on('close', ()=>{
	console.log("Izbacen!");
});

client1.on('data', (data)=> {
	console.log(data.toString());
});


/*client1.on('timeout', ()=>{
		client1.write("Klijent 1");
	});*/