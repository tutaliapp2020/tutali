const express = require('express');
const router = express.Router();

//const model = require('../model/usuario')();
var productos;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://tutali:123@cluster0-wkwzl.mongodb.net/test?retryWrites=true&w=majority';
function agregarC(usuarioc,correoc, usuarioc, contrasenac, contrasenacc){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tutali");
    var myobj = {
      nombreC: usuarioc,
      correoC: correoc,
      usuarioC: usuarioc,
      contrasenaC: contrasenac,
      contrasenaCC: contrasenacc
    };
    dbo.collection("usuario").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}
function agregarP(nombrep,preciop, cantidadp, descripcionp){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tutali");
    var myobj = {
      nombreP:nombrep,
      precioP: preciop,
      cantidadP: cantidadp,
      descripcionP: descripcionp,

    };
    dbo.collection("productos").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

function consultar(usuarioc, contrasenac, res){
  var usuario;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tutali");
    var query = { usuarioC:usuarioc,contrasenaC:contrasenac};
    dbo.collection("usuario").find(query).toArray(function(err, result) {
      if (err) throw err;
      if(result.length==1){
        res.render('cliente',{
          titulo:usuarioc

        })
      }else{
        res.render('index',{
          imagenpublcidad:['https://cdn.dribbble.com/users/788099/screenshots/11118237/media/83403954402d4839cf3670aadee46367.png'],
          usuarioI:"USUARO INCORRECTO"
        })
      }
      usuario = result;
      console.log(result.length);
      db.close();
    });
  });
  return usuario;
}
function consultarP(){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tutali");
    dbo.collection("productos").find().toArray(function(err, result) {
      if (err) throw err;
      productos = result;
      console.log(result);
      db.close();
    });
  });
}

function eliminar(nombrep){
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutali");
  var myquery = { nombreP:nombrep};
  dbo.collection("productos").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("eliminado")
    db.close();
  });
});
}
router.get('/', (req, res) =>{
  res.render('index',{
    imagenpublcidad:['https://cdn.dribbble.com/users/788099/screenshots/11118237/media/83403954402d4839cf3670aadee46367.png'],
    usuarioI:""
 });
 });

router.get('/registroCliente', (req, res) =>{
  res.render('registroCliente',{
    imagenpublcidad:"",
    usuarioI:""
  });
});

router.get('/registroTendero', (req, res) =>{
  res.render('registroTendero',{
    imagenpublcidad:"",
    usuarioI:""
  });
});

router.get('/tendero', (req, res) =>{
  consultarP();
  console.log(productos);
  res.render('tendero',{
    productos:productos
  });
});


router.post('/add', function (req, res) {
  let body = req.body;
  //agregar(body.usuario, body.contrasena);
  consultar(body.usuario, body.contrasena, res);
});

router.post('/registrarC', function (req, res) {
  let body = req.body;
  console.log(body);
  agregarC(
    body.nombreC,
    body.correoC,
    body.usuarioC,
    body.contrasenaC,
    body.contrasenaCC);
  res.render('index',{
    imagenpublcidad:['https://cdn.dribbble.com/users/788099/screenshots/11118237/media/83403954402d4839cf3670aadee46367.png'],
    usuarioI:""
  })
});

router.post('/registrarT', function (req, res) {
  let body = req.body;
  console.log(body);
  agregarC(
    body.nombreT,
    body.correoT,
    body.nombreTT,
    body.direccionT,
    body.usuarioT,
    body.contrasenaT,
    body.contrasenaTT);
  res.render('index',{
    imagenpublcidad:['https://cdn.dribbble.com/users/788099/screenshots/11118237/media/83403954402d4839cf3670aadee46367.png'],
    usuarioI:""
  })
});
router.post('/agregarProducto', function (req, res) {
  let body = req.body;
  console.log(body);
  agregarP(
    body.nombreP,
    body.precioP,
    body.cantidadP,
    body.descripcionP,);
  res.redirect('tendero')
});

router.get('/delete/:id',(req, res)=>{
  let nombreP = req.params.id;
  eliminar(nombreP);
  res.send("Producto eliminado")
});




module.exports = router;
