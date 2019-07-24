'use strict';
const Async = require('async');
const Bcrypt = require('bcrypt');
const Clinician = require('./clinician');
const Joi = require('joi');
const MongoModels = require('hicsail-mongo-models');


class User extends MongoModels {
  static generatePasswordHash(password, callback) {

    Async.auto({
      salt: function (done) {

        Bcrypt.genSalt(10, done);
      },
      hash: ['salt', function (results, done) {

        Bcrypt.hash(password, results.salt, done);
      }]
    }, (err, results) => {

      if (err) {
        return callback(err);
      }

      callback(null, {
        password,
        hash: results.hash
      });
    });
  }

  static create(username, password, email, form, callback) {
    const self = this;

    Async.auto({
      passwordHash: this.generatePasswordHash.bind(this, password),
      newUser: ['passwordHash', function (results, done) {
        const document = {
          isActive: true,
          inStudy: true,
          username: username.toLowerCase(),
          password: results.passwordHash.hash,
          email: email.toLowerCase(),
          roles: {},
          studyID: null,
          timeCreated: new Date(),
          location: {
            city: form[0][0],
            state: form[0][1],
            zipCode: form[0][2]
          },
          // pushFrequency: form[1],
          recodingIds: {},
          pronouns : form[1],
          ethnicity: form[2],
          sensitive: form[3],
          home: form[4],
          community: form[5],
          work: form[6],
          health: form[7],
          year: form[8],
          weekday : {
            commuting: form[9][0],
            schoolWork: form[9][1],
            home: form[9][2],
            sleeping: form[9][3],
            errands: form[10][4],
            physical: form[9][5]
          },
          weekend : {
            commuting: form[10][0],
            schoolWork: form[10][1],
            home: form[10][2],
            sleeping: form[10][3],
            errands: form[10][4],
            physical: form[9][5]
          }

        };

        self.insertOne(document, done);
      }]
    }, (err, results) => {

      if (err) {
        return callback(err);
      }

      results.newUser[0].password = results.passwordHash.password;

      callback(null, results.newUser[0]);
    });
  }

  static findByCredentials(username, password, callback) {

    const self = this;

    Async.auto({
      user: function (done) {

        const query = {
          isActive: true
        };

        if (username.indexOf('@') > -1) {
          query.email = username.toLowerCase();
        }
        else {
          query.username = username.toLowerCase();
        }

        self.findOne(query, done);
      },
      passwordMatch: ['user', function (results, done) {

        if (!results.user) {
          return done(null, false);
        }

        const source = results.user.password;
        Bcrypt.compare(password, source, done);
      }]
    }, (err, results) => {

      if (err) {
        return callback(err);
      }

      if (results.passwordMatch) {
        return callback(null, results.user);
      }

      callback();
    });
  }

  static findByUsername(username, callback) {

    const query = { username: username.toLowerCase() };

    this.findOne(query, callback);
  }

  static highestRole(roles) {

    if (roles.root) {
      return 5;
    }
    else if (roles.admin) {
      return 4;
    }
    else if (roles.researcher) {
      return 3;
    }
    else if (roles.clinician) {
      return 2;
    }
    else if (roles.analyst) {
      return 1;
    }
    return 0;
  }

  constructor(attrs) {

    super(attrs);

    Object.defineProperty(this, '_roles', {
      writable: true,
      enumerable: false
    });
  }

  static PHI() {

    return ['username', 'password', 'name', 'email', 'ethnicity' , 'location', 'pronouns', 'sensitive',
    'home', 'work', 'health', 'year', 'weekday', 'weekend'];
  }
}


User.collection = 'users';


User.schema = Joi.object({
  _id: Joi.object(),
  isActive: Joi.boolean().default(true),
  username: Joi.string().token().lowercase().required(),
  password: Joi.string(),
  inStudy: Joi.boolean().default(true),
  email: Joi.string().email().lowercase().required(),
  roles: Joi.object({
    clinician: Clinician.schema,
    analyst: Joi.boolean().required(),
    researcher: Joi.boolean().required(),
    admin: Joi.boolean().required(),
    root: Joi.boolean().required()
  }),
  resetPassword: Joi.object({
    token: Joi.string().required(),
    expires: Joi.date().required()
  }),
  timeCreated: Joi.date(),
  location : {
    city: Joi.string(),
    state: Joi.string(),
    zipCode : Joi.string()
  },
  pushFrequency: Joi.string(),
  recodingIds: Joi.string(),
  pronouns: Joi.string(),
  ethnicity: Joi.string(),
  sensitive: Joi.string(),
  home:Joi.string(),
  community : Joi.string(),
  work : Joi.string(),
  health : Joi.string(),
  year: Joi.string(),
  weekday : {
    commuting: Joi.number(),
    schoolWork: Joi.number(),
    home : Joi.number(),
    sleeping: Joi.number(),
    physical : Joi.number(),
    errands: Joi.number()
  },
  weekend : {
    commuting: Joi.number(),
    schoolWork: Joi.number(),
    home : Joi.number(),
    sleeping: Joi.number(),
    physical : Joi.number(),
    errands: Joi.number()
  }
});

User.payload = Joi.object({
  username: Joi.string().token().lowercase().invalid('root').required(),
  password: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  name: Joi.string().required(),
  pushFrequency: Joi.string(),
  recodingIds: Joi.string(),
  pronouns: Joi.string(),
  ethnicity: Joi.string(),
  sensitive: Joi.string(),
  home:Joi.string(),
  community : Joi.string(),
  work : Joi.string(),
  health : Joi.string(),
  year: Joi.string(),
  weekday : {
    commuting: Joi.number(),
    schoolWork: Joi.number(),
    home : Joi.number(),
    sleeping: Joi.number(),
    physical : Joi.number(),
    errands: Joi.number()
  },
  weekend : {
    commuting: Joi.number(),
    schoolWork: Joi.number(),
    home : Joi.number(),
    sleeping: Joi.number(),
    physical : Joi.number(),
    errands: Joi.number()
  }
});


User.indexes = [
  { key: { username: 1, unique: 1 } },
  { key: { email: 1, unique: 1 } }
];


module.exports = User;
