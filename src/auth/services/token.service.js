import jwt from 'jsonwebtoken'
import Token from '../model/Token'
import config from '../../config/config'

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, config.jwt.jwt_secret, {
      expiresIn: config.jwt.jwt_exp,
    })
    const refreshToken = jwt.sign(payload, config.jwt.jwt_refresh_secret, {
      expiresIn: config.jwt.jwt_refresh_exp,
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId, refreshToken) {
    const data = await Token.findOne({ where: { userId } })
    if (data) {
      data.refreshToken = refreshToken
      return data.save()
    }
    return await Token.create({ userId, refreshToken })
  }

  async removeToken(refreshToken) {
    await Token.destroy({ where: { refreshToken } })
    return 1
  }
}

export default new TokenService()
