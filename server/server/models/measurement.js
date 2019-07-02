'use strict';
// const Async = require('async');
// const Bcrypt = require('bcrypt');
// const Clinician = require('./clinician');
const Joi = require('joi');
const MongoModels = require('hicsail-mongo-models');


class Measurement extends MongoModels {
  static create(username, userID, rawData, location, loud, describe, feel, place, sources, words, date) {
    const self = this;
    const document = {
      username: username,
      userID: userID,
      rawData: {
        min: rawData[0],
        max: rawData[1],
        average: rawData[2],
        median: rawData[3]
      },
      location: {
        lang: location[0],
        lat: location[1]
      },
      loud: loud,
      describe: describe,
      feel: feel,
      place: place,
      sources: sources,
      words: words,
      date: date
    };

    self.insertOne(document, function (error, response) {
      if (error) {
        console.log('Error occurred while inserting');
      } else {
        console.log('inserted record', response);
      }
    });

  }
}

Measurement.collection = 'measurements';
Measurement.schema = Joi.object({
  _id: Joi.object(),
  username: Joi.string(),
  userID: Joi.string().required(),
  rawData: {
    min: Joi.number().required(),
    max: Joi.number().required(),
    average: Joi.number().required(),
    median: Joi.number().required(),
  },
  location: {
    lang: Joi.number().required(),
    lat: Joi.number().required()
  },
  loud: Joi.string(),
  describe: Joi.string(),
  feel: Joi.string(),
  place: Joi.string(),
  sources: Joi.array(),
  words: Joi.string(),
  date: Joi.object()
});

module.exports = Measurement;
