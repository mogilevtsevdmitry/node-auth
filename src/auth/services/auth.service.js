import bcrypt from 'bcrypt'
import User from '../../user/User'
import ApiError from '../../error/ApiError'
import tokenService from './token.service'
import UserPayloadDto from '../dto/user-payload.dto'

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw ApiError.badRequest('User not found')
    }
    if (!user.isActivated) {
      throw ApiError.badRequest('User is not activated!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw ApiError.badRequest('Not valid password')
    }
    return await this.tokens(user)
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken)
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } })
    if (!user) {
      throw ApiError.badRequest('Not valid activation link')
    }
    user.isActivated = true
    user.activationLink = null
    await user.save()
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized()
    }
  }

  async tokens(user) {
    const userDto = new UserPayloadDto(user)
    const tokens = await tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto,
    }
  }
}

export default new AuthService()
