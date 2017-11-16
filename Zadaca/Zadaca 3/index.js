"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  title: 'Sta ima',
  broj: 100,
  poruke: ''
  }); //IZ VIEW-A INDEX I PARAMETRE KAKO PROSLJEDJUJEMO I RENDERAMO
});


router.post('/poruka', function(req, res, next) {
  let poruke = 'iz fajla';
	//UPISI PORUKU U FAJL
  res.render('index', { 
  title: req.body.poruka,
  broj: 100,
  poruke:poruke
  }); //IZ VIEW-A INDEX I PARAMETRE KAKO PROSLJEDJUJEMO I RENDERAMO
});

/* Sada nesto gledamo
router.get('/users', function(req, res, next) {
  res.render('index', { 
  title: 'Otkud ovdje?',
  broj: 100
  }); //IZ VIEW-A INDEX I PARAMETRE KAKO PROSLJEDJUJEMO I RENDERAMO
});
*/

module.exports = router;
