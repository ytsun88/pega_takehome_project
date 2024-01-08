import Joi from "joi";

// costraints of username and age
const userValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    age: Joi.number().required().min(1).max(120),
  });
  return schema.validate(data);
};

export default userValidator;
