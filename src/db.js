import { Sequelize } from 'sequelize'
import config from './config/config'

module.exports = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options
)
