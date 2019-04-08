'use strict';
// const Async = require('async');
// const Boom = require('boom');
// const Config = require('../../config');
const internals = {};
const Joi = require('joi');
const Boom = require('boom');
// const PasswordComplexity = require('joi-password-complexity');


internals.applyRoutes = function (server, next) {

  const Measurement = server.plugins['hicsail-hapi-mongo-models'].Measurement;

  server.route({
    method:'POST',
    path: '/inputMeasurement',
    config: {
      validate: {
        payload: {
          username: Joi.string(),
          userID : Joi.string(),
          rawData: Joi.array(),
          location: Joi.array(),
          locationType: Joi.string(),
          floorLevel : Joi.number(),
          loud: Joi.string(),
          describe : Joi.string(),
          intense: Joi.string(),
          feel :Joi.string(),
          sources : Joi.array(),
          words: Joi.string(),
          date : Joi.string()
        }
      },
      pre: [{
        assign: 'paramsCheck',
        method: function (request, reply){
          var ret = "";
          const loudArray = ["Very quiet", "Quiet", "Moderately Loud", "Loud", "Very Loud"];
          const describeArray = ["Very pleasant", "Pleasant", "Neutral", "Noisy", "Unbearable"];
          const intenseArray =  ["not", "little", "moderately", "very"];
          const feelArray = ["Relaxed", "Tranquil", "Neutral", "Irritated", "Anxious", "Frustrated", "Angry"];
          const sourcesArray = ["aircraft", "alarm", "dog", "carMusic", "construction", "fireworks", "footsteps", "horn", "hvac",
            "leafBlower", "trash", "music", "neighbor", "party", "delivery", "pickup", "quiet", "restaurant", "traffic", "trains", "voices", "other"];
          const locationTypeArray = [ "work", "outdoors", "indoors"];
          if (request.payload.location[0] > 180 || request.payload.location[0] < -180){
            ret = ret + " + Problem with Lang";
          }
          if (request.payload.location[1] > 90 || request.payload.location[1] < -90){

            ret = ret + " + Problem with Lit";
          }
          if (!loudArray.includes(request.payload.loud)) {
            ret = ret + " + Problem with Loud";
          }
          // if (!locationTypeArray.includes(request.payload.locationType)) {
          //   ret = ret + " + Problem with Location Type";
          // }
          if (!describeArray.includes(request.payload.describe)) {
            ret = ret + " + Problem with Describe";
          }
          // if (!intenseArray.includes(request.payload.intense)) {
          //   ret = ret + " + Problem with Intense";
          // }
          if (!feelArray.includes(request.payload.feel)) {
            ret = ret + " + Problem with Feel";
          }
          for (var i = 0; i < request.payload.sources.length; i++){
            if (!sourcesArray.includes(request.payload.sources[i])) {
              ret = ret + " + Problem with Sources";
            }
          }

          if(!request.payload.words.length > 140){
            ret = ret + " + Problem with Words"
          }
          // if(request.payload.floorLevel < 0){
          //   ret = ret + " + Problem with floorLevel"
          // }
          if (ret.length > 1) {
            reply(Boom.conflict(ret.substr(3)));
          } else {
            reply(true);
          }
        }
      }]
    },
    handler: function (request, reply) {
      const username = request.payload.username;
      const userID = request.payload.userID;
      const rawData = request.payload.rawData;
      const location = request.payload.location;
      // const locationType = request.payload.locationType;
      // const floorLevel = request.payload.floorLevel;
      const loud = request.payload.loud;
      const describe = request.payload.describe;
      // const intense = request.payload.intense;
      const feel = request.payload.feel;
      const sources = request.payload.sources;
      const words = request.payload.words;
      const date = request.payload.date;
      try {
        Measurement.create(username, userID, rawData, location, loud, describe, feel, sources, words,date);
} catch (error){
  reply(error);
}
      reply(200);


    }
  });

  server.route({
    method: 'GET',
    path: '/userMeasurements',
    config: {
      auth: {
        strategies: ['simple', 'jwt', 'session']
      }
    },
    handler: function (request, reply) {
      console.log(request.state.AuthCookie);
      var userID = request.state.AuthCookie.userId;

      Measurement.find({ userID : userID}, (err, session) => {
        if(err){
          reply(404);
        } else {
              reply(session);

        }
      });
    }
  });

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
        if(err){
          reply(400);
        } else {
          const ret = [];
          for (let i = 0; i < session.length; i++){
            const pointData = {
              latitude : session[i]['location']['lat'],
              longitude : session[i]['location']['lang'],
              weight : session[i]['rawData']['average']
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
