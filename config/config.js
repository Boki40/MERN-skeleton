const config = {
  env: process.env.NODE_ENV || "develpment",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "TitkosKulcsByBoki",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/mernproject",
};

export default config;
