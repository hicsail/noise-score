'use strict';

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  username: Joi.string().token().lowercase().required(),
  ethnicity: Joi.string().required(),
  pushFrequency: Joi.string(),
  recodingIds: Joi.string(),
  pronouns: Joi.string(),
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
joiToForm('formFields',schema);
