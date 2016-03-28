const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../users/userModel');
const InstagramStrategy = require('passport-instagram').Strategy;


module.exports = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.SECRET,
  };
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.where({ id: jwtPayload.id })
      .fetch().then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => {
        return done(err, false);
      });
  }));

  passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || 'http://localhost:8080/auth/instagram/callback',
    scope: 'public_content',
  },
  (accessToken, refreshToken, profile, done, res, req, next) => {
    process.nextTick(() => {
      console.log('typeof req, res', typeof req, typeof res)
      console.log('typeof next', typeof next)
      //console.log("This is the user", req.account);
      console.log("token is", accessToken);
      console.log("refreshtoken is", refreshToken);
      //console.log("profile is", profile);

      User.where({ instagram_id: profile.id })
      .fetch().then((user) => {
        if (user) {
          console.log('found a instagrammer, returning the user');
          // console.log('found user', user)
          user.save({
            instagram_token: accessToken || refreshToken.access_token,
          });
          return done(null, user);
        } else {
          console.log('going to create an instagrammer');

          const newUser = new User({
            username: profile.displayName,
            instagram_token: accessToken || refreshToken.access_token,
            instagram_id: profile.id,
            instagram_profile_pic: profile._json.data.profile_picture,
            instagram_username: profile.username,
            password: 'insta',
          });
          newUser.save()
          .then((createdUser) => {
            console.log('saved a user, returning, createdUser: ', createdUser);
            return done(null, createdUser);
          })
          .catch((err) => {
            console.log('Error saving user in passport.js', err);
            return done(null, false);
          });
        }
        console.log('failed to find an instagrammer');
        // this breaks things:
        // return done(null, false);
      })
      .catch((err) => {
        return done(err, false);
      });
    });
  }));
};

