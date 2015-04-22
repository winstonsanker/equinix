var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// Retrieve
var MongoClient = require('mongodb').MongoClient;

app.use(express.static('pages'));
// for parsing application/json
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.set('jsonp callback name', 'productCallBck');

app.get('/', function (req, res) {
  console.log(req.query.term);
  res.send('Hello World!');
});

app.get('/products', function (req, res) {

      var searchStr=req.query.term;
      console.log(searchStr);
      if(searchStr!==undefined && searchStr!==null && searchStr!==''){
          MongoClient.connect("mongodb://admin:admin@ds061711.mongolab.com:61711/equinix", function(err, db) {
              if(err) { 
                res.send('Could not establish Database Connection :-'+err);
                return console.dir(err);
              }
              var collection = db.collection('products');
              var searchQuery= new RegExp("^"+searchStr.toLowerCase(), "i");
              collection.find({'productName':{ $regex: searchQuery }},{'fields':{'productName':1,'productId':1}}).toArray(function(err, items) {
                  if(!err && items.length>0){
                    items.forEach(function(item) {
                        item.label=item.productName;
                        item.value=item.productName;
                    });
                    res.json(items);
                  }else{
                    console.log('Sorry, No product found !!!');
                    res.status(404).send('Sorry, No product found !!!');
                  }
              });
          });
      }else{
        res.status(404).send('Sorry, No search query "term" found !!! ' );
      }

});

app.get('/productDetail', function (req, res) {
      var productId=parseInt(req.query.productId);
      if(productId!==undefined && productId!==null && productId>0){
          MongoClient.connect("mongodb://admin:admin@ds061711.mongolab.com:61711/equinix", function(err, db) {
              if(err) { 
                res.send('Could not establish Database Connection :-'+err);
                return console.dir(err);
              }

              var collection = db.collection('products');
              collection.find({'productId':productId}).toArray(function(err, items) {
                  console.dir(items);
                  if(!err && items.length>0){
                    res.json(items[0]);
                  }else{
                    res.status(404).send('Sorry, No product found !!!');
                  }
              });
          });
      }else{
        res.status(404).send('Sorry, No search query "productId" found !!!');
      }

});

app.post('/createProduct', function (req, res) {
    console.log(req.body);
    var  newProduct= req.body;

    MongoClient.connect("mongodb://admin:admin@ds061711.mongolab.com:61711/equinix", function(err, db) {
        if(err) { 
          res.send('Could not establish Database Connection :-'+err);
          return console.dir(err);
        }

        var collection = db.collection('products');

        collection.insert(newProduct, {w:1}, function(err, result) {
          res.send("Product added !! ");
        });
    });
});


app.post('/updateProduct', function (req, res) {
    console.log(req.body);
    var uProd=req.body;
    var  exProduct= {
      "productName": uProd.productName,
      "costPrice": uProd.costPrice,
      "sellingPrice": uProd.sellingPrice
    };

    MongoClient.connect("mongodb://admin:admin@ds061711.mongolab.com:61711/equinix", function(err, db) {
        if(err) { 
          res.send('Could not establish Database Connection :-'+err);
          return console.dir(err);
        }

        var collection = db.collection('products');

        collection.update({'productId':uProd.productId},exProduct, {w:1}, function(err, result) {
          if(!err){
            res.send("Product Details Saved !! ");
          }else{
            res.send("Product Details Save Error !! ");
          }
        });
    });
});

app.get('/clearProducts', function (req, res) {
    console.log(req.query);
    var  products= [
         ];

    MongoClient.connect("mongodb://admin:admin@ds061711.mongolab.com:61711/equinix", function(err, db) {
        if(err) { 
          res.send('Could not establish Database Connection :-'+err);
          return console.dir(err);
        }

        var collection = db.collection('products');

        collection.remove();

        res.send("Products collection is cleared !! ");
    });
});


app.get('/getProductDetails', function (req, res) {
  var prod={
              "productId": 18448,
              "productName": "Apple Mac E77111",
              "costPrice": 1001,
              "sellingPrice": 1501,
              "quantity": 11 
          };
  res.send(prod);
});

app.get('/createDummyProducts', function (req, res) {

    // Connect to the db
    MongoClient.connect("mongodb://admin:admin@ds061711.mongolab.com:61711/equinix", function(err, db) {
          if(err) { 
            res.send('connection error'+err);
            return console.dir(err); 
          }

          var collection = db.collection('products');

          var  products= [
                  {"productId": 1,"productName": "Apple Mac E77111","costPrice": 1001,"sellingPrice": 1501,"quantity": 11 },
                  {"productId": 2,"productName": "Apple Mac E77112","costPrice": 1002,"sellingPrice": 1502,"quantity": 12 },
                  {"productId": 3,"productName": "Apple Mac E77113","costPrice": 1003,"sellingPrice": 1503,"quantity": 13 },
                  {"productId": 4,"productName": "Apple Mac E77114","costPrice": 1004,"sellingPrice": 1504,"quantity": 14 },
                  {"productId": 5,"productName": "Beats Head Phone E77222","costPrice": 2000,"sellingPrice": 2500,"quantity": 20 },
                  {"productId": 6,"productName": "Chinese ear E77333","costPrice": 3000,"sellingPrice": 3500,"quantity": 30 },
                  {"productId": 7,"productName": "DEll Latitude E77441","costPrice": 4001,"sellingPrice": 4501,"quantity": 41 },
                  {"productId": 8,"productName": "DEll Latitude E77442","costPrice": 4002,"sellingPrice": 4502,"quantity": 42 },
                  {"productId": 9,"productName": "DEll Latitude E77443","costPrice": 4003,"sellingPrice": 4503,"quantity": 43 },
                  {"productId": 10,"productName": "DEll Latitude E77444","costPrice": 4004,"sellingPrice":4504,"quantity": 44 },
                  {"productId": 11,"productName": "EdHardy E77551","costPrice": 5001,"sellingPrice": 5501,"quantity": 51 },
                  {"productId": 12,"productName": "EdHardy E77552","costPrice": 5002,"sellingPrice": 5502,"quantity": 52 },
                  {"productId": 13,"productName": "EdHardy E77553","costPrice": 5003,"sellingPrice": 5503,"quantity": 53 },
                  {"productId": 14,"productName": "EdHardy E77554","costPrice": 5004,"sellingPrice": 5504,"quantity": 54 },
                  {"productId": 15,"productName": "Chinese ear E77332","costPrice": 3002,"sellingPrice": 3502,"quantity": 32 },
               ];

          collection.insert(products, {w:1}, function(err, result) {
            if(err) { 
              res.send('insert products error'+err);
              return console.dir(err); 
            }
            console.log("dummy products inserted");
            console.dir(result);
            res.send('Created dummy products!');
          });
    });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});