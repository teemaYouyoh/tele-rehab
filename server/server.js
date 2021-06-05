// var bodyParser = require('body-parser');
var express = require('express'),
  app = express(),
  cors = require('cors'),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/UsersModel'), //created model loading here
  Video = require('./api/models/VideosModel'), //created model loading here
  Category = require('./api/models/CategoriesModel'), //created model loading here
  bodyParser = require('body-parser'),
  multer = require('multer'),
  path = require('path');

  
var whitelist = ['https://tele-rehab.vps-touchit.space']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Public Folder
app.use(express.static(__dirname + '/public/uploads'));

// Multer upload files
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, 'attachment-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
}).single('form-file')

app.post('/upload', cors(corsOptions), (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("err")
      res.send(err)
    } else {
      // console.log(req)
      res.send(req.file)
    }
  })

})



// Download files
app.get('/download', function (req, res) {
  console.log("1")
  res.download(__dirname + '/public/uploads/1.png', '1.png');
})

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TeleRehab');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/Routes'); //importing route
routes(app, upload); //register the route

app.listen(port);

console.log('Tele-Rehab RESTful API server started on: ' + port);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});