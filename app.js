/**
  * @file     app.js
  * @author   Nathan Levasseur (202339974@edu.clg.qc.ca)
  * @version  1
  * @date     25/09/2025
  * @brief    Première ébauche d'une architecture générique "RESTful" avec Express
  */
const PORT = 8080;
var express = require('express');
var app = express();

const now = new Date();
const heuredeLancement = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(require('./routes/index'));
const indexRouter = require('./routes/index');
app.use(function(req, res, next) {
  req.heuredeLancement = heuredeLancement;
  next();
});
app.use('/', indexRouter);
app.use(function (req, res, next) {
    res.status(404)
    res.render("pages/404.ejs");
});

let server = app.listen(PORT, function(){
    console.log('Server is running on port ' + PORT);
});

// Chargement de socket.io (place-le ici)
var io = require('socket.io')(server);

var connectionCount = 0;

// Un seul handler de connexion
io.on('connection', function (socket) {
  connectionCount++;
  console.log(`Un client est connecté (#${connectionCount})`);
  socket.emit('message', `Vous êtes bien connecté ! Vous êtes le client numéro ${connectionCount}.`);
});

// gestion des erreurs
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // afficher la page d’erreurs
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app: app};
