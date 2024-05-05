/* eslint-disable no-unused-vars */

import { z } from "zod";
import { signInSchema } from "./schemas";

export declare interface SignInSchemaType
  extends z.infer<typeof signInSchema> {}
