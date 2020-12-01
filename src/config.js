module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  API_TOKEN: process.env.API_TOKEN,
  CLIENT_ORIGIN: "http://localhost:3000/login",
  DATABASE_URL: process.env.DATABASE_URL || TEST_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || "do-it-already-jwt",
};
