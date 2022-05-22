const exp = require('express');
var app = exp.Router();
const mesas = require('../models/mesas');
const platos = require('../models/platos');
const comanda = require('../models/comandas');

app.post('/', async function (req, res){
   console.log("Cargando las mesas del restaurante");
   var usu = req.baseUrl.split("/")[1];
   const {tipo} = req.body;
   console.log(tipo);
   if(tipo==="camarero")
      console.log("Camarero: " + usu);
   else{
      console.log("Cocinero: " + usu);
   }
   const mesas = await extraeMesas(usu);
   console.log(mesas);
   res.send(mesas);
});

async function extraeMesas(usu){
   var mesas = await buscaMesas(usu);
   return mesas;
}

async function buscaMesas(id){
   console.log("recopilando información de las mesas para: " + id);
   const promesa = new Promise((resolve, reject) => {
      mesas.find({
      }).exec(function(error, mesas){
         if(error){
            throw error;
         }
         resolve(this.arrayMesas=mesas);
      })
   });
   return promesa
}

app.get('/platos', async function (req, res){
   console.log("Cargando los platos ofrecidos");
   const platos = await extraePlatos();
   res.send(platos);
});

async function extraePlatos(){
   console.log("recopilando información de los platos");
   const promesa = new Promise((resolve, reject) => {
      platos.find({
      }).exec(function(error, platos){
         if(error){
            throw error;
         }
         resolve(this.arrayPlatos=platos);
      })
   });
   return promesa
}

module.exports = app;