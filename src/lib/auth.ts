import { betterAuth } from "better-auth";
import { passkey } from "@better-auth/passkey";
import { neon } from "@neondatabase/serverless";
import { Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

// Create Kysely instance with Neon serverless driver
const db = new Kysely<Record<string, unknown>>({
  dialect: new NeonDialect({
    neon: neon(process.env.NETLIFY_DATABASE_URL || ""),
  }),
});

export const auth = betterAuth({
  database: {
    db,
    type: "postgres"
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    passkey(),
  ],
});
