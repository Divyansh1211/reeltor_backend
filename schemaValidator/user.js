const { z } = require("zod");

const signUpUserValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signInUserValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const updateUserValidator = z.object({
  name: z.string().optional(),
  bio: z.string().min(6).optional(),
  mobileNumber: z.string().length(10).optional(),
  availabilityTime: z.string().optional(),
});

module.exports = {
  signUpUserValidator,
  signInUserValidator,
  updateUserValidator,
};
