'use strict';
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
// var fs = require('fs');
// var path = require('path');
// var filepreview = require('filepreview-es6');
module.exports = function (app) {
  var Users = require('../controllers/UsersControllers');
  var Categories = require('../controllers/CategoriesControllers');
  var Video = require('../controllers/VideoControllers');
  var NodeMailer = require('../../nodemailer');

  // Users Routes
  app.route('/users')
    .get(Users.list_all_users)
    .post(Users.create_a_user);


  app.route('/users/:userId')
    .get(Users.read_a_user)
    .put(Users.update_a_user)
    .delete(Users.delete_a_user);


  //NodeMailer
  //
  app.route('/send')
      .post(NodeMailer.nodemailerFunc);

  app.route('/success_registration')
      .post(NodeMailer.nodemailerSignIn);

  app.route('/update_plan')
      .post(NodeMailer.nodemailerUpdatePlan);

  // app.post('/send', (req, res)=>{
  //   console.log(req.body);
  // })

  // Categories Routes
  app.route('/categories')
    .get(Categories.list_all_categories)
    .post(Categories.create_a_category);


  app.route('/categories/:categoryId')
    .get(Categories.read_a_category)
    .put(Categories.update_a_category)
    .delete(Categories.delete_a_category);

  app.route('/videos/category/:categoryId')
    .get(Video.list_all_videos_from_category)

  // Videos Routes
  app.route('/videos')
    .get(Video.list_all_videos)
    .post(Video.create_a_video);


  app.route('/videos/:videoId')
    .get(Video.read_a_video)
    .put(Video.update_a_video)
    .delete(Video.delete_a_video);


  //MULTER
  // app.route('/upload_pdf').post(
  //     upload.single("file"),
  //     (req, res) => {
  //       const tempPath = req.file.path;
  //       const targetPath = path.join(__dirname,"../../uploads/pdf/" + req.body._id + path.extname(req.file.originalname));
  //       fs.rename(tempPath, targetPath, err => {
  //         if (!filepreview.generateSync(targetPath, path.join(__dirname, "../../uploads/preview/" + req.body._id + '.pdf'))) {
  //           console.log('Oops, something went wrong.');
  //         } else {
  //           console.log('File preview done!');
  //         };
  //         res
  //             .status(200)
  //             .contentType("text/plain")
  //             .end("File uploaded!");
  //       });
  //     }
  // );

};