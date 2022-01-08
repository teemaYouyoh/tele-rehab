const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UsersModel');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'signup',
  new localStrategy(
    {
      nameField: 'name',
      phoneField: 'phone',
      usernameField: 'email',
      birthdaydField: 'birthday',
      diagnosisField: 'diagnosis',
      passwordField: 'password',
    },
    async (name, phone, email, birthday, diagnosis, password, done) => {
      try {
        const user = await UserModel.create({ name, phone, email, birthday, diagnosis , password  });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }
        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

