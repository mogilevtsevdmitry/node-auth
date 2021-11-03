import express, { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import config from './config/config'
import sequelize from './db'
import errorMiddleware from './error/ErrorMiddleware'
import router from './routes'

const app = express()
app.use(cors())
app.use(json())
app.use(cookieParser())
app.use('/api', router)

app.use(errorMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(config.port, (err) => {
      if (err) {
        return console.error(`Server has been crashed: ${err.message}`)
      }
      console.log(`Server has been started at ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()
