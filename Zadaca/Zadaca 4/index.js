var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var crypto = require('crypto');

var algorithm = 'aes-256-ctr';
var password = 'd6F3Efeq';
var klijenti = ["Anes", "Said", "Miki", "Irholio", "Demir"];
var passwordi = [];

function vratiXUser(niz){
	var n = niz.search("x-user=");
	var trazeniString = "";
	//n = n + 7; //da preskocimo x-user= i da uzmemo string koji nama treba
	n = n + 7;
	
	while(niz.substr(n, 1) != ";" && n < niz.length){
		trazeniString += niz.substr(n, 1);
		n++;
	}//end while
	
	return trazeniString;
	
	/*var pom = niz.split("=");
	console.log(pom);
	var index;
	for(let i = 0; i < pom.length; i++){
		if(pom[i] === "x-user" || pom[i] === "; x-user"){
			index = i;
			break;
		}//end if
	}//end for
	
	pom = pom[index + 1].split(';');
	//console.log(pom[0]);
	return pom[0];*/
}

	/*ENKRIPCIJSKE I DEKRIPCIJSKE FUNKCIJE PO TRIPLE DES ALGORITMU*/

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  //console.log("KRIPTIRANO: " + crypted);
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

	/*END KRIPCIJA*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', function(req, res){
	//res.cookie('x-user', '').sendFile(__dirname + '/login.html');
	res.sendFile(__dirname + '/login.html');
});

app.post('/login', function(req, res, next){
	let usr = req.body.ime;
	let pwd = req.body.pass;
	var logovan = false;
	
	for(let i = 0; i < klijenti.length; i++){
		if(usr == klijenti[i]){
			console.log("Ulogovao se ", usr);
			var cryptusr = encrypt(usr);
			res.cookie('x-user', cryptusr).redirect('/chat');
			logovan = true;
			break;
		}//end if
	}//end for

	/*if (usr in klijenti) { //OVDJE TREBA PROVJERITI ILEGALNE ZNAKOVE
		var cryptusr = encrypt(usr);
		res.cookie('x-user', cryptusr).redirect('/chat');
	}
	else {
		res.redirect('/');
	}*/
});

app.get('/chat', function(req, res, next){
	//console.log(req.cookies['x-user']);
	//console.log("ANESSAKE");
	
		//autorizacija, dekriptuje se cookie
	var ime = decrypt(req.cookies["x-user"]);
	var postojiKorisnik = false;
	
		//provjerimo ima li korisnika u bazi, tj. da li ima pristup chatroom klijent koji salje zahtjev za stranicu
	for(let i = 0; i < klijenti.length; i++){
		if(klijenti[i] == ime){
			postojiKorisnik = true;
			break;
		}//end if
	}//end for
	
		//Saljemo ERROR stranicu ukoliko neko nema dozvolu da posjeti ovu stranicu
	if(postojiKorisnik)
		res.sendFile(__dirname + "/index.html");
	else
		res.sendFile(__dirname + "/error.html");
});

	//Zadaca 6 - Rad sa Cookie na Browseru, validacija i autorizacija
app.post('/loginajax', function(req, res, next){
	//console.log(req.body.name);
	//console.log(req.body.pass);
		//TREBA UZETI IZ COOKIE-A
	var usr = req.body.name;
	var passw = req.body.pass;
	
	var logovan = false;
	
	for(let i = 0; i < klijenti.length; i++){
		if(usr == klijenti[i]){
			var cryptusr = encrypt(usr);
			var cryptpass = encrypt(passw);
			//console.log(res, " ovdje sam");
			//res.cookie('x-user', cryptusr);
			res.send({status: 200, name: cryptusr, pass: cryptpass});
			logovan = true;
			break;
		}//end if
	}//end for
		
		//ako nismo nasli nijednog korisnika, saljemo status 401
	if(!logovan)
		res.send({status:401});
});

io.on('connection', function(socket){

  //console.log(niz);
  //console.log(niz.split('='));
  //socket.ime = decrypt(niz.split('=')[2]); //VRACA PRAVU VRIJEDNOST
  //console.log(decrypt(vratiXUser(niz)));
	
	//Uzimamo enkriptovanu informaciju iz Cookie-a na browseru za username
  let niz = socket.request.headers.cookie;
  console.log(niz);
  socket.ime = decrypt(vratiXUser(niz));

  console.log('a user connected: ', socket.ime);
  io.emit('chat message', socket.ime + ' se konektovao');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg) {
	  console.log("on chat message");
	  io.emit('chat message', socket.ime + ': ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

/**
Unese se ime, enkriptuje se, spasava se u cookie.
Uzima se iz cookieja, dekriptuje se definisanim kljucem, prikazuje se

*/

