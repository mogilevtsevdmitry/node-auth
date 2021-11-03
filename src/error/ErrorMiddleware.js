import ApiError from './ApiError'

/* eslint no-unused-vars: "off" */
export default (err, req, res, _next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors })
  }
  return res.status(500).json({ message: `Unknown error!${err}` })
}
