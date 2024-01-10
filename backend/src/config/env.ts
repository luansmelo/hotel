export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'secretJwt',
    expiresIn: "1d",
  },
  port: process.env.PORT || 3003,
  api_version: `v ${process.env.API_VERSION || "1"}`,
  API_URL: 'http://181.214.221.187'
};
