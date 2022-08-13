import * as Joi from 'joi';

export default Joi.object({
  CACHE_HOST: Joi.optional(),
  CACHE_PORT: Joi.optional().default(6379),
  CACHE_PREFIX: Joi.optional(),
  CACHE_TTL: Joi.optional().default(5),
  CACHE_PASSWORD: Joi.optional(),
});
