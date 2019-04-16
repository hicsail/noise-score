'use strict';
const Async = require('async');
const Config = require('../config');


const internals = {};


internals.applyStrategy = function (server, next) {

  const Session = server.plugins['hicsail-hapi-mongo-models'].Session;
  const Token = server.plugins['hicsail-hapi-mongo-models'].Token;
  const User = server.plugins['hicsail-hapi-mongo-models'].User;

  server.auth.strategy('simple', 'basic', {
    validateFunc: function (request, username, password, callback) {

      Async.auto({
        session: function (done) {

          Session.findByCredentials(username, password, done);
        },
        user: ['session', function (results, done) {

          if (!results.session) {
            return done();
          }

          User.findById(results.session.userId, done);
        }],
        scope: ['user', function (results, done) {

          if (!results.user || !results.user.roles) {
            return done();
          }

          done(null, Object.keys(results.user.roles));
        }],
        updateSession: ['scope', function (results, done) {

          if (!results.scope) {
            return done();
          }

          const update = {
            $set: {
              lastActive: new Date()
            }
          };

          Session.findByIdAndUpdate(results.session._id.toString(), update, done);
        }]
      }, (err, results) => {

        if (err) {
          return callback(err);
        }

        if (!results.session) {
          return callback(null, false);
        }

        callback(null, Boolean(results.user), results);
      });
    }
  });

  server.auth.strategy('jwt', 'jwt', {
    key: Config.get('/authSecret'),
    verifyOptions: { algorithms: ['HS256'] },
    validateFunc: function (decoded, request, callback) {

      Async.auto({
        token: function (done) {

          Token.findOne({
            tokenId: decoded,
            active: true
          }, done);
        },
        updateToken: ['token', function (results,done) {

          if (!results.token) {
            return done();
          }
          Token.findByIdAndUpdate(results.token._id,{
            $set: {
              lastUsed: new Date()
            }
          },done);
        }],
        user: ['token', function (results, done) {

          if (!results.token) {
            return done();
          }

          User.findById(results.token.userId, done);
        }],
        scope: ['user', function (results, done) {

          if (!results.user || !results.user.roles) {
            return done();
          }

          done(null, Object.keys(results.user.roles));
        }]
      }, (err, results) => {

        if (err) {
          return callback(err);
        }

        if (!results.token) {
          return callback(null, false);
        }

        callback(null, Boolean(results.user), results);
      });
    }
  });


  server.auth.strategy('session', 'cookie', {
    password: Config.get('/authSecret'),
    cookie: 'AuthCookie',
    isSecure: false,
    clearInvalid: true,
    keepAlive: true,
    ttl: 60000 * 30, //30 Minutes
    redirectTo: '/login',
    appendNext: 'returnUrl',
    validateFunc: function (request, data, callback) {

      Async.auto({
        session: function (done) {

          const id = data._id;
          const key = data.key;

          Session.findByCredentials(id, key, done);
        },
        user: ['session', function (results, done) {

          if (!results.session) {
            return done();
          }

          User.findById(results.session.userId, done);
        }],
        scope: ['user', function (results, done) {

          if (!results.user || !results.user.roles) {
            return done();
          }

          done(null, Object.keys(results.user.roles));
        }],
        updateSession: ['scope', function (results, done) {

          if (!results.scope) {
            return done();
          }

          const update = {
            $set: {
              lastActive: new Date()
            }
          };

          Session.findByIdAndUpdate(results.session._id.toString(), update, done);
        }]
      }, (err, results) => {

        if (err) {
          return callback(err);
        }

        if (!results.session) {
          return callback(null, false);
        }

        callback(null, Boolean(results.user), results);
      });
    }
  });


  next();
};

exports.register = function (server, options, next) {

  server.dependency('hicsail-hapi-mongo-models', internals.applyStrategy);

  next();
};


exports.preware = internals.preware;


exports.register.attributes = {
  name: 'auth'
};
