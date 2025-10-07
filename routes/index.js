/**
  * @file     index.js
  * @author   Nathan Levasseur (Nathan.Levasseur@clg.qc.ca)
  * @version  1
  * @date     25/09/2025
  * @brief    Première ébauche d'une architecture générique "RESTful" avec Express
  *          Routeur principal
  */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/acceuil', { title: 'Acceuil' });
});

module.exports = router;    
