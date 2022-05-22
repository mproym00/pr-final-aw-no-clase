const exp = require(`express`);
var app = exp.Router();
const platos = require(`../models/platos`);

app.get(`/api/primeros`, async function (req, res){
   platos.find({
      tipo: "Primero"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.get(`/api/segundos`, async function (req, res){
   platos.find({
      tipo: "Segundo"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.get(`/api/postres`, async function (req, res){
   platos.find({
      tipo: "Postre"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.get(`/api/bebidas`, async function (req, res){
   platos.find({
      tipo: "Bebida"
   }).exec(function(error, platos){
      res.send(platos);
   });
});


module.exports = app;