import { type Mail } from "@/types/Mail";
import { neon } from "@neondatabase/serverless";
import { Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";

// Database types
export interface Database {
  user: UserTable;
  session: SessionTable;
  account: AccountTable;
  passkey: PasskeyTable;
  template: TemplateTable;
}

export interface UserTable {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionTable {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
}

export interface AccountTable {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  accessTokenExpiresAt: Date | null;
  refreshTokenExpiresAt: Date | null;
  scope: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PasskeyTable {
  id: string;
  name: string | null;
  publicKey: string;
  userId: string;
  webauthnUserID: string;
  counter: number;
  deviceType: string;
  backedUp: boolean;
  transports: string | null;
  createdAt: Date | null;
}

export interface TemplateTable {
  id: string;
  user_id: string;
  name: string;
  content: string | Mail; // JSONB stored as string
  created_at: Date;
  updated_at: Date;
}

// Create Kysely instance
export const db = new Kysely<Database>({
  dialect: new NeonDialect({
    neon: neon(process.env.NETLIFY_DATABASE_URL || ""),
  }),
});
