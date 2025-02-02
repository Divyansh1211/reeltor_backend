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
  name: z.string().min(1, "Name is required"),
  mobileNumber: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  bio: z.string().optional(),
  availabilityTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/,
      "Availability time must be in HH:MM-HH:MM format"
    ),
});

module.exports = {
  signUpUserValidator,
  signInUserValidator,
  updateUserValidator,
};
