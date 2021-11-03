require('dotenv').config({ path: '../.env' })

const config = {
  dev: {
    port: 3000,
    jwt: {
      jwt_secret: 'secret',
      jwt_exp: '5m',
      jwt_refresh_secret: 'super-secret',
      jwt_refresh_exp: '30d',
    },
    db: {
      database: 'gif_manager_auth',
      username: 'admin',
      password: 'root',
      options: {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        protocol: 'postgres',
        log: true,
      },
    },
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    host: 'http://localhost:',
    client_url: 'https://yandex.ru',
  },
  production: {
    port: Number(process.env.PORT) || 3000,
    jwt: {
      jwt_secret: process.env.JWT_ACCESS_SECRET,
      jwt_exp: process.env.JWT_ACCESS_EXPIRESIN,
      jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
      jwt_refresh_exp: process.env.JWT_REFRESH_EXPIRESIN,
    },
    db: {
      database: process.env.DB_DATABASENAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      options: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: process.env.DB_TYPE,
        protocol: process.env.DB_TYPE,
        ssl: true,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      },
    },
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    host: process.env.API_HOST,
    client_url: 'http://localhost:3000',
  },
}

// const envirenment = process.env.NODE_ENV || 'dev'
// [envirenment]

module.exports = config.dev
