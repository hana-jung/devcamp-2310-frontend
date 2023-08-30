import {createEnv} from "@t3-oss/env-nextjs"
import {z} from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
  },
  client: {
    NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY_DAYS: z.string().transform(value => parseInt(value, 10)),
    NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY_DAYS: z.string().transform(value => parseInt(value, 10)),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY_DAYS: process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY_DAYS,
    NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY_DAYS: process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY_DAYS,
  },
})
