module.exports = {
  HOST: process.env.GCHECK_DB_HOST,
  USER: process.env.GCHECK_DB_USER,
  PASSWORD: process.env.GCHECK_DB_PASSWORD,
  DB: process.env.GCHECK_DB_NAME,
  PORT: process.env.GCHECK_DB_PORT,
  LOGGING: process.env.CHECK_DB_LOGGING || false,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
