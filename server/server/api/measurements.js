'use strict';
const internals = {};
const Joi = require('joi');
const Boom = require('boom');
const fs = require('fs');

const opencage = require('opencage-api-client');


internals.applyRoutes = function (server, next) {

  const Measurement = server.plugins['hicsail-hapi-mongo-models'].Measurement;

  // Search function for the MapScreen component
  // Uses OpenCageData.com API to search for the coordinates
  // There is a 420 daily limit to the free tier
  server.route({
    method: 'GET',
    path: '/search',
    config: {
      auth: {
        strategies: ['simple', 'jwt', 'session']
      },
      validate: {
        query: Joi.any()
      }
    },
    handler: function (request, reply) {
      // Get latidude & longitude from address.
      opencage.geocode({q: request.query['query']}).then(data => {
        if (data.status.code == 200) {
          if (data.results.length > 0) {
            var place = data.results[0];
            reply(place.geometry);
          }
        }
        else if (data.status.code == 402) {
          console.log('hit free-trial daily limit');
          console.log('become a customer: https://opencagedata.com/pricing');
        }
        else {
          // other possible response codes:
          // https://opencagedata.com/api#codes
          console.log('error', data.status.message);
        }
      }).catch(error => {
        console.log('error', error.message);
      });


    }
  });


  // Function to return measurements for Anchor backend
  server.route({
    method: 'GET',
    path: '/table/measurements',
    config: {
      auth: {
        strategies: ['simple', 'jwt', 'session']
      },
      validate: {
        query: Joi.any()
      }
    },
    handler: function (request, reply) {
      const limit = Number(request.query.length);
      const page = Math.ceil(Number(request.query.start) / limit) + 1;
      Measurement.pagedFind({}, {}, {}, limit, page, (err, results) => {
        if (err) {
          return reply(err);
        }
        reply({
          draw: request.query.draw,
          recordsTotal: results.data.length,
          recordsFiltered: results.items.total,
          data: results.data,
          error: err
        });
      });
    }
  });

  // Function to input a user measurement
  server.route({
    method: 'POST',
    path: '/inputMeasurement',
    config: {
      validate: {
        payload: {
          username: Joi.string(),
          userID: Joi.string(),
          rawData: Joi.array(),
          location: Joi.array(),
          locationType: Joi.string(),
          floorLevel: Joi.number(),
          loud: Joi.string(),
          describe: Joi.string(),
          intense: Joi.string(),
          place: Joi.string(),
          feel: Joi.string(),
          sources: Joi.array(),
          words: Joi.string(),
          date: Joi.string()
        }
      },
      pre: [{
        assign: 'paramsCheck',
        method: function (request, reply) {
          var ret = "";
          const loudArray = ["Very quiet", "Quiet", "Moderately Loud", "Loud", "Very Loud"];
          const describeArray = ["Very pleasant", "Pleasant", "Neutral", "Noisy", "Unbearable"];
          const intenseArray = ["not", "little", "moderately", "very"];
          const placeArray = ["Indoors", "Outdoors", "At work"];
          const feelArray = ["Relaxed", "Tranquil", "Neutral", "Irritated", "Anxious", "Frustrated", "Angry"];
          const sourcesArray = ["airplane", "alarm", "dog", "car music", "construction", "fireworks", "footsteps", "horn", "hvac",
            "leaf blower", "trash", "music", "neighbor", "party", "delivery", "pickup", "quiet", "restaurant", "traffic", "trains", "voices", "other"];
          const locationTypeArray = ["work", "outdoors", "indoors"];
          if (request.payload.location[0] > 180 || request.payload.location[0] < -180) {
            ret = ret + " + Problem with Lang";
          }
          if (request.payload.location[1] > 90 || request.payload.location[1] < -90) {

            ret = ret + " + Problem with Lit";
          }
          if (!loudArray.includes(request.payload.loud)) {
            ret = ret + " + Problem with Loud";
          }
          if (!describeArray.includes(request.payload.describe)) {
            ret = ret + " + Problem with Describe";
          }
          if (!feelArray.includes(request.payload.feel)) {
            ret = ret + " + Problem with Feel";
          }
          if (!placeArray.includes(request.payload.place)) {
            ret = ret + " + Problem with Place";
          }
          for (var i = 0; i < request.payload.sources.length; i++) {
            if (!sourcesArray.includes(request.payload.sources[i])) {
              ret = ret + " + Problem with Sources";
            }
          }
          if (!request.payload.words.length > 140) {
            ret = ret + " + Problem with Words"
          }
          if (ret.length > 1) {
            reply(Boom.conflict(ret.substr(3)));
          }
          else {
            reply(true);
          }
        }
      }]
    },
    handler: function (request, reply) {
      console.log("payload is \n\n\n");
      console.log(request.payload);
      const username = request.payload.username;
      const userID = request.payload.userID;
      const rawData = request.payload.rawData;
      const location = request.payload.location;
      const loud = request.payload.loud;
      const describe = request.payload.describe;
      const feel = request.payload.feel;
      const place = request.payload.place;
      const sources = request.payload.sources;
      const words = request.payload.words;
      const date = request.payload.date;
      try {
        Measurement.create(username, userID, rawData, location, loud, describe, feel, place, sources, words, date);
      }
      catch (error) {
        reply(error);
      }
      reply(200);
    }
  });

  // Function to get all a users measurements
  server.route({
    method: 'GET',
    path: '/userMeasurements',
    config: {
      auth: {
        strategies: ['simple', 'jwt', 'session']
      }
    },
    handler: function (request, reply) {
      var userID = request.state.AuthCookie ? request.state.AuthCookie.userId : request.auth.credentials.user._id.toString();
      
      //want to capture these for future logs
      console.log("authcookie user id is...");
      console.log(request.state.AuthCookie.userId);
      console.log("From the usual way of request.auth is...");
      console.log(request.auth.credentials.user._id.toString());
      
      Measurement.find({userID: userID}, (err, session) => {
        if (err) {
          reply(404);
        }
        else {
          reply(session);

        }
      });
    }
  });

  // Function to get all measurements
  server.route({
    method: 'GET',
    path: '/allMeasurements',
    config: {
      auth: {
        strategies: ['simple', 'jwt', 'session']
      }
    },
    handler: function (request, reply) {
      Measurement.find({}, (err, session) => {
        if (err) {
          reply(400);
        }
        else {
          const ret = [];
          for (let i = 0; i < session.length; i++) {
            const pointData = {
              lat: session[i]['location']['lat'],
              lang: session[i]['location']['lang'],
              dbWeight: session[i]['rawData']['average'],
              feelWeight: session[i]['loud'],
              location: session[i]['place']
            };
            ret.push(pointData);
          }
          reply(ret);
        }
      });
    }
  });

  next();
};


exports.register = function (server, options, next) {

  server.dependency(['auth', 'hicsail-hapi-mongo-models'], internals.applyRoutes);

  next();
};

exports.register.attributes = {
  name: 'measurements'
};
