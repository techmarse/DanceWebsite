const express = require('express');
const path = require('path');
const app = express();
// getting-started.js
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

main().catch(err => console.log(err));


// If You get this type of error : MongooseServerSelectionError: connect ECONNREFUSED ::1:27017 
//  The solution was simply replacing localhost by 0.0.0.0. I.e. in my source code I had to change

async function main() {
  await mongoose.connect('mongodb://0.0.0.0:27017/dancecontact'); 
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 80;

// Define Mongoose Schema
const contactschema = new mongoose.Schema({
    name: String,
    email: String,
    phoneno: String,
    address: String,
  });

  // Model of Schema : Which means we fixed this schema
  const Contact = mongoose.model('Contact', contactschema);

// EXPRESS SPECIFIC CONFIGURATION
app.use('/static',express.static('static')); // For serving the static files
app.use(express.urlencoded());

// PUG SPECIFIC CONFIGURATION
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the view directory 


// ENDPOINTS
app.get('/', (req, res)=>{
    const params ={ }
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params ={ }
    res.status(200).render('contact.pug', params);
});

// Post the data and save in database
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This data has saved into the database.")
    }).catch(()=>{
        res.status(400).send("The Data was not saved..!!")
    });
    // res.status(200).render('contact.pug');
});


// START THE SERVER
app.listen(port, () => {
    console.log(`The Application started successfully on port ${port}`);
});