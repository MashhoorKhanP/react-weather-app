import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, min: 2, max: 50, required: true },
  lastName: { type: String, min: 2, max: 50, required: true },
  email: { type: String, required: true, unique: true },
  profileImage: { type: String, default: "" },
  isGoogle: { type: Boolean, default: false },

})

const User = mongoose.model('users', userSchema);
export default User;