export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "1d",
  },
  port: process.env.PORT || 5858,
  api_version: "/v" + process.env.API_VERSION || "1",
};
