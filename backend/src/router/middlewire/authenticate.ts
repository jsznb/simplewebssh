
import JWT from '../../utils/jwt'
// check authorization
export const checkSignIn = (req, res, next) => {
  try {
    // 去掉 Bearer前缀
    // console.log(req.headers.authorization)
    let auth: any = ""
    if (req.headers.authorization.startsWith('Bearer ')) {
      auth = JWT.verify(req.headers.authorization.substring(7))
    } else {
      auth = JWT.verify(req.headers.authorization)
    }
    // let auth = JWT.verify(req.headers.authorization.substring(7))
    if (auth && auth.exp > Date.now() / 1000) {
      req.auth = { addr: auth.addr }
      console.log(req.auth)
      next();     //If session exists, proceed to page
    } else {
      throw ""
    }
  } catch (error) {
    res.redirect(`/auth/login`);
  }
}