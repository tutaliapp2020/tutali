
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://tutali:123@cluster0-wkwzl.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutali");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
