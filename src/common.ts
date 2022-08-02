import Joi from "joi";

export const validateJSONBody = (jsonBody: Object, schema: Joi.ObjectSchema) => {
  const { error, value } = schema.validate(jsonBody);
  if (error != null) {
    throw new Error('Request JSON body is invalid');
  }
 }