const exp = require('express');
var app = exp.Router();
const nota = require('../models/note');
const usuarios = require('../models/user');

app.get('/:user', async function (req, res){
   const parametro = req.params.user;
   const id = await usuarios.findOne({_id:parametro});
   console.log(`Enviando la lista de notas ${req.baseUrl}`);
   var usu = req.baseUrl.split("/")[1];
   console.log(usu);
   const notas = await extraeNotas(id);
   res.send(notas);
});

app.post('/:user', async function (req, res){
   const parametro = req.params.user;
   const id = await usuarios.findOne({_id:parametro});
   console.log("Sumando una nueva nota a la lista");
   var usu = req.baseUrl.split("/")[1];
   const {title, description} = req.body;
   const note = new nota({title: title, description:description, user:id});
   note.save();
   const notas = await extraeNotas(id);

   res.send(notas);
 });

app.put('/:user/:note', async function (req, res){
   const parametro = req.params.user;
   const id = await usuarios.findOne({_id:parametro});
   const change = req.params.note;
   var usu = req.baseUrl.split("/")[1];
   const {title, description} = req.body;
   var notasUser = await extraeNotas(id);
   console.log(`Cambiando la nota: ${change}`);
   notasUser.forEach(nota => {
      if(nota.title===change){
         nota.title = title;
         nota.description = description;
         nota.save();
      }
   });
   var notasUser = await extraeNotas(id);
   res.send(notasUser);
});

 app.delete('/:user/:note', async function (req, res){
   const parametro = req.params.user;
   const id = await usuarios.findOne({_id:parametro});
   const change = req.params.note;
   var usu = req.baseUrl.split("/")[1];
   console.log(`Borrando la nota: ${change}`);
   await borraNota(usu,change);
   const notas = await extraeNotas(id);
   res.send(notas);
 });

async function extraeNotas(id){
   //var id = await buscaUsuario(usu);
   console.log(`id de usuario: ${id}`);
   var notas = await buscaNotas(id);
   console.log(notas);
   const promesa = new Promise((resolve, reject)=>{
      resolve(notas=this.notas);
   });
   return promesa;
}

async function buscaUsuario(usu){
   var id;
   console.log(`${usu} pues tienes razón`);
   const promesa = new Promise((resolve, reject) => {
      usuarios.find({
         //user:usu
      }).exec((error, usuario)=>{
         if(error){
            throw error;
         }
         console.log(`${usuario} AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`);
         resolve(id = usuario[0]._id);
      })
   });

   return promesa;
}

async function buscaNotas(id){
   console.log(`Buscando las notas: ${id}`);
   var notas;
   const promesa = new Promise((resolve, reject) => {
      nota.find({
         user: id
      }).exec(function(error, notas){
         if(error){
            throw error;
         }
         resolve(this.notas=notas);
      })
   });
   return promesa
}

async function borraNota(usu,change){
   const id = await buscaUsuario(usu);
   nota.deleteOne({
      title: change,
      user: id
   }).exec(()=>{});
}

module.exports = app;