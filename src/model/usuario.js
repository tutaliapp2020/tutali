

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://tutali:123@cluster0-wkwzl.mongodb.net/test?retryWrites=true&w=majority';
function enviar(usuario,contrasena){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tutali");
    var myobj = {
      usuario: usuario,
      contraseña: contrasena };
    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

}

function consultar(usuario, contrasena){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { usuario: usuario};
    var t = dbo.collection("customers").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
  return t;
}
