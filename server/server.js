var express = require('express'),
  app = express(),
  cors = require('cors'),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/UsersModel'), //created model loading here
  Video = require('./api/models/VideosModel'), //created model loading here
  Category = require('./api/models/CategoriesModel'), //created model loading here
  bodyParser = require('body-parser');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TeleRehab');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/Routes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('Tele-Rehab RESTful API server started on: ' + port);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});