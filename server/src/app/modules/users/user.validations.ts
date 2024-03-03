import { UserRoles } from '@prisma/client';
import { z } from 'zod';
import { ZodUserRoles } from './users.constants';

 
const createUser = z.object({
  fullName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'First Name must be in string',
  }),
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'email must be in string',
  }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be in string',
  }),
  role: z
    .enum([...ZodUserRoles] as [string, ...string[]], {
      required_error: 'Role is Required',
      invalid_type_error: 'role must be in string',
    })
    .default(UserRoles.USER),
});

const updateMyProfile = z.object({
  body: z.object({
    fullName: z
      .string({ invalid_type_error: 'Full Name must be in string' })
      .optional(),
    email: z
      .string({
        invalid_type_error: 'email must be in string',
      })
      .optional(),
    password: z
      .string({
        invalid_type_error: 'password must be in string',
      })
      .optional(),
      phoneNumber: z
      .string({
        invalid_type_error: 'phoneNumber must be in string',
      })
      .optional(),
      companyName: z
      .string({
        invalid_type_error: 'companyName must be in string',
      })
      .optional(),
      addressLine1: z
      .string({
        invalid_type_error: 'addressLine1 must be in string',
      })
      .optional(),
      addressLine2: z
      .string({
        invalid_type_error: 'addressLine2 must be in string',
      })
      .optional(),
      city: z
      .string({
        invalid_type_error: 'city must be in string',
      })
      .optional(),
      state: z
      .string({
        invalid_type_error: 'state must be in string',
      })
      .optional(),
      country: z
      .string({
        invalid_type_error: 'country must be in string',
      })
      .optional(),
      postalCode: z
      .string({
        invalid_type_error: 'postalCode must be in string',
      })
      .optional(),
      
  }),
});

export const UserValidation = {
  createUser,
  updateMyProfile,
};
