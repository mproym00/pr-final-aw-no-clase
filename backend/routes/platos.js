const exp = require('express');
var app = exp.Router();
const platos = require('../models/platos');

app.get('/primeros', async function (req, res){
   platos.find({
      tipo: "Primero"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.get('/segundos', async function (req, res){
   platos.find({
      tipo: "Segundo"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.get('/postres', async function (req, res){
   platos.find({
      tipo: "Postre"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.get('/bebidas', async function (req, res){
   platos.find({
      tipo: "Bebida"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.post('/comanda', function(req, res){
   console.log("***************************" + req);
   const {primeros, segundos, postres, bebidas} = req.body;
   console.log(primeros);
   res.send("    ");
});


module.exports = app;