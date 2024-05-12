/* eslint-disable no-unused-vars */

import { z } from "zod";
import { signInSchema, signUpSchema } from "../schemas/auth";

declare interface SignInSchemaType extends z.infer<typeof signInSchema> {}

declare interface SignUpSchemaType extends z.infer<typeof signUpSchema> {}
