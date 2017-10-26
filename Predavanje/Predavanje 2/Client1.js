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
		answer = ans.toString();
		
		if(ans != "exit")
			client1.write("Klijent 2: " + ans.toString());
		
		else
		{
			rl.close();
			client1.end("Izasli iz chatroom-a");
		}
	});
	
	rl.on('line', (line)=>{
		if(line.toString() === "exit"){
			rl.close();
			client1.end("Izasli ste iz chatroom-a!");
		} //endif
		else
		{
			client1.write("Klijent 2: " + line.toString());
		}//end else
	});
	
});


client1.on("error", (err)=>{
	console.log("Greska sa klijentom!");
});

client1.on('close', ()=>{
	console.log("Izasao!");
});

client1.on('data', (data)=> {
	console.log(data.toString());
});


/*client1.on('timeout', ()=>{
		client1.write("Klijent 1");
	});*/