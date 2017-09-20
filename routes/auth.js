var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var qqStrategy = require('passport-qq').Strategy;

passport.serializeUser(function (user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: 'c7c50bd0f6eb57676708',
  clientSecret: '4dfabba9b5275f50b4ed74246ad83920105a3427',
  callbackURL: "http://localhost:3000/auth/github/callback"
},
  function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));

passport.use(new qqStrategy({
  clientID: "1106346181",
  clientSecret: "HaqK6QGmobvYkQ2k",
  callbackURL: "http://127.0.0.1:3000/auth/qq/callback"
},
  function (accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ qqId: profile.id }, function (err, user) {
    return done(err, user);
    //});
  }
));

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
})

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });


router.get('/auth/qq',
  passport.authenticate('qq'),
  function (req, res) {
    // The request will be redirected to qq for authentication, so this
    // function will not be called.
  });

router.get('/auth/qq/callback',
  passport.authenticate('qq', { failureRedirect: '/login' }),
  function (req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;

