const requireEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const clientEnv = {
  NEXT_PUBLIC_TMDB_API_KEY: requireEnv("NEXT_PUBLIC_TMDB_API_KEY"),
  NEXT_PUBLIC_APP_URL: requireEnv("NEXT_PUBLIC_APP_URL"),

  NEXT_PUBLIC_TMDB_API_BASE_URL: requireEnv("NEXT_PUBLIC_TMDB_API_BASE_URL"),
  NEXT_PUBLIC_TMDB_IMAGE_BASE_URL: requireEnv(
    "NEXT_PUBLIC_TMDB_IMAGE_BASE_URL",
  ),
};
