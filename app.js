var express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
const router = express.Router();
var app = express();
const fs = require('fs')

var urlencodedParser = bodyParser.urlencoded({ extended: false })  

app.post('/compra', urlencodedParser, function (req, res) {  
  // Prepare output in JSON format  
  response = {  
      calle: req.body.calle,  
      numero: req.body.numero,
      esquina: req.body.esquina
  };  
  console.log(response);
  
  fs.readFile('./datosUsers.json', function (err, data) {
    var json = JSON.parse(data);
    json.push(response);    
    fs.writeFile("./datosUsers.json", JSON.stringify(json), function(err){
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
      console.log(JSON.parse(data));
    });
})






//   fs.readFile('./datosUsers.json', 'utf8', function readFileCallback(err, data){
//     if (err){
//         console.log(err);
//     } else {
//     obj = JSON.parse(data); //now it an object
//     console.log(data);
//     obj.push(response); //add some data
    
//     json = JSON.stringify(obj); //convert it back to json
//     console.log(json);
//     fs.writeFile('./datosUsers.json', json, err => {
//       if (err) {
//           console.log('Error writing file', err)
//       } else {
//           console.log('Successfully wrote file')
//       }
//   }); // write it back 
// }});

//   const jsonString = JSON.stringify(response, null, 2)
//   fs.writeFileSync('./datosUsers.json', jsonString, err => {
//     if (err) {
//         console.log('Error writing file', err)
//     } else {
//         console.log('Successfully wrote file')
//     }
// })

  res.end(JSON.stringify(response));  
})  


app.use(cors());
app.use(express.static('public'))
app.listen(3000, function() {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});
