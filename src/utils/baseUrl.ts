"use server";

import { headers } from "next/headers";

export async function getBaseURL() {
  const header = await headers();
  const host = header.get("host");

  const baseURL =
    host === "localhost:3000" ? `http://${host}` : `https://${host}`;

  return baseURL;
}
