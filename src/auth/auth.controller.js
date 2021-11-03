import { validationResult } from 'express-validator'
import ApiError from '../error/ApiError'
import userService from '../user/user.service'
import authService from './services/auth.service'
import mailService from '../mail/mail.service'
import config from '../config/config'

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error', errors.array()))
      }
      const { email, password } = req.body
      const user = await userService.create(email, password)
      const data = await authService.tokens(user)
      await mailService.sendActivationLink(
        email,
        `${config.host}${config.port}/api/activate/${user.activationLink}`
      )
      res.cookie('refreshToken', data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
      })
      return res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  async activate(req, res, next) {
    try {
      const { link } = req.params
      await authService.activate(link)
      return res.redirect(`${config.client_url}/`)
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const data = await authService.login(email, password)
      res.cookie('refreshToken', data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
      })
      return res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const result = await authService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const data = await authService.refresh(refreshToken)
      res.cookie('refreshToken', data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
      })
      return res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
