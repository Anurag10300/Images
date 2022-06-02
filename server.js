var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

var fs = require('fs');
var path = require('path');
require('dotenv/config');


var imgModel = require('./db/model');







mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    console.log('connected')
});


var multer = require('multer');
const {
    send
} = require('process');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({
    storage: storage
});

app.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render('imagesPage', {
                items: items
            });
        }
    });
});

app.post('/', upload.single('image'), (req, res, next) => {

    var obj = {
        ownerName : req.body.ownerName,
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            // item.save();
            res.redirect('/');
        }
    });
});

app.listen(process.env.PORT || 5000, (req, res) => {

    console.log('listening to port 5000');

});

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// Set EJS as templating engine 
app.set("view engine", "ejs");