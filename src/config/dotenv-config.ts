export const nodeEnv = process.env.NODE_ENV;
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!nodeEnv) {
  throw new Error("NODE_ENV is not defined");
} else if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}
