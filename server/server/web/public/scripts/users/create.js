'use strict';

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  username: Joi.string().token().lowercase().invalid('root').required(),
  password: Joi.string().required().min(8).regex(/^[A-Z]+[a-z]+[0-9]+$/, '1 Uppercase, 1 lowercase, 1 number'),
  confirmPassword: Joi.string().required().min(8).regex(/^[A-Z]+[a-z]+[0-9]+$/, '1 Uppercase, 1 lowercase, 1 number'),
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

$('#create').click((event) => {
  event.preventDefault();
  const values = {};
  $.each($('#form').serializeArray(), (i, field) => {
    values[field.name] = field.value;
  });
  if(values['password'] === values['confirmPassword']) {
    delete values['confirmPassword'];
    $.ajax({
      type: 'POST',
      url: '/api/users',
      data: values,
      success: function (result) {
        window.location = '/users'
      },
      error: function (result) {
        errorAlert(result.responseJSON.message);
      }
    });
  } else {
    errorAlert('Passwords do not match');
  }
});
