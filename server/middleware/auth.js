import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const googleToken = token.length > 1000
    if (googleToken) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      const payload = ticket.getPayload()
      req.user = {
        _id: payload?.sub,
        firstName: payload?.given_name,
        lastName: payload?.family_name,
        email: payload?.email,
        profileImage: payload?.picture
      }
    } else {
      // verify our custom token using JWT token
    }
    next()
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: 'Something went wrong with your authorization!' })
  }
}

export default auth