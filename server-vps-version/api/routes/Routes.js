'use strict';
module.exports = function (app, upload) {
  var Users = require('../controllers/UsersControllers');
  var Categories = require('../controllers/CategoriesControllers');
  var Video = require('../controllers/VideoControllers');
  var NodeMailer = require('../../nodemailer');
  const fetch = require('node-fetch');

  require('url-polyfill')

  // Users Routes
  app.route('/users')
    .get(Users.list_all_users)
    .post(Users.create_a_user);


  app.route('/users/:userId')
    .get(Users.read_a_user)
    .put(Users.update_a_user)
    .delete(Users.delete_a_user);



  // app.post('/upload', upload.single('upload'), async (req, res) => {
  //   console.log(req)
  // }, (err, req, res, next) => res.status(404).send({ error: err.message }))


  //NodeMailer
  //
  app.route('/send')
    .post(NodeMailer.nodemailerFunc);

  app.route('/success_registration')
    .post(NodeMailer.nodemailerSignIn);

  app.route('/update_plan')
    .post(NodeMailer.nodemailerUpdatePlan);

  app.route('/send_call')
    .post(NodeMailer.nodemailerFooter);

  app.route('/registration_mail')
      .post(NodeMailer.nodemailerRegistration);

  app.route('/finish_course')
      .post(NodeMailer.finishCourse);


  app.route('/send_feedback')
      .post(NodeMailer.nodemailerFeedback);

  app.route('/send_mess_videochat')
      .post(NodeMailer.nodemailerCall);

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


};