import User from "../models/user.js";


export const googleSignUp = async (req, res) => {
  try {
    console.log('req.body', req.body)
    const { email } = req.body;
    const existedUser = await User.findOne({ email: email })
    console.log('existedUser', existedUser);
    if (existedUser) {
      const { _id: _id, firstName, lastName, email, isGoogle, profileImage } = existedUser;
      return res.status(200).json({ success: true, result: { _id: _id, firstName, lastName, email, isGoogle, profileImage } });
    } else {
      console.log('Entered to else case')
      const { firstName, lastName, email, profileImage, isGoogle } = req.body;
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        profileImage: profileImage,
        isGoogle: isGoogle
      })
      res.status(200).json({ success: true, result: { _id: user._id, firstName, lastName, email, isGoogle, profileImage } })
    }
  } catch (error) {

  }
}