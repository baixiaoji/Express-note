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
  clientID: "101430652",
  clientSecret: "cbff126d70f86ddba687d24544cb7dd6",
  callbackURL: "http://localhost:3000/auth/qq/callback"
},
  function (accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ qqId: profile.id }, function (err, user) {
    done(null, profile);
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
    res.redirect('/user/');
  });


router.get('/qq',
  passport.authenticate('qq'));

router.get('/qq/callback',
  passport.authenticate('qq', { failureRedirect: '/login' }),
  function (req, res) {
    console.log("-----4545--------------")
    console.log(req.user)
    console.log("---------454545----------")
    req.session.user = {
      id: req.user.id,
      username: req.user._json.nickname || req.user.username,
      avatar: req.user._json.avatar_url || req.user._json.figureurl_qq_1,
      provider: req.user.provider
    };
    // Successful authentication, redirect home.
    res.redirect('/user/');
  });

module.exports = router;

