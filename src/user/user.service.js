import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import ApiError from '../error/ApiError'
import User from './User'

class UserService {
  async create(email, password) {
    const user = await User.findOne({ where: { email } })
    if (user) {
      throw ApiError.badRequest(`User with "${email}" already exist`)
    }
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    return await User.create({
      email,
      password: hashedPassword,
      activationLink: v4(),
    })
  }
}

export default new UserService()
