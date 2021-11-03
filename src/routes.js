import Router from 'express'
import authRouter from './auth/auth.router'

const router = new Router()

router.use('/', authRouter)

export default router
