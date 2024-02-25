const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .trim()
    .min(3, { message: "email must be at least 3 characters" })
    .max(255, { message: "email must be maximum 255 characters" }),
  password: z
    .string({ required_error: "Password is Required" })
    .trim()
    .min(6, { message: "password must be at least 6 characters" })
    .max(1025, { message: "password must be maximum 1025 characters" }),
});

// creating object schema
const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is Required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must be maximum 255 characters" }),
  email: z
    .string({ required_error: "Email is Required" })
    .trim()
    .min(3, { message: "email must be at least 3 characters" })
    .max(255, { message: "email must be maximum 255 characters" }),
  phone: z
    .string({ required_error: "Phone is Required" })
    .trim()
    .min(10, { message: "phone must be at least 10 characters" })
    .max(10, { message: "phone must be maximum 10 characters" }),
  password: z
    .string({ required_error: "Password is Required" })
    .trim()
    .min(6, { message: "password must be at least 6 characters" })
    .max(1025, { message: "password must be maximum 1025 characters" }),
});
module.exports = { signupSchema, loginSchema };
