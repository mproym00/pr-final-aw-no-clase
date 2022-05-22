const exp = require('express');
var app = exp.Router();
const mesas = require('../models/mesas');
const platos = require('../models/platos');
const comanda = require('../models/comandas');

app.post('/', async function (req, res){
    const {mesa} = req.body;
    console.log("Cargando los platos de la mesa "+ mesa);
    var idMesa = await buscaMesa(mesa);
    var platosComanda = await buscaComanda(idMesa);
    console.log(platosComanda);
    var listaPlatos = [];

    for(var i=0; i<platosComanda.length; i++){
        var plato = await buscaPlatos(platosComanda[i].plato);
        var entrada ={idPlato: platosComanda[i]._id, plato, proceso: platosComanda[i].proceso};
        listaPlatos.push(entrada);
    }
    console.log(listaPlatos);
    res.send(listaPlatos);
});

app.put('/:idPlato/:op', function(req, res){
    var id = req.params.idPlato;
    var op = req.params.op;
    console.log(id);
    comanda.find({
       
    }).exec(function(error, platos){
        if(error)
            throw error;
        platos.forEach(plato => {
            console.log(plato._id + " " + id);
            if(plato._id==id){
                console.log("**************************************************" + op);
                if(op=="+") plato.proceso = plato.proceso + 1;
                else plato.proceso = plato.proceso - 1;
                plato.save();
                res.send(plato);
            }
        });
    })
})

async function buscaComanda(idMesa){
    console.log("buscando los platos de la comanda");
    const promesa = new Promise((resolve, reject) => {
        comanda.find({
            mesa: idMesa
        }) .exec(function(error, platosComanda){
            if(error) 
                throw error;

            resolve(this.platosComanda = platosComanda);
        }); 
    });  
    return promesa;  
}  

async function buscaMesa(mesa){
    console.log("buscando la id de la mesa  " + mesa);
    const promesa = new Promise((resolve, reject) => {
       mesas.find({
          numero: mesa
       }).exec(function(error, mesaEncontrada){
          if(error){
             throw error;
          }
          resolve(this.id=mesaEncontrada[0]._id);
       })
    });
    return promesa
}

async function buscaPlatos(id){
    const promesa = new Promise((resolve, reject) => {
        platos.find({
            _id: id
        }).exec(function(error, plato){
            if(error){
                throw error;
            }
            resolve(this.plato = plato);
        })
    });
    return promesa; 
} 
module.exports = app;