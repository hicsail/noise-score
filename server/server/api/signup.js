'use strict';
const Async = require('async');
const Boom = require('boom');
const Config = require('../../config');
const internals = {};
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
var zipcodes = require('zipcodes');

internals.applyRoutes = function (server, next) {

  const Session = server.plugins['hicsail-hapi-mongo-models'].Session;
  const User = server.plugins['hicsail-hapi-mongo-models'].User;
  const Invite = server.plugins['hicsail-hapi-mongo-models'].Invite;

  server.route({
    method: 'POST',
    path: '/signup',
    config: {
      validate: {
        payload: {
          username: Joi.string().token().lowercase().invalid('root').required(),
          password: Joi.string().required(),
          email: Joi.string().email().lowercase().required(),
          invite: Joi.string().optional(),
          location: Joi.array(),
          recodingIds: Joi.string(),
          pronouns: Joi.string(),
          ethnicity: Joi.string(),
          sensitive: Joi.string(),
          home: Joi.string(),
          community: Joi.string(),
          work: Joi.string(),
          health: Joi.string(),
          year: Joi.string(),
          weekday: Joi.array(),
          weekend: Joi.array()
        }
      },
      pre: [{
        assign: 'usernameCheck',
        method: function (request, reply) {

          const conditions = {
            username: request.payload.username
          };

          User.findOne(conditions, (err, user) => {

            if (err) {
              return reply(err);
            }

            if (user) {
              return reply(Boom.conflict('Username already in use.'));
            }

            reply(true);
          });
        }
      }, {
        assign: 'emailCheck',
        method: function (request, reply) {

          const conditions = {
            email: request.payload.email
          };

          User.findOne(conditions, (err, user) => {

            if (err) {
              return reply(err);
            }

            if (user) {
              return reply(Boom.conflict('Email already in use.'));
            }

            reply(true);
          });
        }
      }, {
        assign: 'passwordCheck',
        method: function (request, reply) {

          const complexityOptions = Config.get('/passwordComplexity');
          Joi.validate(request.payload.password, new PasswordComplexity(complexityOptions), (err, value) => {

            if (err) {
              return reply(Boom.conflict('Password does not meet complexity standards'));
            }
            reply(true);
          });
        }
      }, {
        assign: 'paramsCheck',
        method: function (request, reply) {
          var ret = "";
          ///const pushFrequencyArray = ["hour", "day", "week", "month", "never"];
          const pronounsArray = ["He/His", "She/Her", "They/Them", "undefined"];
          //const ethnicityArray = ["Asian", "Black/African", "African American Descendant of Slavery", "Caucasian",
          // "Hispanic/Latinx", "Pacific Islander", "Other", "undefined"];
          const sensitiveArray = ["Not at all", "Very Little", "A Little", "Moderately", "Severely"];
          const homeArray = ["Very quiet", "Quiet", "Neutral", "Loud", "Very Loud"];
          const communityArray = ["Very quiet", "Quiet", "Neutral", "Loud", "Very Loud"];
          const workArray = ["Very quiet", "Quiet", "Neutral", "Loud", "Very Loud"];
          const healthArray = ["Very poor", "Poor", "Fair", "Good", "Excellent"];

          if (!pronounsArray.includes(request.payload.pronouns)) {
            ret = ret + " + Problem with pronouns";
          }
         // if (!ethnicityArray.includes(request.payload.ethnicity)) {
         //   ret = ret + " + Problem with ethnicity";
         // }
          if (!sensitiveArray.includes(request.payload.sensitive)) {
            ret = ret + " + Problem with sensitive";
          }
          if (!homeArray.includes(request.payload.home)) {
            ret = ret + " + Problem with home";
          }
          if (!communityArray.includes(request.payload.community)) {
            ret = ret + " + Problem with community";
          }
          if (!workArray.includes(request.payload.work)) {
            ret = ret + " + Problem with work";
          }
          if (!healthArray.includes(request.payload.health)) {
            ret = ret + " + Problem with health";
          }
          if (!request.payload.weekend.every(isBelowThreshold)) {
            ret = ret + " + Problem with Weekend";
          }
          if (!request.payload.weekday.every(isBelowThreshold)) {
            ret = ret + " + Problem with Weekday";
          }
          if (ret.length > 1) {
            reply(Boom.conflict(ret.substr(3)));
          } else {
            reply(true);
          }


        }
      }]
    },
    handler: function (request, reply) {

      const mailer = request.server.plugins.mailer;

      Async.auto({
        user: function (done) {

          const username = request.payload.username;
          const password = request.payload.password;
          const email = request.payload.email;
          // Location is an array [city, state, zip]
          const location = request.payload.location;
          const pronouns = request.payload.pronouns;
          const ethnicity = request.payload.ethnicity;
          const sensitive = request.payload.sensitive;
          const home = request.payload.home;
          const community = request.payload.community;
          const work = request.payload.work;
          const health = request.payload.health;
          const year = request.payload.year;
          // Weekday and Weekend are Arrays
          const weekday = request.payload.weekday;
          const weekend = request.payload.weekend;


          const form = [location, pronouns, ethnicity, sensitive, home, community, work, health, year, weekday, weekend];
          User.create(username, password, email, form, done);
        },
        // welcome: ['user', function (results, done) {
        //
        //   const emailOptions = {
        //     subject: 'Your ' + Config.get('/projectName') + ' account',
        //     to: {
        //       name: request.payload.name,
        //       address: request.payload.email
        //     }
        //   };
        //   const template = 'welcome';
        //
        //   mailer.sendEmail(emailOptions, template, request.payload, (err) => {
        //
        //     if (err) {
        //       console.warn('sending welcome email failed:', err.stack);
        //     }
        //   });
        //
        //   done();
        // }],
        session: ['user', function (results, done) {

          const userAgent = request.headers['user-agent'];
          const ip = request.headers['x-forwarded-for'] || request.info.remoteAddress;

          Session.create(results.user._id.toString(), ip, userAgent, done);
        }],
        invite: ['user', function (results, done) {

          const id = request.payload.invite;
          if (id) {
            const update = {
              $set: {
                status: 'Accepted'
              }
            };
            return Invite.findByIdAndUpdate(id, update, done);
          }
          done();
        }]
      }, (err, results) => {

        if (err) {
          return reply(err);
        }

        const user = results.user;
        const credentials = results.session._id + ':' + results.session.key;
        const authHeader = 'Basic ' + new Buffer(credentials).toString('base64');

        request.cookieAuth.set(results.session);
        reply({
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles
          },
          session: results.session,
          authHeader
        });
      });
    }
  });


  // Function to check if an email/username combination is available
  server.route({
    method: 'POST',
    path: '/available',
    config: {
      validate: {
        payload: {
          email: Joi.string().email().lowercase().optional(),
          username: Joi.string().token().lowercase().optional()
        }
      },
      pre: [{
        assign: 'vaildInput',
        method: function (request, reply) {

          const username = request.payload.username;
          const email = request.payload.email;

          if (!username && !email) {
            return reply(Boom.badRequest('invaild submission, submit username and/or email'));
          }
          reply(true);
        }
      }]
    },
    handler: function (request, reply) {

      Async.auto({
        usernameFind: function (done) {

          const username = request.payload.username;


          User.findOne({ username }, done);
        },
        username: ['usernameFind', function (results, done) {

          if (request.payload.username) {
            if (results.usernameFind) {
              return done(null, false);
            }
            return done(null, true);
          }
          return done();
        }],
        emailFind: function (done) {

          const email = request.payload.email;

          User.findOne({ email }, done);
        },
        email: ['emailFind', function (results, done) {

          if (request.payload.email) {
            if (results.emailFind) {
              return done(null, false);
            }
            return done(null, true);
          }
          return done();
        }]
      }, (err, results) => {

        if (err) {
          return reply(err);
        }

        if (results.email === undefined) {
          delete results.email;
        }

        if (results.username === undefined) {
          delete results.username;
        }

        delete results.usernameFind;
        delete results.emailFind;

        reply(results);
      });
    }
  });

  next();
};


exports.register = function (server, options, next) {

  server.dependency(['auth', 'mailer', 'hicsail-hapi-mongo-models'], internals.applyRoutes);

  next();
};


// Function for parameters check
function isBelowThreshold(currentValue) {
  return (currentValue <= 100 && currentValue >= 0);
}

exports.register.attributes = {
  name: 'signup'
};
