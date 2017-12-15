const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}))

  //registro
  app.post('/hero', (req, res) => {
  var dname = req.body.dname;
  var snum = req.body.snum;
  db.collection('users', function(err, collection) {
    if (err) return res.send(500, err);
    collection.findOne({dname:dname}, function(err, user) {
        // si encuentra un usuario dar que ese usuario ya existe
        if (user) return res.sendFile(__dirname + '/alreadyexists.html')

    // si no lo hace, inserta uno nuevo
        res.sendFile(__dirname + '/registered.html');
        collection.insert({    "id" : Math.floor((Math.random() * 1000000) + 1), "usr" : dname, "pw" : snum, "nw" : -1.0, "level" : 0.0, "currentPet" : "3", "login_streak" : 1.0, "playerStatus" : "playing", "status" : "playing", "net" : "M", "snum" : snum, "lkey" : snum, "gamecount" : 100.0, "gold" : 200.0, "treats" : 15.0, "hp" : 500000.0, "wins" : 0, "sesscount" : 0, "losses" : 0, "speed" : 5.0, "attack" : 100.0, "defence" : 5.0, "jump" : 5.0, "xp" : 0.0, "userAccessories" : [ "head_ninjaA_white" ], "durability" : { "head_ninjaA_white" : 30.0 }, "ownedPets" : { "1" : { "gender" : "M", "id" : 1.0, "pers" : "brave", "name" : "Heroes", "accessories" : [], "color2" : "0xFFFFFF", "type" : "rabbit", "deaths" : 0.0, "kills" : 0.0, "color1" : "0x4b0000" } }, "userWeaponsOwned" : {}, "userWeaponsEquipped" : [ "walk", "bone", "superjump", "climb", "punch", "dig", "mortar" ], "allowedMaps" : [ "Crash Landing" ], "command" : "player", "online" : 1.0, "dname" : dname }), {safe:true}, function(err, result) {
        };
    });
  });
});



// login
  app.post('/login', (req, res) => {
  var dname = req.body.dname;
  var snum = req.body.snum;
  db.collection('users', function(err, collection) {
    if (err) return res.send(500, err);

    collection.findOne({dname:dname, snum:snum}, function(err, user) {
        // si encuentra un usuario entra al juego
        if (user) return res.send('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10.0.0.0" width="100%" height="100%"> <param name="movie" value="http://wildheroes.pw/gamewo.swf?snum=' + snum + '&dname=' + dname + '&net=M"/><param name="quality" value="high" /><PARAM NAME="SCALE" VALUE="exactfit"><embed src="http://wildheroes.pw/gamewo.swf?dname=' + dname + '&snum=' + snum + '&net=M" quality="high" type="application/x-shockwave-flash" width="100%" height="100%" SCALE="exactfit" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');
    // si no lo hace, envia a notregistered.html, donde se dice que esa cuenta no existe
          if (err) return res.send(500, err);
          res.sendFile(__dirname + '/notregistered.html')
        });
  });
});


//index.html en el puerto 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/web/index.html')
})

app.listen(80, function () {
  console.log(' _     _   ')
  console.log('| |   | |                            ')
  console.log('| |__ | |')
  console.log('|  __)| |')
  console.log('| |   | |')
  console.log('|_|   |_|')
  console.log('')
  console.log('ExpressJS. (port 3000)')
})

app.post('/quotes', (req, res) => {
  console.log('.')
})

// mongo
var db

MongoClient.connect('mongodb://localhost:25546/emu', (err, database) => {
  if (err) return console.log(err)
 db = database
})

app.use('assets/json', express.static(__dirname + '/json'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/web'));
