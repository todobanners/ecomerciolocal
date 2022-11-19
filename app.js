var express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
const router = express.Router();
var app = express();
const fs = require('fs')

var urlencodedParser = bodyParser.urlencoded({ extended: false })  

app.post('/compra', urlencodedParser, function (req, res) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Prepare output in JSON format  
  response = {  
      calle: req.body.calle,  
      numero: req.body.numero,
      esquina: req.body.esquina
  };  
  console.log(response);
  const { calle, numero, esquina } = req.body;
  console.log(calle);
  console.log(numero);
  console.log(esquina);
  
  fs.readFile('./datosUsers.json', function (err, data) {
    var json = JSON.parse(data);
    json.push(response);    
    fs.writeFile("./datosUsers.json", JSON.stringify(json), function(err){
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
      console.log(JSON.parse(data));
    });
})
  res.end(JSON.stringify("Se recibio y se guardo la informacion"));  
})  

app.get('/datos', (req, res) => {
  fs.readFile('./datosUsers.json', function (err, data) {
    res.end(JSON.stringify(data))
})

});


app.use(cors());
app.use(express.static('public'))
app.listen(3000, function() {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});
