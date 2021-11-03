import { DataTypes, Deferrable } from 'sequelize'
import User from '../../user/User'
import sequelize from '../../db'

const Token = sequelize.define('token', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING, require: true, allowNull: false },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
  },
})

export default Token
